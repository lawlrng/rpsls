var express = require('express'),
    logger = require('morgan'),
    favicon = require('static-favicon'),
    http = require('http'),
    path = require('path'),

    app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(favicon(path.join(__dirname, "/public/favicon.ico")));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) { res.render('index', {}); });

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
