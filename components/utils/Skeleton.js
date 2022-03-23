import { styled, keyframes } from "@stitches/react";

const shimmer = keyframes({
  '0%': {
    transform: 'translateX(-100%)',
  },
  '100%': {
    transform: 'translateX(100%)',
  },
});

const Skeleton = styled('span', {
  display: 'inline-block',   
  height: '16px',
  overflow: 'hidden',
  position: 'relative', 
  backgroundColor: '#DDDBDD',

  '&::after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundImage: 'linear-gradient(90deg, #DDDBDD 0%, #F5F5F5 50%, #DDDBDD 100%)',
    transform: 'translateX(-100%)',
    animation: `${shimmer} 1.5s infinite`,
  },
});

export default Skeleton;