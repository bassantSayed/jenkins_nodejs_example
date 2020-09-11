const express = require('express')
var redis = require('redis');
const app = express()
const port = 3001
var output= 0
var client = redis.createClient(6379, 'redishost.service_discovery', {no_ready_check: true});

client.on('error', function (err) {
    console.log('Error ' + err);
}); 

client.on('connect', function() {
    console.log('Connected to Redis');
});

client.set("env", "testing", redis.print);

client.get("env", function (err, reply) {
    output = reply.toString();
});
app.get('/', (req, res) => {
    res.send('Hello World from test!\n'+ 'redis output ' + output)
  })
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })