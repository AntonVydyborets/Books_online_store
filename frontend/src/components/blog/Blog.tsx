import React from 'react'
import { Link } from 'react-router-dom'
import BlogItem from '../blogItem/BlogItem'
import { Container } from '@/shared'

import Blog1 from '@/assets/images/blogs/blog1.png'
import Blog2 from '@/assets/images/blogs/blog2.png'
import Blog3 from '@/assets/images/blogs/blog3.png'
import Blog4 from '@/assets/images/blogs/blog4.png'
import Blog5 from '@/assets/images/blogs/blog5.png'

import { BlogItemType } from '@/utils/types/BlogItemType.ts'
import styles from './Blog.module.scss'

interface BlogsProps {
  data: BlogItemType[]
}

const images = [Blog1, Blog2, Blog3, Blog4, Blog5]

const Blog: React.FC<BlogsProps> = ({ data }) => {
  return (
    <Container>
      <div className={styles.top}>
        <h3 className={styles.title}>Блог</h3>
        <Link to="/" className={styles.link}>
          Дивитись більше
        </Link>
      </div>

      <div className={styles.wrap}>
        {data.map((blog) => (
          <BlogItem key={blog.id} blog={blog} cover={images[blog.id - 1]} />
        ))}
      </div>
    </Container>
  )
}

export default Blog
