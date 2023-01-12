import React, { useState } from 'react';
import type { Product as IProduct } from '@prisma/client';
import { styled } from '@stitches/react';
import { AnimatePresence } from 'framer-motion';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Button from '@components/Button';
import Head from '@components/Head';
import ImageZoom from '@components/ImageZoom';
import Info from '@components/Info';
import ProductsGallery from '@components/ProductsGallery';
import Spacer from '@components/utils/Spacer';
import { useCart } from '@hooks/useLocalStorage';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { BASE_API_URL, fetcher } from '@utils/all';

export default function Product({
  product,
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isMobile = useMediaQuery('1024px');

  // similar products:
  // - remove the current product from the list
  // - get products from the same category
  // - if there is less than 6 products, get more from other categories
  const filteredProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );

  const similarProducts =
    filteredProducts.length < 6
      ? filteredProducts.concat(
          products
            .filter((p) => p.category !== product.category)
            .slice(0, 6 - filteredProducts.length),
        )
      : filteredProducts;

  // image zoom
  const [zoom, setZoom] = useState(false);
  function handleClick() {
    setZoom(!zoom);
  }

  const [addedToCart, setAddedToCart] = useState(false);
  const [cart, { updateItem }] = useCart();

  console.log(cart);
  const productInCart = Array.isArray(cart)
    ? cart.find((p) => p.id === product.id)
    : undefined;
  const totalProducts = productInCart?.quantity ?? 0;

  function addToCart() {
    if (productInCart) {
      updateItem((cart) =>
        cart.map((c) => {
          if (c.id !== product.id) return c;

          return { ...c, quantity: c.quantity + 1 };
        }),
      );
    } else {
      updateItem((cart) => cart.concat({ ...product, quantity: 1 }));
    }
  }

  const Product = styled('main', {
    display: 'flex',
    flexDirection: 'column',
    padding: '0',

    '@media (min-width: 768px)': {
      flexDirection: 'row',
      marginTop: '32px',

      '@media (orientation: portrait)': {
        padding: '0px 35px',
      },

      '@media (orientation: landscape)': {
        padding: '0px 152px',
      },
    },

    '@media (min-width: 1024px)': {
      marginTop: '64px',
      alignItems: 'center',
    },

    '.product-image': {
      width: '100vw',
      height: '250px',
      position: 'relative',
      cursor: 'zoom-in',

      '@media (min-width: 768px)': {
        width: '70%',
        height: 'auto',
        margin: '0',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      },

      '@media (min-width: 1024px)': {
        width: '50%',
        height: 'auto',
        minHeight: '400px',
      },
    },

    '.product-info': {
      width: '100%',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '$lightBackground',

      '@media (min-width: 1024px)': {
        height: '100vh',
        maxHeight: '400px',
        justifyContent: 'space-evenly',
      },

      '.product-title': {
        fontSize: '22px',
        fontWeight: '500',
        marginBottom: '8px',

        '@media (min-width: 768px)': {
          fontSize: '28px',
        },

        '@media (min-width: 1024px)': {
          fontSize: '52px',
        },
      },

      '.product-details': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '8px',

        '.product-price': {
          fontSize: '16px',
          fontWeight: '700',
        },

        '.product-category': {
          fontSize: '14px',
          fontWeight: '500',
          color: '$primary',
          textTransform: 'capitalize',

          '@media (min-width: 1024px)': {
            fontSize: '16px',
          },
        },
      },

      '.product-description': {
        fontSize: '14px',
        fontWeight: '400',
        marginBottom: '8px',

        '@media (min-width: 1024px)': {
          fontSize: '16px',
        },
      },

      '.product-button': {
        alignSelf: 'flex-end',
        width: '50%',

        '@media (min-width: 768px)': {
          width: '100%',
          justifySelf: 'flex-end',
        },

        '@media (min-width: 1440px)': {
          width: '50%',
        },
      },
    },
  });

  return (
    <>
      <Head title={product.name} description={product.description} />

      <Product
        className="product"
        onScroll={() => {
          if (zoom) handleClick;
        }}
      >
        <div className="product-image" id="zoom-in" onClick={handleClick}>
          <Image
            src={product.image}
            layout="fill"
            objectFit="cover"
            alt={product.alt}
          />
          <label htmlFor="zoom-in" className="scr-only">
            Clique para ampliar
          </label>
        </div>

        <ImageZoom
          zoom={zoom}
          setZoom={setZoom}
          img={product.image}
          alt={product.alt}
        />

        <div className="product-info">
          <article>
            <h1 className="product-title">{product.name}</h1>
            <div className="product-details">
              <p className="product-price">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
              <Link
                passHref
                href={`/products/${product.category.replace(/ /g, '-')}`}
              >
                <a className="product-category">{product.category}</a>
              </Link>
            </div>
            <p className="product-description">
              {product.description ||
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.`}
            </p>
          </article>
          <Button
            className="product-button"
            color="primary"
            onClick={addToCart}
          >
            Adicionar ao carrinho {totalProducts > 0 && `(${totalProducts})`}
          </Button>
        </div>
      </Product>
      <Spacer responsive="2" />
      <ProductsGallery
        title="Produtos similares"
        link={product.category}
        products={similarProducts.slice(0, isMobile ? 4 : 6)}
      />
      <Spacer responsive="1" />
      <AnimatePresence>
        {addedToCart && (
          <Info
            title="Produto adicionado ao carrinho"
            state={addedToCart}
            setState={setAddedToCart}
            close
          >
            Para finalizar a compra,{' '}
            <Link passHref href="/cart">
              <span style={{ cursor: 'pointer' }}>vá até o carrinho</span>
            </Link>
            .
          </Info>
        )}
      </AnimatePresence>
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  product: IProduct;
  products: IProduct[];
}> = async ({ params }) => {
  const param = params as unknown as { id: number };

  const product: IProduct = await fetcher(
    `${BASE_API_URL}/products/${param.id}`,
  ); // ! possible error if params is undefined or the id doesnt exist
  const products: IProduct[] = await fetcher(`${BASE_API_URL}/products`);

  return {
    props: {
      product,
      products,
    },
  };
};

export async function getStaticPaths() {
  const res = await fetcher<IProduct[]>(`${BASE_API_URL}/products`);
  const paths = res.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}
