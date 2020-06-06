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

async function getShareById(req, res) {
	const {
		query: { id },
	} = req

	try {
		let share = await Share.findOneAndUpdate(
			{ _id: id },
			{
				last_visit: Date.now(),
				$inc: {
					visits: 1,
				},
			},
			{ new: true },
		)

		if (share) {
			return res.status(202).send(share)
		} else {
			return res.status(404).send() 
		}
	} catch (err) {
		return res.status(500).send()
	}
}

export default async (req, res) => {
	res.setHeader("Content-Type", "application/json")
	if (req.method === "GET") {
		return getShareById(req, res)
	} else if (req.method === "OPTIONS") {
		return res.status(200).send("ok")
	} else {
		return res.send({})
	}
}
