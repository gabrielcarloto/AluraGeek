import useCollapse from 'react-collapsed';
import { motion } from 'framer-motion';
import { css } from '../../styles/theme';
import { MdClose, MdErrorOutline, MdArrowBackIosNew } from 'react-icons/md';

function Error({ error, state, setState }) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  function toggleError() {
    setState(!state);
  }

  const Error = css({
    width: '90%',
    position: 'fixed',
    bottom: '2%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    zIndex: '1',
    backgroundColor: '$error',
    color: '$white',

    '.error-header-content': {
      padding: '3%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '20px',

      '.error-header-title': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',

        'p': {
          fontWeight: '700',
        },
      },

      '.error-header-buttons': {
        display: 'flex',
        gap: '8px',

        '.arrow': {
          transition: 'transform 200ms ease-in-out',
          transform: `rotate(${isExpanded ? '90deg' : '-90deg'})`,
        },
      },
    },

    '.error-content': {
      fontSize: '16px',

      'p': {
        paddingBottom: '3%',
        textAlign: 'center',
      },
    },
  });

  return (
    <>
      <motion.div
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div 
          className={Error()} 
          key="error" 
          tabIndex={0}
        >
          <div
            className="error-header"
          >
            <div className="error-header-content">
              <div className="error-header-title">
                <MdErrorOutline className="error-header-icon" /> 
                <p>Erro</p>
              </div>
              <div className="error-header-buttons">
                <MdClose
                  className="error-header-icon"
                  id="error-close"
                  tabIndex={0}
                  onClick={() => toggleError()}
                />
                <label className="scr-only" htmlFor="error-close">
                  Fechar
                </label>
                <MdArrowBackIosNew 
                  className="error-header-icon arrow"
                  id="error-collapse"
                  tabIndex={0}
                  {...getToggleProps()}
                />
              </div>
            </div>
          </div>
          <div className="error-content" {...getCollapseProps()}>
            <p>{error || 'Erro não especificado'}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Error;