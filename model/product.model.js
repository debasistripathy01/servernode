const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
    name: String, 
    image: String,
    title: String,
    description: String,
    price: String,
    category: String,
    type: String,
    productType: String

})

const ProductsModel = mongoose.model("productsSchema", productsSchema);

module.exports = { ProductsModel }