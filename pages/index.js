import Head from 'next/head'
import Image from 'next/image'
import { styled } from '@stitches/react'

export default function Home() {
  function Header() {
    const Header = styled('header', {
      display: 'flex',
      width: '100vw',
      height: '115px',
      backgroundColor: '#ffffff',

      '.container': {
        margin: '0 auto',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        
        '.left': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',

          '.logo': {
            width: '100px',
            height: '28px',
  
            '@media (min-width: 768px)': {
              width: '176px',
              height: '50px',
            },
          },

          'form': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
  
          '.search': {
            height: '40px',
            width: '400px',
            marginLeft: '32px',
            border: 'none',
            borderRadius: '20px',
            padding: '0 20px',
            fontFamily: 'Raleway',
            fontSize: '14px',
            fontWeight: '400',
            color: '#A2A2A2',
            backgroundColor: '#F5F5F5',
            outline: 'none',
            // transition: 'all 200ms ease-in-out',

            '&:focus': {
              outlineStyle: 'solid',
              outlineWidth: '2px',
              outlineColor: '#A2A2A2',
            },
          },

          '.submit-btn': {
            border: 'none',
            backgroundColor: 'transparent',
            color: 'transparent',
            outline: 'none',
            cursor: 'pointer',
            marginLeft: '-60px',
            background: 'url(/search.svg) no-repeat center',
          }
        },
      },
    })
    
    return (
      <Header>
        <div className="container">
          <div className="left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="logo" src="/Logo.svg" alt="logo da empresa" />
            <form>
              <input className="search" type="text" placeholder="O que deseja encontrar?" />
              <button className="submit-btn" type="submit" alt="asdfasd">
                Pesquisar
              </button>
            </form>
          </div>
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
