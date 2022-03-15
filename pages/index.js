import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { styled, css } from '@stitches/react'
import Header from '../components/Header'
import Button from '../components/Button'
import Container from '../components/Container'


export default function Home() {
  function Banner() {
    const Banner = styled('section', {
      width: '100vw',
      height: '100vh',
      maxHeight: '352px',
      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 41.15%, rgba(0, 0, 0, 0.8) 100%), url(/banner.jpg) no-repeat center',
      backgroundSize: 'cover',

      '.banner-container': {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column',

        '.banner-title': {
          fontSize: '22px',
          fontWeight: '700',
          lineHeight: '26px',
          color: '#FFFFFF',
          marginTop: '0',
          marginBottom: '8px',

          '@media (min-width: 768px)': {
            fontSize: '52px',
            lineHeight: '60px',
            marginBottom: '16px',
          },
        },

        '.banner-subtitle': {
          fontSize: '14px',
          fontWeight: '600',
          lineHeight: '16px',
          color: '#FFFFFF',
          marginTop: '0',
          marginBottom: '8px',

          '@media (min-width: 768px)': {
            fontSize: '22px',
            lineHeight: '26px',
            marginBottom: '16px',
          },
        },
      },
    })

    return (
      <Banner>
        <Container className="banner-container">
          <h1 className="banner-title">
            Dezembro Promocional
          </h1>
          <h2 className="banner-subtitle">
            Produtos selecionados com 33% de desconto
          </h2>
          <div>
            <Link passHref href="/">
              <Button color="primary" css={{
                width: 'clamp(119px, 10vw, 130px)',
                marginBottom: '16px',

                '@media (min-width: 768px)': {
                  marginBottom: '32px',
                },
              }}>
                Ver Consoles
              </Button>
            </Link>
          </div>
        </Container>
      </Banner>
    )
  }

  return (
    <>
      <Head>
        <title>AluraGeek</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />
    </>
  )
}
