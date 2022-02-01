

module.exports = function(app) {
    
    var userController = require('../controllers/UserController.js');
    var roleController = require('../controllers/RoleController.js');
    // todoList Routes
   app.route('/profile').post(userController.loginRequired, userController.profile);
   app.route('/auth/register').post(userController.register);
   app.route('/auth/sign_in').post(userController.sign_in);
   app.route('/auth/Exit').post(userController.log_out);
   app.route('/auth/ChangePassword').post(userController.loginRequired,userController.ChangePassword);

   //role routes
   app.route('/role/create').post(userController.loginRequired,roleController.CreateRole); 
   app.route('/role/read').post(userController.loginRequired,roleController.getRoles); 
   app.route('/role/remove').post(userController.loginRequired,roleController.removeRole); 
   app.route('/role/update').post(userController.loginRequired,roleController.updateRole); 
  
   
};