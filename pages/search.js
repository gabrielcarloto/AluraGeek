import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import ProductsTitle from "../components/ProductsGallery/ProductsTitle";
import Product from "../components/Product/index";
import ProductSkeleton from "../components/Product/ProductSkeleton";
import Container from "../components/utils/Container";
import Grid from "../components/utils/Grid";
import Spacer from "../components/utils/Spacer";
import Fill from "../components/utils/Fill";
import Error from "../components/Error";
import NotFound from "../components/NotFound";

export default function Search() {
  const router = useRouter();
  const { q: search } = router.query;

  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(`/api/products`, fetcher);

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
