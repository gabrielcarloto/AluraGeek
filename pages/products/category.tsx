import type { Product as IProduct } from '@prisma/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import Error from '@components/Error';
import Product from '@components/Product/index';
import ProductSkeleton from '@components/Product/ProductSkeleton';
import ProductsTitle from '@components/ProductsGallery/ProductsTitle';
import Container from '@components/utils/Container';
import Fill from '@components/utils/Fill';
import Grid from '@components/utils/Grid';
import Spacer from '@components/utils/Spacer';
import { fetcher } from '@utils/fetch';

export default function Category() {
  const router = useRouter();
  const { q: category } = router.query;

  const { data, error } = useSWR<IProduct[]>(
    `/api/products/category/${category}`,
    fetcher,
  );

  if (error)
    return (
      <>
        <Fill />
        <Error error="Ocorreu um erro. Atualize a página" />
      </>
    );

  const products = data || [];
  const title = !category
    ? ''
    : (category as string).replace(/\w\S*/g, (w) =>
        w.replace(/^\w/, (c) => c.toUpperCase()),
      );

  return (
    <>
      <Head>
        <title>{title} | AluraGeek</title>
      </Head>
      <Spacer responsive={1} />
      <Container>
        <ProductsTitle title={title} all />
        <Grid>
          {products.length > 0 ? (
            products.map((product) => (
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
