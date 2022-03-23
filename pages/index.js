import Head from 'next/head'
import React from 'react';
import useSWR from 'swr';
import Banner from '../components/Banner/index'
import ProductsGallery from '../components/ProductsGallery/index'
import Spacer from '../components/utils/Spacer'

const fetcher = (url) => fetch(url).then(res => res.json());

export default function Home() {
  // check if is small/medium screen
  const [ isSmall, setIsSmall ] = React.useState(false);

  React.useEffect(() => {
    const screen = window.matchMedia('(max-width: 1400px)');
    
    const handleChange = (e) => {
      setIsSmall(e.matches);
    };
    
    screen.addEventListener('change', handleChange(screen));

    return () => {
      screen.removeEventListener('change', handleChange(screen));
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
      <ProductsGallery title="Star Wars" isSmall={isSmall} products={starWars.slice(0, isSmall ? 4 : 6)} />
      <Spacer responsive={2} />
      <ProductsGallery title="Console" isSmall={isSmall} products={consoles.slice(0, isSmall ? 4 : 6)} />
      <Spacer responsive={2} />
      <ProductsGallery title="Outros" isSmall={isSmall} products={others.slice(0, isSmall ? 4 : 6)} />
      <Spacer responsive={1} />
    </>
  );
};