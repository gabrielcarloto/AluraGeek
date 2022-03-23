import React from 'react';
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import { styled } from '@stitches/react';
import Spacer from '../../components/utils/Spacer';
import Button from '../../components/Button/index';
import ProductsGallery from '../../components/ProductsGallery/index';

const fetcher = (url) => fetch(url).then(res => res.json());
const baseURL = 'https://alura-geek-mocha.vercel.app/api'

export default function Product({ product, products }) {
  // similar products:
  // - remove the current product from the list
  // - get products from the same category
  // - if there is less than 6 products, get more from other categories
  const filteredProducts = products.filter(p => p.category === product.category && p.id !== product.id);
  const similarProducts = filteredProducts.length < 6 
  ? filteredProducts.concat(products.filter(p => p.category !== product.category).slice(0, 6 - filteredProducts.length))
  : filteredProducts;

  // check if is mobile
  const [ isMobile, setIsMobile ] = React.useState(false);

  React.useEffect(() => {
    const mobile = window.matchMedia('(max-width: 1024px)');
    
    const handleMobile = (e) => {
      setIsMobile(e.matches);
    };
    
    mobile.addEventListener('change', handleMobile(mobile));

    return () => {
      mobile.removeEventListener('change', handleMobile(mobile));
    };
  }, []);

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

      '@media (min-width: 768px)': {
        width: '70%',
        height: 'auto',
        margin: '0',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      },

      '@media (min-width: 1024px)': {
        width: '50%',
        minWidth: '560px',
        height: 'auto',
        minHeight: '400px',
      },
    },

    '.product-info': {
      width: '100%',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',

      '@media (min-width: 1024px)': {
        height: '100vh',
        maxHeight: '400px',
        justifyContent: 'center',
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
          color: '#2A7AE4',
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
        },

        '@media (min-width: 1024px)': {
          width: '50%',
        },
      }
    },
  });

  return (
    <>
      <Head>
        <title>AluraGeek</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Product className="product">
        <div className="product-image">
          <Image src={product.image} layout="fill" objectFit="cover" alt={product.alt} />
        </div>
        <article className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <div className="product-details">
            <p className="product-price">{parseInt(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            <Link passHref href={`/products/${(product.category).replace(/ /g, '-')}`}>
              <a className="product-category">{product.category}</a>
            </Link>
          </div>
          <p className="product-description">{product.description || `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.`}</p>
          <Button className="product-button" color="primary">
            Adicionar ao carrinho
          </Button>
        </article>
      </Product>
      <Spacer responsive="2" />
      <ProductsGallery title="Produtos similares" products={similarProducts.slice(0, isMobile ? 4 : 6)} />
      <Spacer responsive="1" />
    </>
  );
}

export async function getStaticProps({ params }) {	
  const product = await fetcher(`${baseURL}/products/${params.id}`);
  const products = await fetcher(`${baseURL}/products`);

  return {
    props: {
      product,
      products,
    },
  };
};

export async function getStaticPaths() {
  const res = await fetcher(`${baseURL}/products`);

  return {
    paths: res.map(product => ({ params: { id: product.id } })),
    fallback: false,
  }
}