import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
import { signIn, getCsrfToken, getSession } from "next-auth/react";
import { css, styled } from '@stitches/react';
import { motion, AnimatePresence } from 'framer-motion';
import { VscGithub } from 'react-icons/vsc';
import { MdClose } from 'react-icons/md';
import Input from '../components/Inputs/Input';
import Button from '../components/Button/index';
import Spacer from '../components/utils/Spacer';
import FloatLabel from '../components/Inputs/FloatLabel';

export default function Login({ csrfToken }) {
  const router = useRouter();
  const { error } = router.query;  

  const [errorModal, setErrorModal] = React.useState(error);

  function Form() {
    const [userValue, setUserValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');
    const userLabelBg = React.useRef(null);
    const passwordLabelBg = React.useRef(null);

    function toggleClass(element, name) {
      element.current.classList.toggle(name);
    }

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

      [`.${FloatLabel.className}`]: {
        width: '100%',

        '@media (min-width: 1024px)': {
          width: '50%',
        },

        '.label-background': {
          backgroundColor: 'transparent', 
          marginBottom: '0px', 
        },

        '.focus': {
          boxShadow: 'none',
        },

        'label': {
          fontSize: '12px',
          transform: 'translate(22px, 12px) scale(1.2)',
          
          '&.active': {
            color: '#464646',
            fontWeight: '500',
            background: 'linear-gradient(#F5F5F5, #FFFFFF)',
            transform: 'translate(22px, 10px) scale(1.2)',
          },

          '@media (min-width: 1024px)': {
            fontSize: '14px',
            transform: 'translate(23px, 22px) scale(1.2)',
          },
        },
      },
    });

    return (
      <>
        <form className={Form()} method="post" action="/api/auth/callback/credentials">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <p className="form-title">
            Iniciar Sessão
          </p>
          <Spacer responsive={3} />
          <div className={FloatLabel()}>
            <div 
              className={'label-background focus' + (userValue == '' ? '' : ' active')}
              ref={userLabelBg}
            />
            <Input
              className="form-user input"
              id="username"
              name="username"
              type="text"
              required
              label="true"
              onChange={event => setUserValue(event.target.value)}
              onFocus={() => toggleClass(userLabelBg, 'focus')}
              onBlur={() => toggleClass(userLabelBg, 'focus')}
            />
            <label 
              className={'user-label' + (userValue !== '' ? ' active' : '')}
              htmlFor="user"
            >
              Escreva seu usuário
            </label>
          </div>
          <Spacer responsive={3} />
          <div className={FloatLabel()}>
            <div
              className={'label-background focus' + (passwordValue == '' ? '' : ' active')}
              ref={passwordLabelBg}
            />
            <Input
              className="form-password input"
              id="password"
              name="password"
              type="password"
              required
              label="true"
              onChange={event => setPasswordValue(event.target.value)}
              onFocus={() => toggleClass(passwordLabelBg, 'focus')}
              onBlur={() => toggleClass(passwordLabelBg, 'focus')}
            />
            <label
              className={'password-label' + (passwordValue !== '' ? ' active' : '')}
              htmlFor="password"
            >
              Escreva sua senha
            </label>
          </div>
          <Spacer responsive={3} />
          <Button 
            className="form-btn"
            color="primary"
            type="submit"
            disabled={userValue === '' || passwordValue === ''}
          >
            Entrar
          </Button>
        </form>
      </>
    );
  };

  function ErrorModal() {
    function toggleModal() {
      setErrorModal(!errorModal);
    }

    const ErrorModal = css({
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',

      '.modal-content': {
        width: '70%',
        height: '200px',
        position: 'relative',
        backgroundColor: '$error',
        color: '$white',

        '@media (min-width: 1024px)': {
          width: '30%',
        },

        '.modal-header': {
          width: '100%',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          '@media (min-width: 1024px)': {
            height: '60px',
          },

          '.modal-title': {
            fontSize: '22px',
            fontWeight: '700',

            '@media (min-width: 1024px)': {
              fontSize: '32px',
            },
          },

          '.modal-close': {
            position: 'absolute',
            top: '0',
            right: '0',
            margin: '12px',
            width: '25px',
            height: '25px',
            cursor: 'pointer',
            backgroundColor: 'transparent',

            '@media (min-width: 1024px)': {
              margin: '15px',
            },

            '&:focus-visible': {
              outline: '2px solid #000',
            },
          },
        },

        '.modal-body': {
          width: '100%',
          height: '150px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          '@media (min-width: 1024px)': {
            height: '140px',
          },

          '.modal-text': {
            fontSize: '16px',
            fontWeight: '500',
            marginBottom: '40px',
            
            '@media (min-width: 1024px)': {
              fontSize: '18px',
            },
          },
        },
      },
    });

    return (
      <>
        <motion.div 
          className={ErrorModal()}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
          }}
          key="error-modal"
        >
          <motion.div 
            className="modal-content"
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 100,
              scale: 0.9,
            }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <div className="modal-header">
              <h2 className="modal-title">
                Erro
              </h2>
              <MdClose
                className="modal-close"
                id="modal-close"
                tabIndex={0}
                onClick={toggleModal}
              />
              <label className="scr-only" htmlFor="modal-close">
                Fechar
              </label>
            </div>
            <div className="modal-body">
              <p className="modal-text">
                { error === 'CredentialsSignin' ? 'Usuário ou senha inválidos.' : error }
              </p>
            </div>
          </motion.div>
        </motion.div>
      </>
    );
  };

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

    'hr': {
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
        <title>AluraGeek | Login</title>
        <link rel="icon" href="/favicon.ico" />
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
            onClick={() => signIn("github")}
          >
            <VscGithub /> Entrar com GitHub
          </Button>
        </ProvidersContainer>
      </section>

      <AnimatePresence>
        { errorModal && <ErrorModal /> }
      </AnimatePresence>
    </>
  )
};

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  };

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}