import Link from 'next/link'
import { css } from '@stitches/react'
import Button from '../Button/index'
import Container from '../utils/Container'

function Banner() {
  const Banner = css({
    width: '100vw',
    height: '100vh',
    maxHeight: '352px',
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, .8) 100%), url(/banner.jpg) no-repeat center top / 200% fixed',

    '@media (min-width: 768px)': {
      backgroundSize: '100%',
    },

    '@media (min-width: 1024px)': {
      backgroundSize: 'cover',
      backgroundPosition: 'center bottom',
    },
    
    '@media (min-width: 1440px)': {
      maxHeight: '400px',
      backgroundPosition: 'center 115%',
    },
  
    '.banner-container': {
      display: 'flex',
      justifyContent: 'flex-end',
      flexDirection: 'column',
  
      '.banner-title': {
        fontSize: '22px',
        fontWeight: '700',
        lineHeight: '26px',
        color: '$white',
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
        color: '$white',
        marginTop: '0',
        marginBottom: '8px',
  
        '@media (min-width: 768px)': {
          fontSize: '22px',
          lineHeight: '26px',
          marginBottom: '16px',
        },
      },
  
      '.banner-btn': {
        width: 'clamp(119px, 10vw, 130px)',
        marginBottom: '16px',
  
        '@media (min-width: 768px)': {
          marginBottom: '32px',
        },
      },
    },
  });

  return (
    <section className={Banner()}>
      <Container className="banner-container">
        <h1 className="banner-title">
          Dezembro Promocional
        </h1>
        <h2 className="banner-subtitle">
          Produtos selecionados com 33% de desconto
        </h2>
        <div>
          <Link passHref href="/products/category?q=consoles">
            <Button color="primary" className="banner-btn">
              Ver Consoles
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  )
}

export default Banner;