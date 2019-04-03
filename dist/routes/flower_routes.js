"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _models = require("../db/models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tokenAuth = _passport2.default.authenticate("jwt", { session: false });

// ADDDING localAuth BREAKS MY CODE, PLEASE GHADEER SAVE ME
var localAuth = _passport2.default.authenticate("local", { session: false });
var store = _models2.default.Store;

// instantiate a router (mini app that only handles routes)
var router = _express2.default.Router();

router.get("/example", tokenAuth, function (req, res, next) {
  // start a promise chain, so that any errors will pass to `handle`
});

// localhost: 3000/api/flowers get all articles
router.get('/api/flowers', function (req, res) {
  _models2.default.Flower.findAll().then(function (flowers) {
    res.status(200).json({ flowers: flowers });
  }).catch(function (e) {
    return console.log(e);
  });
});

router.get('/api/flower/:id', function (req, res) {
  //  res.status(200).json({message: 'working'});
  _models2.default.Flower.findByPk(req.params.id).then(function (flower) {
    res.status(200).json({ flower: flower });
  }).catch(function (e) {
    return console.log(e);
  });
});

// create new flower
router.post('/api/store/:id/flowers', tokenAuth, function (req, res) {
  _models2.default.Flower.create({
    type: req.body.type,
    price: req.body.price,
    information: req.body.information,
    image: req.body.image,
    store_id: req.params.id
  }).then(function (flowerNewFromDB) {
    res.status(201).json({ flower: flowerNewFromDB });
  }).catch(function (e) {
    return console.log(e);
  });
});

// delete existing flower by record id
router.delete('/api/flower/:id', function (req, res) {
  _models2.default.Flower.findByPk(req.params.id).then(function (flower) {
    flower.destroy().then(function () {
      res.status(200).json({
        result: "Record ID " + req.params.id + " Deleted"
      });
    }).catch(function (e) {
      return console.log(e);
    });
  }).catch(function (e) {
    return console.log(e);
  });
});

// update an existing flower
router.put('/api/flower/:id', function (req, res) {
  // find flower by id sent to us by user in the url
  _models2.default.Flower.findByPk(req.params.id).then(function (flower) {
    flower.update({
      type: req.body.flower.type,
      price: req.body.flower.price,
      information: req.body.flower.information,
      image: req.body.flower.image
    }).then(function (flower) {
      res.status(200).json({ flower: flower });
    });
  }).catch(function (e) {
    return console.log(e);
  });
});

router.get('/api/store/:id/flowers', function (req, res) {
  //  res.status(200).json({message: 'working'});
  _models2.default.Store.findByPk(req.params.id, { include: [{ model: _models2.default.Flower }] }).then(function (store) {
    res.status(200).json({ store: store });
  });
  // }).catch(e => console.log(e));
});

exports.default = router;