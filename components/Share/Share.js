import "./Share.scss"
import InstagramShare from "../InstagramShare/InstagramShare"
import TwitterShare from "../TwitterShare/TwitterShare"
import FacebookShare from "../FacebookShare/FacebookShare"

export default function Share({ shareData, id, showPosterInfo, showCaption }) {
	if (shareData.platform == "instagram") {
		return (
			<InstagramShare
				shareData={shareData}
				showPosterInfo={showPosterInfo}
				showCaption={showCaption}
				id={id}
			/>
		)
	} else if (shareData.platform == "twitter") {
		return (
			<TwitterShare
				shareData={shareData}
				showPosterInfo={showPosterInfo}
				showCaption={showCaption}
				id={id}
			/>
		)
	} else if (shareData.platform == "facebook") {
		return (
			<FacebookShare
				shareData={shareData}
				showPosterInfo={showPosterInfo}
				showCaption={showCaption}
				id={id}
			/>
		)
	} else {
		return <div>Not Found</div>
	}
}
