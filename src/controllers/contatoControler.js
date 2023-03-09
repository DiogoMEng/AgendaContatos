const { async } = require('regenerator-runtime');
const Contato = require('../models/contatoModel');

exports.index = function (req, res){

    res.render('contato', {

        contato: {}

    });

};

exports.register = async function(req, res) {

    try{

        const contato = new Contato(req.body);
        await contato.register();
    
        if(contato.errors.length > 0){
    
            req.flash('errors', contato.errors);
            req.session.save(function(){
    
                res.redirect('/contato/index');
                
            });
    
            return;
    
        }
    
        req.flash('success', 'Contato registrado com sucesso');
        req.session.save(function(){

            return res.redirect(`/contato/index/${contato.contato._id}`);
            
        });
           

    }catch(e){

        console.log(e);
        return res.render('E404');

    }

};

exports.editIndex = async function(req, res){

    if(!req.params.id) return res.render('E404');

    const user = await Contato.buscaId(req.params.id);

    if(!user) return res.render('E404');

    res.render('contato', { 

        contato: user

     });

};

exports.edit = async function (req, res){

    try{

        if(!req.params.id) return res.render('E404');
        const contato = new Contato(req.body);
    
        await contato.edit(req.params.id)
    
        if(contato.errors.length > 0){
        
            req.flash('errors', contato.errors);
            req.session.save(function(){
    
                res.redirect('/contato/index');
                
            });
    
            return;
    
        }
    
        req.flash('success', 'Contato editado com sucesso');
        req.session.save(function(){
    
            return res.redirect(`/contato/index/${contato.contato._id}`);

        });
    
    }catch(e){

        console.log(e)

        res.render("E404");

    }

};

exports.delete = async function(req, res){

    if(!req.params.id) return res.render('E404');

    const contato = await Contato.delete(req.params.id);

    if(!contato) return res.render('E404');

    req.flash('success', 'Contato apagado com sucesso');
    req.session.save(function(){

        return res.redirect(`/`);

    });

};