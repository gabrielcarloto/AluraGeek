import React from 'react';
import { FaMinus, FaPlus, FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import type { Product } from '@prisma/client';
import { AnimatePresence, motion } from 'framer-motion';
import type { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Button from '@components/Button';
import Input from '@components/Inputs/Input';
import Container from '@components/utils/Container';
import Fill from '@components/utils/Fill';
import Grid from '@components/utils/Grid';
import Spacer from '@components/utils/Spacer';
import type { Cart, CartProducts } from '@types';
import { BASE_URL, fetcher } from '@utils/all';

import CartStyles, { mainElAnimationProps } from './Cart.styles';

export default function Cart({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [cartItems, setCartItems] = React.useState<CartProducts>();
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [animationEnded, setAnimationEnded] = React.useState(false);

  React.useEffect(() => {
    if (!cartItems || !cartItems.length) return;

    const total = cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    setTotal(total + 12);
  }, [cartItems]);

  React.useEffect(() => {
    const lsCart = localStorage.getItem('cart');
    if (!lsCart || !products) return;

    const cart = JSON.parse(lsCart) as Cart;

    if (!cart || !cart.products?.length) {
      setIsEmpty(true);
      return;
    }

    const items = cart.products
      .map((item) => {
        const product = products.find((p) => p.id === item.id);

        if (!product) return undefined;

        return {
          ...product,
          quantity: item.quantity,
        };
      })
      .filter(Boolean) as CartProducts; // TODO: remove type casting

    setCartItems(items);
  }, [products]);

  setTimeout(() => {
    setAnimationEnded(true);
  }, (cartItems?.length ?? 0) * 200);

  function handleAddOrSubtract(id: string, method: 'add' | 'subtract') {
    if (!cartItems) return;

    const newCart = cartItems.map((item) => {
      if (item.id === id) {
        if (method === 'subtract' && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        } else if (method === 'add') {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
      }
      return item;
    });

    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify({ products: newCart }));
  }

  function removeFromCart(id: string) {
    if (!cartItems) return;

    const newCart = cartItems.filter((item) => item.id !== id);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify({ products: newCart }));

    if (newCart.length === 0) setIsEmpty(true);
  }

  return (
    <>
      <Head>
        <title>Carrinho | AluraGeek</title>
      </Head>
      <AnimatePresence exitBeforeEnter>
        {isEmpty ? (
          <motion.main
            className={CartStyles(cartItems?.length ?? 0, animationEnded)()}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mainElAnimationProps}
            key="empty"
          >
            <Fill className="cart-fill" display="flex">
              <h1 className="cart-title">Seu carrinho está vazio</h1>
            </Fill>
          </motion.main>
        ) : (
          <motion.main
            className={CartStyles(cartItems?.length ?? 0, animationEnded)()}
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
                      {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
                      {cartItems!.map((item, i) => (
                        <motion.li
                          className="cart-product"
                          key={item.id}
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
                              delay: i * 0.2,
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
                          <Link passHref href={`/products/${item.id}`}>
                            <div className="cart-product-image">
                              <Image
                                src={item.image}
                                layout="fill"
                                objectFit="cover"
                                alt={item.alt}
                              />
                            </div>
                          </Link>
                          <Grid className="cart-product-details">
                            <Link passHref href={`/products/${item.id}`}>
                              <h3 className="cart-product-name">
                                <a>{item.name}</a>
                              </h3>
                            </Link>
                            <div className="cart-product-price">
                              <span>
                                <strong>
                                  {parseInt(String(item.price)).toLocaleString(
                                    'pt-BR',
                                    { style: 'currency', currency: 'BRL' },
                                  )}
                                </strong>
                                cada
                              </span>
                              <span>
                                <strong>
                                  {parseInt(
                                    String(item.price * item.quantity),
                                  ).toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                  })}
                                </strong>
                                no total
                              </span>
                            </div>
                            <div className="cart-product-quantity">
                              <button
                                className="cart-product-quantity-button"
                                onClick={() =>
                                  handleAddOrSubtract(item.id, 'subtract')
                                }
                              >
                                <FaMinus />
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                className="cart-product-quantity-button"
                                onClick={() =>
                                  handleAddOrSubtract(item.id, 'add')
                                }
                              >
                                <FaPlus />
                              </button>
                              <button
                                className="cart-product-quantity-button remove"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <FaTrashAlt />
                              </button>
                            </div>
                          </Grid>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </div>
                  <hr className="divider" />
                  <div className="cart-total-items">
                    <span>Produtos: {cartItems?.length ?? 0}</span>
                    <span>
                      Total:{' '}
                      {cartItems?.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  </div>
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
                  <hr className="divider" />
                  <div className="cart-checkout-total">
                    <div className="cart-checkout-total shipping">
                      <span className="cart-checkout-total--text">Frete</span>
                      <span className="cart-checkout-total--text">
                        R$ 12,00
                      </span>
                    </div>
                    <div className="cart-checkout-total discount">
                      <span className="cart-checkout-total--text">
                        Desconto
                      </span>
                      <span className="cart-checkout-total--text">0,00</span>
                    </div>
                    <div className="cart-checkout-total estimated">
                      <span className="cart-checkout-total--text estimated">
                        Total estimado
                      </span>
                      <span className="cart-checkout-total--text estimated">
                        {total.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </span>
                    </div>
                  </div>
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
        )}
      </AnimatePresence>
    </>
  );
}

export async function getStaticProps() {
  const products = await fetcher<Product[]>(`${BASE_URL}/products`);
  return { props: { products } };
}
