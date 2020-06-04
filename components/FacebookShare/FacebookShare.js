import { FacebookProvider, EmbeddedPost } from "react-facebook"
import { useEffect, useState } from "react"
export default function FacebookShare({
	shareData,
	id,
	showPosterInfo,
	showCaption,
}) {
	const [windowWidth, setWindowWidth] = useState(450)

	function maxWidth(size, max) {
		if (size >= max) {
			return max
		} else {
			return size
		}
	}

	useEffect(() => {
		setWindowWidth(maxWidth(window.innerWidth - 50, 450))

		const resizeHandler = () => {
			if (
				document
					.querySelector(".fb-post")
					.getAttribute("fb-xfbml-state") == "rendered"
			) {
				setWindowWidth(maxWidth(window.innerWidth - 50, 450))
			}
		}

		window.addEventListener("resize", resizeHandler)

		return () => {
			window.removeEventListener("resize", resizeHandler)
		}
	}, [])
	return (
		<div>
			<FacebookProvider appId="1829891627152010">
				<EmbeddedPost href={shareData.url} width={windowWidth} />
			</FacebookProvider>
		</div>
	)
}
