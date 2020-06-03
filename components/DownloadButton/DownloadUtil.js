import htmltoimage from "html-to-image"
import { saveAs } from "file-saver"

export default function DownloadUtil({
	downloading,
	setDownloading,
	basicDownload,
	shareData,
	shareElm,
	excludeFirst = true,
}) {
	const id = shareData._id
	if (downloading && !basicDownload) {
		htmltoimage
			.toBlob(shareElm.current)
			.then(function (blob) {
				saveAs(blob, `${id}.png`)
			})
			.then(() => {
				const safeCheckA =
					shareData.media_urls.length > 1 ||
					shareData.media_urls[0].video
				if (safeCheckA || !excludeFirst) {
					shareData.media_urls.forEach((url, index) => {
						const safeCheckB =
							index != 0 ||
							(index == 0 && shareData.media_urls.length == 1)
						if (safeCheckB || !excludeFirst) {
							saveAs(
								url.url,
								`${id}-${index + 1}.${
									url.video ? "mp4" : "png"
								}`,
							)
						}
					})
				}
			})
			.then(() => {
				return setTimeout(() => {
					setDownloading(false)
				}, 1000)
			})

		return () => {
			setDownloading(false)
		}
	} else if (downloading && basicDownload) {
		shareData.media_urls.forEach((url, index) => {
			saveAs(url.url, `${id}-${index + 1}.${url.video ? "mp4" : "png"}`)
		})
		setTimeout(() => {
			setDownloading(false)
		}, 1000)
	}
}
