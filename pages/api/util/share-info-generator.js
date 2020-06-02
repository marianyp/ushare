import "dotenv/config.js"

import axios from "axios"
import Twitter from "twitter-lite"
import url from "url"
import Share from "./models/Share"

class ShareExplorer {
	constructor(platform, _url) {
		this.platform = platform
		this._url = _url
		this.info = {}
	}

	async getInstagramData() {
		try {
			let response = await axios
			.get(`${this._url}`, {
				params: {
					__a: 1
				}
			})
			console.error(response.data)
			const entry = await response?.data?.graphql?.shortcode_media

			const singleOrSlide = (entry.edge_sidecar_to_children &&
				entry.edge_sidecar_to_children.edges) || [
				entry.is_video
					? { url: entry.video_url, video: true }
					: {
							url: entry.display_url,
							video: false,
					  },
			]

			this.info.url = this._url
			this.info.author = entry.owner.username
			this.info.media_urls =
				singleOrSlide.length !== 1
					? singleOrSlide.map((obj) => {
							if (obj.node.is_video != true) {
								return {
									url: obj.node.display_url,
									video: false,
								}
							} else {
								return {
									url: obj.node.video_url,
									video: true,
								}
							}
					  })
					: singleOrSlide
			try {
				this.info.caption =
					typeof singleOrSlide == Array
						? singleOrSlide.edges[0].node.text
						: entry.edge_media_to_caption.edges[0].node.text
			} catch {
				this.info.caption = ""
			}

			this.info.profile_picture = entry.owner.profile_pic_url
			this.info.platform = this.platform
		} catch(err) {
			console.log(err)
			this.info.error = "Invalid URL or Private Account"
		}
	}
	async getTwitterData() {
		// Strip tweet id from URL
		let tweetId = this._url.substring(this._url.lastIndexOf("/") + 1)
		if (tweetId.indexOf("?") != -1) {
			tweetId = tweetId.substring(0, tweetId.indexOf("?"))
		}

		const client = new Twitter({
			consumer_key: process.env.oauth_consumer_key,
			consumer_secret: process.env.oauth_token,
			access_token_key: process.env.oauth_nonce,
			access_token_secret: process.env.oauth_signature,
		})

		try {
			const data = await client.get("statuses/show", {
				id: tweetId,
				tweet_mode: "extended",
			})

			this.info.url = this._url
			this.info.author = data.user.screen_name
			if (data.extended_entities) {
				this.info.media_urls = data.extended_entities.media.map(
					(obj) => {
						return {
							url:
								obj.type == "video"
									? obj.video_info.variants.find(
											(video) =>
												video.content_type ==
												"video/mp4",
									  ).url
									: obj.media_url_https,
							video: obj.type == "video",
						}
					},
				)
			}

			this.info.caption = data.full_text
				.replace(/\\n/g, " ")
				.split(" ")
				.filter((word) => {
					let isMeta = false
					data.entities.urls.some((url) => {
						if (
							word == url.url &&
							url.expanded_url.includes(data.id_str)
						) {
							isMeta = true
							return
						}
					})

					if (data.quoted_status_permalink != undefined) {
						if (data.quoted_status_permalink.url == word)
							isMeta = true
					}

					if (data.entities.media) {
						const theObj = data.entities.media.find(
							(media) => media.url == word,
						)
						if (theObj != undefined) {
							if (
								theObj.expanded_url.includes(tweetId.toString())
							) {
								isMeta = true
							}
							isMeta = true
						}
					}

					return !isMeta
				})
				.join(" ")

			this.info.profile_picture = data.user.profile_image_url_https
			this.info.platform = this.platform
			if (data.quoted_status) {
				this.info.quote = data.quoted_status.full_text
					.replace(/\\n/g, " ")
					.split(" ")
					.filter((word) => {
						let isMeta = false
						data.quoted_status.entities.urls.some((url) => {
							if (
								word == url.url &&
								url.expanded_url.includes(
									data.quoted_status.id_str,
								)
							) {
								isMeta = true
								return
							}
						})

						const theObj = data.quoted_status.entities.media.find(
							(media) => media.url == word,
						)
						if (theObj != undefined) {
							if (
								theObj.expanded_url.includes(
									data.quoted_status.id_str,
								)
							)
								isMeta = true
						}

						return !isMeta
					})
					.join(" ")

				// this.info.quote = data.quoted_status.full_text
				this.info.quote_url = data.quoted_status_permalink.expanded
			}
		} catch (err) {
			console.log(err)
			this.info.error = "Invalid URL or Private Account"
		}
	}
	async getFacebookData() {
		this.info.platform = "facebook"
		// First check if the url is actually a post
		const exp = /^https:\/\/www\.facebook\.com\/(photo(\.php|s)|permalink\.php|media|questions|notes|[^\/]+\/(activity|posts))[\/?].*$/g
		let matches = this._url.match(exp)

		let isGlobal

		const parsedUrl = url.parse(this._url)
		const mobileUrl = `https://mobile.${parsedUrl.hostname}${
			parsedUrl.pathname.charAt(0) != "/" ? "/" : ""
		}${parsedUrl.pathname}`.replace("www.", "")

		console.log(mobileUrl)
		await axios
			.get(mobileUrl)
			.then((res) => {
				if (res.data.includes("Log into Facebook to see this post")) {
					isGlobal = false
				} else {
					isGlobal = true
				}
				console.log(isGlobal)
			})
			.catch((err) => {
				console.log(err)
				isGlobal = true
			})

		if (
			(matches != null && (await isGlobal)) ||
			(this._url.includes("photo?fbid") && (await isGlobal))
		) {
			this.info.url = this._url
		} else if (matches != null && (await isGlobal) == false) {
			this.info.error =
				"Sorry, this post is not global (only available to friends/group)"
		} else {
			this.info.error = "Invalid URL"
		}
	}
	async fetchInfo() {
		await Share.findOne({
			url: this._url,
		}).then((share, err) => {
			if (share != null) {
				this.info = share
			}
		}) // If the post has already been shared, set info to the already existing post

		if (Object.keys(await this.info).length !== 0) {
			return this.info
		} else if (this.platform === "instagram") {
			await this.getInstagramData()
		} else if (this.platform === "twitter") {
			await this.getTwitterData()
		} else if (this.platform === "facebook") {
			await this.getFacebookData()
		} else {
			this.info.error = "Invalid URL and/or Platform passed"
		}
		console.log(this.info)
		return this.info
	}
}

export default ShareExplorer
