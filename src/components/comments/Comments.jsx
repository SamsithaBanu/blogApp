"use client";
import { SinglePost } from "@/utils/data";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./comments.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

export const Comments = ({postSlug}) => {
  const { status } = useSession();
  
  const base_url =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_BASE_URL;

  const { data, mutate, isLoading } = useSWR(
    `${base_url}/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc, postSlug }),
    });
    mutate();
  };

  return (
    <div className={styles.commentWrapper}>
      <div className={styles.commentHeader}>Comments</div>
      {status === 'authenticated' ?
      <div className={styles.inputWrapper}>
      <input
        className={styles.input}
        placeholder="Enter your comment..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button className={styles.buttonWrapper} onClick={handleSubmit}>
        Send
      </button>
    </div>
    :
    <Link href='/login'>Login to write a comment</Link>
    }
      {isLoading ? <div>is loading</div> :
      <div className={styles.comments}>
        {data?.map((item) => (
          <div key={item?.id} className={styles.commentWrap}>
            <div className={styles.commentTop}>
              {item?.user?.image &&
              <Image
                src={item?.user?.image}
                alt={item?.user?.name}
                width={40}
                height={40}
                className={styles.authorImage}
              />
}
              <div className={styles.author}>
                <div className={styles.name}>{item?.user?.name}</div>
                <div className={styles.date}>{item?.createdAt}</div>
              </div>
            </div>
            <div className={styles.commentBottom}>{item?.desc}</div>
          </div>
        ))}
      </div>
}
    </div>
  );
};
