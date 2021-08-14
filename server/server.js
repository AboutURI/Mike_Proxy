const shrinkRay = require('shrink-ray-current');
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
const redis = require('redis');
require('newrelic');

// const serverOne = 'http://ec2-13-57-225-97.us-west-1.compute.amazonaws.com:3004/';
const nginx = 'http://ec2-54-219-150-232.us-west-1.compute.amazonaws.com/';
const REDIS_PORT = process.env.PORT || 6379;

app.use(shrinkRay());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cors());

app.use('/loaderio-a85629e90fe9bbed9f6eb457c09a1b34', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'loaderio-a85629e90fe9bbed9f6eb457c09a1b34.txt'));
});

//Create Cache
const client = redis.createClient(REDIS_PORT);

//Caching Function
function cache(req, res, next) {
  const { Id } = req.query.courseId;

  client.get(Id, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.send(data);
    } else {
      next();
    }
  });
}

app.all("/sidebar", function(req, res) {
  console.log('redirecting to Server1');
  apiProxy.web(req, res, {target: nginx, changeOrigin: true});
});

app.all("/price", function(req, res) {
  console.log('redirecting to Server1');
  apiProxy.web(req, res, {target: nginx, changeOrigin: true});
});

app.all("/previewVideo", function(req, res) {
  console.log('redirecting to Server1');
  apiProxy.web(req, res, {target: nginx, changeOrigin: true});
});

module.exports = app;