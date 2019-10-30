const express = require('express'); // importing a CommonJS module
const helmet = require('helmet'); // third-party middleware
const morgan = require('morgan'); //third-party middleware

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();
//----------------------------------------------------------------------------------
//the three amigos 🟩⬜🟥
//## CUSTOM DATE LOGGER MIDDLEWARE
function dateLogger(req,res,next){
  console.log(new Date().toISOString());
  next();
}
//-----------------------------------------------------------------------------------
//##CUSTOM URLLOGGER MIDDLEWARE
//write a middleware function that logs the  HTTP method and the URL visited by the client
//should log to the console something that looks like this: GET / or GET /api/hubs
// function urlLogger(req, res, next) {
//   console.log(`[${new Date().toISOString()}] ${req.method}, ${req.url}`);
//   next();
// }
//-----------------------------------------------------------------------------------
//CUSTOM PASSWORD=MEOW HEADER MIDDLEWARE
// NEED password to enter, password = meow 
// function gateKeeper(req,res,next){
//   //data can come in the body, url parameters,  query string, headers
//   //new way of reading data sent by client
//   const password = req.headers.password || '';

//   if(password.toLowerCase() === 'meow'){
//     next();
//   } else {
//     res.status(400).json({you: 'cannot pass!!'})
//   }
// }
//--------------------------------------------------------------------------------------
// change the gatekeeper to return a 400 if no password is provided and a message
// that says please provide a password
// if a password is provided and it is mellon, call next, otherwise return a 401
// and the you shall not pass message

function gateKeeper(req,res,next){
  const password = req.headers.password

  password 
  ? 
  password.toLowerCase() === 'mellon' 
  ? 
  next() 
  : 
  res.status(400).json({you: 'cannot pass!!'}) 
  : 
  res.status(401).json({message: 'you need to enter a password!!'})

}

//-------------------------------------------------------------------------------------

//## GLOBAL MIDDLEWARE =============================================================
server.use(gateKeeper); //password has to be 'mellon' to pass. empty string or anything else throws an error
server.use(helmet()); // third-party security middleware
server.use(morgan('dev')); //third-party method/url/time/status logger middleware

server.use(express.json()); // built-in middleware
server.use(dateLogger);//custom-built date logger software
// server.use(urlLogger); //custom-built method/url logger software
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
