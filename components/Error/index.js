import useCollapse from 'react-collapsed';
import { motion } from 'framer-motion';
import { css } from '../../styles/theme';
import { MdClose, MdErrorOutline, MdArrowBackIosNew } from 'react-icons/md';

function Error({ queryError, error, state, setState, close }) {;
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  function toggleError() {
    setState(!state);
  }

  const queryErrors = {
    Signin: "Tente logar com outra conta",
    OAuthSignin: "Tente logar com outra conta",
    OAuthCallback: "Tente logar com outra conta",
    Callback: "Tente logar com outra conta",
    SessionRequired: "Você precisa estar logado para acessar esta página",
    OAuthAccountNotLinked:
      "Para confirmar sua identidade, entre com a mesma conta que você usou originalmente",
    CredentialsSignin:
      "Por favor, verifique se os dados estão corretos e tente novamente",
    default: "Não foi possível fazer login",
  }

  const Error = css({
    width: '90%',
    position: 'fixed',
    bottom: '2%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    zIndex: '2',
    backgroundColor: '$error',
    color: '$white',

    '@media (min-width: 1024px)': {
      width: '30%',
    },

    '.error-header-content': {
      padding: '3%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '20px',

      '@media (min-width: 768px)': {
        fontSize: '22px',
      },

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
          cursor: 'pointer',
          transition: 'transform 200ms ease-in-out',
          transform: `rotate(${isExpanded ? '90deg' : '-90deg'})`,
        },

        '.close': {
          cursor: 'pointer',
        },
      },
    },

    '.error-content': {
      fontSize: '16px',

      '@media (min-width: 768px)': {
        fontSize: '18px',
      },

      'p': {
        padding: '0 3% 4%',
        textAlign: 'center',
      },
    },
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
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
                {close && (
                  <>
                    <MdClose
                      className="error-header-icon close"
                      id="error-close"
                      tabIndex={0}
                      onClick={() => toggleError()}
                    />
                    <label className="scr-only" htmlFor="error-close">
                      Fechar
                    </label>
                  </>
                )}
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
            <p>
              {queryError ? queryErrors[queryError] : error}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Error;