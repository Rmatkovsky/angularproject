(function() {
    var express = require('express'),
        cors = require('cors'),
        fs = require('fs'),
        app = express();


    app.use(cors());

    app.get('/fields', function(req, res) {
        var fileData = fs.readFileSync( 'api/mockup/fields.json' ).toString();

        return res.status(200).send(fileData);
    });

    app.listen(8000);
    console.log('Express server started :8000');

})();
