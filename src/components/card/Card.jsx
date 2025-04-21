import React from "react";
import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

export const Card = ({ item }) => {
  const getDate = (datee) => {
    const date = new Date(datee);
    const formatted = date.toLocaleDateString("en-CA"); // "YYYY-MM-DD"
    return formatted;
  };
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.leftWrapper}>
        <img src={item?.img} alt={item?.title} className={styles.blogImage} />
      </div>
      <div className={styles.rightWrapper}>
        <div className={styles.topWrapper}>
          <div className={styles.date}>{getDate(item?.createdAt)}</div>
          <div className={styles.type}>{item?.slug?.toUpperCase()}</div>
        </div>
        <div className={styles.title}>{item?.title}</div>
        <div className={styles.description}>
          {item?.desc?.slice(0, 100)}...
        </div>
        <Link className={styles.readMore} href={`/posts/${item.slug}`}>
          Read More
        </Link>
      </div>
    </div>
  );
};
