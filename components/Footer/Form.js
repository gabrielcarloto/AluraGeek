import React from "react";
import Spacer from "../utils/Spacer";
import Button from "../Button/index";
import Input from "../Inputs/Input";
import Textarea from "../Inputs/Textarea";
import formStyles from './formStyles'

function Form() {
  const [nameValue, setNameValue] = React.useState('');
  const [messageValue, setMessageValue] = React.useState('');
  const nameLabelBg = React.useRef(null);
  const messageLabelBg = React.useRef(null);

  return (
    <form>
      <h3 className="form-title">
        Fale conosco
      </h3>
      <div className="float-label">
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
      <div className="float-label">
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


export { Form, formStyles };