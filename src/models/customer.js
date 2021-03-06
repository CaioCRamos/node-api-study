'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: [true, 'Nome obrigatório'],
        trim: true
    },
    email:{
        type: String,
        required: [true, 'Email obrigatório'],
        trim: true,
        index: true,
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Senha obrigatória'],
        trim: true
    }
});

module.exports = mongoose.model('Customer', schema);