const mongoose =require('mongoose')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser =require('body-parser');
const user = require('./module/user')
const cors =require("cors")



     //  populate("bestfreind")  -> has one  .exiit
    //user .find().byName("mohammed")
   //User.findByName

mongoose.connect("mongodb://localhost/syriabook",()=>{
        console.log('connected')
    },e=>console.log(e)
)

app.use(cors({
    origin:"*"
}))
app.use(bodyParser.json());
app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
});

var routes = require('./router/router.js');
routes(app);

app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});
  
server.listen(5000, () => {
    console.log('listening on *:3000');
});


 

module.exports = app;