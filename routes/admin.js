const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

//get landing page => GET
router.get('/', adminController.getLandingPage);

//get Home page with filter On =>
router.get('/home/show',isAuth,adminController.getFilterSearch);

// get Home page =>GET
router.get('/home',isAuth, adminController.getHomePage);

// get add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

//post add-product => POST
router.post('/add-product',isAuth, adminController.postAddProduct);

//get product-page => GET
//router.get('/product-page',isAuth, adminController.getproductPage);
// /admin/products => GET

router.get('/list-products',isAuth, adminController.getListProducts);
//router.get('/products', isAuth, adminController.getProducts);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product',isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

router.get('/product-page/:productId', isAuth, adminController.getProductPage);

router.get('/faq', adminController.getFaq);

module.exports = router;
