const express = require('express');

const basicAuth = require('../middleware/basic-auth.js');
const oauth = require('../middleware/oauth.js');
const User = require('../users.js');
// let bearerAuth = require('../middleware/bearer-auth-middleware.js');

// eslint-disable-next-line new-cap
const router = express.Router();


router.post('/signup', (req, res) => {
  new User(req.body).save()
    .then(userIn => {
      let token = User.generateToken(userIn);
      res.status(200).send(token);
    });
});

router.post('/signin', basicAuth ,(req, res) => {
  res.status(200).json(req.token);
});

router.get('/users', basicAuth, (req, res) => {
  User.find().then(data=>{
    res.status(200).json(data);
  });
});

router.get('/oauth',(req, res,next) => {
  console.log('v1.js');
  oauth.authorize(req)
    .then( token => {
      res.status(200).send(token);
    })
    .catch(next);
});

// router.get('/secret', bearerAuth, (req, res) => {
//   res.status(200).json(req.user);
// });

module.exports = router;