const url = require("url")
const express = require("express")
const ShareInfoGenerator = require("../share-info-generator")
const Share = require("../models/Share")
const rateLimit = require('express-rate-limit')

const router = express.Router()

const incrementLimiter = rateLimit({
	windowMs: 0.5 * 60 * 1000, // 1 minute
	max: 4
  });
router.use('/:id', incrementLimiter)

router.get("/", (req, res) => {
	Share.find({}, (err, shares) => {
		if(shares) {
			res.status(202).send(shares)
		} else {
			res.sendStatus(404)
		}
	})
})

router.get("/:id", (req, res) => {
	const id = req.params.id
	
	Share.findOneAndUpdate(
		{ _id: id },
		{
			last_visit: Date.now(),
			$inc: {
				visits: 1,
			},
		},
		{ new: true },
		(err, share) => {
			if(share) {
				res.status(202).send(share)
			} else {
				res.sendStatus(404)
			}
		},
	)
})

router.post("/", async (req, res) => {
	let submittedUrl = req.body.url

	// Unify URLs
	submittedUrl = submittedUrl.replace("https://", "http://")
	submittedUrl = submittedUrl.replace("http://", "https://")

	// For instagram posts when copying on desktop and mobile
	submittedUrl = submittedUrl.replace("?utm_source=ig_web_copy_link", "")
	submittedUrl = submittedUrl.replace("?igshid=ztzcomhi4qtm", "")

	if(submittedUrl[submittedUrl.length - 1] == '/') {
		submittedUrl = submittedUrl.substring(0, submittedUrl.length - 1) // If the submitted url ends in '/' then remove it
	}
	if (url.parse(submittedUrl).hostname == null) {
		submittedUrl = submittedUrl.replace("www.", "")
		submittedUrl = "https://www." + submittedUrl
	}
	if (!submittedUrl.includes("www.")) {
		submittedUrl = submittedUrl.replace("https://", "https://www.")
	}

	let cleanUrl = url.parse(submittedUrl).hostname.replace("www.", "")

	console.log(cleanUrl)
	
	let platform

	// If valid, identify what platform the link is from
	switch (cleanUrl) {
		case "instagram.com":
			platform = "instagram"
			break
		case "twitter.com":
			platform = "twitter"
			break
		case "facebook.com":
			platform = "facebook"
			break
		default:
			platform = "invalid"
			break
	}
	
	console.log(submittedUrl)
	// Run function that takes the platform name/id and the url provided and returns an object with the needed information
	const SIG = new ShareInfoGenerator(platform, submittedUrl)
	let data = await SIG.fetchInfo()
	if (!data.error) {
		Share.create(data, (err, share) => {
			if(err) {
				console.log(err)
				res.status(400).send({errorMsg: 'An internal server error occured'})
			} else {
				res.send(share)
			}
		})
	} else {
		res.status(400).send({errorMsg: data.error})
	}
})

router.delete("/:id", (req, res) => {
	const id = req.params.id

	Share.deleteOne({ _id: id }, (err, obj) => {
		if(obj.deletedCount) {
			res.sendStatus(202)
		} else {
			res.sendStatus(404)
		}
	})
})

module.exports = router
