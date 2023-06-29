


const express = require('express');
const cors = require('cors');
const ProductsModel = require("../model/product.model") 
const productsRoute = express.Router()


const getProductById = async(req, res)=>{
    const { productId } = req.param;
    const { product } = await ProductsModel.find({_id: productId})
    return res.send({ data: product, status: "Get Products"})
}


const createProducts = async(req, res)=>{
    const product = req.body;

    const prodData = await ProductsModel.create(product);
    return res.send({ data: prodData, status: "Added Prod success"})
}


const getProductDetailsById = async(req, res)=> {
    const { id } = req.params;
    const prodData = await ProductsModel.find({_id: id});
    return res.send({ data: prodData, status: "Got the Product Data"})
}


productsRoute.get(':/id', getProductById)
productsRoute.post('/create', createProducts);

module.exports = {productsRoute, ProductsModel}