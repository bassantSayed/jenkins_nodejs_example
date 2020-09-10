const express = require('express')
const app = express()
const port = 3002
var redis = require('redis');
var client = redis.createClient(6379, 'redishost', {no_ready_check: true});
const password= process.env.PASSWORD
client.auth(password, function (err) {
    if (err) then throw err;
});

client.on('error', function (err) {
    console.log('Error ' + err);
}); 

client.on('connect', function() {
    console.log('Connected to Redis');
});

client.set("foo", "bar", redis.print);

client.get("foo", function (err, reply) {
    if (err) then throw err;
    console.log(reply.toString());
});
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
