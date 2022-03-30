import useCollapse from 'react-collapsed';
import { motion } from 'framer-motion';
import { css } from '../../styles/theme';
import Dialog from '../Dialog/index';
import { MdClose, MdCheckCircleOutline, MdArrowBackIosNew } from 'react-icons/md';

function Success({ text, state, setState }) {;
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  function toggleError() {
    setState(!state);
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
          color="success"
          expanded={isExpanded}
          key="success"
          tabIndex={0}
        >
          <div
            className="dialog-header"
          >
            <div className="dialog-header-content">
              <div className="dialog-header-title">
                <MdCheckCircleOutline className="dialog-header-icon" /> 
                <p>Sucesso!</p>
              </div>
              <div className="dialog-header-buttons">
                {close && (
                  <>
                    <MdClose
                      className="dialog-header-icon close"
                      id="success-close"
                      tabIndex={0}
                      onClick={() => toggleError()}
                    />
                    <label className="scr-only" htmlFor="success-close">
                      Fechar
                    </label>
                  </>
                )}
                {text && (
                  <MdArrowBackIosNew 
                    className={Arrow()}
                    id="dialog-collapse"
                    tabIndex={0}
                    {...getToggleProps()}
                  />
                )}
              </div>
            </div>
          </div>
            {text && (
              <div className="dialog-content" {...getCollapseProps()}>
                <p>
                  {text}
                </p>
              </div>
            )}
        </Dialog>
      </motion.div>
    </>
  );
};

export default Success;