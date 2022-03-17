const formStyles = {
  'form': {
    width: '100%',
    gridColumn: '1 / -1',

    '@media (min-width: 768px)': {
      gridColumn: '6 / -1',
      gridRow: '-2 / 3',
      alignSelf: 'flex-start',
    },

    '@media (min-width: 1024px)': {
      gridColumn: '7 / -1',
    },

    '.form-title': {
      fontFamily: 'Raleway',
      fontSize: '16px',
      fontWeight: '700',
      color: '#464646',
      marginBottom: '8px',
    },

    '.float-label': {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',

      '.label-background': {
        height: '0',
        width: '100%',
        borderRadius: '4px 4px 0 0',
        backgroundColor: '#FFFFFF',
        transition: 'all 200ms ease-in-out',
        zIndex: '1',
        
        '&.active': {
          marginBottom: '-4px',
          height: '20px',
        },
      },

      '.focus': {
        boxShadow: '-0.7px -0.7px 0px #C8C8C8, 0.7px -0.7px 0px #C8C8C8',
      },
      
      'label': {
        fontFamily: 'Raleway',
        fontSize: '12px',
        fontWeight: '400',
        color: '#A2A2A2',
        position: 'absolute',
        transition: 'all 200ms ease-in-out',
        zIndex: '2',
        
        '&.active': {
          transform: 'translate(12px, 6px) scale(1)',
        },
      },
      
      '.name-label': {
        transform: 'translate(14px, 10px) scale(1.2)',
      },
      
      '.message-label': {
        transform: 'translate(24px, 10px) scale(1.2)',
      },

      '@media (min-width: 768px)': {
        'label': {
          '&.active': {
            transform: 'translate(11px, 6px) scale(1)',
          },
        },

        '.name-label': {
          transform: 'translate(15px, 10px) scale(1.2)',
        },
      },
    },
  },
};

export default formStyles;