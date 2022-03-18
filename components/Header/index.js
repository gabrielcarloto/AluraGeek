import Link from 'next/link'
import Image from 'next/image';
import StyledHeader from './StyledHeader';
import Button from "../Button/index";
import Container from '../utils/Container';
import Input from '../Inputs/Input';

function Header() {  
  return (
    <StyledHeader>
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
        <Button className="header-login" color="secondary">
          Login
        </Button>
        <div className="header-search-icon--mobile">
          <Image src="/search.svg" width="17" height="17" alt="ícone de busca" />
        </div>
      </Container>
    </StyledHeader>
  )
}

export default Header;