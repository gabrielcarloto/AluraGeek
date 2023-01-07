import { css } from '@stitches/react';
import { useState } from 'react';

import Button from '../../components/Button';
import LabeledInput from '../../components/Inputs/LabeledInput';
import Spacer from '../../components/utils/Spacer';

export function Form({ csrfToken }: { csrfToken: string | undefined }) {
  const [userValue, setUserValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

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
