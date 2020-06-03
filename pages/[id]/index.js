import Link from "next/link"
import { useRouter } from "next/router"
import Share from "../../components/Share/Share"
import axios from "axios"

import "../../styles/share.scss"
export default function SharePage({ share }) {
	const router = useRouter()

	return (
		<>
			<main className="share-page--container">
				{Object.keys(share).length > 0 && (
					<Share
						shareData={share}
						id={router.query.id}
						showPosterInfo={Boolean(
							parseInt(
								router.query.pi != undefined
									? router.query.pi
									: 1,
							),
						)}
						showCaption={Boolean(
							parseInt(
								router.query.sc != undefined
									? router.query.sc
									: 1,
							),
						)}
					/>
				)}
				{Object.keys(share).length == 0 && (
					<div className="err">
						<span>Sorry</span>
						Post Not Found
					</div>
				)}
			</main>

			<Link href="/">
				<a>
					<footer>
						<span>brought to you by</span>
						<span>uShare</span>
					</footer>
				</a>
			</Link>
		</>
	)
}

SharePage.getInitialProps = async (ctx) => {
	try {
		if (ctx.query.id != "favicon.png" && ctx.query.id != "favicon.ico") {
			const res = await axios.get(
				`http://${process.env.uri}/api/shares/${ctx.query.id}`,
			)
			if (res.data.platform === "instagram") {
				let info = {}

				await axios.get(`${res.data.url}/?__a=1`).then((instaRes) => {
					const entry = instaRes?.data?.graphql?.shortcode_media

					const singleOrSlide = (entry.edge_sidecar_to_children &&
						entry.edge_sidecar_to_children.edges) || [
						entry.is_video
							? { url: entry.video_url, video: true }
							: {
									url: entry.display_url,
									video: false,
							  },
					]

					info.url = res.data.url
					info.author = entry.owner.username
					info.media_urls =
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
						info.caption =
							typeof singleOrSlide == Array
								? singleOrSlide.edges[0].node.text
								: entry.edge_media_to_caption.edges[0].node.text
					} catch {
						info.caption = ""
					}

					info.profile_picture = entry.owner.profile_pic_url
					info.platform = res.data.platform
				}).catch(err => {
					info.error = "Invalid URL or Private Account"
				})

				return {share: await info}
			} else {
				return {
					share: res.data,
				}
			}
		} else {
			return { share: {} }
		}
	} catch (err) {
		console.log(err)
		return { share: {} }
	}
}
