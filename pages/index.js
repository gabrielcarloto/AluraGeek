import Head from 'next/head'
import React from 'react';
import useSWR from 'swr';
import Banner from '../components/Banner/index'
import ProductsGallery from '../components/ProductsGallery/index'
import Spacer from '../components/utils/Spacer'

const fetcher = (url) => fetch(url).then(res => res.json());

export default function Home() {
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

  // get products from api
  const data = useSWR('/api/products', fetcher);
  const products = data.data;

  // filter products by category
  function filter(category) {
    return products ? products.filter(product => product.category === category) : [];
  }

  const starWars = filter('star wars');
  const consoles = filter('consoles');
  const others = filter('outros');

  return (
    <>
      <Head>
        <title>AluraGeek</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Banner />
      <Spacer responsive={1} />
      <ProductsGallery title="Star Wars" products={starWars.slice(0, isMobile ? 4 : 6)} />
      <Spacer responsive={2} />
      <ProductsGallery title="Console" products={consoles.slice(0, isMobile ? 4 : 6)} />
      <Spacer responsive={2} />
      <ProductsGallery title="Outros" products={others.slice(0, isMobile ? 4 : 6)} />
      <Spacer responsive={1} />
    </>
  );
};