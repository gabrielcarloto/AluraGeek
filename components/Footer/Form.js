import React from "react";
import { css } from '../../styles/theme';
import Spacer from "../utils/Spacer";
import Button from "../Button/index";
import Input from "../Inputs/Input";
import Textarea from "../Inputs/Textarea";
import FloatLabel from "../Inputs/FloatLabel";

function Form() {
  const [nameValue, setNameValue] = React.useState('');
  const [messageValue, setMessageValue] = React.useState('');
  const nameLabelBg = React.useRef(null);
  const messageLabelBg = React.useRef(null);

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
  
    'label': {
      fontSize: '12px',
      fontWeight: '400',

      '&.active': {
        transform: 'translate(12px, 6px) scale(1)',
      },

      '@media (min-width: 768px)': {
        'label': {
          '&.active': {
            transform: 'translate(11px, 6px) scale(1)',
          },
        },
      },
    },
    
    '.name-label': {
      transform: 'translate(14px, 10px) scale(1.2)',

      '@media (min-width: 768px)': {
        transform: 'translate(15px, 10px) scale(1.2)',
      },
    },
    
    '.message-label': {
      transform: 'translate(24px, 10px) scale(1.2)',
    },

    
  });

  return (
    <form className={Form()}>
      <h3 className="form-title">
        Fale conosco
      </h3>
      <div className={FloatLabel()}>
        <div className={'label-background focus' + (nameValue == '' ? '' : ' active')} ref={nameLabelBg} />
        <Input
          className="form-input name"
          id="name"
          type="text"
          label="true"
          onChange={event => setNameValue(event.target.value)}
          onFocus={() => nameLabelBg.current.classList.add('focus')}
          onBlur={() => nameLabelBg.current.classList.remove('focus')}
        />
        <label 
          className={'name-label' + (nameValue !== '' ? ' active' : '')}
          htmlFor="name"
        >
          Nome
        </label>
      </div>
      <Spacer y={16} />
      <div className={FloatLabel()}>
        <div 
          className={'label-background focus' + (messageValue == '' ? '' : ' active')}
          ref={messageLabelBg}
        />
        <Textarea
          className="form-input message"
          id="message"
          onChange={e => setMessageValue(e.target.value)}
          onFocus={() => messageLabelBg.current.classList.add('focus')}
          onBlur={() => messageLabelBg.current.classList.remove('focus')}
        />
        <label
          className={'message-label' + (messageValue !== '' ? ' active' : '')}
          htmlFor="message"
        >
          Escreva sua mensagem
        </label>
      </div>
      <Spacer y={8} />
      <Button className="form-btn" type="submit" color="primary">
        Enviar mensagem
      </Button>
    </form>
  )
}


export default Form;