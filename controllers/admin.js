const Product = require('../models/Product');
const User = require('../models/User');


exports.getLandingPage = (req,res,next)=>{
    res.render('landing-page',{
      pageTitle:'Landing Page'
    });
};

exports.getHomePage = (req,res,next)=>{
  const user = req.user;

    Product.find()
     .then(products=>{
           res.render('product',{
               pageTitle:'Home Page',
               prods:products,
               user:user
           });
     })
     .catch(err=>console.log(err));
};

exports.getAddProduct = (req,res,next) => {
      const user = req.user;
    res.render('edit-product',{
        pageTitle:'Add Product',
        editing:false,
        user:user
    });
};

exports.postAddProduct =(req,res,next) => {
    const name = req.body.name;
    const muscle = req.body.muscle;    
    const price = req.body.price;
    const imageUrl= req.body.imageUrl;
    const description = req.body.description;
    const product = new Product({
        name:name,
        muscle:muscle,
        price:price,
        imageUrl:imageUrl,
        description:description,
        userId: req.user
    });
    product.save()
     .then(result=>{
         res.redirect('/home');
     })
     .catch(err=>console.log(err));
};

//exports.getproductPage =(req,res,next)=>{
//      const user = req.user;
//    res.render('product-page',{
//           user:user
//    });
//};

exports.getListProducts =(req,res,next)=>{
      const user = req.user;
    Product.find({userId:user._id})
    .then(products=>{
           res.render('list-products',{
               pageTitle:'Products List',
               prods:products,
               user:user
           });
    });
};

exports.getEditProduct =(req,res,next)=>{
      const user = req.user;
    const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/home');
      }
      res.render('edit-product', {
        pageTitle: 'Edit Product',
        user:user,
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req,res,next) => {
      const prodId = req.body.productId;
      const updated_name = req.body.name;
      const updated_muscle = req.body.muscle;
      const updated_price = req.body.price;
      const updated_imageUrl = req.body.imageUrl;
      const updated_description = req.body.description;

      Product.findById(prodId)
       .then(product=>{
           if(!product){
               return res.status(404).json({msg:'Product Not found'});
           }
           if(product.userId.toString() !== req.user._id.toString()){
             return res.redirect('/home');
           }
           product.name = updated_name;
           product.muscle = updated_muscle;
           product.price = updated_price;
           product.imageUrl = updated_imageUrl;
           product.description = updated_description;
           return product.save()
             .then(result=>{
              console.log('Updated Product');
              res.redirect('/list-products');
              });
        }).catch(err=>console.log(err));
};

exports.postDeleteProduct = (req,res,next) => {
    const prodId = req.body.productId;
  Product.deleteOne({_id:prodId, userId:req.user._id})
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/home');
    })
    .catch(err => console.log(err));
};

exports.getProductPage = (req,res,next) =>{
      const user = req.user;
    const prodId = req.params.productId;
    Product.findById(prodId)
      .then(product=>{
          if(!product){
              return res.redirect('/home');
          }
          const userId = product.userId;
          User.findById(userId)
           .then(user=>{
             const seller = user.username;
             res.render('product-page',{
              pageTitle:'Product Detail',
              product : product,
              user:user,
              seller:seller
            });
           });
          
      }).catch(err=>console.log(err));
};

exports.getFaq =(req,res) => {
      const user = req.user;
    res.render('faq',{
        pageTitle:'Faq',
        user:user
    });
};

exports.getFilterSearch = (req,res,next) => {
    const user = req.user;
   var muscle = [req.query.muscle || []].flat();

   let query = {
    muscle: {
        "$in": muscle
    }
   };

   Product.find(query)
     .then(products=>{
       res.render('product',{
         pageTitle:'Products',
         prods:products,
         user:user
       });
     })
     .catch(err=>console.log(err));
};
