import Head from "next/head";
import NotFound from "../components/NotFound/index";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Página não encontrada | AluraGeek</title>
      </Head>
      <NotFound />
    </>
  );
}
