const user = require('../module/user');

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  User = mongoose.model('User');

exports.register = function(req, res) {

 
  var newUser = new User(req.body);
  newUser.password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function(err, user) {
    if (err) {
      return res.status(200).send({
        error:'yes',
        message: "phone number is in use"
      });
    } else {
 
      user.password = undefined;
      let token= jwt.sign({ phone: user.phone, name: user.name, _id: user._id }, 'RESTFULAPIs') ;
      return res.status(200).json({
          error:'no',
          user:user,
          token:token
      });
    }
  });
};

exports.sign_in = function(req, res) {
  
    User.findOne({
    phone: req.body.phone
  }, function(err, user) {
    if (err)  return res.status(200).json({error:'yes', message: 'Authentication failed. Invalid phone or password.' });
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(200).json({ error:'yes', message: 'Authentication failed. Invalid phone or password.' });
    }
    user.password=undefined
    return res.json({error:'no' ,user:user,token: jwt.sign({ phone: user.phone, name: user.name, _id: user._id }, 'RESTFULAPIs') });
  });
};

exports.loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {

    return res.status(401).json({ message: 'Unauthorized user!!' });
  }
};


exports.profile = function(req, res, next) {
  if (req.user) {
    res.send(req.user);
    next();
  } 
  else {
   return res.status(401).json({ message: 'Invalid token' });
  }
};

exports.log_out =function(req,res,next){
    const authHeader = req.headers["Authorization"];
    jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
        if (logout) {
         res.status(200).send({error:'no',msg : 'You have been Logged Out' });
        } else {
         res.status(200).send({error:'no', msg:'You already logged out'});
        }
    });
    
}

exports.ChangePassword =function(req,res,next){
    User.findOne({ phone: req.user.phone }, function(err, user) {
        
        if (err)  return res.status(200).json({error:'yes', message: 'Authentication failed. Invalid phone or password.' });

        if (!user || !user.comparePassword(req.body.current_password)) {
          return res.status(200).json({ error:'yes', message: 'current password is wrong' });
        }

        user.password=bcrypt.hashSync(req.body.new_password, 10);
        user.save();

        return res.status(200).json({error:'no' ,message:'password changed successfully'});
     });

}