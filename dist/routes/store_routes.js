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
var User = _models2.default.User;

// instantiate a router (mini app that only handles routes)
var router = _express2.default.Router();

router.get("/example", tokenAuth, function (req, res, next) {
  // start a promise chain, so that any errors will pass to `handle`
});

// localhost: 3000/api/stores get all articles
router.get('/api/stores', function (req, res) {
  _models2.default.Store.findAll().then(function (stores) {
    res.status(200).json({ stores: stores });
  }).catch(function (e) {
    return console.log(e);
  });
});

router.get('/api/store/:id', function (req, res) {
  //  res.status(200).json({message: 'working'});
  _models2.default.Store.findByPk(req.params.id).then(function (store) {
    res.status(200).json({ store: store });
  }).catch(function (e) {
    return console.log(e);
  });
});

// create new store
router.post('/api/store/', tokenAuth, function (req, res) {
  _models2.default.Store.create({
    store_name: req.body.store_name,
    location: req.body.location,
    phone: req.body.phone,
    email: req.body.email,
    image: req.body.image,
    user_id: req.user.id
  }).then(function (storeNewFromDB) {
    res.status(201).json({ store: storeNewFromDB });
  }).catch(function (e) {
    return console.log(e);
  });
});

// delete existing store by record id
router.delete('/api/store/:id', function (req, res) {
  _models2.default.Store.findByPk(req.params.id).then(function (store) {
    store.destroy().then(function () {
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

// update an existing store
router.put('/api/store/:id', function (req, res) {
  // find store by id sent to us by user in the url
  _models2.default.Store.findByPk(req.params.id).then(function (store) {
    return store.update({
      store_name: req.body.store.store_name,
      phone: req.body.store.phone,
      location: req.body.store.location,
      email: req.body.store.email,
      image: req.body.store.image
    });
  }).then(function (store) {
    res.status(200).json({ store: store });
  }).catch(function (e) {
    return console.log(e);
  });
});

router.get('/api/user/:id/stores', function (req, res) {
  //  res.status(200).json({message: 'working'});
  _models2.default.User.findByPk(req.params.id, { include: [{ model: _models2.default.Store }] }).then(function (user) {
    res.status(200).json({ user: user });
  });
  // }).catch(e => console.log(e));
});

exports.default = router;