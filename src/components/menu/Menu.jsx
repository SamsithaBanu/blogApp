import React from 'react';
import styles from './menu.module.css';
import { MenuPosts } from '../menuPosts/MenuPosts';
import MenuCategories from '../menuCategories/MenuCategories';
import { EditMenu } from '../editMenu/EditMenu';
import { editorsPost, popularPosts } from '@/utils/data';

export const Menu = () => {
  return (
    <div className={styles.menuWrapper}>
      <MenuPosts title="What&apos;s hot" subTitle="Most Popular" items={popularPosts} />
      <MenuCategories title='Discovered by topics' subTitle='Categories' />
      <MenuPosts isImage={'true'} title="Editors pick" subTitle="Choosen by the editor" items={editorsPost}/>
    </div>
  )
}
