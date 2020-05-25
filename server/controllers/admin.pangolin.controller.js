const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Adminpangolins } = require('../models/admin.pangolin');

// => localhost:3000/pangolins/
router.get('/', (req, res) => {
    Adminpangolins.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Erreur lors du retour de l\'admin :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Aucun enregistrement avec l'identifiant donné : ${req.params.id}`);

        Adminpangolins.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Erreur lors de la récupération :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var adm = new Adminpangolins({
        famille: req.body.famille,
        race: req.body.race,
    });
    adm.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Erreur lors de la sauvegarde :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Aucun enregistrement avec l'identifiant donné : ${req.params.id}`);

    var adm = {
        famille: req.body.famille,
        race: req.body.race,
        
    }
    Adminpangolins.findByIdAndUpdate(req.params.id, { $set: adm }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Erreur dans la mise à jour :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Aucun enregistrement avec l'identifiant donné : ${req.params.id}`);

        Adminpangolins.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Erreur lors de la suppression :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;