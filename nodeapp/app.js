const express = require('express')
var redis = require('redis');
const app = express()
const port = 3000
var output= 0
var client = redis.createClient(6379, 'redishost.service_discovery', {no_ready_check: true});

client.on('error', function (err) {
    console.log('Error ' + err);
}); 

client.on('connect', function() {
    console.log('Connected to Redis');
});

client.set("foo", "bar", redis.print);

client.get("foo", function (err, reply) {
    output = reply.toString();
});
app.get('/', (req, res) => {
    res.send('Hello World!\n'+ 'redis output ' + output)
  })
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })