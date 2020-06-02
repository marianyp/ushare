import Head from "next/head"
import "../styles/main.scss"

export default function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>uShare — Share Posts Easily Over SMS Text & Social Media</title>
			</Head>
			<Component {...pageProps} />
		</>
	)
}
