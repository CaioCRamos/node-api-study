'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');

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

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.isRequired(req.body.name, 'Nome obrigatório');
    contract.isRequired(req.body.email, 'Email obrigatório');
    contract.isRequired(req.body.password, 'Senha obrigatória');

    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try{
        await repository.create(req.body);
        res.status(200).send({ 
            message: 'Cliente cadastrado com sucesso!'
        });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao cadastrar cliente',
            data: e
        });
    }
};
