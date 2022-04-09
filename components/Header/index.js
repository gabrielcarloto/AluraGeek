import React from 'react';
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { signOut, useSession } from "next-auth/react"
import { css } from '../../styles/theme';
import {
  FaRegUserCircle,
  FaSignOutAlt,
  FaSignInAlt,
  FaPlusCircle,
  FaShoppingCart,
} from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import useOnClickOutside from "react-cool-onclickoutside";
import Container from '../utils/Container';
import Input from '../Inputs/Input';


function Header() {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';

  const { data: session } = useSession();
  const isAdmin = session 
                  && session.user
                  && session.user.name === 'Admin'
                  && session.user.email === 'nevergonna@giveyou.up';
  
  const headerSearchMobile = React.useRef(null);
  const headerForm = React.useRef(null);
  const headerUser = React.useRef(null);
  
  const [isOpen, setIsOpen] = React.useState(false);
  const [ isSmallScreen, setIsSmallScreen ] = React.useState(false);

  React.useEffect(() => {
    const screen = window.matchMedia('(max-width: 728px)');
    
    const handleChange = (e) => {
      setIsSmallScreen(e.matches);
    };
    
    screen.addEventListener('change', handleChange(screen));

    return () => {
      screen.removeEventListener('change', handleChange(screen));
    };
  }, []);

  Router.events.on('routeChangeComplete', () => {
    setIsOpen(false);
    
    if (isSmallScreen) {
      headerSearchMobile.current.classList.remove('active');
      headerForm.current.classList.remove('active');
    };
  });
  
  const headerUserMenu = useOnClickOutside(() => {
    if (isLoginPage) return;

    setIsOpen(false);
    headerUser.current.childNodes[0].classList.remove('active');
  }, {
    ignoreClass: ["header-user-image", "header-user-icon"],
  });

  function toggleUserMenu() {
    setIsOpen(!isOpen);
    headerUser.current.childNodes[0].classList.toggle('active');
  };

  const userMenuVariants = {
    initial: {
      opacity: 0,
      y: '-25px',
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
      },
    },
    transition: {
      duration: 0.2,
    },
  };

  const Header = css({
    position: 'relative',
    display: 'flex',
    width: '100vw',
    height: '72px',
    backgroundColor: '$lightBackground',
  
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
        zIndex: '2',
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

          '&:focus-visible': {
            outline: '2px solid #000',
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

    '.header-user': {
      width: '100px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      position: 'relative',
      zIndex: '1',
      
      '@media (min-width: 768px)': {
        width: '176px',
      },
      
      '.header-user-icon, .header-user-image': {
        cursor: 'pointer',
        transition: 'all 200ms ease-out',

        '@media (hover: hover) and (pointer: fine)': {
          '&:hover': {
            transform: 'scale(1.15)',
          },
        },

        '&.active': {
          transform: 'scale(1.15)',
        },
      },

      '.header-user-image': {
        width: '35px',
        height: '35px',
        borderRadius: '50%',

        '@media (min-width: 768px)': {
          width: '50px',
          height: '50px',
        },
      },

      '.header-user-icon': {
        fontSize: '28px',
        color: '$primary',

        '@media (min-width: 768px)': {
          fontSize: '38px',
        },
      },

      '.header-user-menu': {
        position: 'absolute',
        top: '115%',
        left: '-35px',
        width: '130%',
        maxWidth: '150%',
        backgroundColor: '$lightBackground',
        borderRadius: '4px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        padding: '10px',

        '@media (min-width: 768px)': {
          padding: '20px',
          left: '-60px',
        },

        'ul': {
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',

          'hr': {
            width: '90%',
            height: '1px',
            border: 'none',
            backgroundColor: '$border',
          },

          'li': {
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',

            '@media (min-width: 768px)': {
              fontSize: '16px',
            },

            'p': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              '.list-icon': {
                fontSize: '16px',
                marginRight: '5px',
              },
            },
          },

          '.header-user-menu-button': {
            width: '100%',
            padding: '6px',
            border: 'none',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            fontFamily: 'RaleWay',
            fontSize: '14px',
            fontWeight: '500',
            color: '$white',
            cursor: 'pointer',
            transition: 'all 200ms ease-out',

            '&.login': {
              backgroundColor: '$primary',

              '@media (hover: hover) and (pointer: fine)': {
                '&:hover': {
                  backgroundColor: '$primaryHover',
                },
              },
            },

            '&.signout': {
              backgroundColor: '$red',

              '@media (hover: hover) and (pointer: fine)': {
                '&:hover': {
                  backgroundColor: '$redHover',
                },
              },
            },
          },
        }
      }
    },

    '.header-search--mobile': {
      width: '100vw',
      height: '72px',
      position: 'absolute',
      top: '-72px',
      left: '0',
      zIndex: '2',
      backgroundColor: '$lightBackground',
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

    function handleSubmit(e) {
      e.preventDefault();
      
      const search = e.target.search.value;
      
      if (search) {
        router.push(`/search?q=${search}`);
      };
    };

    return (
      <>
        <form className="header-form" ref={headerForm} onSubmit={handleSubmit}>
          <label className="scr-only" htmlFor="header-search">O que deseja encontrar?</label>
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
        <Link passHref href="/" scroll={false}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="header-logo" src="/Logo.svg" alt="logo da empresa alurageek" tabIndex={0} />
        </Link>
        <Form />
        { !session && (
          !isLoginPage && (
            <div className="header-user" ref={headerUser}>
              <FaRegUserCircle 
                className="header-user-icon"
                id="header-user"
                tabIndex={0}
                onClick={toggleUserMenu}
              />
              <label className="scr-only" htmlFor="header-user">Clique para abrir o menu do usuário</label>
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
                        <button className="header-user-menu-button login" type="button" tabIndex={0}>
                          Login <FaSignInAlt />
                        </button>
                      </Link>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        )}

        { session && (
          <div className="header-user" ref={headerUser}>
            {session.user.image
              // eslint-disable-next-line @next/next/no-img-element
              ? <img
                  className="header-user-image"
                  id="header-user"
                  src={session.user.image}
                  alt={session.user.name}
                  tabIndex={0}
                  onClick={toggleUserMenu}
                />
              : <FaRegUserCircle 
                  className="header-user-icon"
                  id="header-user"
                  tabIndex={0}
                  onClick={toggleUserMenu}
                />
            }
            <label className="scr-only" htmlFor="header-user">Clique para abrir o menu do usuário</label>
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
                    {isAdmin
                    ? <li tabIndex={0}>
                        <Link passHref href="/products/new">
                          <p>
                            <FaPlusCircle className="list-icon" />
                            <span>Cadastrar produto</span>
                          </p>
                        </Link>
                      </li>
                    : <>
                        <li tabIndex={0}>
                          <Link passHref href="/profile">
                            <p>{session.user.name}</p>
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
                    }
                    <hr />
                    <button className="header-user-menu-button signout" type="button" tabIndex={0} onClick={() => signOut()}>
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
  )
}

export default Header;