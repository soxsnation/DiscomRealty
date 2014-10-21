/* Utils.js
 *
 * Author(s):  Andrew Brown
 * Date:       10/21/2014
 *
 */

var nodemailer = require('nodemailer');

exports.parse = function(req, callback) {
	console.log('exports.parse');
	console.log(req);
	// Create new empty buffer
	var buf = new Buffer('');

	// Concatenate data to buffer
	req.on('data', function(data) {
		buf = Buffer.concat([buf, data]);
	});

	// Parse object
	req.on('end', function(data) {
		var obj;
		try {
			obj = JSON.parse(buf);
		} catch (e) {
			callback({
				status_code: 400,
				message: 'Invalid JSON'
			}, null);
			return;
		}
		callback(null, JSON.parse(buf));
	});
}

function generateEmailMessage(data) {
	var currentdate = new Date();
	var message = 'Email from: ' + data.firstname + ' ' + data.lastname + "\n";
	message += 'Received at: ' + currentdate.toDateString() + "\n";
	message += 'Email Address: ' + data.email  + "\n";
	message += 'Phone: ' + data.phonenumber  + "\n";
	message += 'Comments: ' + data.comments  + "\n";
	return message;
}

function generateEmailSubject(data) {
	var subject = 'Email from ' + data.firstname + ' ' + data.lastname;
	return subject;
}

exports.sendMail = function(data, cb) {
	console.log('sendMail');
	var subject = generateEmailSubject(data);
	var message = generateEmailMessage(data);
	console.log(subject);
	console.log(message);
	var smtpTransport = nodemailer.createTransport("SMTP", {
		host: "smtp.gmail.com",
		secureConnection: false,
		port: 587,
		auth: {
			user: "discomrealtyemail@gmail.com",
			pass: "kvclWsbZK4PqPTeMv1Vo"
		}
	});

	var mailOptions = {
		from: "discomrealtyemail@gmail.com", // sender address
		to: "soxsnation@gmail.com", // list of receivers
		subject: subject, // Subject line
		text: message // plaintext body
		//html: "<b>Hello world</b>" // html body
	}

	smtpTransport.sendMail(mailOptions, function(error, response) {
		if (error) {
			console.log(error);
		} else {
			console.log("Message sent: " + response.message);
		}
	});

	smtpTransport.close();
	cb(true);
}