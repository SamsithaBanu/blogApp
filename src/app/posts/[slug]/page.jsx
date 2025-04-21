import React from "react";
import styles from "./post.module.css";
import { SinglePost } from "@/utils/data";
import { Menu } from "@/components/Menu/Menu";
import { Comments } from "@/components/comments/Comments";

const getData = async (slug) => {

  const base_url = process.env.MODE === 'development' ? "http://localhost:3000": "";
  
  const res = await fetch(`${base_url}/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const Page = async({params}) => {
  const {slug} = await params;
  const data = await getData(slug);

  return (
    <div className={styles.singlePostWrapper}>
      <div className={styles.topWrapper}>
        <div className={styles.leftWrapper}>
          <div className={styles.header}>{data?.title}</div>
          <div className={styles.authorWrapper}>
            {data?.user?.image &&
            <img
              src={data?.user?.image}
              alt="author-image"
              className={styles.authorImage}
            />
}
            <div className={styles.author}>
              <div className={styles.name}>{data?.user?.name}</div>
              <div className={styles.date}>{SinglePost?.[0]?.date}</div>
            </div>
          </div>
        </div>
        {data?.img && 
        <div className={styles.rightWrapper}>
          <img
            src={data?.img}
            alt={data?.title}
            className={styles?.postImage}
          />
        </div>
}
      </div>
      <div className={styles.bottomWrapper}>
        <div className={styles.leftBottomWrapper}>
          <div className={styles.descriptionWrapper}>
            <div className={styles.desc}>{data?.desc}</div>
            <div className={styles.desc}>{data?.desc}</div>
          </div>
          <Comments postSlug={slug}/>
        </div>
          <Menu />
      </div>
    </div>
  );
};

export default Page;
