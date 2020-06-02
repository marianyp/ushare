import Media from '../Media/Media'

export default function SimpleMedia({ shareData }) {
    return (
        <Media
            src={shareData.media_urls[0].url}
            video={shareData.media_urls[0].video}
        />
    )
}