import ShareInfoGenerator from '../util/share-info-generator'
import Share from '../util/models/Share'
import url from "url"

async function createPost(req, res) {
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

	let platform

	// If valid, identify what platform the link is from
	switch (cleanUrl) {
		case "instagram.com":
			platform = "instagram";
			break;
		case "twitter.com":
			platform = "twitter";
			break;
		case "facebook.com":
			platform = "facebook";
			break;
		default:
			platform = "invalid";
			break;
	}
	
	// Run function that takes the platform name/id and the url provided and returns an object with the needed information
	const SIG = new ShareInfoGenerator(platform, submittedUrl)
	let data = await SIG.fetchInfo()
	if (!data.error) {
		Share.create(data, (err, share) => {
			if(err) {
				console.log(err)
				res.status(400).send({errorMsg: 'An internal server error occured'})
			} else {
				// Share created
				res.send(share)
			}
		})
	} else {
		res.status(400).send({errorMsg: data.error})
	}
}

async function getAllPosts(req, res) {
    Share.find({}, (err, shares) => {
		if(shares) {
			res.status(202).send(shares)
		} else if(err || !share) {
			res.status(404).send()
		}
	})
}

export default (req, res) => {
	res.setHeader('Content-Type', 'application/json')
    if(req.method === 'POST') {
		createPost(req, res)
    } else if (req.method == 'GET') {
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