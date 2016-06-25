var request = require('request')
  , Slack
  ;
  
Slack = function(token){
  this.token = token;
}

Slack.prototype.sendMessage = function(to, msg){
  request({
    url : 'https://slack.com/api/chat.postMessage',
    method : 'GET',
    qs : {
      token : this.token,
      channel : to,
      text : msg,
      username : 'Bot',
      pretty : 1,
      icon_url : 'http://65.media.tumblr.com/0fe4e0e0b40bd5af68dddf9b6c184478/tumblr_nmxaifSY3s1rrcri6o1_500.jpg'
    }
  }, function(err, res, body){
    if(err) throw err;
  });
}

module.exports = Slack;