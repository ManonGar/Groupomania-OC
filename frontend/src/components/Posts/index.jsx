import Card from '../Card'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useNavigate, useLocation } from 'react-router-dom'

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`

const Posts = () => {
  const [posts, setPosts] = useState([])
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    let isMounted = true

    const getPosts = async () => {
      try {
        const response = await axiosPrivate.get('/api/posts')
        console.log(response.data)
        isMounted && setPosts(response.data)
      } catch (err) {
        console.error(err)
        // navigate('/login', { state: { from: location }, replace: true })
      }
    }

    getPosts()

    return () => {
      isMounted = false
    }
  }, [axiosPrivate, location])

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
