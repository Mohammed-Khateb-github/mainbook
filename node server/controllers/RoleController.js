const role = require('../module/role');

var mongoose = require('mongoose');
var Role = mongoose.model('Role');


exports.CreateRole = function(req,res,next){
   try{
    let role=new Role({
        name : req.body.name,
        description : req.body.description,
        permissions : req.body.permissions
    });
    role.save();
    return res.status(200).json({error:'no',message:'role created successfully',role:role});
   }catch(_){
    return res.status(200).json({error:'yes',message:'role not created '+_.message});

   }
};
exports.getRoles = async function(req,res,next){
   try{
    let roles= await Role.find();
     
    return res.status(200).json({error:'no',message:'roles readed successfully',roles:roles});
   }catch(_){
    return res.status(200).json({error:'yes',message:'roles not readed '+_.message});

   }
};
exports.removeRole = async function(req,res,next){
  
    Role.remove({_id:req.body.role_id},async function(err,successfully){
        if(err)
        return res.status(200).json({error:'yes',message:'roles not removed '+err.message});
        let roles= await Role.find();
        return res.status(200).json({error:'no',message:'roles removed successfully',roles:roles});
    });
 
};
exports.updateRole = async function(req,res,next){
   
    Role.findOne({_id:req.body._id},async function(err, role) {
        
        if (err)  return res.status(200).json({error:'yes', message:  'something went wrong' });

        if (!role )  return res.status(200).json({ error:'yes', message: 'something went wrong' });
       
        role.name=req.body.name;
        role.description=req.body.description;
        role.permissions=req.body.permissions;
        role.save();
        let roles= await Role.find();
        return res.status(200).json({error:'no' ,message:'role updated successfully',roles:roles});
     });

 
};

 

