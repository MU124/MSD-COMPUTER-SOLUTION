const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const { requireAdminAuth, requireGuest } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Auth
router.get('/login', requireGuest, AdminController.getLogin);
router.post('/login', requireGuest, AdminController.postLogin);
router.get('/logout', AdminController.logout);

// Dashboard
router.get('/', requireAdminAuth, (req, res) => res.redirect('/admin/dashboard'));
router.get('/dashboard', requireAdminAuth, AdminController.getDashboard);

// Products
router.get('/products', requireAdminAuth, AdminController.getProducts);
router.get('/products/add', requireAdminAuth, AdminController.getAddProduct);
router.post('/products/add', requireAdminAuth, upload.array('images', 5), AdminController.postAddProduct);
router.get('/products/edit/:id', requireAdminAuth, AdminController.getEditProduct);
router.post('/products/edit/:id', requireAdminAuth, upload.array('images', 5), AdminController.postEditProduct);
router.post('/products/regenerate-token/:id', requireAdminAuth, AdminController.postRegenerateToken);
router.post('/products/delete/:id', requireAdminAuth, AdminController.postDeleteProduct);
router.post('/products/delete-image/:imageId/:productId', requireAdminAuth, AdminController.postDeleteProductImage);

// Categories
router.get('/categories', requireAdminAuth, AdminController.getCategories);
router.post('/categories/add', requireAdminAuth, AdminController.postAddCategory);
router.post('/categories/edit', requireAdminAuth, AdminController.postEditCategory);
router.post('/categories/delete/:id', requireAdminAuth, AdminController.postDeleteCategory);

// Settings
router.get('/settings', requireAdminAuth, AdminController.getSettings);
router.post('/settings', requireAdminAuth, AdminController.postUpdateSettings);

module.exports = router;
