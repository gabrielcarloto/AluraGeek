import React from 'react';
import Link from 'next/link'
import { css } from '@stitches/react';
import Button from "../Button/index";
import Container from '../utils/Container';
import Input from '../Inputs/Input';

function Header({ loginBtn }) {
  const headerSearchMobile = React.useRef(null);
  const headerForm = React.useRef(null);

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
  
      '.header-logo': {
        width: '100px',
        height: '28px',
        cursor: 'pointer',

        '@media (min-width: 768px)': {
          width: '176px',
          height: '50px',
        },
      },

      '.header-form': {
        height: '72px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'absolute',
        top: '-72px',
        left: '0',
        transition: 'all 200ms ease-in-out',
        
        '.header-search': {
          width: '60%',
        },

        '.header-search-icon': {
          width: '18px',
          height: '18px',
          display: 'block',
          marginLeft: '-28vw',
          background: 'url(/search.svg) no-repeat center',
          backgroundColor: 'transparent',
          color: 'transparent',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          transition: 'all 200ms ease-in-out',

          '@media (min-width: 768px)': {
            marginLeft: '-35px',
          },

          '&:focus': {
            transform: 'scale(1.2)',
          },
        },

        '.header-close-icon': {
          width: '16px',
        },

        '&.active': {
          top: '0',
        },

        '@media (min-width: 768px)': {
          display: 'flex',
          width: 'auto',
          position: 'static',
          alignItems: 'center',
          justifyContent: 'center',

          '.header-search': {
            display: 'block',
            width: 'clamp(300px, 30vw, 400px)',
            maxWidth: '400px',
          },
        },
      },

      '.desktop': {
        display: 'none',
      },
  
      '@media (min-width: 768px)': {
        '.mobile': {
          display: 'none',
        },
  
        '.desktop': {
          display: 'block',
        },
      },
    },
  
    '.header-login': {
      width: '100px',

      '@media (min-width: 768px)': {
        width: '176px',
      },
    },

    '.header-search--mobile': {
      width: '100vw',
      height: '72px',
      position: 'absolute',
      top: '-72px',
      left: '0',
      backgroundColor: '#FFFFFF',
      transition: 'all 200ms ease-in-out',

      '&.active': {
        top: '0',
      },
    },
  })

  function Form() {
    function toggleClass() {
      headerSearchMobile.current.classList.toggle('active');
      headerForm.current.classList.toggle('active');
    }

    return (
      <>
        <form className="header-form" ref={headerForm}>
          <label className="scr-only" htmlFor="header-search">O que deseja encontrar?</label>
          <Input 
            className="header-search"
            id="header-search"
            color="grey"
            type="text"
            placeholder="O que deseja encontrar?"
          />
          <button className="header-search-icon desktop" type="submit">
            Pesquisar
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            className="header-close-icon mobile"
            src="/close.svg"
            alt="fechar"
            onClick={toggleClass}
          />
        </form>
        <div 
          className="header-search-icon mobile"
          onClick={toggleClass}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/search.svg" alt="ícone de pesquisa" />
        </div>
      </>
    );
  };

  return (
    <header className={Header()}>
      <Container className="header-container">
        <div className="header-search--mobile" ref={headerSearchMobile} />
        <Link passHref href="/" >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="header-logo" src="/Logo.svg" alt="logo da empresa alurageek" />
        </Link>
        <Form />
        { loginBtn && (
          <Link passHref href="/login">
            <Button className="header-login" color="secondary">
              Login
            </Button>
          </Link>
        )}
      </Container>
    </header>
  )
}

export default Header;