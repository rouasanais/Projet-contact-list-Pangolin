const mongoose = require('mongoose');

var Adminpangolins = new mongoose.model
('Adminpangolins', 
new mongoose.Schema({
    famille: {type: ['pangolin malais', 'pangolin de Chine','pangolin indien','pangolin des Philippines','pangolin géant','pangolin du Cap', 'pangolin à longue queue', 'pangolin à petites écailles']},
    race: { type: [ 'Manis', 'Paramanis', 'Phataginus', 'Smutsia', 'Uromanis'] }
   
    
}));

module.exports = { Adminpangolins };