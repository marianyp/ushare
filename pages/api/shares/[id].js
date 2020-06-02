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

export default (req, res) => {
	res.setHeader("Content-Type", "application/json")
	if (req.method === "DELETE") {
		deleteShareById(req, res)
	} else if (req.method == "GET") {
		getShareById(req, res)
	} else {
		res.send({})
	}
}

// export const config = {
// 	api: {
// 	  externalResolver: true,
// 	},
// }