import Link from 'next/link';

import Button from '../Button/index';
import Container from '../utils/Container';
import { BannerStyles } from './Banner.styles';

function Banner() {
  return (
    <section className={BannerStyles()}>
      <Container className="banner-container">
        <h1 className="banner-title">Dezembro Promocional</h1>
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
  );
}

export default Banner;
