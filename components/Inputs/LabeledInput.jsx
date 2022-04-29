import { css } from '../../styles/theme';
import { useRef, useEffect } from 'react';
import commonStyles from './commonStyles';

export default function LabeledInput({
  label,
  inputValue,
  setInputValue,
  required,
  minLength,
  maxLength,
}) {
  const isEmpty = inputValue === '';

  const inputTag = useRef(null);
  const labelTag = useRef(null);

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
    '.container': {
      position: 'relative',

      '&__label': {
        color: '$lightText',
        position: 'absolute',
        left: '12px',
        top: '10px',
        userSelect: 'none',
        cursor: 'text',
        fontSize: '15px',
        transition: 'all 200ms ease-in-out',

        '&.active': {
          top: '8px',
          fontSize: '12px',
        },
      },

      '&__input': {
        ...commonStyles,
        height: '36px',
        outline: 'transparent',
        padding: '18px 12px',
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
        <label className="container__label" ref={labelTag} htmlFor="input">
          {label}
        </label>
        <input
          className="container__input"
          id="input"
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
      </div>
    </div>
  );
}
