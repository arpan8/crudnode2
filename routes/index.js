var express = require('express');
var router = express.Router();
var User = require('../models').user;
var State = require('../models').states;
var City = require('../models').city;
/* GET home page. */
router.get('/', async(req, res)=> {
  var state = await State.findAll({
    attributes: ['id','name']
  });
  res.render('frontend/index',{
    state
  });
});
router.post('/get-states', async(req,res)=>{
  var state = await State.create({
    name: req.body.name,
  });
  res.json({
    success: true,
    code: 200,
    state
  });
});
router.post('/cities', async(req,res)=>{
  var city = await City.create({
    name: req.body.name,
    state_id: req.body.state_id
  });
  res.json({
    success: true,
    code: 200,
    city
  });
});
router.post('/get-cities', async(req,res)=>{
  var city = await City.findAll({
    where: {
      state_id: req.body.state_id
    }, attributes: ['id','name']  
  });
  res.json({
    success: true,
    code: 200,
    city
  });
});
router.post('/user-registration', async(req, res)=>{
  var user = await User.create({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    mobile_no: req.body.mobile_no,
      
  })
})
module.exports = router;
