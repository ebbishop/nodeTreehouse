// Look at user's badge count & js points
//Use node.js to connect to Treehouse's API and get necessary profile info
var https = require('https');
var http = require('http');

//Print message about user
function printMessage(username, badgeCount, points){
  var message = username + ' has ' + + badgeCount + ' total badge(s) and ' + points + ' points in Javascript';
  console.log(message);
}


//Print error messages
function printError(error){
  console.error(error.message);
}

//Connect to API URL
function getProfile(username){
  var myHttp = 'https://teamtreehouse.com/' + username + '.json';
  var request = https.get(myHttp, function(response){
    var body = '';

    //Read data
    response.on('data', function(chunk){
      body += chunk;
    });

    response.on('end', function(){
      if(response.statusCode === 200){
        //Parse data
        try{
          var profile = JSON.parse(body);
          printMessage(username, profile.badges.length, profile.points.JavaScript);
        }catch(error){
          //Parse error
          printError(error);
        }
      }else{
        //Status code error (must be for http.STATUS_CODES, not https)
        printError({message: 'There was an error getting the profile for ' + username + '. (' + http.STATUS_CODES[response.statusCode] + ')'});
      }
    });
  });

  //Connection error
  request.on('error', printError);
}

module.exports.get = getProfile;