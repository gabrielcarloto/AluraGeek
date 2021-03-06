import Head from "next/head";
import React from "react";
import useSWR from "swr";
import Banner from "../components/Banner/index";
import Error from "../components/Error/index";
import ProductsGallery from "../components/ProductsGallery/index";
import Spacer from "../components/utils/Spacer";
import Fill from "../components/utils/Fill";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Home() {
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);

  React.useEffect(() => {
    const screen = window.matchMedia("(max-width: 1400px)");

    const handleChange = (e) => {
      setIsSmallScreen(e.matches);
    };

    screen.addEventListener("change", handleChange(screen));

    return () => {
      screen.removeEventListener("change", handleChange(screen));
    };
  }, []);

  // get products from api
  const { data, error } = useSWR("/api/products", fetcher);

  if (error)
    return (
      <>
        <Fill />
        <Error error="Ocorreu um erro. Atualize a página" />
      </>
    );

  const products = data;

  // filter products by category
  function filter(category) {
    return products
      ? products.filter((product) => product.category === category)
      : [];
  }

  const starWars = filter("star wars");
  const consoles = filter("consoles");
  const others = filter("outros");

  return (
    <>
      <Head>
        <title>AluraGeek</title>
        <meta
          name="description"
          content="Na AluraGeek você encontra os melhores produtos do universo geek e descontos imperdíveis!"
        />
        <meta property="og:title" content="AluraGeek" />
        <meta
          property="og:description"
          content="Na AluraGeek você encontra os melhores produtos do universo geek e descontos imperdíveis!"
        />
      </Head>

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
