var Botkit = require('botkit');

var controller = Botkit.slackbot();
//Include Botkit into your Node application and boot up a controller that will define your bot's behaviors. In this case, we're setting up a bot for Slack.

//Set up a simple webserver so that Botkit can receive incoming messages via webhook.

controller.hears('hello','direct_mention,direct_message', function(bot, message) {
  bot.reply(message, 'Hello! Please sign the <http://guilfordfreelibrary.org/wp-content/uploads/2017/08/MakeHaven-Guest-Waiver-and-Release.pdf| waiver> to get started with MakeHaven! Type \'Signed\' when done.');
});

controller.hears('signed','direct_mention,direct_message', function(bot, message) {
  bot.reply(message, 'Please watch the <https://www.youtube.com/watch?v=jzfBKj4DEHo| new member orientation video>. Type \'Done Watching \' when done.');
});

controller.hears('done watching','direct_mention,direct_message', function(bot, message) {
  bot.reply(message, 'Please schedule a to pickup your key');
});



var bot = controller.spawn({
  token:require('./config').token
});

bot.startRTM(function(err, bot, payload) {
  if(err) {
    console.log(err);
    throw new Error('Could not connect to slack!');
  }
});
