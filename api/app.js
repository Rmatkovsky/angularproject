(function() {
    var express = require('express'),
        cors = require('cors'),
        fs = require('fs'),
        cookieParser = require('cookie-parser'),
        bodyParser = require('body-parser'),
        app = express(),
        mockDataUser = {
            login: 'admin',
            password: '12345',
            name: 'Admin'
        };


    app.use(cors());
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use('/static', express.static(__dirname + '../..' ));

    app.get('/api/seance', function (req, res) {
        if( req['cookies']['session'] ) {
            return getUserData( res );
        };

        return res.status(401).send('Access denied');
    });

    app.post('/api/seance', function (req, res) {

        if( !req.body.login || !req.body.password ) {
            return res.status(400).send('Bad response');
        };

        if( mockDataUser.login == req.body.login && mockDataUser.password == req.body.password ) {
            res.cookie('session', true, { httpOnly: true } );
            return getUserData( res );
        };

        return res.status(400).send('Bad response');
    });

    app.delete('/api/seance', function (req, res) {
        res.clearCookie('session');
        return res.status(200).send('Session deleted');
    });

    app.get('/', function(req, res) {
        return res.redirect('/static');
    });

    function getUserData( res ) {
        return res.status(200).send({item: mockDataUser});
    };

    app.listen(8000);
    console.log('Express server started :8000');

})();
