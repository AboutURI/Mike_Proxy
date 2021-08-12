const shrinkRay = require('shrink-ray-current');
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
require('newrelic');

const serverOne = 'http://ec2-13-57-225-97.us-west-1.compute.amazonaws.com:3004/';
const nginx = 'http://ec2-54-219-150-232.us-west-1.compute.amazonaws.com/';

app.use(shrinkRay());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cors());

// app.use('/course', (req, res) => {
//   // console.log('In course route')
//   res.sendFile('index.html', {root: 'public'});
// });

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

// app.use('/', (req, res) => {
//   res.send('Hello World');
// })


// var express  = require('express');
// var app      = express();
// var httpProxy = require('http-proxy');
// var apiProxy = httpProxy.createProxyServer();
// var serverOne = 'http://localhost:4001',
//     ServerTwo = 'http://localhost:4002',
//     ServerThree = 'http://localhost:4003';
 
// app.all("/photogallery/", function(req, res) {
//     console.log('redirecting to Server1');
//     apiProxy.web(req, res, {target: serverOne, changeOrigin: true});
// });

// app.all("/overview/", function(req, res) {
//     console.log('redirecting to Server2');
//     apiProxy.web(req, res, {target: ServerTwo});
// });

// app.all("/reviews/", function(req, res) {
//     console.log('redirecting to Server3');
//     apiProxy.web(req, res, {target: ServerThree});
// });

// app.listen(4000);

module.exports = app;