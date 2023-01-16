import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

import Button from '@components/Button';
import Divider from '@components/Divider';
import Head from '@components/Head';
import Input from '@components/Inputs/Input';
import Container from '@components/utils/Container';
import Fill from '@components/utils/Fill';
import Spacer from '@components/utils/Spacer';
import { useCart } from '@hooks/useLocalStorage';
import { styled } from '@styles/theme';
import type { Cart } from '@types';
import { toCurrency } from '@utils/number';

import CartStyles, {
  Checkout,
  mainElAnimationProps,
  Products,
  PromoForm,
} from './Cart.styles';
import { CartItem } from './CartItem';
export default function Cart() {
  const [
    cart,
    {
      updateProductQuantity: handleChangeQuantity,
      removeProduct: handleRemoveItemFromCart,
    },
  ] = useCart();

  if (!cart?.length) return <EmptyCart />;

  const total = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );

  return (
    <>
      <Head title="Carrinho" />
      <AnimatePresence exitBeforeEnter>
        <motion.main
          className={CartStyles()}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={mainElAnimationProps}
          key="full"
        >
          <Spacer responsive={1} />
          <Container>
            <div className="cart-title">
              <FaShoppingCart />
              <h1>Carrinho</h1>
            </div>
            <Spacer y={16} />
            <div className="cart-container">
              <Products title="Produtos">
                <div>
                  <AnimatePresence>
                    {cart?.map((item, i) => (
                      <CartItem
                        product={item}
                        index={i}
                        key={item.id}
                        onChangeQuantity={handleChangeQuantity}
                        onRemoveItem={handleRemoveItemFromCart}
                      />
                    ))}
                  </AnimatePresence>
                </div>
                <Divider
                  animate
                  css={{
                    $$delay: cart.length * 150 + 'ms',
                    $$duration: '500ms',
                  }}
                />
                <motion.div
                  initial={{
                    opacity: 0,
                    translateY: 50,
                  }}
                  animate={{
                    opacity: 1,
                    translateY: 0,
                    transition: {
                      duration: 0.35,
                      ease: [0.18, 0.81, 0.38, 0.89],
                      delay: cart.length * 0.2,
                    },
                  }}
                >
                  <Info
                    infos={[
                      `Produtos: ${cart.length ?? 0}`,
                      `Total: ${cart.reduce(
                        (acc, item) => acc + item.quantity,
                        0,
                      )}`,
                    ]}
                  />
                </motion.div>
              </Products>
              <Checkout title="Finalize a compra">
                <PromoForm>
                  <Input
                    type="text"
                    id="promo-code"
                    aria-label="Cupom de desconto"
                    placeholder="Insira seu cupom de desconto"
                  />
                  <Button type="submit" color="primary">
                    Aplicar
                  </Button>
                </PromoForm>
                <Divider />
                <CheckoutInfo total={total} shipping={12} discount={0} />
                <Button type="submit" color="primary">
                  Finalizar compra
                </Button>
              </Checkout>
            </div>
          </Container>
          <Spacer responsive={1} />
        </motion.main>
      </AnimatePresence>
    </>
  );
}

function EmptyCart() {
  return (
    <>
      <Head title="Carrinho" />
      <main
        className={CartStyles()}
        // initial="hidden"
        // animate="visible"
        // exit="hidden"
        // variants={mainElAnimationProps}
        // key="empty"
      >
        <Fill className="cart-fill" display="flex">
          <h1 className="cart-title">Seu carrinho está vazio</h1>
        </Fill>
      </main>
    </>
  );
}

function CheckoutInfo({
  shipping,
  discount,
  total,
}: {
  shipping: number;
  discount: number;
  total: number;
}) {
  const CheckoutInfo = styled('div', {
    display: 'grid',
    gap: '4px',

    '@media (min-width: 1024px)': {
      gap: '8px',
    },
  });

  return (
    <>
      <CheckoutInfo>
        <Info infos={['Frete', toCurrency(shipping)]} variant="medium" />
        <Info infos={['Desconto', toCurrency(discount)]} variant="medium" />
        <Info infos={['Total estimado', toCurrency(total)]} variant="bold" />
      </CheckoutInfo>
    </>
  );
}

function Info({
  infos,
  variant,
}: {
  infos: string[];
  variant?: 'normal' | 'medium' | 'bold';
}) {
  const StyledDiv = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    variants: {
      fontWeight: {
        normal: {
          fontSize: 16,
          fontWeight: 400,
        },
        medium: {
          fontSize: 16,
          fontWeight: 500,
        },
        bold: {
          fontSize: 18,
          fontWeight: 700,
        },
      },
    },

    defaultVariants: {
      fontWeight: 'normal',
    },
  });

  return (
    <StyledDiv fontWeight={variant}>
      {infos.map((info) => (
        <span key={info}>{info}</span>
      ))}
    </StyledDiv>
  );
}
