import React, { ReactNode, useEffect } from 'react';
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

import CartStyles, { mainElAnimationProps } from './Cart.styles';
import { CartItem } from './CartItem';
export default function Cart() {
  const [animationEnded, setAnimationEnded] = React.useState(false);

  const [
    cart,
    {
      updateProductQuantity: handleChangeQuantity,
      removeProduct: handleRemoveItemFromCart,
    },
  ] = useCart();

  useEffect(() => {
    setTimeout(() => {
      setAnimationEnded(true);
    }, (cart?.length ?? 0) * 200);
  }, [cart.length]);

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
          className={CartStyles(cart.length, animationEnded)()}
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
              <section className="cart-products">
                <div className="products">
                  <AnimatePresence>
                    {cart?.map((item, i) => (
                      <CardSlideAnimationWrapper index={i} key={item.id}>
                        <CartItem
                          product={item}
                          onChangeQuantity={handleChangeQuantity}
                          onRemoveItem={handleRemoveItemFromCart}
                        />
                      </CardSlideAnimationWrapper>
                    ))}
                  </AnimatePresence>
                </div>
                <Divider />
                <Info
                  infos={[
                    `Produtos: ${cart.length ?? 0}`,
                    `Total: ${cart.reduce(
                      (acc, item) => acc + item.quantity,
                      0,
                    )}`,
                  ]}
                />
              </section>
              <section className="cart-checkout">
                <div className="cart-checkout-promo">
                  <label className="scr-only" htmlFor="promo-code">
                    Insira seu cupom de desconto
                  </label>
                  <form className="cart-checkout-promo-form">
                    <Input
                      className="cart-checkout-promo-input"
                      type="text"
                      id="promo-code"
                      placeholder="Insira seu cupom de desconto"
                    />
                    <Button
                      className="cart-checkout-promo-btn"
                      type="submit"
                      color="primary"
                    >
                      Aplicar
                    </Button>
                  </form>
                </div>
                <Divider />
                <CheckoutInfo total={total} shipping={12} discount={0} />
                <Button
                  className="cart-checkout-btn"
                  type="submit"
                  color="primary"
                >
                  Finalizar compra
                </Button>
              </section>
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
        className={CartStyles(0, true)()}
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
  return (
    <>
      <div className="cart-checkout-total">
        <Info infos={['Frete', toCurrency(shipping)]} variant="medium" />
        <Info infos={['Desconto', toCurrency(discount)]} variant="medium" />
        <Info infos={['Total estimado', toCurrency(total)]} variant="bold" />
      </div>
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
  const Styled = styled('div', {
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
    <Styled fontWeight={variant}>
      {infos.map((info) => (
        <span key={info}>{info}</span>
      ))}
    </Styled>
  );
}

function CardSlideAnimationWrapper({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  return (
    <motion.li
      className="cart-product"
      initial={{
        opacity: 0,
        translateX: 100,
      }}
      animate={{
        opacity: 1,
        translateX: 0,
        transition: {
          duration: 0.35,
          ease: [0.18, 0.81, 0.38, 0.89],
          delay: index * 0.2,
        },
      }}
      exit={{
        opacity: 0,
        translateX: -100,
        transition: {
          duration: 0.2,
          ease: [0.59, 0.14, 0.77, 0.49],
        },
      }}
      layout
    >
      {children}
    </motion.li>
  );
}
