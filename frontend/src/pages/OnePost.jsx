import styled from 'styled-components'
import Card from '../components/Card'
import colors from '../utils/style/colors'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import axios from '../api/axios'

const MainContainer = styled.div`
  margin: 20px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const TitleContainer = styled.div`
  margin-bottom: 60px;
  color: ${colors.tertiary};
`
const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`

const EditLink = styled(Link)`
  background-color: ${colors.tertiary};
  color: white;
  border: none;
  padding: 8px;
  margin-top: 9px;
  font-size: 16px;
  border-radius: 3px;
  cursor: pointer;
  text-decoration: none;
`

const DeleteBtn = styled.button`
  background-color: ${colors.primary};
  color: white;
  border: none;
  padding: 8px;
  margin-top: 9px;
  font-size: 16px;
  border-radius: 3px;
  cursor: pointer;
`
const LikeBtn = styled.button`
  background-color: transparent;
  color: ${colors.primary};
  border: none;
  font-size: 24px;
  margin-top: 9px;
  cursor: pointer;
`
const UnlikeBtn = styled.button`
  background-color: transparent;
  color: ${colors.secondary};
  border: none;
  font-size: 24px;
  margin-top: 9px;
  cursor: pointer;
`
const NbOfLikes = styled.span`
  color: ${colors.tertiary};
`

const Likes = styled.div`
  text-align: end;
`

const Buttons = styled.div`
  display: flex;
  justify-content: end;
  gap: 5px;
  align-items: baseline;
`

const Post = () => {
  const [userName, setUserName] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [liked, setLiked] = useState(false)
  const [usersLiked, setUsersLiked] = useState([])
  const [likes, setLikes] = useState()
  const [userId, setUserId] = useState()
  const { id } = useParams()
  const userRole = localStorage.getItem('userRole')
  const currentUserId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')
  let navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    const getPost = async () => {
      try {
        const response = await axios.get('/api/posts/' + id, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        console.log(response.data)
        isMounted && setUserName(response.data.userName)
        setContent(response.data.content)
        setImageUrl(response.data.imageUrl)
        setUsersLiked(response.data.usersLiked)
        setUserId(response.data.userId)
        setLikes(response.data.likes)
      } catch (err) {
        console.error(err)
      }
    }

    getPost()

    return () => {
      isMounted = false
    }
  }, [id, token])

  const deletePost = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.delete('/api/posts/' + id, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      console.log(response.data)
      navigate('/home', { replace: true })
    } catch (err) {
      console.error(err)
    }
  }

  const Like = async () => {
    try {
      const response = await axios.post(
        '/api/posts/' + id + '/like',
        {
          userId: currentUserId,
          like: 1,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      )
      setLiked(true)
      setLikes(likes + 1)
      console.log(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const unLike = async () => {
    try {
      const response = await axios.post(
        '/api/posts/' + id + '/like',
        {
          userId: currentUserId,
          like: 0,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      )
      console.log(response.data)
      setLiked(false)
      setLikes(likes - 1)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (usersLiked.includes(currentUserId)) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [currentUserId, usersLiked])

  return (
    <MainContainer>
      <TitleContainer>
        <h1>Message</h1>
      </TitleContainer>
      <div>
        <Card id={id} content={content} picture={imageUrl} title={userName} />
        <Actions>
          <Likes>
            <NbOfLikes>{likes}</NbOfLikes>
            <LikeBtn disabled={liked} onClick={Like} type="submit">
              <FontAwesomeIcon icon={faHeart} />
            </LikeBtn>
            {liked === true && (
              <UnlikeBtn onClick={unLike} type="submit">
                <FontAwesomeIcon icon={faHeartBroken} />
              </UnlikeBtn>
            )}
          </Likes>
          <Buttons>
            <div>
              {userId === currentUserId || userRole === 'admin' ? (
                <EditLink to={`/edit/${id}`}>Modifier</EditLink>
              ) : (
                ''
              )}
            </div>
            <div>
              <div>
                {userId === currentUserId || userRole === 'admin' ? (
                  <DeleteBtn onClick={deletePost} type="submit">
                    Supprimer
                  </DeleteBtn>
                ) : (
                  ''
                )}
              </div>
            </div>
          </Buttons>
        </Actions>
      </div>
    </MainContainer>
  )
}

export default Post
