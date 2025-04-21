import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";

export const Featured = () => {

  return (
    <div className={styles.featureWrapper}>
      <div className={styles.header}>
        <span className={styles.boldText}> Hey Everyone!</span> A blog for builders, dreamers, and problem solvers.
      </div>
      <div className={styles.bottomWrapper}>
        <div className={styles.imageWrapper}>
          <img src="/culture.png" alt='culture image' className={styles.image} />
        </div>
        <div className={styles.rightWrapper}>
          <div className={styles.textWrapper}>
            Share your story with the world. Inspire through every word you
            write.
          </div>
          <div className={styles.subText}>
            Whether you&apos;re an aspiring artist, a curious thinker, or simply
            looking to add a touch of creativity to your routine, our journey
            together will remind you that creativity knows no bounds. Get ready
            to unlock a world of innovation and self-expression!
          </div>
          <button className={styles.buttonWrapper}>Read More</button>
        </div>
      </div>
    </div>
  );
};
