import React from "react";
// import { categoryList } from "@/utils/data";
import styles from './categoryList.module.css';
import Image from "next/image";
import Link from "next/link";

const getData = async()=>{
  
  const base_url =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_BASE_URL;
      
  const response = await fetch(`${base_url}/api/categories`,{
    cache:'no-store'
  });

  if(!response.ok){
    throw new Error('failed');
  }
  return response.json();
}

export const  CategoryList = async() => {
  const categoryList = await getData();

  return (
    <div className={styles.categoryListWrapper}>
      <div className={styles.header}>Popular Categories</div>
      <div className={styles.listWrapper}>
        {categoryList?.map((item) => (
            <Link
            href={`/blog?cat=${item.slug}`}
            key={item?.id}
            className={`${styles.category} ${styles[item.slug]}`}
          >
            <Image
              className={styles.categoryImage}
              src={item?.img}
              alt={item?.title}
              width={23}
              height={23}
            />
            <div className={styles.categroyName}>{item?.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};
