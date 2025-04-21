import React from "react";
import styles from "./menuPosts.module.css";
import Image from "next/image";

export const MenuPosts = ({ title, subTitle, items, isImage = "false" }) => {

  return (
    <div className={styles.menuPostWrapper}>
      <div className={styles.aboveHeader}>{subTitle}</div>
      <div className={styles.header}>{title}</div>
      <div className={styles.postWrapper}>
        {items?.map((item) => (
          <div className={styles.postWrap} key={item?.id}>
            {isImage === 'true' && <Image src={item?.image} alt={item?.title} className={styles?.image} width={100} height={100} /> }
            <div className={styles.rightWrapper}>
            <div
              className={styles.category}
              style={{ background: item?.background }}
            >
              {item?.type}
            </div>
            <div className={styles.text}>{item?.title}</div>
            <div className={styles.bottomWrapper}>
              <div className={styles.author}>{item?.author}</div>
              <div className={styles.date}>{item?.date}</div>
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};
