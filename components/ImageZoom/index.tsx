/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { cloneElement, ReactNode, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';
import type { CSSProperties } from '@stitches/react';
import { AnimatePresence, motion, MotionContext, Transition, Variants } from 'framer-motion';

import Button from '@components/Button';
import { styled } from '@styles/theme';

const Modal = styled(motion.dialog, {
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 900, // TODO: fix header stacking to remove this zindex

  width: '100vw',
  height: '100vh',
  display: 'grid',
  placeItems: 'center',
  border: 'none',

  cursor: 'zoom-out',
});

// TODO: change to satisfies
const ModalVariants: Variants = {
  initial: { backgroundColor: 'rgb(30 30 30 / 0)', border: 'none' },
  animate: {
    backgroundColor: 'rgb(30 30 30 / 0.95)',
    border: 'none',
    backdropFilter: 'blur(10px)',
  },
  exit: { backgroundColor: 'rgb(30 30 30 / 0)', border: 'none' },
};

const ModalScaleRange = styled('input', {
  $$thumbSize: '18px',

  webkitAppearance: 'none',
  appearance: 'none',

  height: 40,
  width: 'min(90%, 600px)',
  background: 'transparent',

  cursor: 'pointer',

  '&::-webkit-slider-runnable-track, &::-moz-range-track': {
    background: 'white',
  },

  '&::-moz-range-progress, &::-webkit-slider-runnable-track, &::-moz-range-track': {
    border: 'solid $secondary 2px',
    height: 10,
  },

  '&::-moz-range-progress': {
    backgroundColor: '$primary',
    borderRight: 'none',
  },

  '&::-webkit-slider-thumb, &::-moz-range-thumb': {
    webkitAppearance: 'none',
    appearance: 'none',

    marginTop: '-12px',
    borderRadius: '50%',
    outline: '3px solid $primary',
    width: '$$thumbSize',
    height: '$$thumbSize',

    backgroundColor: 'white',

    transition: 'outline 125ms linear',
  },

  '&:focus': {
    outline: 'none',
  },

  '&:focus::-webkit-slider-thumb, &:focus::-moz-range-thumb': {
    height: 20,
    width: 20,
    outline: '4px solid white',
    boxShadow: '5px 1px 4px hsl($$shadowColor / 0.8)',
    backgroundColor: '$primary',
    border: 'none',
  },
});

const ModalResetButton = styled(Button, {
  height: 40,
  width: 'fit-content',
  padding: '0 12px',
});

const ModalControlsContainer = styled(motion.div, {
  $$shadowColor: '0deg 0% 3%',
  display: 'none', // TODO: verify why using `useMediaQuery` is not woking

  '@md': {
    width: '100%',
    height: 150,

    position: 'absolute',
    bottom: 0,

    display: 'flex',
    justifyContent: 'center',
    gap: 32,

    filter: 'drop-shadow(0 4px 5px hsl($$shadowColor / 0.3))',
  },
});

const ModalControlsContainerVariants: Variants = {
  hidden: {
    y: 300,
  },
  visible: {
    y: 0,
  },
};

const ModalControlsContainerTransition: Transition = { type: 'tween', delay: 0.1, duration: 0.5 };

const ModalTrigger = styled('button', {
  position: 'relative',
  width: '100%',
  height: '100%',
  background: 'none',
  border: 'none',

  cursor: 'zoom-in',
});

const ModalCloseButton = styled('button', {
  border: 'none',
  background: 'none',
  height: 40,
  cursor: 'pointer',
});

const ModalCloseButtonIcon = styled(MdClose, {
  color: 'white',
  transition: 'color 200ms',

  '&:hover': {
    color: '$gray',
  },
});

const ModalImageDefaultStyles: CSSProperties = {
  width: 'auto',
  maxWidth: 'clamp(30vw, 600px, 90%)',
  minWidth: 'auto',
  height: 'auto',
  maxHeight: 'auto',
  minHeight: 'auto',
  aspectRatio: 'auto',
  objectFit: 'contain',

  position: 'static',

  cursor: 'zoom-in',
  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
};

interface ImageZoomProps {
  alt: string;
  src: string;
  className?: string;
}

export default function ImageZoom(props: ImageZoomProps) {
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [scale, setScale] = useState(1);

  const imageId = useId();
  const modalImageRef = useRef<HTMLImageElement>(null);

  function handleChangeScale(change: number) {
    if (!isImageZoomed) return;
    setScale((prev) => (change < 0 ? Math.max(prev + change, 1) : Math.min(prev + change, 3)));
  }

  if (scale === 3) navigator.vibrate(25);

  useEffect(() => {
    if (!isImageZoomed) toggleRootInteraction(false); // prevents a bug where it is not possible to interact with other elements when the parent component re-renders and the image gets zoomed out automatically
  }, [isImageZoomed]);

  function revertToNormalState() {
    setIsImageZoomed(false);
    toggleRootInteraction(false);
    setScale(1);
  }

  useOnKeyDown({
    Escape: () => {
      if (isImageZoomed) revertToNormalState();
    },
  });

  const image = (
    <motion.img
      initial={{ transform: 'scale(1)' }}
      animate={{ transform: `scale(${scale})`, zIndex: 900, transitionEnd: { zIndex: 'unset' } }}
      whileHover={
        !isImageZoomed // only works before the first zoom, but I liked it
          ? {
            transform: `scale(1.03)`,
          }
          : undefined
      }
      ref={isImageZoomed ? modalImageRef : undefined}
      id={imageId}
      layoutId={imageId}
      layout
      onWheel={(e) => handleChangeScale(e.deltaY * -0.001)}
      onClick={(e) => {
        if (!isImageZoomed) return;
        e.stopPropagation();
        handleChangeScale(scale < 3 ? 0.7 : -2);
      }}
      {...props}
    />
  );

  // TODO: add keys descriptions
  // NOTE: `AnimatePrecence` is not animating the modal exit idk why but it solves a problem with the image z-index on exit
  return (
    <AnimatePresence>
      <MotionContext.Provider value={{}}>
        {/* framer/motion#1524 */}
        {isImageZoomed ? (
          createPortal(
            <FocusTrap>
              <Modal
                variants={ModalVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                open
                aria-modal
                aria-describedby={imageId}
                onClick={revertToNormalState}
              >
                {cloneElement(image, {
                  style: ModalImageDefaultStyles,
                })}
                <ModalControlsContainer
                  variants={ModalControlsContainerVariants}
                  transition={ModalControlsContainerTransition}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <ModalScaleRange
                    autoFocus
                    type="range"
                    title="Aumentar ou diminuir o zoom"
                    min={100}
                    max={300}
                    value={scale * 100}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setScale(value / 100);
                    }}
                  />
                  <ModalResetButton
                    type="button"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      setScale(1);
                    }}
                  >
                    Reiniciar
                  </ModalResetButton>
                  {/* because I didn't add the `stopPropagation` it closes the modal */}
                  <ModalCloseButton type="button" title="Sair da imagem">
                    <ModalCloseButtonIcon size={40} />
                  </ModalCloseButton>
                </ModalControlsContainer>
              </Modal>
            </FocusTrap>,
            document.body,
          )
        ) : (
          <ModalTrigger
            onClick={() => {
              setIsImageZoomed((prev) => !prev);
              toggleRootInteraction(true);
            }}
            title="Pressione para dar zoom na imagem"
            type="button"
          >
            {image}
          </ModalTrigger>
        )}
      </MotionContext.Provider>
    </AnimatePresence>
  );
}

