'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async() => {
    return await Product
        .find({ 
            active: true 
        }, 'title slug price');
}

exports.getBySlug = async(slug) => {
    return await Product
        .findOne({ 
            slug: slug,
            active: true 
        }, 'title description slug price tags');
}

exports.getById = async(id) => {
    return await Product
        .findById(id);
}

exports.getByTag = async(tag) => {
    return await Product
        .find({ 
            tags: tag,
            active: true 
        }, 'title description slug price tags');
}

exports.create = async(product) => {
    await product.save();
}

exports.edit = async(data) => {
    await Product 
        .findByIdAndUpdate(data.id, {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price
            }
        });
}

exports.delete = async(id) => {
    await Product.findOneAndRemove(id);
}