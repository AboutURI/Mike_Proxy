const app = require('./server.js');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 6012;

// NEED TO KEEP HOST UNSPECIFIED TO RUN EXPRESS ON EC2
// const host = process.env.PRIVATE_HOST || 'localhost'

// const serverInstance = app.listen(port, host, () => {
//   console.log(`Listening at http://${host}:${port}`)
// });

const serverInstance = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
});

const closeServer = () => {
  serverInstance.close();
}

exports.closeServer = closeServer;