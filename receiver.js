var amqp = require('amqplib/callback_api');
var express = require('express');
var app = express();

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'messages';

    channel.assertQueue(queue, {
      durable: false
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(queue, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
    }, {
        noAck: true
      });
  });
});

app.listen(3000);
console.log("Server running at port 3000")
  
