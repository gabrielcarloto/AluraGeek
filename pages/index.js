import Head from 'next/head';
import React from 'react';
import useSWR from 'swr';
import Banner from '../components/Banner/index';
import Error from '../components/Error/index';
import ProductsGallery from '../components/ProductsGallery/index';
import Spacer from '../components/utils/Spacer';
import Fill from '../components/utils/Fill';

const fetcher = (url) => fetch(url).then((r) => r.json());

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
  const { data, error } = useSWR('/api/products', fetcher);

  if (error) return (
    <>
      <Fill />
      <Error error="Ocorreu um erro. Atualize a página" />
    </>
  );
  
  const products = data;
  
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