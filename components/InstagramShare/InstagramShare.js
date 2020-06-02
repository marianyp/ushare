import { useState, useEffect, useRef } from "react"

import CarouselMedia from "../CarouselMedia/CarouselMedia"
import SimpleMedia from "../SimpleMedia/SimpleMedia"
import DownloadButton from "../DownloadButton/DownloadButton"

import DownloadUtil from '../DownloadButton/DownloadUtil'

import "./InstagramShare.scss"

export default function InstagramShare({
	shareData,
	id,
	showPosterInfo,
	showCaption,
}) {
	
	let shareElm = useRef()
	
	let basicDownload = !showPosterInfo && !showCaption
	
	const isCarousel = shareData.media_urls.length > 1

	let [downloading, setDownloading] = useState(false)

	const dwnldBtnClickHandler = () => {
		setDownloading(true)
	}

	useEffect(() => {
		DownloadUtil({downloading, setDownloading, basicDownload, shareData, shareElm})
	}, [downloading])

	return (
		<div className="share--container" ref={shareElm}>
			<div className={`share ${shareData.platform}`}>
				<DownloadButton
					handler={dwnldBtnClickHandler}
					downloading={downloading}
				/>
				<div
					className={`share--top ${showPosterInfo ? "" : "disabled"}`}
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
					<div className={`caption ${showCaption ? "" : "disabled"}`}>
						{shareData.caption}
					</div>
					{isCarousel ? (
						<CarouselMedia shareData={shareData} />
					) : (
						<SimpleMedia shareData={shareData} />
					)}
				</div>
			</div>
		</div>
	)
}
