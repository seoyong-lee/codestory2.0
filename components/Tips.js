import React from 'react';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import styles from '../styles/modules/tips.module.scss';
import tips from '../games/linux/linuxTips';

export default function Tips() {

  const [isOpen, setIsOpen] = useState(false);

  const openHandler = () => {
    setIsOpen(!isOpen);
  };

  SwiperCore.use([Navigation, Pagination]);

  return (
    <>
      <h1 className={styles.btn_tip} 
        onClick={openHandler}
      > How to Play
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
              >
                {tips.map((tip, idx) => {
                  return (
                    <SwiperSlide key={idx}>
                      <div className={styles.box}>
                        <div className={styles.wrapper}>
                          <div className={styles.command}>[{tip.command}]</div>
                          <p className={tip.description1 ? styles.description : null}>{tip.description1}</p>
                          <p className={tip.description2 ? styles.description : null}>{tip.description2}</p>
                          <p className={tip.description3 ? styles.description : null}>{tip.description3}</p>
                          <p className={tip.description4 ? styles.description : null}>{tip.description4}</p>
                          <p className={tip.description5 ? styles.description : null}>{tip.description5}</p>
                          <p className={tip.description6 ? styles.description : null}>{tip.description6}</p>
                          <p className={tip.description7 ? styles.description : null}>{tip.description7}</p>
                          <p className={styles.example}>예시 : {tip.example}</p>
                        </div>
                        <button className={styles.close} 
                          onClick={openHandler}
                        >okay</button> 
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