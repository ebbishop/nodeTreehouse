var profile = require('./profile.js');
var input = require('./input.js');

var pointsIn = input.capFirst(process.argv[2]);
var users = process.argv.slice(3);


users.forEach(function(userName,index,array){
	profile.get(pointsIn, userName);
});


