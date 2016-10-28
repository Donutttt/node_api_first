var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//setup to use body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//set the port
var port = process.env.PORT || 8080;

var router = express.Router(); //returns an instance of express router

//just a test route
router.get('/', function(req, res){
    res.json({ message: 'this is a test' });
});

app.use('/api', router);

app.listen(port);
console.log('listening on port %s', port);
