import { AnimatePresence, motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import globalStyles from "../styles/global"

function MyApp({ Component, pageProps, router }) {
  globalStyles();
  return (
    <>
      <AnimatePresence
        exitBeforeEnter
      >
        { router.pathname !== "/login" ? <Header loginBtn key={router.route} /> : <Header key={router.route} /> }
      </AnimatePresence>
      <AnimatePresence
        exitBeforeEnter
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <motion.div 
          initial={{opacity: 0, x: 500}} 
          animate={{opacity: 1, x: 0}} 
          exit={{opacity: 0, x: -500}} 
          transition={{ duration: 0.3, ease: [0.46, 0.72, 0.37, 0.99] }}
          key={router.route}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default MyApp
