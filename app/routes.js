module.exports = function(app, passport) {

    var Classe = require('./models/classe');
    var Material = require('./models/material');

    // HOME PAGE (with login links) ========
    app.get('/', function(req, res) {
        res.render('index.html'); // load the index.ejs file
    });

    // show the login form
    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('view/login.ejs', {
            message: req.flash('loginMessage')
        });
    });

    // show the signup form
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', {
            message: req.flash('signupMessage')
        });
    });

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });
    
    app.get('/classe', isLoggedIn, function(req, res) {
    	 res.render('Classe.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // process the login form
    app.post('/login', passport.authenticate('local-login'), function(req, res) { 
    	res.send(200);
    });
    //app.post('/login', passport.authenticate('local-login', {
//        successRedirect: '/classe', // redirect to the secure profile section
//        failureRedirect: '/login', // redirect back to the signup page if there is an error
//        failureFlash: true // allow flash messages
    //}));

    app.route('/api/classes')

    // .post(function(req, res) {
    //     var classe = new Classe();
    //     classe.nome = req.body.nome;
    //     classe.codigo = req.body.codigo;
    //     classe.tipo = req.body.tipo;

    //     classe.save(function(err) {
    //         if (err)
    //             res.send(err);

    //         res.json({
    //             message: 'Classe criada!'
    //         });
    //     });
    // }),

    .get(isLoggedIn, function(req, res) {
        Classe.find(function(err, classe) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(classe); // return all nerds in JSON format
            //console.log(res.json(classe));
        });
    });

    app.route('/api/material')
        .get(function(req, res) {
            res.json({
                message: 'Material criado!'
            });
        });

};

// route middleware to make sure a user is logged in

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
