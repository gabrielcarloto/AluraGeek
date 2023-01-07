import Link from 'next/link';
import Grid from '../utils/Grid';
import Spacer from '../utils/Spacer';
import Container from '../utils/Container';
import Form from './Form';

import { FooterStyles } from './Footer.styles';

function Footer() {
  return (
    <footer className={FooterStyles()}>
      <Spacer responsive={1} />
      <Container className="footer-container">
        <Grid className="footer-grid">
          <Link passHref href="/" scroll={false}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="footer-logo"
              src="/Logo.svg"
              alt="logo alura geek"
            />
          </Link>
          <ul className="footer-links">
            <li>
              <Link passHref href="/">
                <a>Quem somos</a>
              </Link>
            </li>
            <li>
              <Link passHref href="/">
                <a>Política de Privacidade</a>
              </Link>
            </li>
            <li>
              <Link passHref href="/">
                <a>Programa fidelidade</a>
              </Link>
            </li>
            <li>
              <Link passHref href="/">
                <a>Nossas lojas</a>
              </Link>
            </li>
            <li>
              <Link passHref href="/">
                <a>Quero ser franqueado</a>
              </Link>
            </li>
            <li>
              <Link passHref href="/">
                <a>Anuncie aqui</a>
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
          Desenvolvido com{' '}
          <span role="img" aria-label="heart">
            ❤️
          </span>{' '}
          por{' '}
          <a
            href="https://github.com/gabrielcarloto/AluraGeek"
            target="_blank"
            rel="noreferrer"
          >
            Gabriel Carloto
          </a>
        </p>
        <p>2022</p>
        <Spacer y={32} />
      </div>
    </footer>
  );
}

export default Footer;
