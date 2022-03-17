import { styled } from "@stitches/react"

const StyledBanner = styled('section', {
  width: '100vw',
  height: '100vh',
  maxHeight: '352px',
  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 41.15%, rgba(0, 0, 0, 0.8) 100%), url(/banner.jpg) no-repeat center',
  backgroundSize: 'cover',

  '.banner-container': {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',

    '.banner-title': {
      fontSize: '22px',
      fontWeight: '700',
      lineHeight: '26px',
      color: '#FFFFFF',
      marginTop: '0',
      marginBottom: '8px',

      '@media (min-width: 768px)': {
        fontSize: '52px',
        lineHeight: '60px',
        marginBottom: '16px',
      },
    },

    '.banner-subtitle': {
      fontSize: '14px',
      fontWeight: '600',
      lineHeight: '16px',
      color: '#FFFFFF',
      marginTop: '0',
      marginBottom: '8px',

      '@media (min-width: 768px)': {
        fontSize: '22px',
        lineHeight: '26px',
        marginBottom: '16px',
      },
    },

    '.banner-btn': {
      width: 'clamp(119px, 10vw, 130px)',
      marginBottom: '16px',

      '@media (min-width: 768px)': {
        marginBottom: '32px',
      },
    },
  },
})

export default StyledBanner;