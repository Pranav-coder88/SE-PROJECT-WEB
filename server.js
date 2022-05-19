const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const app = express();


const JWT_SECRET = 'qwertymajicsparklefartsimsaporschelmdhgtpnordschlife'

app.use(express.json());

app.use(express.urlencoded({ extended: false }))



mongoose.connect('mongodb+srv://cropairse:cropairse@cluster0.zac4u.mongodb.net/CropAirDB?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});


// Routes

app.use(express.static(__dirname + '/public'))


app.post('/api/register', async (req, res) => {

	const { username, pwd } = await req.body


	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!pwd || typeof pwd !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (pwd.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(pwd, 10)


	try {
		const response = await User.create({
			username,
			password
		})

		console.log('User created successfully: ', response)


	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}

		throw error
	}


	// res.sendFile(__dirname + "/homePage.html")
	res.json({ status: 'ok' })

});

app.post('/api/login', async (req, res) => {
	const { username, pwd } = await req.body
	const user = await User.findOne({ username }).lean()


	console.log(pwd);


	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (bcrypt.compare(pwd, user.password)) {

		return res.json({ status: 'ok' })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})


app.get("/", function (req, res) {
	res.sendFile(__dirname + "/loginPage.html")
});


app.get("/homePage", function (req, res) {
	res.sendFile(__dirname + "/homePage.html")
});



app.get("/profilePage", function (req, res) {
	res.sendFile(__dirname + "/profilePage.html")
});

app.get("/newUserPage", function (req, res) {
	res.sendFile(__dirname + "/signupPage.html")
});

app.get("/upcomingTrips", function (req, res) {
	res.sendFile(__dirname + "/allUpcomingTripsPage.html")
});

app.get("/seatBooking", function (req, res) {
	res.sendFile(__dirname + "/seatBookingPage.html")
});



app.get("/generatedTicket", function (req, res) {
	res.sendFile(__dirname + "/generatedTicketPage.html")
});


app.post("/queryingForFlightList", async (req, res) => {


	const customer = await User.find({
		username: 'pranav'
	}).lean();

	// console.log(customer);

	if (customer.length > 0) {
		res.json({ status: 'ok', data: customer });

	}
	else {
		res.json({ status: 'error' })

	}

});

app.post("/flightInfoQR", async (req, res) => {


	const customer = await User.find({
		username: 'pranav'
	}).lean();

	// console.log(customer);

	if (customer.length > 0) {
		res.json({ status: 'ok', data: customer });

	}
	else {
		res.json({ status: 'error' })

	}

});

// app.post("/bookingSeat", async (req, res) => {
// 	var data = req.body.seatNumber

// 	const customer = await User.find({
// 		username: 'pranav'
// 	}).lean();

// 	console.log(customer);

// 	if (customer.length > 0) {
// 		User.updateOne({ customerName: 'pranav' }, { "upcomingFlights[0].$.seatNumber ": data }, (err) => {
// 			if (err) {
// 				console.log(err);
// 						}
// 			else {
// 				console.log('Success');
// 				res.json({ status: 'ok', data: customer })
// 			}




// 		})

// 	}
// });

let port = process.env.PORT;

if (port == null || port == "") {
	port = 4000;
}

app.listen(port, () => {
	console.log(`Server is running on port ${port}.`);
});