import Head from "next/head"

import "../styles/home.scss"
import ShareCreaterForm from "../components/ShareCreaterForm/ShareCreaterForm"

export default function Home() {
	return (
		<div className="container">
			<Head>
				<title>uShare</title>
				<link rel="icon" href="favicon.png" />
			</Head>

			<main>
				<header>
					<span>uShare</span>
				</header>

				<div className="main-content">
					<div className="ad-container">

					</div>
					<ShareCreaterForm />
					<div className="ad-container"></div>
				</div>

				<div className="info-container">
					<div className="ad-container"></div>
					<div className="content-a">
						<h2>What is uShare?</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Suscipit deleniti repellendus dolorem
							laboriosam modi quis. Soluta, sed ipsam pariatur
							unde eligendi ea hic dolor eius, minima doloremque,
							corrupti similique reiciendis sapiente illum ex
							tempora? Minus debitis eum quisquam rerum placeat
							sint possimus?
						</p>
					</div>
					<div className="content-b">
						<h2>What platforms does uShare support?</h2>
						<p>
							uShare currently support sharing public posts from
							Facebook, public posts from Instagram, and tweets from
							Twitter. If you'd like to see
							your favorite social media/platform made compatible
							with uShare, please <a href="mailto:marianywd@outlook.com" target="_blank">send me a message</a>!
						</p>
					</div>
					<div className="supported-platforms-container">
						<div className="media-container">
							<div className="viewport">
								<img
									src="/form_platforms/facebook.svg"
									alt=""
								/>
								<img
									src="/form_platforms/twitter.svg"
									className="focused"
									alt=""
								/>
								<img
									src="/form_platforms/instagram.svg"
									alt=""
								/>
							</div>
						</div>
						<div className="text-container">
							Supported Platforms
						</div>
					</div>
				</div>
			</main>

			<footer>© {new Date().getFullYear()} uShare</footer>
		</div>
	)
}
