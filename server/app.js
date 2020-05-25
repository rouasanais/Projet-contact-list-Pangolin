require('./config/config');
require('./models/db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const routeIndex = require('./routes/index.router');
const pangolinController = require('./controllers/pangolin.controller.js');
const adminPangolinController = require('./controllers/admin.pangolin.controller.js');


var app = express();

// middleware
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));
app.use(passport.initialize());
app.use('/api', routeIndex);
app.use('/pangolins', pangolinController);
app.use('/adminpangolins', adminPangolinController);

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});

// start server
app.listen(3000, () => console.log('Le serveur a démarré au port : 3000'));