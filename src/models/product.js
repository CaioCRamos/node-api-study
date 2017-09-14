'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: [true, 'Título obrigatório'],
        trim: true
    },
    slug:{
        type: String,
        required: [true, 'Slug obrigatório'],
        trim: true,
        index: true,
        unique: true
    },
    description:{
        type: String,
        required: [true, 'Descrição obrigatória'],
        trim: true
    },
    price:{
        type: Number,
        required: [true, 'Preço obrigatório']
    },
    active:{
        type: Boolean,
        required: true,
        default: true
    },
    tags: [{
        type: String,
        required: [true, 'Obrigatório ter pelo menos uma tag']
    }]
});

module.exports = mongoose.model('Product', schema);