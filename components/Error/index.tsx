import type { Dispatch, SetStateAction } from 'react';
import useCollapse from 'react-collapsed';
import { MdArrowBackIosNew, MdClose, MdErrorOutline } from 'react-icons/md';
import { motion } from 'framer-motion';

import { css } from '@styles/theme';
import type { SignInErrorTypes } from '@types';

import Dialog from '../Dialog/index';

const queryErrors: Readonly<Record<SignInErrorTypes, string>> = {
  Signin: 'Tente logar com outra conta',
  OAuthSignin: 'Tente logar com outra conta',
  OAuthCallback: 'Tente logar com outra conta',
  Callback: 'Tente logar com outra conta',
  SessionRequired: 'Você precisa estar logado para acessar esta página',
  OAuthAccountNotLinked:
    'Para confirmar sua identidade, entre com a mesma conta que você usou originalmente',
  CredentialsSignin:
    'Por favor, verifique se os dados estão corretos e tente novamente',
  default: 'Não foi possível fazer login',
};

interface ErrorProps {
  queryError?: SignInErrorTypes | string;
  error?: string;
  // eslint-disable-next-line no-undef
  setState?: Dispatch<SetStateAction<string | undefined>>;
  close?: boolean;
}

function Error({ queryError, error, setState, close }: ErrorProps) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  function toggleError() {
    if (setState) setState(undefined);
  }

  const Arrow = css({
    cursor: 'pointer',
    transition: 'transform 200ms ease-in-out',
    transform: `rotate(${isExpanded ? '90deg' : '-90deg'})`,
  });

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          zIndex: '10',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Dialog
          color="error"
          /* expanded={isExpanded} */ key="error"
          tabIndex={0}
        >
          <div className="dialog-header">
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
                  {...getToggleProps()}
                  id="dialog-collapse"
                  tabIndex={0}
                />
              </div>
            </div>
          </div>
          <div className="dialog-content" {...getCollapseProps()}>
            <p>
              {queryError
                ? queryError in queryErrors
                  ? queryErrors[queryError as SignInErrorTypes]
                  : queryErrors['default']
                : error}
            </p>
          </div>
        </Dialog>
      </motion.div>
    </>
  );
}

export default Error;
