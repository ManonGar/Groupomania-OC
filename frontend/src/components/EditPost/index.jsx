import styled from 'styled-components'
import { useState, useEffect } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useParams } from 'react-router-dom'
import colors from '../../utils/style/colors'
import { useNavigate } from 'react-router-dom'

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
`
const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 50px;
  width: 300px;
`
const EditBtn = styled.button`
  background-color: ${colors.primary};
  color: white;
  border: none;
  padding: 5px;
  margin-top: 9px;
  font-size: 16px;
  border-radius: 3px;
  cursor: pointer;
`

const TitleContainer = styled.div`
  text-align: center;
  color: ${colors.tertiary};
`

const EditPost = () => {
  const axiosPrivate = useAxiosPrivate()
  const [userName, setUserName] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState('')
  const [picture, setPicture] = useState('')

  const { id } = useParams()
  let navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    const getPost = async () => {
      try {
        const response = await axiosPrivate.get('/api/posts/' + id)
        console.log(response.data)
        isMounted && setUserName(response.data.userName)
        setContent(response.data.content)
        setPicture(response.data.imageUrl)
      } catch (err) {
        console.error(err)
      }
    }

    getPost()

    return () => {
      isMounted = false
    }
  }, [axiosPrivate, id])

  const modifyPost = async (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('content', content)
    formData.append('userName', userName)
    formData.append('image', file)

    try {
      const response = await axiosPrivate.put('/api/posts/' + id, formData)
      console.log(response.data)
      navigate('/home', { replace: true })
    } catch (err) {
      console.error(err)
    }
  }

  const uploadImage = (event) => {
    // event.preventDefault()
    setPicture(URL.createObjectURL(event.target.files[0]))
    setFile(event.target.files[0])
  }

  return (
    <div>
      <TitleContainer>
        <h1>Modifier mon message</h1>
      </TitleContainer>
      <FormContainer>
        <Form>
          <label htmlFor="name">Votre nom :</label>
          <input
            type="name"
            placeholder=""
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label htmlFor="post">Votre message :</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder=""
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <label htmlFor="image-upload">Image :</label>
          <input
            name="image-upload"
            accept="image/*"
            id="image-upload"
            type="file"
            onChange={uploadImage}
          />
          <img src={picture} alt="" />

          <EditBtn onClick={modifyPost} type="submit">
            Modifier le message
          </EditBtn>
        </Form>
      </FormContainer>
    </div>
  )
}

export default EditPost
