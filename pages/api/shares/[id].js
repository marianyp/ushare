import Cors from "cors"
import Share from "../util/models/Share"

function deleteShareById(req, res) {
	const {
		query: { id },
	} = req

	Share.deleteOne({ _id: id }, (err, obj) => {
		if (obj.deletedCount) {
			res.status(202).send()
		} else {
			res.status(404).send()
		}
	})
}

function getShareById(req, res) {
	const {
		query: { id },
	} = req

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
			if (share) {
				res.status(202).send(share)
			} else if (err || !share) {
				res.status(404).send()
			}
		},
	)
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
	if (req.method === "DELETE") {
		// deleteShareById(req, res)
	} else if (req.method === "GET") {
		getShareById(req, res)
	} else if (req.method === "OPTIONS") {
		    return response.status(200).send('ok');
	}else {
		res.send({})
	}
}

// export const config = {
// 	api: {
// 	  externalResolver: true,
// 	},
// }