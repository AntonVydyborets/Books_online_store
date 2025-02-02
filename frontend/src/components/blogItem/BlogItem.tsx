import React from 'react'
import { BlogItemType } from '@/utils/types/BlogItemType.ts'

import styles from './BlogItem.module.scss'
import { Link } from 'react-router-dom'

interface BlogItemProps {
  blog: BlogItemType | null
  cover: string
}

const BlogItem: React.FC<BlogItemProps> = ({ blog, cover }) => {
  return (
    <>
      {blog && (
        <Link to="/" className={styles.container}>
          <div className={styles['img-wrap']}>
            <img src={cover} alt={blog.title} />
          </div>
          <div className={styles.info}>
            <h6 className={styles.title}>{blog.title}</h6>
            <p className={styles.desc}>{blog.desc}</p>
            <p className={styles.date}>{blog.date}</p>
          </div>
        </Link>
      )}
    </>
  )
}

export default BlogItem
