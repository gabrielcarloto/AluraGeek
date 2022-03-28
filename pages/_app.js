import { useRouter } from "next/router";
import { SessionProvider, useSession } from "next-auth/react"
import { AnimatePresence, motion } from "framer-motion";
import globalStyles from "../styles/global"
import Header from "../components/Header";
import Footer from "../components/Footer";
import Fill from "../components/utils/Fill";
import NotFound from "../components/NotFound";

const transitionVariants = {
  initial: {
    opacity: 0,
    x: 500,
  },

  animate: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.3,
      ease: [0.46, 0.72, 0.37, 0.99],
    },
  },

  exit: {
    opacity: 0,
    x: -500,

    transition: {
      duration: 0.3,
      ease: [0.46, 0.72, 0.37, 0.99],
    },
  },
};

function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
  globalStyles();
  return (
    <>
      <SessionProvider session={session}>
        <Header />
        <AnimatePresence
          exitBeforeEnter
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <motion.div 
            initial="initial" 
            animate="animate"
            exit="exit" 
            variants={transitionVariants}
            key={router.route}
          >
            {Component.auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </motion.div>
        </AnimatePresence>
        <Footer />
      </SessionProvider>
    </>
  )
}

export default MyApp

function Auth({ children }) {
  const router = useRouter()
  const { data: session, status } = useSession({ required: true })
  const isAdmin = session 
                && session.user
                && session.user.name === 'Admin'
                && session.user.email === 'nevergonna@giveyou.up'

                
  if (status === 'loading') {
    return (
      <AnimatePresence>
        <motion.div 
          initial="initial" 
          animate="animate"
          exit="exit"
          variants={transitionVariants}
          key={router.route}
        >
          <Fill display="flex">
            <h1>Carregando...</h1>
          </Fill>
        </motion.div>
      </AnimatePresence>
    )
  } else if (isAdmin) {
    return (
      <AnimatePresence>
        <motion.div
          initial="initial" 
          animate="animate"
          exit="exit" 
          variants={transitionVariants}
          key={router.route}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    )
  }

  window.location.href = '/'
  return <NotFound />
}