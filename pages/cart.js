import React from "react";
import Image from "next/image";
import Link from "next/link";
import { css } from "../styles/theme";
import { AnimatePresence, motion } from "framer-motion";
import { FaShoppingCart, FaPlus, FaMinus, FaTrashAlt } from "react-icons/fa";
import Input from "../components/Inputs/Input";
import Button from "../components/Button";
import Container from "../components/utils/Container";
import Spacer from "../components/utils/Spacer";
import Fill from "../components/utils/Fill";
import Grid from "../components/utils/Grid";

const fetcher = (url) => fetch(url).then(r => r.json());
const dev = process.env.NODE_ENV !== 'production';
const baseURL = dev ? 'http://localhost:3000/api' : 'https://alura-geek-mocha.vercel.app/api';

export default function Cart({ products }) {
  const [cartItems, setCartItems] = React.useState([]);
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [animationEnded, setAnimationEnded] = React.useState(false);

  React.useEffect(() => {
    if (cartItems.length == 0) return

    const total = cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    setTotal(total + 12);
  }, [cartItems]);

  React.useEffect(() => {
    const lsCart = localStorage.getItem("cart");

    const cart = JSON.parse(lsCart);

    if (!cart || cart.products.length == 0) {
      setIsEmpty(true);
      return;
    };

    let items = cart.products.map(item => {
      const product = products.find(p => p.id === item.id);
      return {
        ...product,
        quantity: item.quantity,
      };
    });

    setCartItems(items);
  }, [cartItems, products, setAnimationEnded]);

  setTimeout(() => {
    setAnimationEnded(true);
  }, cartItems.length * 200);

  function handleAddOrSubtract(id, method) {
    const newCart = cartItems.map(item => {
      if (item.id === id) {
        if (method === "subtract" && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        } else if (method === "add") {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
      }
      return item;
    });

    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify({ products: newCart }));
  }

  function removeFromCart(id) {
    const newCart = cartItems.filter(item => item.id !== id);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify({ products: newCart }));
    
    if (newCart.length === 0) setIsEmpty(true);
  };

  const Cart = css({
    width: '100%',
    minHeight: '50vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',

    '@media (min-width: 768px)': {
      '.cart-container': {
        display: 'flex',
        flexDirection: 'row',
      },
    },

    '.cart-title': {
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '10px',

      '&.empty': {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      },

      'h1': {
        fontSize: '22px',
      },

      'svg': {
        fontSize: '22px',
      },

      '@media (min-width: 1024px)': {
        gap: '15px',

        'h1': {
          fontSize: '32px',
        },

        'svg': {
          fontSize: '32px',
        },
      },
    },

    '.cart-container': {
      minHeight: '40vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',

      '@media (min-width: 768px)': {
        gap: '32px',
      },

      '@media (min-width: 1024px)': {
        height: 'auto',
        flexDirection: 'row',
      },

      '.divider': {
        height: '0',
        border: '1px solid $border',
      },

      '.cart-products': {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        
        '@media (min-width: 1024px)': {
          alignSelf: 'flex-start',
        },

        '.products': {
          height: cartItems.length * 168.5 + 'px',
          transition: animationEnded ? 'height 300ms ease-in-out' : 'none',
          transitionDelay: '300ms',
        },
        
        '.cart-product': {
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          padding: '5px',
          marginBottom: '8px',
          backgroundColor: '$white',
  
          '.cart-product-image': {
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
          },
  
          '.cart-product-details': {
            padding: '16px 0',
            flex: '1',
            gap: '8px',

            '@media (min-width: 1024px)': {
              padding: '16px 8px',
            },
  
            '.cart-product-name': {
              fontSize: '16px',
              fontWeight: '600',
              gridColumn: '1 / -1',
              gridRow: '1',

              '@media (min-width: 1024px)': {
                fontSize: '18px',
              },
            },
  
            '.cart-product-price': {
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
              
              'span': {
                fontSize: '16px',
                display: 'flex',
                gap: '4px',
              },
  
              'strong': {
                fontWeight: '700',
              }
            },
  
            '.cart-product-quantity': {
              fontSize: '16px',
              fontWeight: '700',
              gridColumn: '1 / -1',
              gridRow: '3',
              display: 'flex',
              alignItems: 'center',
              alignSelf: 'flex-end',
              justifySelf: 'flex-end',
  
              '.cart-product-quantity-button': {
                width: '30px',
                height: '30px',
                margin: '0 5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                borderRadius: '50%',
                backgroundColor: '$secondary',
                color: '$primary',
                cursor: 'pointer',
                transition: 'all 100ms ease-in-out',
  
                '&.remove': {
                  backgroundColor: 'rgba(255, 50, 50, 0.15)',
                  color: '$red',
                },

                '@media (hover: hover) and (pointer: fine)': {
                  '&:hover': {
                    backgroundColor: '$primary',
                    color: '$white',

                    '&.remove': {
                      backgroundColor: '$red',
                      color: '$white',
                    },
                  },
                },
              },
            },
          },
        },

        '.cart-total-items': {
          fontSize: '16px',
          fontWeight: '400',
          marginTop: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      },
  
      '.cart-checkout': {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
  
        '@media (min-width: 1024px)': {
          width: '60%',
          alignSelf: 'flex-start',
          gap: '16px',
          position: 'sticky',
          top: '32px',
        },

        '@media (min-width: 1440px)': {
          width: '50%',
        },
  
        '.cart-checkout-promo': {
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
  
          '.cart-checkout-promo-form': {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
  
            '.cart-checkout-promo-input': {
              width: '100%',
              height: '40px',
              borderRadius: '0',
  
              '@media (min-width: 768px)': {
                height: '50px',
              },
            },
  
            '.cart-checkout-promo-btn': {
              width: '30%',
            },
          },
        },
  
        '.cart-checkout-total': {
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',

          '@media (min-width: 1024px)': {
            gap: '8px',
          },
  
          '.shipping, .discount, .estimated': {
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
  
          '.cart-checkout-total--text': {
            fontSize: '16px',
            fontWeight: '500',
  
            '&.estimated': {
              fontSize: '18px',
              fontWeight: '700',
            },
          },
        },
      },
    },
  });

  return (
    <main className={Cart()}>
      {isEmpty ? (
        <Fill>
          <div className="cart-title empty">
            <h1>Seu carrinho está vazio</h1>
          </div>
        </Fill>
      ) : (
        <>
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
                    {cartItems.map((item, i) => (
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
                          }
                        }}
                        exit={{
                          opacity: 0,
                          translateX: -100,
                          transition: {
                            duration: 0.2,
                            ease: [0.59, 0.14, 0.77, 0.49],
                          }
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
                              <strong>{parseInt(item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
                              cada
                            </span>
                            <span>
                              <strong>{parseInt(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
                              no total
                            </span>
                          </div>
                          <div className="cart-product-quantity">
                            <button className="cart-product-quantity-button" onClick={() => handleAddOrSubtract(item.id, 'subtract')}>
                              <FaMinus />
                            </button>
                            <span>{item.quantity}</span>
                            <button className="cart-product-quantity-button" onClick={() => handleAddOrSubtract(item.id, 'add')}>
                              <FaPlus />
                            </button>
                            <button className="cart-product-quantity-button remove" onClick={() => removeFromCart(item.id)}>
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
                  <span>Produtos: {cartItems.length}</span>
                  <span>Total: {cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
                </div>
              </section>
              <section className="cart-checkout">
                <div className="cart-checkout-promo">
                  <label className="scr-only" htmlFor="promo-code">
                    Insira seu cupom de desconto
                  </label>
                  <form className="cart-checkout-promo-form">
                    <Input className="cart-checkout-promo-input" type="text" id="promo-code" placeholder="Insira seu cupom de desconto" />
                    <Button className="cart-checkout-promo-btn" type="submit" color="primary">Aplicar</Button>
                  </form>
                </div>
                <hr className="divider" />
                <div className="cart-checkout-total">
                  <div className="cart-checkout-total shipping">
                    <span className="cart-checkout-total--text">Frete</span>
                    <span className="cart-checkout-total--text">R$ 12,00</span>
                  </div>
                  <div className="cart-checkout-total discount">
                    <span className="cart-checkout-total--text">Desconto</span>
                    <span className="cart-checkout-total--text">0,00</span>
                  </div>
                  <div className="cart-checkout-total estimated">
                    <span className="cart-checkout-total--text estimated">Total estimado</span>
                    <span className="cart-checkout-total--text estimated">{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  </div>
                </div>
                <Button className="cart-checkout-btn" type="submit" color="primary">Finalizar compra</Button>
              </section>
            </div>
          </Container>
          <Spacer responsive={1} />
        </>
      )}
    </main>
  )
};

export async function getStaticProps() {
  const products = await fetcher(`${baseURL}/products`);
  return { props: { products } };
};