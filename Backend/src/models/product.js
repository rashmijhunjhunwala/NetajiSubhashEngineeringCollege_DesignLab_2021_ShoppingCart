const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    headLine: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required : true,
    },
    price: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})


//FindproductByCategory
productSchema.statics.findByCategory = async (category) => {
    const product = await product.find({category})
    if (!product) {
        throw new Error('Invalid Category')
    }

    return product
}


const product = mongoose.model('product', productSchema)

module.exports = product