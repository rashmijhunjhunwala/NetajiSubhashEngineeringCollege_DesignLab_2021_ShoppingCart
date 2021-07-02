const express = require('express')
const Product = require('../models/product')

const router = new express.Router()

router.post('/createProduct', async (req, res) => {
    const product = new Product({
        ...req.body
    })

    try {
        await product.save()
        res.status(201).send(product)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/getAllProducts', async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(201).send(products)
    } catch (e) {
        res.status(400).send(e)
    }
})



module.exports = router