type UseOnKeyDownHandlers = {
  [K in KeyboardEvent['key']]?: (e: KeyboardEvent) => void;
};

function useOnKeyDown(handlers: UseOnKeyDownHandlers) {
  useEffect(() => {
    function listener(e: KeyboardEvent) {
      if (e.key in handlers) (handlers[e.key] as (e: KeyboardEvent) => void)(e);
    }

    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  });
}

function FocusTrap({ children }: { children: ReactNode }) {
  const trapRef = useRef<HTMLDivElement>(null);

  useOnKeyDown({
    Tab: (e) => {
      if (!trapRef.current) return;

      const focusableElements = Array.from(
        trapRef.current.querySelectorAll('a[href], input, button:not([disabled])'),
      ) as HTMLAnchorElement[]; // chose an anchor just to be able to use the `focus` method

      const firstElement = focusableElements.at(0);
      const lastElement = focusableElements.at(-1);

      if (!focusableElements.length || !firstElement || !lastElement) return;

      const { activeElement } = document;

      if (!e.shiftKey && activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      } else if (e.shiftKey && activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    },
  });

  return <div ref={trapRef}>{children}</div>;
}

function toggleRootInteraction(lock: boolean) {
  const html = document.documentElement;
  const { body } = document;
  const root = document.getElementById('__next') as HTMLDivElement;

  if (lock) {
    html.style.position = 'relative';
    html.style.overflow = 'hidden';
    body.style.position = 'relative';
    body.style.overflow = 'hidden';
    root.style.pointerEvents = 'none';
  } else {
    html.style.position = 'static';
    html.style.overflow = 'auto';
    body.style.position = 'static';
    body.style.overflow = 'auto';

    // NOTE: this prevents accidental clicks, especially on mobile
    setTimeout(() => {
      root.style.pointerEvents = 'initial';
    }, 100);
  }
}
