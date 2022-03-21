import Head from 'next/head'
import React from 'react';
import Banner from '../components/Banner/index'
import ProductsGallery from '../components/ProductsGallery/index'
import Spacer from '../components/utils/Spacer'
import products from './api/products'


export default function Home() {
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

  return (
    <>
      <Head>
        <title>AluraGeek</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Banner />
      <Spacer responsive={1} />
      <ProductsGallery title="Star Wars" products={products.starWars.slice(0, isMobile ? 4 : 6)} />
      <Spacer responsive={2} />
      <ProductsGallery title="Console" products={products.consoles.slice(0, isMobile ? 4 : 6)} />
      <Spacer responsive={2} />
      <ProductsGallery title="Outros" products={products.other.slice(0, isMobile ? 4 : 6)} />
      <Spacer responsive={1} />
    </>
  )
}
