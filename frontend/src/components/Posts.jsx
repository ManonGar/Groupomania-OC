import Card from './Card'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import axios from '../api/axios'

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`

const Posts = () => {
  const [posts, setPosts] = useState([])
  const token = localStorage.getItem('token')

  useEffect(() => {
    let isMounted = true

    const getPosts = async () => {
      try {
        const response = await axios.get('/api/posts', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        console.log(response.data)
        isMounted && setPosts(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    getPosts()

    return () => {
      isMounted = false
    }
  }, [token])

  return (
    <CardsContainer>
      {posts
        .map((post, index) => (
          <Card
            key={`${index}`}
            id={post._id}
            content={post.content}
            picture={post.imageUrl}
            title={post.userName}
          />
        ))
        .sort()
        .reverse()}
    </CardsContainer>
  )
}

export default Posts
