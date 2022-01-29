const express = require('express');
const router = express.Router();
const User = require('../models').user;
const State = require('../models').states;
const City = require('../models').city;
const gravatar = require('gravatar');
const multer = require('multer');
var picture_storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'public/images');
  },
  filename: function(req, file, cb){
    fileExt = file.mimetype.split("/").pop();
    if(fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'png'){
      fileName = file.fieldname + "-" + Date.now() +"." + fileExt;
    }
    cb(null, fileName);
  }
});
var picture = multer({
  storage: picture_storage
});
/* GET home page. */
router.get('/', async(req, res)=> {

  var state = await State.findAll({
    attributes: ['id','name']
  });
  
  var user = await User.findAll({
    include:[{
        model: State,
        attributes:['id','name']
    },{
        model: City,
        attributes:['id','name']
      }
    ],
    attributes: ['id','first_name','last_name','email','mobile_no','picture']
  });
  res.render('frontend/index',{
    state,
    user
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

router.post('/user-registration',picture.single('picture'), async(req, res)=>{
  const avatar =gravatar.url(req.body.email,{
    s: '150',
    r: 'pg',
    d: 'mm'
  });
  var user = await User.create({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    mobile_no: req.body.mobile_no,
    picture: (req.file === undefined) ? avatar : `/images/${req.file.filename}`,
    states: req.body.state,
    cities: req.body.cities
  });

  var user_details = await User.findOne({
    where: {
      id: user.id
    },include:[{
        model: State,
        attributes:['id','name']
    },{
        model: City,
        attributes:['id','name']
      }
    ],
    attributes: ['id','first_name','last_name','email','mobile_no','picture']
  });
  res.json({
    success: true,
    code: 200,
    user,
    user_details
  });
});

router.get('/view-user/:id', async(req, res)=>{
  var id =req.params.id;

  var user_details = await User.findOne({
    where: {
      id
    },
    include:[{
      model: State,
      attributes:['id','name']
  },{
      model: City,
      attributes:['id','name']
    }
  ],
  attributes: ['id','first_name','last_name','email','mobile_no','picture','password']
  })

  res.json({
    success: true,
    code: 200,
    user_details
  })
})
module.exports = router;
