import Document, { Html, Head, Main, NextScript } from "next/document"

class MainDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html>
				<Head>
					<meta charset="UTF-8" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<link rel="icon" href="favicon.png" />
					<script
						data-ad-client="ca-pub-8212220074055385"
						async
						src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
					></script>
					<script
						defer
						src="https://unpkg.com/share-api-polyfill/dist/share-min.js"
					></script>
					<meta name="application-name" content="uShare" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta
						name="apple-mobile-web-app-status-bar-style"
						content="black-translucent"
					/>
					<meta name="apple-mobile-web-app-title" content="uShare" />
					<meta
						name="description"
						content="Share Posts Easily Over SMS Text & Social Media"
					/>
					<meta name="format-detection" content="telephone=no" />
					<meta name="mobile-web-app-capable" content="yes" />
					<meta
						name="msapplication-config"
						content="/static/icons/browserconfig.xml"
					/>
					<meta name="msapplication-TileColor" content="#f5f6fc" />
					<meta name="msapplication-tap-highlight" content="no" />
					<meta name="theme-color" content="#3559EA" />
					{/* <meta
						name="viewport"
						content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
					/> */}

					<link
						rel="apple-touch-icon"
						sizes="192x192"
						href="images/icons/icon-192x192.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="384x384"
						href="images/icons/icon-384x384.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="512x512"
						href="images/icons/icon-512x512.png"
					/>
					<link rel="manifest" href="/manifest.json" />
					<link
						rel="mask-icon"
						href="images/icons/icon-192x192.png"
						color="#f5f6fc"
					/>
					<link rel="shortcut icon" href="/favicon.png" />

					<meta name="twitter:card" content="summary" />
					<meta name="twitter:url" content="https://ushare.rocks" />
					<meta name="twitter:title" content="uShare" />
					<meta
						name="twitter:description"
						content="Share Posts Easily Over SMS Text & Social Media"
					/>
					<meta
						name="twitter:image"
						content="https://ushare.rocks/images/icons/icon-192x192.png"
					/>
					<meta name="twitter:creator" content="@marianywd" />
					<meta property="og:type" content="website" />
					<meta property="og:title" content="uShare" />
					<meta
						property="og:description"
						content="Share Posts Easily Over SMS Text & Social Media"
					/>
					<meta property="og:site_name" content="uShare" />
					<meta property="og:url" content="https://ushare.rocks" />
					<meta
						property="og:image"
						content="https://ushare.rocks/images/icons/icon-384x384.png"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MainDocument
