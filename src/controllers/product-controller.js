'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

exports.get = async(req, res, next) => {
    try{
        var data = await repository.get();
        res.status(200).send(data);
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getBySlug = async(req, res, next) => {
    try{
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getById = async(req, res, next) => {
    try{
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getByTag = async(req, res, next) => {
    try{
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async(req, res, next) => {
    //var product = new Product(req.body);
    
    let product = new Product();
    product.title = req.body.title;
    product.description = req.body.description;
    product.slug = req.body.slug;
    product.price = req.body.price;    
    product.tags = req.body.tags;

    let contract = new ValidationContract();
    contract.isRequired(product.title, 'Título obrigatório');
    contract.isRequired(product.description, 'Descrição obrigatória');
    contract.isRequired(product.slug, 'Slug obrigatório');

    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try{
        await repository.create(product);
        res.status(200).send({ 
            message: 'Produto cadastrado com sucesso!'
        });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao cadastrar produto',
            data: e
        });
    }
};

exports.put = async(req, res, next) => {
    try{
        await repository.edit(req.body);
        res.status(200).send({ 
            message: 'Produto atualizado com sucesso!'
        });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao atualizar produto',
            data: e
        });
    }
};

exports.delete = async(req, res, next) => {
    let id = req.params.id;

    try{        
        await repository.delete(id);
        res.status(200).send({ 
            message: 'Produto removido com sucesso!'
        });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao remover produto',
            data: e
        });
    }
};