import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>AluraGeek</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>AluraGeek</h1>
        <p>
          Aprenda a programar com o <a href="https://www.alura.com.br/">Alura</a>
        </p>
      </main>
    </>
  )
}
