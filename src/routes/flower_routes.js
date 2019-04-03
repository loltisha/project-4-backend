import express from "express";
import passport from "passport";
import models from "../db/models";
const tokenAuth = passport.authenticate("jwt", { session: false });

// ADDDING localAuth BREAKS MY CODE, PLEASE GHADEER SAVE ME
const localAuth = passport.authenticate("local", { session: false });
const store = models.Store;

// instantiate a router (mini app that only handles routes)
const router = express.Router();

router.get("/example", tokenAuth, (req, res, next) => {
  // start a promise chain, so that any errors will pass to `handle`
});


// localhost: 3000/api/flowers get all articles
router.get('/api/flowers', (req, res) => {
     models.Flower.findAll().then(flowers => {
     res.status(200).json({flowers: flowers});
     }).catch(e => console.log(e));
})

router.get('/api/flower/:id', (req, res) => {
  //  res.status(200).json({message: 'working'});
    models.Flower.findByPk(req.params.id).then(flower => {
    res.status(200).json({flower: flower});
    }).catch(e => console.log(e));
})

// create new flower
router.post('/api/store/:id/flowers', tokenAuth, (req, res) => {
  models.Flower.create({
    type: req.body.type,
    price: req.body.price,
    information: req.body.information,
    image: req.body.image,
    store_id: req.params.id
  })
  .then(flowerNewFromDB => {
    res.status(201).json({flower: flowerNewFromDB});
  })
  .catch(e => console.log(e))
  
});


// delete existing flower by record id
router.delete('/api/flower/:id', (req, res) => {
      models.Flower.findByPk(req.params.id).then(flower => {
      flower.destroy().then(() => {
      res.status(200).json({
        result: `Record ID ${req.params.id} Deleted`,
      })
    })
    .catch(e => console.log(e)); 
  })
    .catch(e => console.log(e)); 
});



// update an existing flower
router.put('/api/flower/:id', (req, res) => {
  // find flower by id sent to us by user in the url
  models.Flower.findByPk(req.params.id).then(flower => {
    flower.update({  
      type: req.body.flower.type,
      price: req.body.flower.price,
      information: req.body.flower.information,
      image: req.body.flower.image
    })
    .then((flower) => {
      res.status(200).json({flower})
    })
    })
    .catch(e => console.log(e)); 
});

router.get('/api/store/:id/flowers', (req, res) => {
  //  res.status(200).json({message: 'working'});
    models.Store.findByPk(req.params.id, { include : [{model: models.Flower}] }).then(store => {
      res.status(200).json({store: store});
    });
    // }).catch(e => console.log(e));
})

export default router;
