import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { NextComponentType, NextPageContext } from 'next';
import type { AppProps as NextAppProps } from 'next/app';
import { Router } from 'next/dist/client/router';
import Head from 'next/head';
import type { Session } from 'next-auth';
import { SessionProvider, useSession } from 'next-auth/react';
import NProgress from 'nprogress';

import Footer from '@components/Footer';
import Header from '@components/Header';
import NotFound from '@components/NotFound';
import Fill from '@components/utils/Fill';
import globalStyles from '@styles/global';
import { isAdmin } from '@utils/admin';

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

interface Props {
  session: Session;
}

type MyAppProps = NextAppProps<Props> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: NextComponentType<NextPageContext, any, any> & { auth: boolean };
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: MyAppProps) {
  const isSearch = (path: string) => path.includes('/search');

  globalStyles();
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/meta_image.png" />
        <meta
          property="og:url"
          content="https://alura-geek-mocha.vercel.app/"
        />
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
  );
}

export default MyApp;

function Auth({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession({ required: true });
  const isUserAdmin = isAdmin(session);

  if (status === 'loading') {
    return (
      <AnimatePresence>
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={transitionVariants}
          key={(Router as any).route}
        >
          <Fill display="flex">
            <h1>Carregando...</h1>
          </Fill>
        </motion.div>
      </AnimatePresence>
    );
  } else if (isUserAdmin) {
    return (
      <AnimatePresence>
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={transitionVariants}
          key={(Router as any).route}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }

  window.location.href = '/';
  return <NotFound />;
}
