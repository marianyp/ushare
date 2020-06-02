export default function Media({ video, src }) {
    if (video == true) {
        return <video controls src={src}></video>
    } else {
        return <img src={src} />
    }
}