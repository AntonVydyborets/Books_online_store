import React from 'react'

import { BlogItemType } from '@/utils/types/BlogItemType.ts'

import styles from './BlogItem.module.scss'
import { Link } from 'react-router-dom'

interface BlogItemProps {
  blog: BlogItemType | null
}

const BlogItem: React.FC<BlogItemProps> = ({ blog }) => {
  return (
    <>
      {blog && (
        <Link to='/' className={styles.container}>
          <div className={styles['img-wrap']}>
            <img src={blog.cover} alt={blog.title} />
          </div>
          <p className={styles.date}>{blog.date}</p>
          <h6 className={styles.title}>{blog.title}</h6>
        </Link>
      )}
    </>
  )
}

export default BlogItem
