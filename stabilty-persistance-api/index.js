const express = require('express');
const unStable = require('./TheUnStable');
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

router.post('/instability', (request, response) => {
  response.json({message: `hooray! you created an ${JSON.stringify(request.body)}!`})
});

router.put('/instability', (request, response) => {
  response.json({message: 'hooray! you updated an instability!'})
});

router.delete('/instability', (request, response) => {
  response.json({message: 'hooray! you deleted an instability!'})
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
