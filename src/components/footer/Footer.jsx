import React from "react";
import Image from "next/image";
import styles from "./footer.module.css";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.leftWrapper}>
        <div className={styles.headerWrapper}>
          <Image
            src={"/logo.png"}
            width={50}
            height={50}
            alt="logo"
            className={styles.logoImage}
          />
          <div className={styles.header}>SamBlogs</div>
        </div>
        <div className={styles?.subtitle}>
          Discover insights from personal journeys and professional pivots. Each
          blog explores unique experiences and lessons learned. Stay inspired,
          informed, and ready for what’s next.
        </div>
      </div>
      <div className={styles.rightWrapper}>
        <div className={styles.firstWrapper}>
          <div className={styles.head}>Links</div>
          <div className={styles.body}>Homepage</div>
          <div className={styles.body}>Blog</div>
          <div className={styles.body}>About</div>
          <div className={styles.body}>Contact</div>
        </div>
        <div className={styles.firstWrapper}>
          <div className={styles.head}>Tags</div>
          <Link href={`/blog?cat=style`} key={1} className={styles.body}>
            Style
          </Link>
          <Link
            href={`/blog?cat=fashion`}
            key={2}
            className={styles.body}
          >
            Fashion
          </Link>
          <Link
            href={`/blog?cat=culture`}
            key={3}
            className={styles.body}
          >
            Culture
          </Link>
          <Link
            href={`/blog?cat=coding`}
            key={4}
            className={styles.body}
          >
            Coding
          </Link>
        </div>
        <div className={styles.firstWrapper}>
          <div className={styles.head}>Social</div>
          <Link href={"https://www.facebook.com/"}>
            {" "}
            <div className={styles.body}>Facebook</div>
          </Link>
          <Link href={"https://www.instagram.com/s3k65/#"}>
            <div className={styles.body}>Instagram</div>
          </Link>
          <Link href={"https://www.instagram.com/s3k65/#"}>
            <div className={styles.body}>Tiktok</div>
          </Link>
          <Link href={"https://www.youtube.com/"}>
            <div className={styles.body}>Youtube</div>
          </Link>
        </div>
      </div>
    </div>
  );
};
