import Link from "next/link";
import { css } from "../../styles/theme";
import Grid from "../utils/Grid";
import Spacer from "../utils/Spacer";
import Container from "../utils/Container";
import Form from "./Form";

function Footer() {
  const Footer = css({
    backgroundColor: "$secondary",

    ".footer-grid": {
      "@media (min-width: 1024px)": {
        rowGap: "0",
      },
    },

    ".footer-logo": {
      gridColumn: "1 / -1",
      margin: "0 auto",
      cursor: "pointer",

      "@media (min-width: 768px)": {
        width: "176px",
        gridColumn: "1 / 5",
        margin: "0",
      },

      "@media (min-width: 1024px)": {
        gridColumn: "1 / 3",
      },
    },

    ".footer-links": {
      listStyleType: "none",
      textAlign: "center",
      marginBottom: "16px",
      gridColumn: "1 / -1",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "16px",

      "@media (min-width: 768px)": {
        textAlign: "left",
        gridColumn: "1 / 5",
        alignItems: "flex-start",
        gap: "24px",
      },

      "@media (min-width: 1024px)": {
        gridColumn: "4 / 7",
        marginBottom: "0",
      },

      li: {
        cursor: "pointer",
      },
    },

    ".form-btn": {
      width: "clamp(150px, 10vw, 165px)",
    },

    ".dev": {
      backgroundColor: "$lightBackground",
      fontSize: "16px",
      fontWeight: "500",
      textAlign: "center",
    },
  });

  return (
    <footer className={Footer()}>
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
          Desenvolvido com{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          por{" "}
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
