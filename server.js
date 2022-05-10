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



	res.json({ status: 'ok' })

});

app.post('/api/login', async (req, res) => {
	const { username, password } = await req.body
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	console.log("before if");

	if (bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })
	}


	console.log('after if');
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


// Routes


// Data Base Stuff




const endUserSchema = new mongoose.Schema({
	bio: {
		first_name: String,
		last_name: String,
		email_id: String,
		pwd: String
	},

	upcomingTrips: [{
		flightNumber: String,
		startingPoint: String,
		destination: String,
		takeoffTime: String,
		landingTime: String,
		seatNumber: String,
		additionalCharges: String

	}],

})


const endUser = mongoose.model('endUser', endUserSchema);

// const timBob = new endUser({
//     bio : { first_name : 'Tim', last_name : 'Bob' , email_id : 'timBob@test.com' , pwd : 'dummy'} , 
//     upcomingTrips : [{flightNumber : '6E 489' , startingPoint : 'SAN' , endingPoint : 'JFK' , takeofftime : '10:00 AM' , landingTime : '5:00 PM' , seatNumber : '5A' , additionalCharges : 'False'} ],
// })

// timBob.save();

// Data Base Stuff


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});