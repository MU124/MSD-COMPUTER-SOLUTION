const express = require('express');
const router = express.Router();
const WebsiteController = require('../controllers/websiteController');
const ProductController = require('../controllers/productController');

// Public Pages
router.get('/', WebsiteController.getHome);
router.get('/about', WebsiteController.getAbout);
router.get('/services', WebsiteController.getServices);
router.get('/contact', WebsiteController.getContact);
router.post('/contact', WebsiteController.handleContactSubmit);

// Private Tokenized Product Route
router.get('/product/:slugToken', ProductController.getPublicProductDetail);

module.exports = router;
