import Head from "next/head"
import "../styles/main.scss"
export default function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<title>
					uShare — Share Posts Easily Over Text & Social Media
				</title>
			</Head>
			<Component {...pageProps} />
		</>
	)
}
