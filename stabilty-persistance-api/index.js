const express = require('express');
const UnStable = require('./TheUnStable');
const Skill = require('./Skill');
const app = express();
const bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 8083;        // set our port

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/stability', {useNewUrlParser: true}); // connect to our database

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});


// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
  res.json({message: 'hooray! welcome to our api!'});
});

skills = undefined;
router.post('/instabilty', (request, response, next) => {
  const requestBody = request.body;
  const newInstablity = new UnStable(requestBody);
  newInstablity.save(err=> {
    if(err){
      next(err)
    } else{
      response.json(newInstablity)
    }
  });
});

router.get('/instabilty', (request, response, next) => {
   UnStable.find((err, result)=> {
     if(err){
       next(err)
     } else{
       response.json(result)
     }
   })
});

router.put('/instabilty', (request, response) => {
  response.json({message: 'hooray! you updated an instabilty!'})
});

router.delete('/instabilty', (request, response) => {
  response.json({message: 'hooray! you deleted an instabilty!'})
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
