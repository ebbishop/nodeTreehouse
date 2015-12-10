// Look at user's badge count & js points
//Use node.js to connect to Treehouse's API and get necessary profile info
var https = require('https');
var username = 'emmabishop';
var myHttp = 'https://teamtreehouse.com/' + username + '.json';

function printMessage(username, badgeCount, points){
  var message = username + ' has ' + + badgeCount + ' total badge(s) and ' + points + ' points in Javascript';
  console.log(message);
}


//Connect to API URL
var request = https.get(myHttp, function(response){
  //Read data
  var body = '';


  response.on('data', function(chunk){
  	body += chunk;
  });
  response.on('end', function(){
  	console.log(body);
  })
  // console.log(response.statusCode);
  
  //Parse data
  //Print data

});


request.on('error', function(err){
  console.error(err.message);
});