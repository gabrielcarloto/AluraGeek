import { css } from '../../styles/theme';
import { useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function LabeledInput({
  label,
  inputValue,
  setInputValue,
  handleChange,
  textarea = false,
  type,
  name,
  required,
  minLength,
  maxLength,
}) {
  const isEmpty = inputValue === '';

  const inputTag = useRef(null);
  const labelTag = useRef(null);

  const uniqueInput = uuidv4();

  const toggleClass = (ref, method, className) => {
    if (!method) ref.current.classList.toggle(className);
    if (method == 'add') ref.current.classList.add(className);
    if (method == 'remove') ref.current.classList.remove(className);
  };

  useEffect(() => {
    if (!isEmpty) {
      toggleClass(inputTag, 'add', 'active');
      toggleClass(labelTag, 'add', 'active');
    }
  }, [isEmpty]);

  const LabeledInput = css('div', {
    width: '100%',

    '.container': {
      position: 'relative',

      '&__label': {
        color: '$lightText',
        position: 'absolute',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        userSelect: 'none',
        cursor: 'text',
        fontSize: '15px',
        transition: 'all 200ms ease-in-out',

        '&.active': {
          top: '13px',
          fontSize: '12px',
        },
      },

      '&__input': {
        width: '100%',
        height: '36px',
        padding: '18px 12px',
        border: 'none',
        borderBottom: '1px solid $border',
        borderRadius: '4px',
        outline: 'transparent',
        color: '$text',
        fontFamily: 'Raleway',
        fontSize: '16px',
        fontWeight: '400',
        transition: 'all 200ms ease-in-out',

        '&:user-invalid': {
          outline: '1px solid $error',
          borderBottom: '0',
        },

        '&:focus': {
          outlineColor: '$border',
          outlineStyle: 'solid',
          outlineWidth: '1px',
        },

        '&.active, &:invalid': {
          padding: '34px 12px 18px',
        },

        '&.textarea': {
          height: '82px',
          padding: '8px 12px',
          resize: 'none',

          '&.active': {
            padding: '24px 12px 8px',
          },
        },
      },
    },
  });

  return (
    <div className={LabeledInput()}>
      <div className="container">
        <label
          className="container__label"
          ref={labelTag}
          htmlFor={`input_${uniqueInput}`}
        >
          {label}
        </label>
        {!textarea ? (
          <input
            className="container__input"
            id={`input_${uniqueInput}`}
            name={name}
            type={type}
            required={required}
            minLength={minLength}
            maxLength={maxLength}
            ref={inputTag}
            value={inputValue}
            onChange={(e) => {
              if (setInputValue) setInputValue(e.target.value);
              if (handleChange) handleChange(e);
            }}
            onFocus={() => {
              toggleClass(inputTag, 'add', 'active');
              isEmpty && toggleClass(labelTag, 'add', 'active');
            }}
            onBlur={() => {
              isEmpty && toggleClass(inputTag, 'remove', 'active');
              isEmpty && toggleClass(labelTag, 'remove', 'active');
            }}
          />
        ) : (
          <textarea
            className="container__input textarea"
            id={`input_${uniqueInput}`}
            name={name}
            required={required}
            minLength={minLength}
            maxLength={maxLength}
            ref={inputTag}
            value={inputValue}
            onChange={(e) => {
              if (setInputValue) setInputValue(e.target.value);
              if (handleChange) handleChange(e);
            }}
            onFocus={() => {
              toggleClass(inputTag, 'add', 'active');
              isEmpty && toggleClass(labelTag, 'add', 'active');
            }}
            onBlur={() => {
              isEmpty && toggleClass(inputTag, 'remove', 'active');
              isEmpty && toggleClass(labelTag, 'remove', 'active');
            }}
          />
        )}
      </div>
    </div>
  );
}
