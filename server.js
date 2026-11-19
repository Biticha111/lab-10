const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const staticFileLocation = path.join(__dirname, 'public');
app.use(express.static(staticFileLocation));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/', indexRouter);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).render('error');
});

const server = app.listen(process.env.PORT || 3001, function() {
    console.log('Express server running on port', server.address().port);
});

module.exports = app;
