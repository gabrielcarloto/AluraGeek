import {
  useRef,
  useEffect,
  Dispatch,
  ChangeEvent,
  RefObject,
  SetStateAction,
  useId,
} from 'react';
import LabeledInputStyles from './LabledInput.styles';

// eslint-disable-next-line no-unused-vars
function toggleClass<
  T extends HTMLInputElement | HTMLLabelElement | HTMLTextAreaElement,
>(
  ref: RefObject<T>,
  method: 'add' | 'remove' | null | undefined,
  className: string,
): void | boolean {
  if (!ref.current) return;

  if (method) return ref.current.classList[method](className);
  return ref.current.classList.toggle(className);
}

interface SharedProps {
  label: string;
  inputValue: string | number | undefined;
  setInputValue?: Dispatch<SetStateAction<string>>;
  handleChange?: (
    e: any, // TODO: remove any
  ) => void;
  // textarea?: boolean;
}

// eslint-disable-next-line no-undef
type InputProps = JSX.IntrinsicElements['input'] & {
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  textarea?: false;
};

// eslint-disable-next-line no-undef
type TextAreaProps = JSX.IntrinsicElements['textarea'] & {
  handleChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  textarea: true;
};

type LabeledInputProps = SharedProps & (InputProps | TextAreaProps);

export default function LabeledInput({
  label,
  inputValue,
  setInputValue,
  handleChange,
  textarea = false,
  ...props
}: LabeledInputProps) {
  const isEmpty = inputValue === '';

  const inputTag = useRef<HTMLInputElement>(null);
  const labelTag = useRef<HTMLLabelElement>(null);

  const uniqueInput = useId();

  useEffect(() => {
    if (!isEmpty) {
      toggleClass(inputTag, 'add', 'active');
      toggleClass(labelTag, 'add', 'active');
    }
  }, [isEmpty]);

  function sharedProps(isTextarea: boolean) {
    return {
      className: `container__input ${isTextarea ? 'textarea' : ''}`,
      id: `input_${uniqueInput}`,
      onChange: (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
      ) => {
        if (setInputValue) setInputValue(e.target.value);
        if (handleChange) {
          handleChange(
            textarea
              ? (e as ChangeEvent<HTMLTextAreaElement>)
              : (e as ChangeEvent<HTMLInputElement>),
          );
        }
      },
      onFocus: () => {
        toggleClass(inputTag, 'add', 'active');
        isEmpty && toggleClass(labelTag, 'add', 'active');
      },
      onBlur: () => {
        isEmpty && toggleClass(inputTag, 'remove', 'active');
        isEmpty && toggleClass(labelTag, 'remove', 'active');
      },
    };
  }

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
            {...(props as InputProps)}
            {...sharedProps(false)}
            ref={inputTag}
            value={inputValue}
          />
        ) : (
          <textarea {...(props as TextAreaProps)} {...sharedProps(true)} />
        )}
      </div>
    </div>
  );
}
