const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Admin = mongoose.model('Admin');

module.exports.register = (req, res, next) => {
    var admin = new Admin();
    admin.email = req.body.email;
    admin.password = req.body.password;
    admin.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Adresse e-mail en double trouvée.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, admin, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (admin) return res.status(200).json({ "token": admin.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}
