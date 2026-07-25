const db = require('../config/db');

const ProductModel = {
  async getAllProducts() {
    try {
      const query = `
        SELECT p.*, c.name AS category_name 
        FROM products p 
        LEFT JOIN categories c ON p.category_id = c.id 
        ORDER BY p.id DESC
      `;
      const [rows] = await db.query(query);
      return rows;
    } catch (err) {
      console.error('Error in getAllProducts:', err.message);
      return [];
    }
  },

  async getProductById(id) {
    try {
      const query = `
        SELECT p.*, c.name AS category_name 
        FROM products p 
        LEFT JOIN categories c ON p.category_id = c.id 
        WHERE p.id = ? LIMIT 1
      `;
      const [rows] = await db.query(query, [id]);
      if (!rows[0]) return null;

      const [images] = await db.query('SELECT * FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, id ASC', [id]);
      rows[0].images = images;
      return rows[0];
    } catch (err) {
      console.error('Error in getProductById:', err.message);
      return null;
    }
  },

  /**
   * CRITICAL SECURITY RULE: Query strictly by public_token
   */
  async getProductByToken(publicToken) {
    try {
      const query = `
        SELECT p.*, c.name AS category_name 
        FROM products p 
        LEFT JOIN categories c ON p.category_id = c.id 
        WHERE p.public_token = ? AND p.status = 'active' LIMIT 1
      `;
      const [rows] = await db.query(query, [publicToken]);
      if (!rows[0]) return null;

      const [images] = await db.query('SELECT * FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, id ASC', [rows[0].id]);
      rows[0].images = images;
      return rows[0];
    } catch (err) {
      console.error('Error in getProductByToken:', err.message);
      return null;
    }
  },

  async createProduct(data) {
    try {
      const {
        name, brand, model, category_id, price, vendor_cost, profit_margin,
        stock_quantity, short_description, full_description, specifications,
        public_token, seo_slug, status, featured
      } = data;

      const query = `
        INSERT INTO products (
          name, brand, model, category_id, price, vendor_cost, profit_margin,
          stock_quantity, short_description, full_description, specifications,
          public_token, seo_slug, status, featured
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const [result] = await db.query(query, [
        name, brand, model, category_id || null, price || 0, vendor_cost || 0, profit_margin || 0,
        stock_quantity || 1, short_description, full_description, JSON.stringify(specifications || {}),
        public_token, seo_slug, status || 'active', featured ? 1 : 0
      ]);

      return result.insertId;
    } catch (err) {
      console.error('Error in createProduct:', err.message);
      throw err;
    }
  },

  async updateProduct(id, data) {
    try {
      const {
        name, brand, model, category_id, price, vendor_cost, profit_margin,
        stock_quantity, short_description, full_description, specifications,
        seo_slug, status, featured
      } = data;

      const query = `
        UPDATE products SET 
          name = ?, brand = ?, model = ?, category_id = ?, price = ?, vendor_cost = ?, profit_margin = ?,
          stock_quantity = ?, short_description = ?, full_description = ?, specifications = ?,
          seo_slug = ?, status = ?, featured = ?
        WHERE id = ?
      `;

      await db.query(query, [
        name, brand, model, category_id || null, price || 0, vendor_cost || 0, profit_margin || 0,
        stock_quantity || 1, short_description, full_description, JSON.stringify(specifications || {}),
        seo_slug, status || 'active', featured ? 1 : 0, id
      ]);

      return true;
    } catch (err) {
      console.error('Error in updateProduct:', err.message);
      throw err;
    }
  },

  async regenerateToken(id, newToken) {
    try {
      await db.query('UPDATE products SET public_token = ? WHERE id = ?', [newToken, id]);
      return true;
    } catch (err) {
      console.error('Error in regenerateToken:', err.message);
      throw err;
    }
  },

  async deleteProduct(id) {
    try {
      await db.query('DELETE FROM products WHERE id = ?', [id]);
      return true;
    } catch (err) {
      console.error('Error in deleteProduct:', err.message);
      throw err;
    }
  },

  async addProductImage(productId, imageUrl, isPrimary = 0) {
    try {
      await db.query(
        'INSERT INTO product_images (product_id, image_url, is_primary) VALUES (?, ?, ?)',
        [productId, imageUrl, isPrimary ? 1 : 0]
      );
    } catch (err) {
      console.error('Error in addProductImage:', err.message);
    }
  },

  async deleteProductImage(imageId) {
    try {
      await db.query('DELETE FROM product_images WHERE id = ?', [imageId]);
    } catch (err) {
      console.error('Error in deleteProductImage:', err.message);
    }
  }
};

module.exports = ProductModel;
