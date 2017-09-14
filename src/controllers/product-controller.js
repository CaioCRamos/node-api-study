'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

exports.get = (req, res, next) => {
    repository
        .get()
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.getBySlug = (req, res, next) => {
    repository
        .getBySlug(req.params.slug)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.getById = (req, res, next) => {
    repository
        .getById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.getByTag = (req, res, next) => {
    repository
        .getByTag(req.params.tag)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.post = (req, res, next) => {
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

    repository
        .create(product)
        .then(x => {
            res.status(200).send({ 
                message: 'Produto cadastrado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar produto',
                data: e
            });
        });
};

exports.put = (req, res, next) => {
    let id = req.params.id;
    
    repository 
        .udpate(id, req.body)
        .then(x => {
            res.status(200).send({ 
                message: 'Produto atualizado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao atualizar produto',
                data: e
            });
        });
};

exports.delete = (req, res, next) => {
    let id = req.params.id;

    repository 
        .delete(id)
        .then(x => {
            res.status(200).send({ 
                message: 'Produto removido com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao remover produto',
                data: e
            });
        });
};