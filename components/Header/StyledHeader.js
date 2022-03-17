import { styled } from "@stitches/react"

const StyledHeader = styled('header', {
  display: 'flex',
  width: '100vw',
  height: '72px',
  backgroundColor: '#ffffff',

  '@media (min-width: 768px)': {
    height: '115px',
  },

  '.header-container': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    
    '.header-left-content': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

      '.header-logo': {
        width: '100px',
        height: '28px',

        '@media (min-width: 768px)': {
          width: '176px',
          height: '50px',
          marginRight: '48px',
        },
      },

      'form': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },

      '.header-search': {
        display: 'none',
        
        '@media (min-width: 768px)': {
          display: 'block',
          width: 'clamp(300px, 30vw, 400px)',
          maxWidth: '400px',
        },
      },
    },

    '.header-search-icon--desktop': {
      display: 'none',
    },

    '@media (min-width: 768px)': {
      '.header-search-icon--mobile': {
        display: 'none',
      },

      '.header-search-icon--desktop': {
        display: 'block',
        marginLeft: '-35px',
        backgroundColor: 'transparent',
        color: 'transparent',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        background: 'url(/search.svg) no-repeat center',
        width: '18px',
        height: '18px',
        transition: 'all 200ms ease-in-out',

        '&:focus': {
          transform: 'scale(1.2)',
        },
      },
    },
  },

  '.header-login': {
    width: 'clamp(133px, 15vw, 182px)'
  }
})

export default StyledHeader;