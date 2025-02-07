import "./DownloadButton.scss"

export default function DownloadButton({handler, downloading}) {

	return (
		<div
			className={`download-btn ${downloading ? "downloading" : ""}`}
			onClick={handler}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
			>
				<path d="M17 13h6l-11 11-11-11h6v-13h10z" />
			</svg>
		</div>
	)
}
