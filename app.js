/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , http = require('http')
    , path = require('path');

var app = express();
var DB = require('db');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

app.get('/tongji', function (req, res) {
    var collection = new DB.Collection(DB.Client, 'tongji');

    collection.update({
        id: 'id_' + req.query.id
    }, {
        $inc: {
            value: 1
        }}, {upsert: true}, function (err, result) {
        res.json(result);
    });
});

app.get('/info', function (req, res) {
    var collection = new DB.Collection(DB.Client, 'tongji');

    collection.find({}).toArray(function (err, docs) {
        res.json({docs: docs, pid: process.pid});
    });
});
