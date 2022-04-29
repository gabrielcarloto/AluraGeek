import React from 'react';
import { css } from '../../styles/theme';
import Spacer from '../utils/Spacer';
import Button from '../Button/index';
import LabeledInput from '../Inputs/LabeledInput';

function Form() {
  const [nameValue, setNameValue] = React.useState('');
  const [messageValue, setMessageValue] = React.useState('');

  const Form = css({
    width: '100%',
    gridColumn: '1 / -1',

    '@media (min-width: 768px)': {
      gridColumn: '6 / -1',
      alignSelf: 'flex-start',
    },

    '@media (min-width: 1024px)': {
      gridColumn: '7 / -1',
      gridRow: '-2 / 3',
    },

    '.form-title': {
      fontSize: '16px',
      fontWeight: '700',
      color: '$text',
      marginBottom: '8px',
    },
  });

  return (
    <form className={Form()} onSubmit={(e) => e.preventDefault()}>
      <h3 className="form-title">Fale conosco</h3>
      <LabeledInput
        type="text"
        label="Nome"
        required
        maxLength="40"
        inputValue={nameValue}
        setInputValue={setNameValue}
      />
      <Spacer y={16} />
      <LabeledInput
        textarea
        label="Escreva sua mensagem"
        required
        maxLength="120"
        inputValue={messageValue}
        setInputValue={setMessageValue}
      />
      <Spacer y={8} />
      <Button className="form-btn" type="submit" color="primary">
        Enviar mensagem
      </Button>
    </form>
  );
}

export default Form;
