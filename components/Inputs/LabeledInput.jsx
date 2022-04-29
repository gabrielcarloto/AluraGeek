import { css } from '../../styles/theme';
import { useRef, useEffect } from 'react';
import commonStyles from './commonStyles';
import { v4 as uuidv4 } from 'uuid';

export default function LabeledInput({
  label,
  inputValue,
  setInputValue,
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
        ...commonStyles,
        height: '36px',
        padding: '18px 12px',

        '&.textarea': {
          height: '82px',
          padding: '8px 12px',
          resize: 'none',

          '&.active': {
            padding: '24px 12px 8px',
          },
        },

        outline: 'transparent',
        transition: 'padding 200ms ease-in-out',

        '&.active': {
          padding: '34px 12px 18px',
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
            onChange={(e) => setInputValue(e.target.value)}
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
            onChange={(e) => setInputValue(e.target.value)}
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
