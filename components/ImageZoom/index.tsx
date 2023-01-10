import React, { Dispatch, SetStateAction } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { css } from '@styles/theme';

interface ImageZoomProps {
  zoom: boolean;
  setZoom: Dispatch<SetStateAction<boolean>>;
  img: string;
  alt: string;
}

function ImageZoom({ zoom, setZoom, img, alt }: ImageZoomProps) {
  /*
   *  HOW IT WORKS:
   *  1. When the user clicks on the image, the zoom state is set to true on the parent component.
   *  2. The zoom state and its setter is passed to this component as props.
   *  3. The component has its own state (isZoomed) to control the animation,
   *     which is set to true when the zoom state (from the parent component) is true.
   *  4. When the user clicks on the image again, the isZoomed state is set to false, zooming out,
   *     then the zoom state is set to false on the parent component.
   *
   *  WHY IS IT DONE THIS WAY?
   *  At first, I thought that I could just do everything in the parent component,
   *  but I couldn't get the animation to work properly, cause apparently the exit
   *  animation of the image is not finished when the state is set to false in the parent component.
   *  So I decided to do it this way, which is a bit hacky, but it works.
   *  That's also why I used setTimeout to set the zoom state to false. If I don't set it to false,
   *  the user will need to click twice to zoom in, which is annoying. Using setTimeout,
   *  I can set the zoom state to false after the animation is finished.
   */

  const [isZoomed, setIsZoomed] = React.useState(zoom);

  const handleClick = () => {
    setIsZoomed(!isZoomed);
  };

  setTimeout(() => {
    if (!isZoomed) setZoom(false);
  }, 200);

  const Modal = css({
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '2',
    width: '100vw',
    height: '100vh',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.5)',
    cursor: 'zoom-out',

    img: {
      padding: '5px',

      '@media (min-width: 1024px)': {
        padding: '20%',
      },
    },
  });

  return (
    <AnimatePresence>
      {isZoomed && (
        <motion.div
          className={Modal()}
          onClick={handleClick}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          key="zoom"
        >
          <motion.img
            src={img}
            alt={alt}
            id="zoom-img"
            initial={{
              scale: 0.5,
              y: 100,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              y: 0,
              opacity: 1,
              transition: {
                ease: [0.11, 0.67, 0, 0.98],
              },
            }}
            exit={{
              scale: 0.5,
              y: 100,
              opacity: 0,
              transition: {
                ease: 'easeInOut',
              },
            }}
            transition={{
              duration: 0.5,
            }}
            key={img}
          />
          <label className="scr-only" htmlFor="zoom-img">
            Clique para tirar o zoom da imagem
          </label>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ImageZoom;
