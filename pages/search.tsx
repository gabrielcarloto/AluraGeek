import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

import Error from '../components/Error';
import NotFound from '../components/NotFound';
import Product from '../components/Product/index';
import ProductSkeleton from '../components/Product/ProductSkeleton';
import ProductsTitle from '../components/ProductsGallery/ProductsTitle';
import Container from '../components/utils/Container';
import Fill from '../components/utils/Fill';
import Grid from '../components/utils/Grid';
import Spacer from '../components/utils/Spacer';
import type { Product as IProduct } from '../types';
import { fetcher } from '../utils';

export default function Search() {
  const router = useRouter();
  const { q: search } = router.query;

  const { data, error } = useSWR<IProduct[]>(`/api/products`, fetcher);

  if (!search) {
    return <NotFound />;
  }

  if (error)
    return (
      <>
        <Fill />
        <Error error="Ocorreu um erro. Atualize a página" />
      </>
    );

  const products = data || [];

  const filteredProducts = products.filter((product) => {
    const name = product.name.toLowerCase();
    return name.includes(search.toLowerCase());
  });

  if (filteredProducts.length === 0) {
    return (
      <>
        <Head>
          <title>Pesquisa: &quot;{search}&quot; | AluraGeek</title>
        </Head>
        <Fill display="flex" alignItems="center" justifyContent="center">
          <Container>
            <Spacer responsive={1} />
            <ProductsTitle
              title={`Resultados para a sua pesquisa "${search}"`}
              categoryAll
              search
            />
            <p>
              <i>Não encontramos nada, apenas o vazio do espaço...</i> 🌌
            </p>
            <Spacer responsive={1} />
          </Container>
        </Fill>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Pesquisa: &quot;{search}&quot; | AluraGeek</title>
      </Head>
      <Spacer responsive={1} />
      <Container>
        <ProductsTitle
          title={`Resultados para a sua pesquisa "${search}"`}
          search
          all
        />
        <Grid>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Product product={product} key={product.id} />
            ))
          ) : (
            <ProductSkeleton length={18} />
          )}
        </Grid>
      </Container>
      <Spacer responsive={1} />
    </>
  );
}
