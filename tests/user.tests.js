var expect = require('chai').expect,
    supertest = require('supertest');

var Cookies;
var api = supertest('http://localhost:3000');
describe("Authenticate User",function(){  
  it('should reject user when using wrong access token', function (done) {
    var auth = {};
    auth['access_token'] = 'wrong_token';
    api.post("/users/authenticateGPlus")      
      .send(auth)
      .expect(401)
      .end(function(err, res){
        if(err) return done(err);  
        done();                          
      });    
  });
  
});