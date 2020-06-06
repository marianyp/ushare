import Head from "next/head"
import "../styles/main.scss"
import "normalize.css"
export default function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>uShare — Share Posts Easily Over Text & Social Media</title>
			</Head>
			<Component {...pageProps} />
		</>
	)
}
