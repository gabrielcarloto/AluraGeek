import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { motion } from 'framer-motion';
import useCollapse from 'react-collapsed';

import { MdArrowBackIosNew, MdClose, MdInfoOutline } from 'react-icons/md';

import { css } from '../../styles/theme';
import Dialog from '../Dialog/index';

interface InfoProps {
  title?: string;
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  expanded?: boolean;
  children?: ReactNode;
  close?: boolean;
}

function Info({
  title,
  state,
  setState,
  expanded = false,
  children,
  close,
}: InfoProps) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
    defaultExpanded: expanded,
  });

  function toggleState() {
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
          color="info"
          /* expanded={isExpanded} */ key="info"
          tabIndex={0}
        >
          <div className="dialog-header">
            <div className="dialog-header-content">
              <div className="dialog-header-title">
                <MdInfoOutline className="dialog-header-icon" />
                <p>{title || 'Informação'}</p>
              </div>
              <div className="dialog-header-buttons">
                {close && (
                  <>
                    <MdClose
                      className="dialog-header-icon close"
                      id="info-close"
                      tabIndex={0}
                      onClick={() => toggleState()}
                    />
                    <label className="scr-only" htmlFor="info-close">
                      Fechar
                    </label>
                  </>
                )}
                {children && (
                  <MdArrowBackIosNew
                    {...getToggleProps()}
                    className={Arrow()}
                    id="dialog-collapse"
                    tabIndex={0}
                  />
                )}
              </div>
            </div>
          </div>
          {children && (
            <div className="dialog-content" {...getCollapseProps()}>
              <p>{children}</p>
            </div>
          )}
        </Dialog>
      </motion.div>
    </>
  );
}

export default Info;
