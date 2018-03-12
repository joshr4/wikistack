const express = require('express'); //grab express
const app = express();              //create an instance of express
const nunjucks = require('nunjucks');
// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment 
// instance, which we'll want to use to add Markdown support later.
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index');
const path = require('path');
const models = require('./models');
const env = nunjucks.configure('views', {noCache: true});


app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);



// app.use('/', (req, res, next) => {console.log("hi"); next();})
// app.get('/', (req, res, next) => {res.send();})

// have res.render work with html files
//app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
//app.engine('html', nunjucks.render);



//app.listen(3005, () => console.log('server listening on 3005'));
models.db.sync({force: false})
.then(function () {
    console.log('All tables created!');
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error.bind(console));



