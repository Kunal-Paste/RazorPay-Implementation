const productModel = require('../model/product.model');

async function createProduct(req,res){
    const {image,title,description,price:{amount,currency}} = req.body;

    try {
       const product = await productModel.create({
        image,title,description,price:{amount,currency}
       }) 
       
       return res.status(201).json({
        message:'product created successfully',
        product
       })

    } catch (err) {
        res.status(500).json({
            message:'internal server error',
            error:err.message
        })
    }
}

async function getProduct(req,res){
    try {
        const product = await productModel.findOne();

        res.status(200).json({
            message:"product fetched successfully",
            product
        })
    } catch (err) {
       res.status(500).json({
        message:'internal server error',
        error:err.message
       }) 
    }
}

module.exports = {
    createProduct,
    getProduct
}