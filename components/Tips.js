import React from 'react';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import styles from '../styles/modules/tips.module.scss';

export default function Tips({ gametips, isWhite }) {

  const [isOpen, setIsOpen] = useState(false);

  let tips = gametips;

  const openHandler = () => {
    setIsOpen(!isOpen);
  };

  SwiperCore.use([Navigation, Pagination]);

  return (
    <>
      <h1 className={isWhite ? styles.btn_tip_white : styles.btn_tip} 
        onClick={openHandler}
      > Play Tips
      </h1>
      {
        !isOpen 
          ? null 
          : <div className={isOpen ? styles.background : null}>
            <div className={styles.container}>
              <Swiper
                slidesPerView={1}
                loop={true}
                navigation
                pagination
                speed={600}
              >
                <div className={styles.box_btn}>
                  <div className={styles.btn_arrow}>&lt;</div>
                  <div className={styles.btn_arrow}>&gt;</div>
                </div>
                {tips.map((tip, idx) => {
                  return (
                    <SwiperSlide key={idx}>
                      <div className={styles.box}>
                        <div className={styles.wrapper}>
                          <div className={styles.command}>[{tip.command}]</div>
                          <p className={tip.description1 ? styles.description : null}>{tip.description1}</p>
                          <p className={tip.description2 ? styles.description : null}>{tip.description2}</p>
                          <p className={tip.description3 ? styles.description : null}>{tip.description3}</p>
                          <p className={styles.example}>{tip.example !== '' ? `예시 : ${tip.example}` : null}</p>
                        </div>
                        <button className={styles.close} 
                          onClick={openHandler}
                        >Okay</button> 
                      </div>
                    </SwiperSlide>
                  );
                })};
              </Swiper>
            </div> 
          </div>  
      }
    </>
  );
};