const express = require('express'); //grab express
const app = express();              //create an instance of express
const nunjucks = require('nunjucks');
// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment 
// instance, which we'll want to use to add Markdown support later.
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes');
const path = require('path');
const env = nunjucks.configure('views', {noCache: true});

app.set('view engine', 'html');
app.engine('html', nunjucks.render);


app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// app.use('/', (req, res, next) => {console.log("hi"); next();})
// app.get('/', (req, res, next) => {res.send();})

// have res.render work with html files
//app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
//app.engine('html', nunjucks.render);

app.listen(3005, () => console.log('server listening on 3005'));




