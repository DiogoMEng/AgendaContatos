exports.middleWareGlobal = (req, res, next) => {

    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();

};

exports.checkCsrfError = (err, req, res, next) => {

    if(err){
        return res.render('E404');
    }

    next();

};

exports.csrfMiddleware = (req, res, next) => {

    res.locals.csrfToken = req.csrfToken();
    next();
    
};

exports.loginRequired = function(req, res, next){

    if(!req.session.user){

        req.flash('errors', 'Você precisa fazer login.');
        req.session.save(function(){

            res.redirect('/');
            
        });
        
        return;
        
    }
    next();

};