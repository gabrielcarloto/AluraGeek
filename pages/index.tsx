import React from 'react';
import type { Product } from '@prisma/client';
import useSWR from 'swr';

import Banner from '@components/Banner';
import Error from '@components/Error';
import Head from '@components/Head';
import ProductsGallery from '@components/ProductsGallery';
import Fill from '@components/utils/Fill';
import Spacer from '@components/utils/Spacer';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { fetcher } from '@utils/fetch';

export default function Home() {
  const isSmallScreen = useMediaQuery('1400px');

  const { data, error } = useSWR<Product[]>('/api/products', fetcher);

  if (error)
    return (
      <>
        <Fill />
        <Error error="Ocorreu um erro. Atualize a página" />
      </>
    );

  const products = data;

  function filter(category: string) {
    return products
      ? products.filter((product) => product.category === category)
      : [];
  }

  const starWars = filter('star wars');
  const consoles = filter('consoles');
  const others = filter('outros');

  return (
    <>
      <Head
        title="Página Inicial"
        description="Na AluraGeek você encontra os melhores produtos do universo geek e descontos imperdíveis!"
      />

      <Banner />
      <Spacer responsive={1} />
      <ProductsGallery
        title="Star Wars"
        isSmall={isSmallScreen}
        products={starWars.slice(0, isSmallScreen ? 4 : 6)}
      />
      <Spacer responsive={2} />
      <ProductsGallery
        title="Consoles"
        isSmall={isSmallScreen}
        products={consoles.slice(0, isSmallScreen ? 4 : 6)}
      />
      <Spacer responsive={2} />
      <ProductsGallery
        title="Outros"
        isSmall={isSmallScreen}
        products={others.slice(0, isSmallScreen ? 4 : 6)}
      />
      <Spacer responsive={1} />
    </>
  );
}
