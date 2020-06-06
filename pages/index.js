import ShareCreaterForm from "../components/ShareCreaterForm/ShareCreaterForm"

import "../styles/home.scss"

export default function Home() {
	return (
		<div className="container">
			<main>
				<header>
					<span>uShare</span>
				</header>

				<div className="main-content">
					<div className="ad-container"></div>
					<ShareCreaterForm />
					<div className="ad-container"></div>
				</div>

				<div className="info-container">
					<div className="ad-container"></div>
					<div className="content-a">
						<h2>What is uShare?</h2>
						<p>
							uShare is a free tool that helps you share and view
							posts from various social media platforms, through a
							uShare link or by downloading a photo of the post.
							If you'd like a clean and easy way to share posts
							with friends and family that don't use the same
							social media platforms that you use, uShare is for
							you.
						</p>
					</div>
					<div className="content-b">
						<h2>Why?</h2>
						<p>
							Sharing posts from social media can be a little
							awkward. You don't want your friends/family to
							experience ads and popups when viewing posts on the
							web. uShare also provides a seamless way to download
							photos/videos from your submitted post seamlessly.
						</p>
					</div>
					<div className="content-c">
						<h2>What platforms does uShare support?</h2>
						<p>
							uShare currently supports sharing public posts from
							Facebook, public posts from Instagram, and tweets
							from Twitter. If you'd like to see your favorite
							social media/platform made compatible with uShare,
							please{" "}
							<a
								href="mailto:marianywd@outlook.com"
								target="_blank"
							>
								send me a message
							</a>
							!
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
