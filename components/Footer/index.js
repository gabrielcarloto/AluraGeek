import Link from 'next/link';
import Grid from '../utils/Grid';
import Spacer from "../utils/Spacer";
import Container from "../utils/Container";
import StyledFooter from './StyledFooter';
import { Form } from "./Form";

function Footer() {
  return (
    <StyledFooter>
      <Spacer responsive={1} />
      <Container className="footer-container">
        <Grid className="footer-grid">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="footer-logo" src="/Logo.svg" alt="logo alura geek" />
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
    </StyledFooter>
  )
}

export default Footer;