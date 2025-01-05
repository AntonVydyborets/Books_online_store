import React from 'react'
import BlogItem from '../blogItem/BlogItem'

import { BlogItemType } from '@/utils/types/BlogItemType.ts'

import styles from './Blog.module.scss'

interface BlogsProps {
  data: BlogItemType[]
}

const Blog: React.FC<BlogsProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      <h3>Blog</h3>
      <div className={styles.wrap}>
        {data.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
        <button className={styles['link-more']}>Читати</button>
      </div>
    </div>
  )
}

export default Blog
