// Look at user's badge count & js points
//Use node.js to connect to Treehouse's API and get necessary profile info
var https = require('https');
var http = require('http');

//Print message about user
function printMessage(username, badgeCount, points, topic){
  var message;
  if(topic){
    message = username + ' has ' + + badgeCount + ' total badge(s) and ' + points + ' points in ' + topic;
  }else{
    message = username + ' has ' + + badgeCount + ' total badge(s) and ' + points + ' total points';
  }
  console.log(message);
}


//Print error messages
function printError(error){
  console.error(error.message);
}

//Connect to API URL
function getProfile(topic,username){
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
          // console.log(profile);

          //check that the topic exists
          if(profile.points[topic]){
            printMessage(profile.name, profile.badges.length, profile.points[topic], topic);
          }else{
            // only print error on the first username passed
            once(printError({message: 'There was an error finding the topic ' + topic}));
            printMessage(profile.name, profile.badges.length, profile.points.total);
          }
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

var once = function(func){
  var counter = 0;
  var newFunc = function(){
    if(counter<1){
      func();
    }
      counter ++;
  }
  return newFunc;
}



module.exports.get = getProfile;