const { async } = require('regenerator-runtime');
const Contato = require('../models/contatoModel');

exports.index = async (requisicao, resposta) => {

    const contatos = await Contato.buscaContatos();
    resposta.render('index', { contatos })

};