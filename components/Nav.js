import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from '../styles/modules/nav.module.scss';
import About from './About';
import Landing from './Landing';
import Ranking from './Ranking';
import Mypage from './Mypage';
import Linux_game from './Linux_game';
import Css_game from '../components/Css_game';

export default function Nav({ componentHandler, isWhite, loginOpenHandler, colorHandler }) {

  const [isOpen, setIsOpen] = useState(false);
  const [menuTl] = useState(gsap.timeline({ paused: true }));
  const menuBars = {};
  const { asPath } = useRouter();

  useEffect(() => {
    menuTl
      .to(menuBars.back, {
        duration: 0.25,
        width: 420,
        opacity: 1
      }, 0)
      .to(menuBars.topBar, {
        width: 30,
        duration: 0.2,
        rotation: 45,
        y: 9
      }, 0)
      .to(menuBars.middleBar, { 
        duration: 0.2, 
        alpha: 0 
      }, 0)
      .to(menuBars.bottomBar,{ 
        width: 30,
        duration: 0.2,  
        rotation: -45, 
        y: -9
      }, 0)
      .reverse();
  }, [
    menuBars.back,
    menuBars.bottomBar,
    menuBars.middleBar,
    menuBars.topBar,
    menuTl
  ]);

  const openHandler = () => {
    setIsOpen(!isOpen);
    menuTl.reversed(!menuTl.reversed());
  };

  const navClickHandler = (component) => {
    setIsOpen(!isOpen);
    menuTl.reversed(!menuTl.reversed());
    componentHandler(component);
    if (component.type.name === 'About' ||
      component.type.name === 'Ranking' ||
      component.type.name === 'Mypage') {
      colorHandler(1);
    }
  };

  const logoClickHandler = (component) => {
    componentHandler(component);
  };

  const loginClickHandler = () => {
    setIsOpen(!isOpen);
    menuTl.reversed(!menuTl.reversed());
    loginOpenHandler();
  };

  return (
    <>
      <Link href='/' passHref>
        <span className={isWhite ? styles.logo_white : styles.logo} 
          onClick={asPath === '/' 
            ? () => logoClickHandler(<Landing colorHandler={colorHandler}/>) 
            : null
          }
        >
          Code<br/>Story
        </span>
      </Link>
      <div className={isOpen 
        ? isWhite 
          ? styles.background_white 
          : styles.background 
        : null}
      >
        <div className={styles.nav_box}>
          <button className={isWhite ? styles.btn_nav_white : styles.btn_nav} 
            onClick={openHandler}
          >
            <div className={isWhite ? styles.btn_nav_bar_white : styles.btn_nav_bar} 
              ref={e => (menuBars['topBar'] = e)} />
            <div className={isWhite ? styles.btn_nav_bar_white : styles.btn_nav_bar}
              ref={e => (menuBars['middleBar'] = e)} />
            <div className={isWhite ? styles.btn_nav_bar_white : styles.btn_nav_bar}
              ref={e => (menuBars['bottomBar'] = e)} />
          </button>
          <div className={isWhite ? styles.container_white : styles.container}
            ref={e => (menuBars['back'] = e)}
          >
            <div className={styles.menu_box}
              style={isOpen 
                ? { display: 'block' } 
                : null}>
              <div className={styles.menu} 
                style={isOpen 
                  ? { opacity: 1 } 
                  : null}
              >
                <Link href="/" passHref>
                  <button className={isWhite ? styles.btn_word_white : styles.btn_word}
                    onClick={asPath === '/'
                      ? () => navClickHandler(<Landing colorHandler={colorHandler} />)
                      : asPath === 'linux'
                        ? () => navClickHandler(<Linux_game colorHandler={colorHandler} />)
                        : asPath === 'css'
                          ? () => navClickHandler(<Css_game colorHandler={colorHandler} />)
                          : null
                    }
                  >Home</button>
                </Link> 
                <button className={isWhite ? styles.btn_word_white : styles.btn_word}
                  onClick={() => navClickHandler(<About />)}
                >About</button>
                <button className={isWhite ? styles.btn_word_white : styles.btn_word}
                  onClick={() => navClickHandler(<Ranking />)}
                >Ranking</button>
                <button className={isWhite ? styles.btn_word_white : styles.btn_word}
                  onClick={() => navClickHandler(<Mypage />)}
                >My page</button>
                <button className={isWhite ? styles.btn_word_white : styles.btn_word}
                  onClick={() => loginClickHandler()}
                >Login</button>
              </div>
            </div> 
          </div>
        </div>
      </div>  
    </>
  );
}