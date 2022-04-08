import Head from "next/head";
import useSWR from "swr";
import ProductsTitle from "../../components/ProductsGallery/ProductsTitle";
import Product from "../../components/Product/index";
import ProductSkeleton from "../../components/Product/ProductSkeleton";
import Container from "../../components/utils/Container";
import Grid from "../../components/utils/Grid";
import Spacer from "../../components/utils/Spacer";
import Fill from "../../components/utils/Fill";
import Error from "../../components/Error";

export default function Products() {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR("/api/products", fetcher);

  if (error) return (
    <>
      <Fill />
      <Error error="Ocorreu um erro. Atualize a página" />
    </>
  );

  const products = data || [];

  return (
    <>
      <Head>
        <title>Todos os produtos | AluraGeek</title>
        <meta property="og:title" content="Todos os produtos | AluraGeek" />
      </Head>
      <Spacer responsive={1} />
      <Container>
        <ProductsTitle title="Todos os produtos" />
        <Grid>
          { products.length > 0 
            ? products.map(product => <Product product={product} key={product.id} />)
            : <ProductSkeleton length={18} />
          }
        </Grid>
      </Container>
      <Spacer responsive={1} />
    </>
  );
};