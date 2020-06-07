import { useRef, useState, useEffect } from "react"
import unescape from "lodash/unescape"
import Linkify from "react-linkify"

import DownloadButton from "../DownloadButton/DownloadButton"
import DownloadUtil from "../DownloadButton/DownloadUtil"
import "./TwitterShare.scss"
import Media from "../Media/Media"

export default function TwitterShare({
	shareData,
	id,
	showPosterInfo,
	showCaption,
}) {
	let shareElm = useRef()

	let [downloading, setDownloading] = useState(false)
	const dwnldBtnClickHandler = () => {
		setDownloading(true)
	}
	useEffect(() => {
		DownloadUtil({
			basicDownload: false,
			excludeFirst: false,
			downloading,
			setDownloading,
			shareData,
			shareElm,
		})
	}, [downloading])

	return (
		<div className="share-margin">
			<div className="share--container" ref={shareElm}>
				<div className={`share ${shareData.platform}`}>
					<DownloadButton
						handler={dwnldBtnClickHandler}
						downloading={downloading}
					/>
					<div
						className={`share--top ${
							showPosterInfo ? "" : "disabled"
						}`}
					>
						<div>
							<img src={shareData.profile_picture} />
							<span>
								@
								<a href={shareData.url} target="_blank">
									{shareData.author}
								</a>
							</span>
						</div>
					</div>
					<div className="share--content">
						<div
							className={`caption ${
								showCaption ? "" : "disabled"
							}`}
						>
							<Linkify
								properties={{
									target: "_blank",
									style: { color: "#1b95e0" },
								}}
							>
								{unescape(shareData.caption)}
							</Linkify>
						</div>
					</div>
					{shareData.media_urls.length == 0 ? (
						""
					) : (
						<div className="share--media">
							<div className="container">
								{shareData.media_urls.map((media) => {
									return (
										<div
											onClick={() => {
												if (!media.video)
													window.open(media.url)
											}}
										>
											<Media
												id={Math.random()
													.toString(36)
													.substr(2, 5)}
												src={media.url}
												video={media.video}
											/>
										</div>
									)
								})}
							</div>
						</div>
					)}

					{shareData.quote ? (
						<div className="quote">
							<span>In Reply To:</span>
							<a href={shareData.quote_url} target="_blank">
								<div className="container">
									{unescape(shareData.quote)}
								</div>
							</a>
						</div>
					) : null}
				</div>
			</div>
		</div>
	)
}
