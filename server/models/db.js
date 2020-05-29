const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CrudDB', (err) => {
    if (!err) { 
        console.log('La connexion MongoDB a réussi.');
    } else { 
        console.log('Erreur dans la connexion MongoDB : ' + JSON.stringify(err, undefined, 2)); 
    }
});

module.exports = mongoose;

require('./user.model');
require('./pangolin');
