import express from "express";
import passport from "passport";
import models from "../db/models";
const tokenAuth = passport.authenticate("jwt", { session: false });

// ADDDING localAuth BREAKS MY CODE, PLEASE GHADEER SAVE ME
const localAuth = passport.authenticate("local", { session: false });
const User = models.User;

// instantiate a router (mini app that only handles routes)
const router = express.Router();

router.get("/example", tokenAuth, (req, res, next) => {
  // start a promise chain, so that any errors will pass to `handle`
});


// localhost: 3000/api/stores get all articles
router.get('/api/stores', (req, res) => {
     models.Store.findAll().then(stores => {
     res.status(200).json({stores: stores});
     }).catch(e => console.log(e));
})

router.get('/api/store/:id', (req, res) => {
  //  res.status(200).json({message: 'working'});
    models.Store.findByPk(req.params.id).then(store => {
    res.status(200).json({store: store});
    }).catch(e => console.log(e));
})

// create new store
router.post('/api/store/', tokenAuth, (req, res) => {
  models.Store.create({
    store_name: req.body.store_name,
    location: req.body.location,
    phone: req.body.phone,
    email: req.body.email,
    image: req.body.image,
    user_id: req.user.id
  })
  .then(storeNewFromDB => {
    res.status(201).json({store: storeNewFromDB});
  })
  .catch(e => console.log(e))
  
});


// delete existing store by record id
router.delete('/api/store/:id', (req, res) => {
      models.Store.findByPk(req.params.id).then(store => {
      store.destroy().then(() => {
      res.status(200).json({
        result: `Record ID ${req.params.id} Deleted`,
      })
    })
    .catch(e => console.log(e)); 
  })
    .catch(e => console.log(e)); 
});



// update an existing store
router.put('/api/store/:id', (req, res) => {
  // find store by id sent to us by user in the url
  models.Store.findByPk(req.params.id).then(store => {
    return store.update({  
      store_name: req.body.store.store_name,
      phone: req.body.store.phone,
      location: req.body.store.location,
      email: req.body.store.email,
      image: req.body.store.image
    })
    })
    .then((store) => {
      res.status(200).json({store})
    })
    .catch(e => console.log(e)); 
});

router.get('/api/user/:id/stores', (req, res) => {
  //  res.status(200).json({message: 'working'});
    models.User.findByPk(req.params.id, { include : [{model: models.Store}] }).then(user => {
      res.status(200).json({user: user});
    });
    // }).catch(e => console.log(e));
})

export default router;
