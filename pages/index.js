import Head from 'next/head'
import React from 'react';
import Header from '../components/Header'
import Spacer from '../components/Spacer'
import Banner from '../components/Banner'
import ProductsGallery from '../components/Products/ProductsGallery'
import Footer from '../components/Footer/Footer'
import { starWarsProducts, consoleProducts, otherProducts } from './api/products'


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

      <Header />
      <Banner />
      <Spacer responsive={1} />
      <ProductsGallery title="Star Wars" products={starWarsProducts.slice(0, isMobile ? 4 : 6)} />
      <Spacer responsive={2} />
      <ProductsGallery title="Console" products={consoleProducts.slice(0, isMobile ? 4 : 6)} />
      <Spacer responsive={2} />
      <ProductsGallery title="Outros" products={otherProducts.slice(0, isMobile ? 4 : 6)} />
      <Spacer responsive={1} />
      <Footer />
    </>
  )
}
