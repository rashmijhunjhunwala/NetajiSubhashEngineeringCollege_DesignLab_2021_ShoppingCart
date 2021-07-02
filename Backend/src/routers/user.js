const express = require('express')
const auth = require('../middleware/auth')
const Product= require('../models/product')
const User = require('../models/user')
const router = new express.Router()


//Registering the user
router.post('/user/register', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
        
    } catch (e) {
        res.status(400).send(e)
    }
})


//Logging in the user
router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

//Logging Out the user
router.post('/user/logout', auth, async (req, res) => {
    try {
        // console.log(req.user);
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})


//Logging Out the user from all devices
router.post('/user/logoutAll',  auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//Getting the profile of the user
router.get('/user/me',  auth, async (req, res) => {
    res.send(req.user)
})


router.post('/user/addProducts/:id' , auth , async (req,res) => {
    try {
    const user = req.user;
    const product_id = req.params.id
    let itemIndex = user.products.findIndex(p => p.productId == product_id);
    if(itemIndex>-1) {
        user.products[itemIndex].quantity += 1
    }
    else {
        user.products = user.products.concat({"productId":product_id,"quantity":1})
    }
    await user.save()
    res.status(200).send(user);
}catch (e) {
    res.status(500).send(e)
}
})

router.post('/user/removeProducts/:id' , auth , async (req,res) => {
    try {
    const user = req.user;
    const product_id = req.params.id
    let itemIndex = user.products.findIndex(p => p.productId == product_id);
    if(itemIndex>-1) {
        if(user.products[itemIndex].quantity == 1) {
            user.products.splice(itemIndex, 1);
        }
        else
            user.products[itemIndex].quantity -= 1
    }
    await user.save()
    res.status(200).send(user.products);
}catch (e) {
    res.status(400).send(e)
}
})

router.get('/user/getCart' , auth , async (req,res) => {
    try {
         await req.user.populate({path:'products.productId'}).execPopulate()
         res.status(200).send(req.user.products)
        }catch(e) {
        res.status(400).send(e)
    }
})


module.exports = router