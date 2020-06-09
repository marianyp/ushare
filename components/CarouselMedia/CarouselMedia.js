import { useRef, useState, useEffect } from "react"
import Media from '../Media/Media'

export default function CarouselMedia({ shareData }) {
	let viewport = useRef()
	let carousel = useRef()

	let [currentSlide, setCurrentSlide] = useState(0)
	let [viewportWidth, setViewportWidth] = useState(0)

	useEffect(() => {
		let vw = window.getComputedStyle(viewport.current)["width"]
		vw = parseInt(vw.substr(0, vw.length - 2))
		setViewportWidth(vw)
	}, [])

	const forward = () => {
		setCurrentSlide(currentSlide + 1)

		document.querySelectorAll("video").forEach((vid) => {
			vid.pause()
			vid.currentTime = 0
		})

		if (currentSlide == shareData.media_urls.length - 1) {
			carousel.current.style.setProperty("--perspective", `0px`)
			setCurrentSlide(0)
		} else {
			let currentWidth =
				Math.abs(
					parseInt(
						carousel.current.style.getPropertyValue(
							"--perspective",
						),
					),
				) || 0

			carousel.current.style.setProperty(
				"--perspective",
				`${parseInt(currentWidth + viewportWidth)}px`,
			)
		}
	}
	const previous = () => {
		setCurrentSlide(currentSlide - 1)

		document.querySelectorAll("video").forEach((vid) => {
			vid.pause()
			vid.currentTime = 0
		})

		if (currentSlide == 0) {
			carousel.current.style.setProperty(
				"--perspective",
				`${viewportWidth * (shareData.media_urls.length - 1)}px`,
			)
			setCurrentSlide(shareData.media_urls.length - 1)
		} else {
			let currentWidth =
				Math.abs(
					parseInt(
						carousel.current.style.getPropertyValue(
							"--perspective",
						),
					),
				) || 0

			carousel.current.style.setProperty(
				"--perspective",
				`${parseInt(currentWidth - viewportWidth)}px`,
			)
		}
	}

	return (
		<div className="carousel-wrapper">
			<div className="prev" onClick={previous}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
				>
					<path d="M21 12l-18 12v-24z" />
				</svg>
			</div>
			<div className="carousel" ref={carousel}>
				<div className="viewport" ref={viewport}>
					{shareData.media_urls.map((media) => {
						return <Media src={media.url} video={media.video} />
					})}
				</div>
			</div>
			<div className="next" onClick={forward}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
				>
					<path d="M21 12l-18 12v-24z" />
				</svg>
			</div>
		</div>
	)
}
