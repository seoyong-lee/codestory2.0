import React, { useEffect, useState } from 'react';
import gsap, { Power4 } from 'gsap';
import styles from '../styles/modules/about.module.scss';

export default function About() {

  const [textTl] = useState(gsap.timeline({ repeat: -1 }));
  const text = {};

  useEffect(() => {
    textTl
      .to(text.text1, {
        duration: 2,
        opacity: 1,
        y: 15,
        ease: Power4.easeOut,
      }, 0)
      .to(text.text2, {
        duration: 2,
        delay: 1,
        opacity: 1,
        y: 15,
        ease: Power4.easeOut,
      }, 0)
      .to(text.text3, {
        duration: 2,
        delay: 2,
        opacity: 1,
        y: 15,
        ease: Power4.easeOut,
      }, 0)
      .to(text.text1, {
        duration: 1,
        delay: 4,
        opacity: 0,
        y: 15,
        ease: Power4.easeOut,
      }, 0)
      .to(text.text2, {
        duration: 1,
        delay: 5,
        opacity: 0,
        y: 15,
        ease: Power4.easeOut,
      }, 0)
      .to(text.text3, {
        duration: 1,
        delay: 6,
        opacity: 0,
        y: 15,
        ease: Power4.easeOut,
      }, 0)
      .to(text.box1, {
        delay: 7,
        display: 'none',
        ease: Power4.easeOut,
      }, 0)
      .to(text.box2, {
        delay: 7,
        display: 'flex',
        ease: Power4.easeOut,
      }, 0)
      .to(text.text4, {
        duration: 1,
        delay: 8,
        opacity: 1,
        y: 15,
        ease: Power4.easeOut,
      }, 0)
      .to(text.text5, {
        duration: 1,
        delay: 9,
        opacity: 1,
        y: 15,
        ease: Power4.easeOut,
      }, 0)
      .to(text.text6, {
        duration: 1,
        delay: 10,
        opacity: 1,
        y: 15,
        ease: Power4.easeOut,
      }, 0)
      .to(text.text4, {
        duration: 1,
        delay: 12,
        opacity: 0,
        y: 15,
        ease: Power4.easeOut,
      }, 0)
      .to(text.text5, {
        duration: 1,
        delay: 13,
        opacity: 0,
        y: 15,
        ease: Power4.easeOut,
      }, 0)
      .to(text.text6, {
        duration: 1,
        delay: 14,
        opacity: 0,
        y: 15,
        ease: Power4.easeOut,
      }, 0)
      .to(text.box2, {
        delay: 16,
        display: 'none',
        ease: Power4.easeOut,
      }, 0); 
  });
  
  return (
    <div className={styles.container}>
      <span className={styles.title}>About</span>
      <div className={styles.box_word1}
        ref={e => (text['box1'] = e)}
      >
        <span className={styles.word1}
          ref={e => (text['text1'] = e)}
        >
          CodeStory???
        </span>
        <span className={styles.word2}
          ref={e => (text['text2'] = e)}
        >
          ????????? ?????? ????????? ????????????
        </span>
        <span className={styles.word3}
          ref={e => (text['text3'] = e)}
        >
          ???????????? ?????? ?????? ?????? ????????? ???????????????.
        </span>
      </div>
      <div className={styles.box_word2}
        ref={e => (text['box2'] = e)}
      >
        <span className={styles.word3}
          ref={e => (text['text4'] = e)}
        >
          ????????? ????????? ??? ??? ?????????????????????.
        </span>
        <span className={styles.word3}
          ref={e => (text['text5'] = e)}
        >
          CodeStory??? ???????????? ?????? ????????????
        </span>
        <span className={styles.word3}
          ref={e => (text['text6'] = e)}
        >
          ??? ????????? ?????? ??? ????????????.
        </span>
      </div>
    </div>
  );
}