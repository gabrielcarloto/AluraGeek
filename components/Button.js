import { styled } from '@stitches/react'

function Button({ width, variant, text }) {
  const Button = styled('button', {
    height: '40px',
    width,
    fontFamily: 'Raleway',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 200ms ease-in-out',

    '@media (min-width: 768px)': {
      height: '50px',
      fontSize: '16px',
      fontWeight: '400',
    },
    
    variants: {
      color: {
        primary: {
          backgroundColor: '#2A7AE4',
          color: '#FFFFFF',

          '&:hover': {
            backgroundColor: '#5595E9',
          }
        },

        secondary: {
          backgroundColor: 'transparent',
          color: '#2A7AE4',
          border: '1px solid #2A7AE4',

          '&:hover': {
            backgroundColor: '#D4E4FA',
          }
        },
      }
    }
  })

  return (
    <Button color={variant} width={width}>
      {text}
    </Button>
  )
}

export default Button;