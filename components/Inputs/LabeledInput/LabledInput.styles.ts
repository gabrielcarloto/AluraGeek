import { css } from '../../../styles/theme';

const LabeledInputStyles = css('div', {
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

export default LabeledInputStyles;
