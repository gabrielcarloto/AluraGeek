import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { css, styled } from '@stitches/react';
import Image from 'next/image';
import Link from 'next/link';
import type { CartProduct } from 'types/cart';

import IconButton from '@components/IconButton';
import Grid from '@components/utils/Grid';
import type { useCart } from '@hooks/useLocalStorage';
import { toCurrency } from '@utils/number';

type UseCartReturnFunctions = ReturnType<typeof useCart>[1];

interface CartItemProps {
  product: CartProduct;
  onChangeQuantity: UseCartReturnFunctions['updateProductQuantity'];
  onRemoveItem: UseCartReturnFunctions['removeProduct'];
}

const QuantityContainer = styled('div', {
  fontSize: '16px',
  fontWeight: '700',

  gridColumn: '1 / -1',
  gridRow: '3',

  display: 'flex',
  alignItems: 'center',
  alignSelf: 'flex-end',
  justifySelf: 'flex-end',
});

const ProductImageContainer = styled('div', {
  width: '30vw',
  height: '150px',
  position: 'relative',
  cursor: 'pointer',

  '@media (min-width: 1024px)': {
    width: '15vw',
  },

  '@media (min-width: 1440px)': {
    width: '10vw',
  },
});

const ProductDetails = css({
  padding: '16px 0',
  flex: '1',
  gap: '8px',

  '@media (min-width: 1024px)': {
    padding: '16px 8px',
  },
});

export function CartItem({
  product,
  onChangeQuantity,
  onRemoveItem,
}: CartItemProps) {
  return (
    <>
      <Link passHref href={`/products/${product.id}`}>
        <ProductImageContainer>
          <Image
            src={product.image}
            layout="fill"
            objectFit="cover"
            alt={product.alt}
          />
        </ProductImageContainer>
      </Link>
      <Grid className={ProductDetails()}>
        <ProductTitle id={product.id} name={product.name} />
        <ProductPrice price={product.price} quantity={product.quantity} />

        <QuantityContainer>
          <IconButton onClick={() => onChangeQuantity(product.id, -1)}>
            <FaMinus />
          </IconButton>
          <span>{product.quantity}</span>
          <IconButton onClick={() => onChangeQuantity(product.id, 1)}>
            <FaPlus />
          </IconButton>
          <IconButton color="red" onClick={() => onRemoveItem(product.id)}>
            <FaTrashAlt />
          </IconButton>
        </QuantityContainer>
      </Grid>
    </>
  );
}

function ProductTitle({ id, name }: { id: number; name: string }) {
  const StyledAnchor = styled('a', {
    width: 'fit-content',

    fontSize: '16px',
    fontWeight: '600',
    gridColumn: '1 / -1',
    gridRow: '1',

    '@media (min-width: 1024px)': {
      fontSize: '18px',
    },
  });

  return (
    <Link passHref href={`/products/${id}`}>
      <StyledAnchor>{name}</StyledAnchor>
    </Link>
  );
}

function ProductPrice({
  price,
  quantity,
}: {
  price: number;
  quantity: number;
}) {
  const StyledDiv = styled('div', {
    fontWeight: '400',
    gridColumn: '1 / -1',
    gridRow: '2',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',

    '@media (min-width: 1024px)': {
      justifyContent: 'flex-start',
      flexDirection: 'row',
      gap: '16px',
    },

    span: {
      fontSize: '16px',
      display: 'flex',
      gap: '4px',
    },

    strong: {
      fontWeight: '700',
    },
  });

  return (
    <StyledDiv>
      <span>
        <b>{toCurrency(price)}</b>
        cada
      </span>
      <span>
        <b>{toCurrency(price * quantity)}</b>
        no total
      </span>
    </StyledDiv>
  );
}
