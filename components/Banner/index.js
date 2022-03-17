import Link from 'next/link'
import Button from '../Button/index'
import Container from '../utils/Container'
import StyledBanner from './StyledBanner'

function Banner() {
  return (
    <StyledBanner>
      <Container className="banner-container">
        <h1 className="banner-title">
          Dezembro Promocional
        </h1>
        <h2 className="banner-subtitle">
          Produtos selecionados com 33% de desconto
        </h2>
        <div>
          <Link passHref href="/">
            <Button color="primary" className="banner-btn">
              Ver Consoles
            </Button>
          </Link>
        </div>
      </Container>
    </StyledBanner>
  )
}

export default Banner;