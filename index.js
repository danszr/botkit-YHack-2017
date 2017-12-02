var Botkit = require('botkit');

var controller = Botkit.slackbot();
//Include Botkit into your Node application and boot up a controller that will define your bot's behaviors. In this case, we're setting up a bot for Slack.

//Set up a simple webserver so that Botkit can receive incoming messages via webhook.

controller.hears('hello','direct_mention,direct_message', function(bot, message) {
  bot.reply(message, {
    attachments:[
      {
        title: 'Hello! Please sign the <http://guilfordfreelibrary.org/wp-content/uploads/2017/08/MakeHaven-Guest-Waiver-and-Release.pdf| waiver> to get stated with MakeHaven!',
        callback_id:'123',
        attachment_type: 'default',
        actions: [
           {
              'name':'Done',
              'text': 'Done',
              'value': 'Done',
              'type': 'button',
           }
        ]
      }
    ]
  });
});

// receive an interactive message, and reply with a message that will replace the original
controller.on('interactive_message_callback', function(bot, message) {

    // check message.actions and message.callback_id to see what action to take...

    bot.replyInteractive(message, {
        text: '...',
        attachments: [
            {
                title: 'My buttons',
                callback_id: '123',
                attachment_type: 'default',
                actions: [
                    {
                        "name":"yes",
                        "text": "Yes!",
                        "value": "yes",
                        "type": "button",
                    },
                    {
                       "text": "No!",
                        "name": "no",
                        "value": "delete",
                        "style": "danger",
                        "type": "button",
                        "confirm": {
                          "title": "Are you sure?",
                          "text": "This will do something!",
                          "ok_text": "Yes",
                          "dismiss_text": "No"
                        }
                    }
                ]
            }
        ]
    });

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
