const Product = require("../models/Product")

exports.createNewProduct = async (req, res) => {
    try {
        let product

        //Product creation
        product = new Product(req.body)
        await product.save();
        res.status(200).send(product)

    } catch (error) {
        console.log(error)
        res.status(500).send("Error")   
    }
}

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error") 
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const {name, category, location, price} = req.body
        let product = await Product.findById(req.params.id)

        if(!product) 
            res.status(404).send({msg: "No existe el producto"})

        product.name=name
        product.category=category
        product.location=location
        product.price=price

        product = await Product.findOneAndUpdate({_id: req.params.id}, product, {new:true})
        res.json(product)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error") 
    }
}


exports.getProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id)

        if(!product) 
            res.status(404).send({msg: "No existe el producto"})
        else
            res.json(product)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error") 
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id)

        if(!product){
            res.status(404).send({msg: "No existe el producto"})
        } else {
            await Product.findOneAndRemove({_id: req.params.id})
            res.json({msg: "Producto eliminado con exito"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Error") 
    }
}
