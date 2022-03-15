import globalStyles from "../styles/global"

function MyApp({ Component, pageProps }) {
  globalStyles();
  return <Component {...pageProps} />
}

export default MyApp
