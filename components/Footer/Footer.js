import Link from 'next/link';
import { styled } from "@stitches/react";
import Grid from '../Grid';
import Spacer from "../Spacer";
import Container from "../Container";
import { Form, formStyles } from "./Form";

function Footer() {
  const Footer = styled('footer', {
    ...formStyles,
    backgroundColor: '#EAF2FD',

    [`${Grid}`]: {
      '@media (min-width: 1024px)': {
        rowGap: '0',
      },
    },

    '.footer-logo': {
      gridColumn: '1 / -1',
      margin: '0 auto',

      '@media (min-width: 768px)': {
        gridColumn: '1 / 3',
        margin: '0',
      },
    },

    '.footer-links': {
      listStyleType: 'none',
      textAlign: 'center',
      marginBottom: '16px',
      gridColumn: '1 / -1',

      '@media (min-width: 768px)': {
        textAlign: 'left',
        gridColumn: '1 / 5',
      },

      '@media (min-width: 1024px)': {
        gridColumn: '4 / 6',
        marginBottom: '0',
      },

      'li': {
        cursor: 'pointer',
      },
    },

    '.dev': {
      backgroundColor: '#FFFFFF',
      fontFamily: 'Raleway',
      fontSize: '16px',
      fontWeight: '500',
      color: '#464646',
      textAlign: 'center',
    }
  });

  return (
    <Footer>
      <Spacer responsive={1} />
      <Container>
        <Grid>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Logo.svg" alt="logo alura geek" className="footer-logo" />
          <ul className="footer-links">
            <li>
              <Link passHref href="/">
                <p>Quem somos</p>
              </Link>
            </li>
            <Spacer responsive={3} />
            <li>
              <Link passHref href="/">
                <p>Política de Privacidade</p>
              </Link>
            </li>
            <Spacer responsive={3} />
            <li>
              <Link passHref href="/">
                <p>Programa fidelidade</p>
              </Link>
            </li>
            <Spacer responsive={3} />
            <li>
              <Link passHref href="/">
                <p>Nossas lojas</p>
              </Link>
            </li>
            <Spacer responsive={3} />
            <li>
              <Link passHref href="/">
                <p>Quero ser franqueado</p>
              </Link>
            </li>
            <Spacer responsive={3} />
            <li>
              <Link passHref href="/">
                <p>Anuncie aqui</p>
              </Link>
            </li>
          </ul>
          <Form />
        </Grid>
      </Container>
      <Spacer responsive={1} />
      <div className="dev">
        <Spacer y={32} />
        <p>
          Desenvolvido por Gabriel Carloto
        </p>
        <p>
          2022
        </p>
        <Spacer y={32} />
      </div>
    </Footer>
  )
}

export default Footer;