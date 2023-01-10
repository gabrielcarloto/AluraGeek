import { css } from '@styles/theme';

export const HeaderStyles = css({
  position: 'relative',
  display: 'flex',
  width: '100vw',
  height: '72px',
  backgroundColor: '$lightBackground',

  '@media (min-width: 768px)': {
    height: '115px',
  },

  '.header-container': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '.header-logo': {
      width: '100px',
      height: '28px',
      cursor: 'pointer',

      '@media (min-width: 768px)': {
        width: '176px',
        height: '50px',
      },
    },

    '.header-form': {
      height: '72px',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      position: 'absolute',
      top: '-72px',
      left: '0',
      zIndex: '2',
      transition: 'all 200ms ease-in-out',

      '.header-search': {
        width: '60%',
      },

      '.header-search-icon': {
        width: '18px',
        height: '18px',
        display: 'block',
        marginLeft: '-28vw',
        background: 'url(/search.svg) no-repeat center',
        backgroundColor: 'transparent',
        color: 'transparent',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        transition: 'all 200ms ease-in-out',

        '@media (min-width: 768px)': {
          marginLeft: '-35px',
        },

        '&:focus-visible': {
          outline: '2px solid #000',
        },
      },

      '.header-close-icon': {
        width: '16px',
      },

      '&.active': {
        top: '0',
      },

      '@media (min-width: 768px)': {
        display: 'flex',
        width: 'auto',
        position: 'static',
        alignItems: 'center',
        justifyContent: 'center',

        '.header-search': {
          display: 'block',
          width: 'clamp(300px, 30vw, 400px)',
          maxWidth: '400px',
        },
      },
    },

    '.desktop': {
      display: 'none',
    },

    '@media (min-width: 768px)': {
      '.mobile': {
        display: 'none',
      },

      '.desktop': {
        display: 'block',
      },
    },
  },

  '.header-login': {
    width: '100px',

    '@media (min-width: 768px)': {
      width: '176px',
    },
  },

  '.header-user': {
    width: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'relative',
    zIndex: '1',

    '@media (min-width: 768px)': {
      width: '176px',
    },

    '.header-user-icon, .header-user-image': {
      cursor: 'pointer',
      transition: 'all 200ms ease-out',

      '@media (hover: hover) and (pointer: fine)': {
        '&:hover': {
          transform: 'scale(1.15)',
        },
      },

      '&.active': {
        transform: 'scale(1.15)',
      },
    },

    '.header-user-image': {
      width: '35px',
      height: '35px',
      borderRadius: '50%',

      '@media (min-width: 768px)': {
        width: '50px',
        height: '50px',
      },
    },

    '.header-user-icon': {
      fontSize: '28px',
      color: '$primary',

      '@media (min-width: 768px)': {
        fontSize: '38px',
      },
    },

    '.header-user-menu': {
      position: 'absolute',
      top: '115%',
      left: '-35px',
      width: '130%',
      maxWidth: '150%',
      backgroundColor: '$lightBackground',
      borderRadius: '4px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      padding: '10px',

      '@media (min-width: 768px)': {
        padding: '20px',
        left: '-60px',
      },

      ul: {
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',

        hr: {
          width: '90%',
          height: '1px',
          border: 'none',
          backgroundColor: '$border',
        },

        li: {
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',

          '@media (min-width: 768px)': {
            fontSize: '16px',
          },

          p: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            '.list-icon': {
              fontSize: '16px',
              marginRight: '5px',
            },
          },
        },

        '.header-user-menu-button': {
          width: '100%',
          padding: '6px',
          border: 'none',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          fontFamily: 'RaleWay',
          fontSize: '14px',
          fontWeight: '500',
          color: '$white',
          cursor: 'pointer',
          transition: 'all 200ms ease-out',

          '&.login': {
            backgroundColor: '$primary',

            '@media (hover: hover) and (pointer: fine)': {
              '&:hover': {
                backgroundColor: '$primaryHover',
              },
            },
          },

          '&.signout': {
            backgroundColor: '$red',

            '@media (hover: hover) and (pointer: fine)': {
              '&:hover': {
                backgroundColor: '$redHover',
              },
            },
          },
        },
      },
    },
  },

  '.header-search--mobile': {
    width: '100vw',
    height: '72px',
    position: 'absolute',
    top: '-72px',
    left: '0',
    zIndex: '2',
    backgroundColor: '$lightBackground',
    transition: 'all 200ms ease-in-out',

    '&.active': {
      top: '0',
    },
  },
});
