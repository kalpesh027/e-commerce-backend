const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures');


// create PRODUCT -- admin
exports.createProduct = catchAsyncErrors(async (req, res,next) => {

    req.body.user = req.user.id;
    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product})
});


//GEt all products 
exports.getAllproducts = catchAsyncErrors(async(req, res) => {
    const resultPerPage = 5;
    const productsCount = await Product.countDocuments();
    const apifeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apifeatures.query;

    res.status(200).json({
        success: true,
        products
    })
});

// Update product --admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if(!product){
        res.status(200).json({
            success: false,
            message: "Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators: true, 
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
});

// Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message:"Prodcut deleted successfully"
    })
});

// get Product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        success: true,
        product,
        productsCount
    })
});

// create review or update review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const{rating, comment, productId} = req.body;
    const review ={
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);
    const isReviwed = product.reviews.find(rev=> rev.user.toString() === req.user._id.toString());
    if(isReviwed){
        product.reviews.forEach(rev=>{
            if(rev.user.toString() === req.user._id.toString())
            (rev.rating = rating),
            (rev.comment = comment)
       })

    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }
    product.ratings = product.reviews.reduce((acc, item)=> item.rating + acc, 0)/product.reviews.length;

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
    })
    })

    // get all reviews 
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
    });

    // delete review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }
    const reviews = product.reviews.filter(rev=> rev._id.toString() !== req.query.id.toString());
    let avg = 0;
    reviews.forEach(rev=>{
        avg += rev.rating
    })
    let ratings = avg/reviews.length;
    let numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,ratings,numOfReviews
    },{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
    });
    })
