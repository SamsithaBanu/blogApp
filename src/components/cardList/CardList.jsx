import { cardLists } from '@/utils/data'
import React from 'react'
import { Card } from '../card/Card';
import styles from './cardlist.module.css';
import Pagination from '../pagination/Pagination';

const getData = async (page,cat) => {
  const base_url = process.env.MODE === 'development' ? "http://localhost:3000": "http://localhost:3000";
  
  const response = await fetch(`${base_url}/api/posts?page=${page}&cat=${cat || ''}`, {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('failed');
  }

  return response.json(); // should return { posts, count }
};


export const CardList = async({page, cat}) => {
  const {posts, count} = await getData(page, cat);

  const POST_PER_PAGE = 4;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.cardListWrapper}>
      <div className={styles.header}>Recent Posts</div>
      <div className={styles.cardsList}>
        {posts?.map((item)=>(
          <Card key={item?.id} item={item} />
        ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  )
}
