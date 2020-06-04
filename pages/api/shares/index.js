import url from "url"
import Cors from "cors"
import ShareInfoGenerator from "../util/share-info-generator"
import Share from "../util/models/Share"

async function createPost(req, res) {
	let submittedUrl = req.body.url

	// Unify URLs
	submittedUrl = submittedUrl.replace("https://", "http://")
	submittedUrl = submittedUrl.replace("http://", "https://")

	// For instagram posts when copying on desktop and mobile
	submittedUrl = submittedUrl.replace("?utm_source=ig_web_copy_link", "")
	submittedUrl = submittedUrl.replace("?igshid=ztzcomhi4qtm", "")

	if (submittedUrl[submittedUrl.length - 1] == "/") {
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

	// Run function that takes the platform name/id and the url provided and returns an object with the needed information
	const SIG = new ShareInfoGenerator(platform, submittedUrl)
	let data = await SIG.fetchInfo()
	if (!data.error) {
		Share.create(data, (err, share) => {
			if (err) {
				console.log(err)
				res.status(400).send({
					errorMsg: "An internal server error occured",
				})
			} else {
				// Share created
				res.send(share)
			}
		})
	} else {
		res.status(400).send({ errorMsg: data.error, res: data.response })
	}
}

async function getAllPosts(req, res) {
	Share.find({}, (err, shares) => {
		if (shares) {
			res.status(202).send(shares)
		} else if (err || !share) {
			res.status(404).send()
		}
	})
}

// Initializing the cors middleware
const cors = Cors({
	methods: ["GET", "HEAD"],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result) => {
			if (result instanceof Error) {
				return reject(result)
			}

			return resolve(result)
		})
	})
}

export default async (req, res) => {
	await runMiddleware(req, res, cors)
	res.setHeader("Content-Type", "application/json")
	if (req.method === "POST") {
		createPost(req, res)
	} else if (req.method == "GET") {
		getAllPosts(req, res)
	} else {
		res.send({})
	}
}

// export const config = {
// 	api: {
// 	  externalResolver: true,
// 	},
// }
