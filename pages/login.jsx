import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { signIn, getCsrfToken, getSession } from 'next-auth/react';
import { css, styled } from '@stitches/react';
import { AnimatePresence } from 'framer-motion';
import { VscGithub } from 'react-icons/vsc';
import Button from '../components/Button/index';
import Spacer from '../components/utils/Spacer';
import Error from '../components/Error/index';
import LabeledInput from '../components/Inputs/LabeledInput';

export default function Login({ csrfToken }) {
  const router = useRouter();
  const { error } = router.query;

  const [errorVisible, setErrorVisible] = React.useState(error);

  function Form() {
    const [userValue, setUserValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');

    const Form = css({
      width: '100%',
      padding: '0 15%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',

      '.form-title': {
        fontSize: '16px',
        fontWeight: '700',
        textAlign: 'center',
        color: '#464646',
      },

      '.input': {
        width: '100%',
        height: '40px',
        margin: '0 auto',

        '@media (min-width: 1024px)': {
          height: '60px',
          fontSize: '16px',
        },
      },

      '.form-btn': {
        width: '100%',
        height: '40px',

        '@media (min-width: 1024px)': {
          width: '50%',
          height: '60px',
        },
      },

      '.input-wrapper': {
        width: '100%',

        input: {
          height: '40px',
        },

        '@media (min-width: 1024px)': {
          width: '50%',

          input: {
            height: '60px',
          },
        },
      },
    });

    return (
      <>
        <form
          className={Form()}
          method="post"
          action="/api/auth/callback/credentials"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <p className="form-title">Iniciar Sessão</p>
          <Spacer responsive={3} />
          <div className="input-wrapper">
            <LabeledInput
              label="Escreva seu usuário"
              type="text"
              name="username"
              required
              inputValue={userValue}
              setInputValue={setUserValue}
            />
          </div>
          <Spacer responsive={3} />
          <div className="input-wrapper">
            <LabeledInput
              label="Escreva sua senha"
              type="password"
              name="password"
              required
              inputValue={passwordValue}
              setInputValue={setPasswordValue}
            />
          </div>

          <Spacer responsive={3} />
          <Button className="form-btn" color="primary" type="submit">
            Entrar
          </Button>
        </form>
      </>
    );
  }

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
        <Form />
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
        {errorVisible && (
          <Error
            queryError={error}
            state={errorVisible}
            setState={setErrorVisible}
            close
            key="error"
          />
        )}
      </AnimatePresence>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: '/' },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
