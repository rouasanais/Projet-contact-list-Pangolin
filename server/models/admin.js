const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var admin = new mongoose.Schema({
   
    email: {
        type: String,
        required: 'L\'email ne peut pas être vide',
        unique: true
    },
    password: {
        type: String,
        required: 'Le mot de passe ne peut pas être vide',
        minlength: [4, 'Le mot de passe doit contenir au moins 4 caractères']
    },
    saltSecret: String
});

// Custom validation for email
admin.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Email invalide.');

// Events
admin.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});


// Methods
admin.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

admin.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}



mongoose.model('Admin', admin);