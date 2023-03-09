const Login = require("../models/loginModel")

exports.index = (req, res) => {

    if(req.session.user) return res.render('login-logado');
    return res.render('login');

};

// registro usuario
exports.register = async function(req, res) {

    try{

        const login = new Login(req.body);
        await login.register();

        if(login.errors.length > 0) {
            req.flash("errors", login.errors)
            req.session.save(function(){

                return res.redirect("/login/index");

            });

            return;

        }

        req.flash("success", "Usuário criado com sucesso");
        req.session.save(function(){

            return res.redirect('/login/index');

        });

    }catch(e){

        console.log(e);
        return res.render("E404");
        
    }
    
};

// usuario registrado
exports.usuario = async function(req, res) {

    try{

        const login = new Login(req.body);
        await login.usuario();

        if(login.errors.length > 0) {
            req.flash("errors", login.errors)
            req.session.save(function(){

                return res.redirect("/login/index");

            });

            return;

        }

        req.flash("success", "Usuário criado com sucesso");
        req.session.user = login.user;
        req.session.save(function(){

            return res.redirect('/login/index');

        });

    }catch(e){

        console.log(e);
        return res.render("E404");
        
    }
    
};

// logoout
exports.logout = function(req, res) {

    req.session.destroy();
    res.redirect('/');

};