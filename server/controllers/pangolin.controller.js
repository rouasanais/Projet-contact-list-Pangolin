const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Pangolin } = require('../models/pangolin');

// => localhost:3000/pangolins/
router.get('/', (req, res) => {
    Pangolin.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Erreur lors du retour des pangolins :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Aucun enregistrement avec l'identifiant donné : ${req.params.id}`);

    Pangolin.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Erreur lors de la récupération de pangolins :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var pan = new Pangolin({
        famille: req.body.famille,
        race: req.body.race,
        nourriture: req.body.nourriture,
        age: req.body.age,
    });
    pan.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Erreur lors de la sauvegarde des pangolins :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Aucun enregistrement avec l'identifiant donné : ${req.params.id}`);

    var pan = {
        famille: req.body.famille,
        race: req.body.race,
        nourriture: req.body.nourriture,
        age: req.body.age,
    }
    Pangolin.findByIdAndUpdate(req.params.id, { $set: pan }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Erreur dans la mise à jour des pangolins :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Aucun enregistrement avec l'identifiant donné : ${req.params.id}`);

    Pangolin.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Erreur lors de la suppression de pangolin :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;