import Link from 'next/link'
import Image from 'next/image';
import { css } from '@stitches/react';
import Button from "../Button/index";
import Container from '../utils/Container';
import Input from '../Inputs/Input';

function Header() {
  const Header = css({
    display: 'flex',
    width: '100vw',
    height: '72px',
    backgroundColor: '#ffffff',
  
    '@media (min-width: 768px)': {
      height: '115px',
    },
  
    '.header-container': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      
      '.header-left-content': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
  
        '.header-logo': {
          width: '100px',
          height: '28px',
          cursor: 'pointer',
  
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
  
        '.header-search': {
          display: 'none',
          
          '@media (min-width: 768px)': {
            display: 'block',
            width: 'clamp(300px, 30vw, 400px)',
            maxWidth: '400px',
          },
        },
      },
  
      '.header-search-icon--desktop': {
        display: 'none',
      },
  
      '@media (min-width: 768px)': {
        '.header-search-icon--mobile': {
          display: 'none',
        },
  
        '.header-search-icon--desktop': {
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
          transition: 'all 200ms ease-in-out',
  
          '&:focus': {
            transform: 'scale(1.2)',
          },
        },
      },
    },
  
    '.header-login': {
      width: 'clamp(133px, 15vw, 182px)'
    }
  })

  return (
    <header className={Header()}>
      <Container className="header-container">
        <div className="header-left-content">
          <Link passHref href="/" >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="header-logo" src="/Logo.svg" alt="logo da empresa alurageek" />
          </Link>
          <form>
            <label className="scr-only" htmlFor="header-search">O que deseja encontrar?</label>
            <Input className="header-search" id="header-search" color="grey" type="text" placeholder="O que deseja encontrar?" />
            <button className="header-search-icon--desktop" type="submit">
              Pesquisar
            </button>
          </form>
        </div>
        <Link passHref href="/login">
          <Button className="header-login" color="secondary">
            Login
          </Button>
        </Link>
        <div className="header-search-icon--mobile">
          <Image src="/search.svg" width="17" height="17" alt="ícone de busca" />
        </div>
      </Container>
    </header>
  )
}

export default Header;