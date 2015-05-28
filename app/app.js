var express = require('express');
var app = express();
var truckRoutes = require('./routes/truckRoutes');
var bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());

app.use(express.static('public'));
app.use('/trucks', truckRoutes);

app.listen(3000, function () {
	console.log('server started on port 3000');
});
