const express =require('express');

const mongoose = require('mongoose');
const Models = require('./model.js');
const morgan= require('morgan');
const validator= require('express-validator');
const bodyParser= require('body-parser');
const cors = require('cors');
var multer  = require('multer');
var upload = multer({ dest: 'images/' });

const app= express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(morgan('common'));


const Friend= Models.Friend;
mongoose.connect('mongodb+srv://myFlixDBadmin:samkorea@cluster0-u54mz.mongodb.net/contactDB?retryWrites=true',{useNewUrlParser: true});

app.get('/',(req,res)=>
{
  res.send("My Contact List");
});

//showing all the contacts
app.get('/friends', function(req,res)
{
  Friend.find()
  .then (function(friends)
  {
    res.status(201).json(friends);
  })
  .catch (function(err)
  {
    console.eroor(err);
    res.status(500). send("Error" +err);
  });
});
//deleting the contact
app.delete('/friends/:FirstName', function(req, res) {
  Friend.findOneAndRemove({ FirstName: req.params.FirstName })
  .then(function(user) {
    if (!user) {
      res.status(400).send(req.params.FirstName + " was not found");
    } else {
      res.status(200).send(req.params.FirstName + " was deleted.");
    }
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//updating the contact
app.put('/friends/:FirstName', function(req, res) {
  Friend.findOneAndUpdate({ FirstName : req.params.FirstName }, { $set :
  {
    FirstName : req.body.FirstName,
    LastName : req.body.LastName,
    Email : req.body.Email,
    Phone : req.body.Phone
  }},
  { new : true }, // This line makes sure that the updated document is returned
  function(err, updatedFriend) {
    if(err) {
      console.error(err);
      res.status(500).send("Error: " +err);
    } else {
      res.json(updatedFriend)
    }
  })
});

//creating new contact
app.post('/friends', function(req, res) {
  Friend.findOne({ FirstName : req.body.FirstName })
  .then(function(friends) {
    if (friends) {
      return res.status(400).send(req.body.FirstName + "already exists");
    } else {
    Friend
      .create({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Photo: req.body.Photo
      })
      .then(function(friends) {res.status(201).json(friends) })
      .catch(function(error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      })
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
console.log("Listening on Port 3000");
});
