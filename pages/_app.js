import Head from 'next/head'
import { Router } from 'next/dist/client/router';
import { SessionProvider, useSession } from "next-auth/react"
import { AnimatePresence, motion } from "framer-motion";
import NProgress from "nprogress";
import globalStyles from "../styles/global"
import Header from "../components/Header";
import Footer from "../components/Footer";
import Fill from "../components/utils/Fill";
import NotFound from "../components/NotFound";

NProgress.configure({
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});

Router.events.on('routeChangeError', () => {
  NProgress.done();
});

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
  const isSearch = (path) => path.includes('/search')

  globalStyles();
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content="https://alura-geek-mocha.vercel.app/" />
        <meta property="og:type" content="website" />
      </Head>
      
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
            key={isSearch(router.route) ? 'search' : Math.random()}
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
          key={Router.route}
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
          key={Router.route}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    )
  }

  window.location.href = '/'
  return <NotFound />
}