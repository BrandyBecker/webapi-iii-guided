const express = require('express'); // importing a CommonJS module
const helmet = require('helmet'); // third-party middleware
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();
//----------------------------------------------------------------------------------
//the three amigos 🟩⬜🟥
function dateLogger(req,res,next){
  console.log(new Date().toISOString());
  next();
}
//-----------------------------------------------------------------------------------
//write a middleware function that logs the  HTTP method and the URL visited by the client
//should log to the console something that looks like this: GET / or GET /api/hubs
function urlLogger(req, res, next) {
  console.log(`${req.method}, ${req.url}`);
  next();
}


//global middleware - helmet!
server.use(helmet()); // third-party middleware
server.use(express.json()); // built-in middleware
server.use(dateLogger);//custom-built software
server.use(urlLogger); //custom-built software
//----------------------------------------------------------------------------------
server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
