import React from 'react'

import { BlogItemType } from '@/utils/types/BlogItemType.ts'

import styles from './BlogItem.module.scss'

interface BlogItemProps {
  blog: BlogItemType | null
}

const BlogItem: React.FC<BlogItemProps> = ({ blog }) => {
  return (
    <>
      {blog && (
        <div className={styles.container}>
          <div className={styles['img-wrap']}>
            <img src={blog.cover} alt={blog.title} />
          </div>
          <div className={styles['content-wrap']}>
            <h6 className={styles.title}>{blog.title}</h6>
            <p className={styles.desc}>{blog.desc}</p>
            <p className={styles.date}>{blog.date}</p>
            <button className={styles['link-more']}>Читати</button>
          </div>
        </div>
      )}
    </>
  )
}

export default BlogItem
