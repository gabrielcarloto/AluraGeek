import React from 'react';
import { VscGithub } from 'react-icons/vsc';
import { AnimatePresence } from 'framer-motion';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getCsrfToken, getSession, signIn } from 'next-auth/react';

import Button from '@components/Button';
import Error from '@components/Error/index';
import Spacer from '@components/utils/Spacer';
import { css, styled } from '@styles/theme';

import { Form } from './Form';

export default function Login({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { error } = router.query as { error: string | undefined };

  const [errorVisible, setErrorVisible] = React.useState<string | undefined>(
    error,
  );

  const FormSection = css({
    height: '60vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '@media (min-width: 768px)': {
      height: '52vh',
    },
  });

  const ProvidersContainer = styled('div', {
    width: '100%',
    padding: '0 15%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    '.provider-btn': {
      width: '100%',
      height: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',

      '@media (min-width: 1024px)': {
        width: '50%',
        height: '60px',
      },
    },

    hr: {
      width: '100%',
      height: '1px',
      border: 'none',
      backgroundColor: '#a2a2a2',

      '@media (min-width: 1024px)': {
        width: '50%',
      },
    },
  });

  return (
    <>
      <Head>
        <title>Login | AluraGeek</title>
      </Head>

      <section className={FormSection()}>
        <Form csrfToken={csrfToken} />
        <Spacer responsive={3} />
        <ProvidersContainer>
          <hr />
          <Spacer responsive={3} />
          <Button
            className="provider-btn"
            color="secondary"
            onClick={() => signIn('github')}
          >
            <VscGithub /> Entrar com GitHub
          </Button>
        </ProvidersContainer>
      </section>

      <AnimatePresence>
        {errorVisible && error && (
          <Error
            queryError={error}
            setState={setErrorVisible}
            close
            key="error"
          />
        )}
      </AnimatePresence>
    </>
  );
}

interface Props {
  csrfToken: string | undefined;
}

interface Redirect {
  redirect?: { destination: string };
}

type ExtendedGetServerSidePropsReturn = GetServerSideProps<Props> & Redirect;

export const getServerSideProps: ExtendedGetServerSidePropsReturn = async (
  context,
) => {
  const session = await getSession({ req: context.req });

  if (session)
    return { redirect: { destination: '/' }, props: { csrfToken: undefined } };

  return {
    props: { csrfToken: await getCsrfToken(context) },
    redirect: undefined,
  };
};
