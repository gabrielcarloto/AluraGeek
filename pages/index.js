import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react';
import { styled, css } from '@stitches/react'
import Header from '../components/Header'
import Spacer from '../components/Spacer'
import Button from '../components/Button'
import Container from '../components/Container'
import Banner from '../components/Banner'
import Grid from '../components/Grid'
import ProductsGallery from '../components/Products/ProductsGallery'
import { starWarsProducts, consoleProducts, otherProducts } from './api/products'


export default function Home() {
  
  const [ isMobile, setIsMobile ] = React.useState(false);

  React.useEffect(() => {
    const mobile = window.matchMedia('(max-width: 1024px)');

    const handleMobile = (e) => {
      setIsMobile(e.matches);
    };
    
    mobile.addEventListener('change', handleMobile);

    return () => {
      mobile.removeEventListener('change', handleMobile);
    };
  }, []);

  return (
    <>
      <Head>
        <title>AluraGeek</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />
      <Spacer />
      <ProductsGallery title="Star Wars" products={starWarsProducts.slice(0, isMobile ? 4 : 6)} />
      <Spacer />
      <ProductsGallery title="Console" products={consoleProducts.slice(0, isMobile ? 4 : 6)} />
      <Spacer />
      <ProductsGallery title="Outros" products={otherProducts.slice(0, isMobile ? 4 : 6)} />
      <Spacer />
    </>
  )
}
