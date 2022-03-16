import { styled, css } from '@stitches/react'
import Image from 'next/image';
import Button from "./Button";
import Container from './Container';

function Header() {
  const Header = styled('header', {
    display: 'flex',
    width: '100vw',
    height: '72px',
    backgroundColor: '#ffffff',

    '@media (min-width: 768px)': {
      height: '115px',
    },

    '.container': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      
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
            marginRight: '48px',
          },
        },

        'form': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },

        '.search': {
          display: 'none',

          '@media (min-width: 768px)': {
            display: 'block',
            height: '40px',
            width: 'clamp(300px, 30vw, 400px)',
            maxWidth: '400px',
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
        },
      },

      '.search-icon--desktop': {
        display: 'none',
      },

      '@media (min-width: 768px)': {
        '.search-icon--mobile': {
          display: 'none',
        },

        '.search-icon--desktop': {
          display: 'block',
          marginLeft: '-35px',
          backgroundColor: 'transparent',
          color: 'transparent',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          background: 'url(/search.svg) no-repeat center',
          width: '18px',
          height: '18px',
        },
      },
    },
  })
  
  return (
    <Header>
      <Container className="container">
        <div className="left">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo" src="/Logo.svg" alt="logo da empresa" />
          <form>
            <input className="search" type="text" placeholder="O que deseja encontrar?" />
            <button className="search-icon--desktop" type="submit">
              Pesquisar
            </button>
          </form>
        </div>
        <Button color="secondary" css={{
          width: 'clamp(133px, 15vw, 182px)'
        }}>
          Login
        </Button>
        <div className="search-icon--mobile">
          <Image src="/search.svg" width="17" height="17" alt="ícone de busca" />
        </div>
      </Container>
    </Header>
  )
}

export default Header;