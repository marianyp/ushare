require("dotenv").config()

const express = require("express")
const next = require('next')
const cors = require("cors")
const cookieParser = require('cookie-parser')
const cron = require('node-cron')
const moment = require('moment')

const Share = require('./backend/models/Share')

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()

// Port
const PORT = process.env.PORT || 3000

cron.schedule('0 12 * * 1', () => {
	const ageThreshold = 30 // Days

	const older_than = moment().subtract(ageThreshold, 'days').toDate()
	Share.deleteMany({ping: { $lte: -1 } }).then((deleted) => {
		console.log('Removed all shares who\'s ping equals to or is less than -1')
		console.log(deleted)
	})
	Share.find({ last_visit: { $lte: older_than }, ping: { $lte: 1 } }).update({$inc : {ping : -1}}).then(updated => {
		console.log(`Decremented all shares ping who\'s ping equals to or is less than 1 and is older than ${ageThreshold} days`)
		console.log(updated)
	})
});

app.prepare().then(() => {
	const server = express()

	// Middleware
	server.use(cors())
	server.use(express.json())
	server.use(express.urlencoded({ extended: false }))
	server.use(cookieParser())

	// Router 
	server.use('/shares', require('./backend/routes/shares'))

	server.all('*', (req, res) => {
		return handle(req, res)
	})

	server.listen(PORT, (err) => {	
		if(err) console.log(err)
		console.log("uShare Server Started..")
	})
}).catch(ex => {
	console.error(ex.stack)
	process.exit(1)
})







