var async = require('async');

module.exports = function(app) {
  //User Routes
  var userCtrl = require('../app/userCtrl');
  

  app.get('/home', function(req, res) {    
    res.render('home');
  });
  
  app.get('/index', function(req, res) {    
    res.render('index', {        
      // user: req.user ? JSON.stringify(req.user) : "null"
    });
  }); 

  app.post('/users/authenticateGPlus', userCtrl.authenticateGPlus);   
};
