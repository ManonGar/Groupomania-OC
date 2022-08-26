import styled from 'styled-components'
import colors from '../utils/style/colors'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from '../api/axios'

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
const Btn = styled.button`
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

function NewPost() {
  let navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [content, setContent] = useState('')
  const userId = localStorage.getItem('userId')
  const [file, setFile] = useState()
  const [image, setImage] = useState('')
  const token = localStorage.getItem('token')

  const submitPost = async (event) => {
    event.preventDefault()
    const post = { userId, userName, content }
    const formData = new FormData()
    formData.append('post', JSON.stringify(post))
    formData.append('image', file)

    try {
      const response = await axios.post('/api/posts', formData, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      console.log(response.data)
      navigate('/home', { replace: true })
    } catch (err) {
      console.log(err)
    }
  }

  const handleImg = (event) => {
    event.preventDefault()
    setImage(URL.createObjectURL(event.target.files[0]))
    setFile(event.target.files[0])
  }

  return (
    <div>
      <TitleContainer>
        <h1>Nouveau Message</h1>
      </TitleContainer>
      <FormContainer>
        <Form>
          <label htmlFor="name">Votre nom :</label>
          <input
            type="name"
            placeholder="Entrez votre nom"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label htmlFor="post">Votre message :</label>
          <textarea
            name="post"
            id=""
            cols="30"
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <label htmlFor="file-upload">Image :</label>
          <input
            type="file"
            id="file-upload"
            name="file-upload"
            accept="image/*"
            onChange={handleImg}
          />
          <img src={image} alt="" />
          <Btn onClick={submitPost} type="submit">
            Publier mon message
          </Btn>
        </Form>
      </FormContainer>
    </div>
  )
}

export default NewPost
