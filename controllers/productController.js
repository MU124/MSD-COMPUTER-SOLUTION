const ProductModel = require('../models/productModel');
const SettingsModel = require('../models/settingsModel');

const ProductController = {
  async getPublicProductDetail(req, res) {
    try {
      const rawParam = req.params.slugToken || '';
      
      // Extract possible token: token is usually the last segment after '-' (16 chars) or full string
      let token = rawParam;
      const lastDashIndex = rawParam.lastIndexOf('-');
      if (lastDashIndex !== -1 && lastDashIndex < rawParam.length - 1) {
        token = rawParam.substring(lastDashIndex + 1);
      }

      // Query database STRICTLY by token
      let product = await ProductModel.getProductByToken(token);

      // If not found with extracted token, try rawParam as full token
      if (!product && token !== rawParam) {
        product = await ProductModel.getProductByToken(rawParam);
      }

      // If product does not exist or is inactive, render 404 page
      if (!product) {
        const settings = await SettingsModel.getAllSettings();
        return res.status(404).render('website/404', {
          title: 'Product Not Found | MSD Computer Solution',
          page: '404',
          settings
        });
      }

      const settings = await SettingsModel.getAllSettings();
      const currentUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

      res.render('website/product_detail', {
        title: `${product.name} | MSD Computer Solution`,
        page: 'product_detail',
        product,
        settings,
        currentUrl
      });
    } catch (err) {
      console.error('Error loading private product detail:', err.message);
      res.status(500).send('Server Error');
    }
  }
};

module.exports = ProductController;
