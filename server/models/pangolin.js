const mongoose = require('mongoose');

var Pangolin = new mongoose.model
('Pangolin', 
new mongoose.Schema({
    famille: {type: ['pangolin malais', 'pangolin de Chine','pangolin indien','pangolin des Philippines','pangolin géant','pangolin du Cap', 'pangolin à longue queue', 'pangolin à petites écailles']},
    race: { type: [ 'Manis', 'Paramanis', 'Phataginus', 'Smutsia', 'Uromanis'] },
    nourriture: { type: String },
    age: { type: Number }
    
}));

module.exports = { Pangolin };