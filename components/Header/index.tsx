import React, { FormEvent } from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

import {
  FaRegUserCircle,
  FaSignOutAlt,
  FaSignInAlt,
  FaPlusCircle,
  FaShoppingCart,
} from 'react-icons/fa';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import useOnClickOutside from 'react-cool-onclickoutside';
import Container from '../utils/Container';
import Input from '../Inputs/Input';
import { HeaderStyles } from './Header.styles';

function Header() {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';

  const { data: session } = useSession();
  const isAdmin =
    session &&
    session.user &&
    session.user.name === 'Admin' &&
    session.user.email === 'nevergonna@giveyou.up';

  const headerSearchMobile = React.useRef<HTMLDivElement>(null);
  const headerForm = React.useRef<HTMLFormElement>(null);
  const headerUser = React.useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = React.useState(false);
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);

  React.useEffect(() => {
    const screen = window.matchMedia('(max-width: 728px)');

    const handleChange = (e: MediaQueryListEvent) => {
      setIsSmallScreen(e.matches);
    };

    screen.addEventListener('change', handleChange);

    return () => {
      screen.removeEventListener('change', handleChange);
    };
  }, []);

  Router.events.on('routeChangeComplete', () => {
    setIsOpen(false);

    if (isSmallScreen) {
      headerSearchMobile.current?.classList.remove('active');
      headerForm.current?.classList.remove('active');
    }
  });

  const headerUserMenu = useOnClickOutside(
    () => {
      if (isLoginPage) return;

      setIsOpen(false);
      (
        headerUser.current?.childNodes[0] as HTMLElement | undefined
      )?.classList?.remove('active');
    },
    {
      ignoreClass: ['header-user-image', 'header-user-icon'],
    },
  );

  function toggleUserMenu() {
    setIsOpen(!isOpen);
    (
      headerUser.current?.childNodes[0] as HTMLElement | undefined
    )?.classList.toggle('active');
  }

  const userMenuVariants: Variants = {
    initial: {
      opacity: 0,
      y: '-25px',

      transition: {
        duration: 0.2,
      },
    },
    animate: {
      opacity: 1,
      y: 0,

      transition: {
        ease: [0, 0, 0, 1],
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: '-10px',

      transition: {
        ease: [0, 0, 0, 1],
        duration: 0.2,
      },
    },
  };

  function Form() {
    function toggleClass() {
      headerSearchMobile.current?.classList.toggle('active');
      headerForm.current?.classList.toggle('active');
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const search = (e.target as EventTarget & { search: HTMLInputElement })
        .search.value;
      if (search) router.push(`/search?q=${search}`);
    }

    return (
      <>
        <form className="header-form" ref={headerForm} onSubmit={handleSubmit}>
          <label className="scr-only" htmlFor="header-search">
            O que deseja encontrar?
          </label>
          <Input
            className="header-search"
            name="search"
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
        <div className="header-search-icon mobile" onClick={toggleClass}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/search.svg" alt="ícone de pesquisa" />
        </div>
      </>
    );
  }

  return (
    <header className={HeaderStyles()}>
      <Container className="header-container">
        <div className="header-search--mobile" ref={headerSearchMobile} />
        <Link passHref href="/" scroll={false}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="header-logo"
            src="/Logo.svg"
            alt="logo da empresa alurageek"
            tabIndex={0}
          />
        </Link>
        <Form />
        {!session && !isLoginPage && (
          <div className="header-user" ref={headerUser}>
            <FaRegUserCircle
              className="header-user-icon"
              id="header-user"
              tabIndex={0}
              onClick={toggleUserMenu}
            />
            <label className="scr-only" htmlFor="header-user">
              Clique para abrir o menu do usuário
            </label>
            <Link passHref href="/cart">
              <FaShoppingCart className="header-user-icon" />
            </Link>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="header-user-menu"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={userMenuVariants}
                  key="user-menu"
                  ref={headerUserMenu}
                >
                  <ul>
                    <li tabIndex={0}>
                      <Link passHref href="/cart">
                        <p>
                          <FaShoppingCart className="list-icon" />
                          <span>Carrinho</span>
                        </p>
                      </Link>
                    </li>
                    <hr />
                    <Link passHref href="/login">
                      <button
                        className="header-user-menu-button login"
                        type="button"
                        tabIndex={0}
                      >
                        Login <FaSignInAlt />
                      </button>
                    </Link>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {session && (
          <div className="header-user" ref={headerUser}>
            {session.user?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="header-user-image"
                id="header-user"
                src={session.user.image}
                alt={session.user.name as string}
                tabIndex={0}
                onClick={toggleUserMenu}
              />
            ) : (
              <FaRegUserCircle
                className="header-user-icon"
                id="header-user"
                tabIndex={0}
                onClick={toggleUserMenu}
              />
            )}
            <label className="scr-only" htmlFor="header-user">
              Clique para abrir o menu do usuário
            </label>
            <Link passHref href="/cart">
              <FaShoppingCart className="header-user-icon" />
            </Link>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="header-user-menu"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={userMenuVariants}
                  key="user-menu"
                  ref={headerUserMenu}
                >
                  <ul>
                    {isAdmin ? (
                      <li tabIndex={0}>
                        <Link passHref href="/admin">
                          <p>
                            <FaPlusCircle className="list-icon" />
                            <span>Cadastrar produto</span>
                          </p>
                        </Link>
                      </li>
                    ) : (
                      <>
                        <li tabIndex={0}>
                          <Link passHref href="/profile">
                            <p>{session.user?.name}</p>
                          </Link>
                        </li>
                        <li tabIndex={0}>
                          <Link passHref href="/cart">
                            <p>
                              <FaShoppingCart className="list-icon" />
                              <span>Carrinho</span>
                            </p>
                          </Link>
                        </li>
                      </>
                    )}
                    <hr />
                    <button
                      className="header-user-menu-button signout"
                      type="button"
                      tabIndex={0}
                      onClick={() => signOut()}
                    >
                      Sair <FaSignOutAlt />
                    </button>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
