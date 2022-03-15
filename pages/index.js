import Head from 'next/head'
import { styled } from '@stitches/react'

export default function Home() {
  function Header() {
    const Header = styled('header', {
      display: 'flex',
      width: '100vw',
      height: '115px',
      backgroundColor: '#ffffff',

      '.content': {
        margin: '0 auto',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        
        'img': {
          width: '100px',
          height: '28px',
          
          '@media (min-width: 768px)': {
            width: '176px',
            height: '50px',
          }
        }
      }
    })
    
    return (
      <Header>
        <div className="content">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Logo.svg" alt="logo" />
        </div>
      </Header>
    )
  }

  return (
    <>
      <Head>
        <title>AluraGeek</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
    </>
  )
}
