import Link from "next/link"
import { useRouter } from "next/router"
import Share from "../../components/Share/Share"
import axios from "axios"
import { useState, useEffect } from "react"

import "../../styles/share.scss"

export default function SharePage({ share }) {
	const router = useRouter()

	const [haveButton, setHaveButton] = useState(false)

	useEffect(() => {
		if (
			window.history.length > 1 &&
			window.matchMedia("(display-mode: standalone)").matches
		) {
			setHaveButton(true)
		}
	}, [])

	function handleShareClick(event) {
		navigator.share({
			title: `${share.caption.substr(0, 42)}...`,
			text:
			share.caption,
			url: location.href,
		},
		{
		  // change this configurations to hide specific unnecessary icons
		  copy: true,
		  email: true,
		  print: false,
		  sms: true,
		  messenger: true,
		  facebook: true,
		  whatsapp: true,
		  twitter: true,
		  linkedin: true,
		  telegram: true,
		  skype: true,
		})
	}

	return (
		<>
			<main className="share-page--container">
				{!haveButton ? (
					""
				) : (
					<Link href="/">
						<a class="back-container">
							<div className="back">Back</div>
						</a>
					</Link>
				)}

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
				<div className="share-button" onClick={handleShareClick}>
					Share
				</div>
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
		if (
			ctx.query.id != "favicon.png" &&
			ctx.query.id != "favicon.ico" &&
			ctx.query.id != "manifest.json"
		) {
			const res = await axios.get(
				`http://${process.env.uri}/api/shares/${ctx.query.id}`,
			)
			return {
				share: res.data,
			}
		} else {
			return { share: {} }
		}
	} catch (err) {
		console.log(err)
		return { share: {} }
	}
}
