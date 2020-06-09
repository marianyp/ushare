import "./ShareCreaterForm.scss"
import { useState, useRef, useEffect } from "react"
import axios from "axios"
import isEqual from "lodash.isequal"

export default function ShareCreaterForm() {
	let [canPaste, setCanPaste] = useState(false)

	const [platform, setPlatform] = useState("unknown")

	const defMsg = "Enter post URL:"
	const [statusMsg, setStatusMsg] = useState(defMsg)
	const [isError, setIsError] = useState(false)

	const [prevAttempt, setPrevAttempt] = useState({})
	const [lastUrl, setLastUrl] = useState("")

	const [inPWA, setInPWA] = useState(false)
	const [presetUrl, setPresetUrl] = useState()

	const pasteRef = useRef()
	const inputRef = useRef()
	const posterDetailsRef = useRef()
	const originalCaptionRef = useRef()
	const buttonRef = useRef()

	const platforms = {
		unknown: "/form_platforms/unknown.svg",
		instagram: "/form_platforms/instagram.svg",
		twitter: "/form_platforms/twitter.svg",
		facebook: "/form_platforms/facebook.svg",
	}

	useEffect(() => {
		var parsedUrl = new URL(window.location.toString())
		setPresetUrl(parsedUrl.searchParams.get("url"))

		setCanPaste(Boolean(navigator && navigator.clipboard.readText))

		if (window.matchMedia("(display-mode: standalone)").matches) {
			setInPWA(true)
		} else {
			setInPWA(false)
		}
	}, [])

	const identifyPlatform = (url) => {
		if (url == "") return "unknown"

		let thePlatform = "unknown"
		switch (url != "") {
			case Array.from([
				url.match(/^((http|https):\/\/)?(www.)?instagram.com/g),
			])
				.flat()
				.filter((item) => item != null).length == 1:
				thePlatform = "instagram"
				break
			case Array.from([
				url.match(/^((http|https):\/\/)?(www.)?twitter.com/g),
			])
				.flat()
				.filter((item) => item != null).length == 1:
				thePlatform = "twitter"
				break
			case Array.from([
				url.match(/^((http|https):\/\/)?(www.)?facebook.com/g),
			])
				.flat()
				.filter((item) => item != null).length == 1:
				thePlatform = "facebook"
				break
			default:
				thePlatform = "unknown"
				break
		}

		return thePlatform
	}

	useEffect(() => {
		setPlatform(identifyPlatform(inputRef.current.value || ""))
	}, [])

	const handlePaste = (event) => {
		navigator.clipboard.readText().then((clipText) => {
			inputRef.current.value = clipText
			setPlatform(identifyPlatform(clipText || ""))
		})
	}

	const handleSubmit = async (event) => {
		if (
			inputRef.current.value != "" &&
			!isEqual(prevAttempt, {
				input: inputRef.current.value,
				posterDetails: posterDetailsRef.current.checked,
				originalCaption: originalCaptionRef.current.checked,
			})
		) {
			setPrevAttempt({
				input: inputRef.current.value,
				posterDetails: posterDetailsRef.current.checked,
				originalCaption: originalCaptionRef.current.checked,
			})
			if (platform == "instagram") {
				let cleanURL = inputRef.current.value
				cleanURL = cleanURL.replace(
					"?utm_source=ig_web_copy_link",
					"",
				)
				cleanURL = cleanURL.replace("?igshid=ztzcomhi4qtm", "")
				let instaResp = await axios.get(
					`${new URL(cleanURL)}?__a=1`,
				)

				axios
					.post("api/shares", {
						url: inputRef.current.value,
						data: instaResp.data,
					})
					.then((res) => {
						setIsError(false)
						setLastUrl(
							`/${res.data._id}${
								!posterDetailsRef.current.checked ||
								!originalCaptionRef.current.checked
									? "?"
									: ""
							}${
								!posterDetailsRef.current.checked ? "pi=0&" : ""
							}${
								!originalCaptionRef.current.checked
									? "sc=0/"
									: ""
							}`,
						)
						window.open(
							`/${res.data._id}${
								!posterDetailsRef.current.checked ||
								!originalCaptionRef.current.checked
									? "?"
									: ""
							}${
								!posterDetailsRef.current.checked ? "pi=0&" : ""
							}${
								!originalCaptionRef.current.checked
									? "sc=0/"
									: ""
							}`,
							inPWA ? "_self" : "blank",
						)
					})
					.catch((err) => {
						setLastUrl("")
						setStatusMsg(
							err.response.data.errorMsg ?? "Error Occured",
						)
						setIsError(true)
					})
			} else {
				axios
					.post("api/shares", {
						url: inputRef.current.value,
					})
					.then((res) => {
						setIsError(false)
						setLastUrl(
							`/${res.data._id}${
								!posterDetailsRef.current.checked ||
								!originalCaptionRef.current.checked
									? "?"
									: ""
							}${
								!posterDetailsRef.current.checked ? "pi=0&" : ""
							}${
								!originalCaptionRef.current.checked
									? "sc=0/"
									: ""
							}`,
						)
						window.open(
							`/${res.data._id}${
								!posterDetailsRef.current.checked ||
								!originalCaptionRef.current.checked
									? "?"
									: ""
							}${
								!posterDetailsRef.current.checked ? "pi=0&" : ""
							}${
								!originalCaptionRef.current.checked
									? "sc=0/"
									: ""
							}`,
							inPWA ? "_self" : "blank",
						)
					})
					.catch((err) => {
						setLastUrl("")
						setStatusMsg(
							err.response.data.errorMsg ?? "Error Occured",
						)
						setIsError(true)
					})
			}
		} else if (lastUrl) {
			window.open(lastUrl, inPWA ? "_self" : "blank")
		}
	}

	const handleInputChange = (event) => {
		console.log(identifyPlatform(event.target.value))
		setPlatform(identifyPlatform(event.target.value))
	}

	return (
		<div className="form">
			<div className="platform">
				{platform != "unknown" ? platform : ""}
			</div>
			<div className="form-main">
				<div className="platform-logo-container">
					<div className="platform-logo">
						<img src={platforms[platform]} alt="" />
					</div>
				</div>
				<div className="input-container">
					<div className="wrapper">
						<div>
							<span
								className={`status ${isError ? "error" : ""}`}
							>
								{isError ? statusMsg : defMsg}
							</span>
							{canPaste ? (
								<span ref={pasteRef} onClick={handlePaste}>
									Paste
								</span>
							) : (
								<span></span>
							)}
						</div>
						<input
							type="text"
							ref={inputRef}
							onChange={handleInputChange}
							defaultValue={presetUrl}
						/>
					</div>
					<div className="options-container">
						<div>
							<input
								defaultChecked
								type="checkbox"
								ref={posterDetailsRef}
							/>
							<label>Include poster's details</label>
						</div>
						<div>
							<input
								defaultChecked
								type="checkbox"
								ref={originalCaptionRef}
							/>
							<label>Include post's original caption</label>
						</div>
					</div>
				</div>
				<div className="button-container">
					<button ref={buttonRef} onClick={handleSubmit}>
						Share Post
					</button>
				</div>
			</div>
		</div>
	)
}
