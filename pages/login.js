import React from 'react';
import Head from 'next/head'
import { css } from '@stitches/react';
import Input from '../components/Inputs/Input';
import Button from '../components/Button/index';
import Spacer from '../components/utils/Spacer';
import FloatLabel from '../components/Inputs/FloatLabel';

function Login({ router }) {
  const FormSection = css({
    height: '60vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '@media (min-width: 768px)': {
      height: '40vh',
    },
  });

  function Form() {
    const [emailValue, setEmailValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');
    const emailLabelBg = React.useRef(null);
    const passwordLabelBg = React.useRef(null);

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
      <form className={Form()}>
        <p className="form-title">
          Iniciar Sessão
        </p>
        <Spacer responsive={3} />
        <div className={FloatLabel()}>
          <div 
            className={'label-background focus' + (emailValue == '' ? '' : ' active')}
            ref={emailLabelBg}
          />
          <Input
            className="form-email input"
            id="email"
            type="email"
            label="true"
            onChange={event => setEmailValue(event.target.value)}
            onFocus={() => emailLabelBg.current.classList.add('focus')}
            onBlur={() => emailLabelBg.current.classList.remove('focus')}
          />
          <label 
            className={'email-label' + (emailValue !== '' ? ' active' : '')}
            htmlFor="email"
          >
            Escreva seu email
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
            type="password"
            label="true"
            onChange={event => setPasswordValue(event.target.value)}
            onFocus={() => passwordLabelBg.current.classList.add('focus')}
            onBlur={() => passwordLabelBg.current.classList.remove('focus')}
          />
          <label
            className={'password-label' + (passwordValue !== '' ? ' active' : '')}
            htmlFor="password"
          >
            Escreva sua senha
          </label>
        </div>
        <Spacer responsive={3} />
        <Button className="form-btn" color="primary">
          Entrar
        </Button>
      </form>
    );
  };

  return (
    <>
      <Head>
        <title>AluraGeek | Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={FormSection()}>
        <Form />
      </section>
    </>
  )
}

export default Login;