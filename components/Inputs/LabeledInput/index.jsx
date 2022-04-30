import { useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import LabeledInputStyles from './LabledInputStyles';

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

  return (
    <div className={LabeledInputStyles()}>
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
