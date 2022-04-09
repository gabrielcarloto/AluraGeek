import { styled } from "@stitches/react";
import Skeleton from '../utils/Skeleton';

function ProductSkeleton({ length }) {
  const SkeletonWrapper = styled('div', {
    gridColumn: 'span 6',
    padding: '10px',
    height: '250px',
    backgroundColor: '#lightBackground',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',

    '@media (min-width: 768px)': {
      gridColumn: 'span 3',
    },

    '@media (min-width: 1024px)': {
      height: '300px',
      padding: '16px',
    },

    '@media (min-width: 1440px)': {
      gridColumn: 'span 2',
    },

    '.product-image-container': {
      height: '174px',

      '@media (min-width: 1440px)': {
        height: '220px',
      },
    },
  });
  
  return Array(length).fill(0).map((_, index) => {
    return (
      <SkeletonWrapper key={index}>
        <div className="product-image-container">
          <Skeleton css={{ width: '100%', height: '100%' }} />
        </div>
        <Skeleton css={{ width: '90%' }} />
        <Skeleton css={{ width: '40%' }} />
        <Skeleton css={{ width: '50%' }} />
      </SkeletonWrapper>
    );
  });
};

export default ProductSkeleton;