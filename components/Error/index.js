import useCollapse from 'react-collapsed';
import { motion } from 'framer-motion';
import { css } from '../../styles/theme';
import Dialog from '../Dialog/index';
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

  const Arrow = css({
    cursor: 'pointer',
    transition: 'transform 200ms ease-in-out',
    transform: `rotate(${isExpanded ? '90deg' : '-90deg'})`,
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Dialog
          color="error"
          expanded={isExpanded}
          key="error" 
          tabIndex={0}
        >
          <div
            className="dialog-header"
          >
            <div className="dialog-header-content">
              <div className="dialog-header-title">
                <MdErrorOutline className="dialog-header-icon" /> 
                <p>Erro</p>
              </div>
              <div className="dialog-header-buttons">
                {close && (
                  <>
                    <MdClose
                      className="dialog-header-icon close"
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
                  className={Arrow()}
                  id="dialog-collapse"
                  tabIndex={0}
                  {...getToggleProps()}
                />
              </div>
            </div>
          </div>
          <div className="dialog-content" {...getCollapseProps()}>
            <p>
              {queryError ? queryErrors[queryError] : error}
            </p>
          </div>
        </Dialog>
      </motion.div>
    </>
  );
};

export default Error;