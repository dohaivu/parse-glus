var https = require("https");
var Parse = require('parse').Parse;
var config = require('../config/config');
Parse.initialize(config.parse.appID, config.parse.javascriptKey);


exports.authenticateGPlus = function(req, res) {    
  var accessToken = req.body.access_token;  
  
  var request = https.get({
      method: 'GET',
      host: 'content.googleapis.com',
      port: 443,      
      path: '/plus/v1/people/me?key=AIzaSyAPnUx7aUuJmi7Rh-nOt3iZPZ6_ikw78Ks&access_token=' + accessToken,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    ,function(result){
      var buffer = '';
      result.setEncoding('utf8');
       
      result.on('data', function(chunk){
          buffer += chunk;
      });

      result.on('end', function(){
        var obj = JSON.parse(buffer); 
        if(obj.error !== undefined && obj.error !== null)
        {
          if(obj.error.code === 401) {
            res.json(401, {});
            return;
          }
        }           

        var query = new Parse.Query(Parse.User);
        query.equalTo('username', obj.id);
        query.first({
          success: function(user) {                  
            if(user === undefined) {
              var user = new Parse.User();
              user.set("username", obj.id);
              user.set("password", "password@123");
              user.set("email", obj.emails[0].value);
              user.set("provider", "gplus");
              user.set("display_name", obj.displayName);
              user.signUp(null, {
                success: function(user) {
                  console.log(user);
                  res.redirect('/home')
                },
                error: function(user, error) {
                  console.log(error);
                }
              });
            } else  {
              res.redirect('/home')
              // Parse.User.logIn(obj.id, "password@123", {
              //   success: function(user) {
              //     console.log(user);
              //   },
              //   error: function(user, error) {
              //     console.log(error);
              //   }
              // });
            }            
          },
          error: function(error) {                              
          }
        });            
      });      
    });
    
    // just in case of an error, prompting a message
    request.on('error', function(e){
        console.log(e);
        res.json(401, {});
    });
 
    request.end();

}