var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');

//a model for mongo
var Test = mongoose.model('Test', { message: String });

//to test if we can save to the db
var firstTest = new Test({message: 'Hello, world!'});
firstTest.save(function(err){
    if (err){
        console.log(err);
    }else{
        console.log('saved correctly');
    }
});

//setup to use body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//set the port
var port = process.env.PORT || 8080;

var router = express.Router(); //returns an instance of express router

//middleware to handle all requests
//router.use(function(){
//    console.log('Something is happening');
//    next();
//});


//just a test route
router.get('/', function(req, res){
    res.json({ message: 'this is a test' });
});

router.route('/tests')
    .post(function(req, res){
        console.dir(req.body);
        var test = new Test({ message: req.body.message });

        test.save(function(err){
            if (err){
                res.json({ message: 'error' });
            } else {
                console.log('test created');
                res.json({ message: 'test created' });
            }
        });
    })
    .get(function(req, res){
        Test.find(function(err, tests){
            if (err){
                res.send(err);
            } else {
                res.json(tests);
            }
        });
    });

router.route('/tests/:test_id')
    .get(function(req, res){

        Test.findById(req.params.test_id, function(err, test){
            if (err){
                res.send(err);
            } else {
                res.json(test);
            }
       }) 
    })
    .put(function(req, res){
        Test.findById(req.params.test_id, function(err, test){
            if (err){
                res.send(err);
            }  else {
                test.message = req.body.message;

                test.save(function(err){ 
                    if (err){
                        res.send(err);
                    } else {
                        res.json({ message: 'test updated' });
                    }
                });
            }
        })
    });

app.use('/api', router);

app.listen(port);
console.log('listening on port %s', port);
