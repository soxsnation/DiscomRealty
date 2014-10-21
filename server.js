/* server.js
 *
 * Author(s):  Andrew Brown
 * Date:       9/9/2014
 *
 */

var path = require('path');
var express = require('express');

var utils = require('./app/Utils');
var app = express();


// // TODO: I had to add this in to support CORS requests. I'm not sure this is the way to do this.
// app.use(function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
// 	res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
// 	res.header("Access-Control-Allow-Credentials", "true");
// 	next();
// });




app.use(express.cookieParser());
app.use(express.bodyParser());

app.post('/api/email', function(req, res, next) {
	console.log('/api/email');
	// utils.parse(req, function(err, data) {
	// 	if (err) {
	// 		console.log(err);
	// 		res.send(403);
	// 	} else {
		// var data = req.body;
		// 	var subject = 'Email from ' + data.firstname + ' ' + data.lastname;
		// 	var body = data.comments;
			utils.sendMail(req.body, function(sent) {
				if (sent) {
					res.send(200);
				} else {
					res.send(403);
				}
			});
	// 	}

	// });
})

app.use('/', express.static('./public'));
app.use('/', function(req, res, next) {
	res.sendfile(path.join(__dirname, 'public', 'index.html'));
});



app.listen(3086, function() {
	console.log('Server Ready [port 3085]')
});