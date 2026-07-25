const bcrypt = require('bcryptjs');
const AdminModel = require('../models/adminModel');
const ProductModel = require('../models/productModel');
const CategoryModel = require('../models/categoryModel');
const SettingsModel = require('../models/settingsModel');
const { generateToken, generateSlug } = require('../utils/nanoId');

const AdminController = {
  // Login
  getLogin(req, res) {
    res.render('admin/login', {
      title: 'Admin Login | MSD Computer Solution',
      error: null
    });
  },

  async postLogin(req, res) {
    try {
      const { username, password } = req.body;
      
      // Ensure default admin exists if table is empty
      await AdminModel.ensureDefaultAdmin();

      const admin = await AdminModel.findByUsername(username);
      if (!admin) {
        return res.render('admin/login', {
          title: 'Admin Login | MSD Computer Solution',
          error: 'Invalid username or password'
        });
      }

      const match = await bcrypt.compare(password, admin.password);
      if (!match) {
        return res.render('admin/login', {
          title: 'Admin Login | MSD Computer Solution',
          error: 'Invalid username or password'
        });
      }

      // Store in session
      req.session.admin = {
        id: admin.id,
        username: admin.username,
        full_name: admin.full_name
      };

      res.redirect('/admin/dashboard');
    } catch (err) {
      console.error(err);
      res.render('admin/login', {
        title: 'Admin Login | MSD Computer Solution',
        error: 'System error during login'
      });
    }
  },

  logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/admin/login');
    });
  },

  // Dashboard
  async getDashboard(req, res) {
    try {
      const products = await ProductModel.getAllProducts();
      const categories = await CategoryModel.getAllCategories();
      
      res.render('admin/dashboard', {
        title: 'Admin Dashboard | MSD Computer Solution',
        page: 'dashboard',
        admin: req.session.admin,
        totalProducts: products.length,
        totalCategories: categories.length,
        recentProducts: products.slice(0, 5)
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  // Product List
  async getProducts(req, res) {
    try {
      const products = await ProductModel.getAllProducts();
      const host = req.get('host');
      const protocol = req.protocol;

      res.render('admin/products/index', {
        title: 'Product Management | MSD Admin',
        page: 'products',
        admin: req.session.admin,
        products,
        baseUrl: `${protocol}://${host}`
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  // Add Product Form
  async getAddProduct(req, res) {
    try {
      const categories = await CategoryModel.getActiveCategories();
      res.render('admin/products/add', {
        title: 'Add New Product | MSD Admin',
        page: 'products',
        admin: req.session.admin,
        categories
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  // Post Add Product
  async postAddProduct(req, res) {
    try {
      const {
        name, brand, model, category_id, price, vendor_cost, profit_margin,
        stock_quantity, short_description, full_description, specs_keys, specs_values,
        status, featured
      } = req.body;

      // Calculate selling price if vendor_cost and profit_margin are provided
      let finalPrice = parseFloat(price) || 0;
      const vCost = parseFloat(vendor_cost) || 0;
      const pMargin = parseFloat(profit_margin) || 0;
      if (vCost > 0 || pMargin > 0) {
        finalPrice = vCost + pMargin;
      }

      // Generate NanoID Token and SEO Slug
      const public_token = generateToken(16);
      const seo_slug = generateSlug(name);

      // Parse specifications into object
      const specifications = {};
      if (Array.isArray(specs_keys) && Array.isArray(specs_values)) {
        specs_keys.forEach((key, idx) => {
          if (key && key.trim()) {
            specifications[key.trim()] = (specs_values[idx] || '').trim();
          }
        });
      } else if (specs_keys && specs_values) {
        specifications[specs_keys.trim()] = specs_values.trim();
      }

      const productId = await ProductModel.createProduct({
        name,
        brand,
        model,
        category_id: category_id ? parseInt(category_id) : null,
        price: finalPrice,
        vendor_cost: vCost,
        profit_margin: pMargin,
        stock_quantity: parseInt(stock_quantity) || 1,
        short_description,
        full_description,
        specifications,
        public_token,
        seo_slug,
        status: status || 'active',
        featured: featured ? 1 : 0
      });

      // Handle uploaded images
      if (req.files && req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {
          const file = req.files[i];
          const imageUrl = '/uploads/' + file.filename;
          await ProductModel.addProductImage(productId, imageUrl, i === 0 ? 1 : 0);
        }
      }

      res.redirect('/admin/products');
    } catch (err) {
      console.error('Error creating product:', err.message);
      res.status(500).send('Error creating product: ' + err.message);
    }
  },

  // Edit Product Form
  async getEditProduct(req, res) {
    try {
      const product = await ProductModel.getProductById(req.params.id);
      if (!product) return res.redirect('/admin/products');

      const categories = await CategoryModel.getAllCategories();
      const host = req.get('host');
      const protocol = req.protocol;

      res.render('admin/products/edit', {
        title: `Edit ${product.name} | MSD Admin`,
        page: 'products',
        admin: req.session.admin,
        product,
        categories,
        baseUrl: `${protocol}://${host}`
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  // Post Edit Product
  async postEditProduct(req, res) {
    try {
      const productId = req.params.id;
      const {
        name, brand, model, category_id, price, vendor_cost, profit_margin,
        stock_quantity, short_description, full_description, specs_keys, specs_values,
        status, featured
      } = req.body;

      let finalPrice = parseFloat(price) || 0;
      const vCost = parseFloat(vendor_cost) || 0;
      const pMargin = parseFloat(profit_margin) || 0;
      if (vCost > 0 || pMargin > 0) {
        finalPrice = vCost + pMargin;
      }

      const seo_slug = generateSlug(name);

      const specifications = {};
      if (Array.isArray(specs_keys) && Array.isArray(specs_values)) {
        specs_keys.forEach((key, idx) => {
          if (key && key.trim()) {
            specifications[key.trim()] = (specs_values[idx] || '').trim();
          }
        });
      } else if (specs_keys && specs_values) {
        specifications[specs_keys.trim()] = specs_values.trim();
      }

      await ProductModel.updateProduct(productId, {
        name,
        brand,
        model,
        category_id: category_id ? parseInt(category_id) : null,
        price: finalPrice,
        vendor_cost: vCost,
        profit_margin: pMargin,
        stock_quantity: parseInt(stock_quantity) || 1,
        short_description,
        full_description,
        specifications,
        seo_slug,
        status: status || 'active',
        featured: featured ? 1 : 0
      });

      // Handle newly uploaded images
      if (req.files && req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {
          const file = req.files[i];
          const imageUrl = '/uploads/' + file.filename;
          await ProductModel.addProductImage(productId, imageUrl, 0);
        }
      }

      res.redirect('/admin/products');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  // Regenerate Token
  async postRegenerateToken(req, res) {
    try {
      const productId = req.params.id;
      const newToken = generateToken(16);
      await ProductModel.regenerateToken(productId, newToken);
      res.redirect(`/admin/products/edit/${productId}`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  // Delete Product
  async postDeleteProduct(req, res) {
    try {
      await ProductModel.deleteProduct(req.params.id);
      res.redirect('/admin/products');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  // Categories List
  async getCategories(req, res) {
    try {
      const categories = await CategoryModel.getAllCategories();
      res.render('admin/categories/index', {
        title: 'Categories | MSD Admin',
        page: 'categories',
        admin: req.session.admin,
        categories
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  async postAddCategory(req, res) {
    try {
      const { name, status } = req.body;
      const slug = generateSlug(name);
      await CategoryModel.createCategory(name, slug, status || 'active');
      res.redirect('/admin/categories');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  async postEditCategory(req, res) {
    try {
      const { id, name, status } = req.body;
      const slug = generateSlug(name);
      await CategoryModel.updateCategory(id, name, slug, status);
      res.redirect('/admin/categories');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  async postDeleteCategory(req, res) {
    try {
      await CategoryModel.deleteCategory(req.params.id);
      res.redirect('/admin/categories');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  // Website Settings
  async getSettings(req, res) {
    try {
      const settings = await SettingsModel.getAllSettings();
      res.render('admin/settings', {
        title: 'Website Settings | MSD Admin',
        page: 'settings',
        admin: req.session.admin,
        settings
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  async postUpdateSettings(req, res) {
    try {
      const settings = req.body;
      for (const [key, value] of Object.entries(settings)) {
        await SettingsModel.updateSetting(key, value);
      }
      res.redirect('/admin/settings');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
};

module.exports = AdminController;
