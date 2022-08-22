import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import colors from './../utils/style/colors'
import axios from '../api/axios'
import useAuth from '../hooks/useAuth'

const LoginCard = styled.div`
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 8px 16px;
  margin: 0 37%;
  height: 300px;
  @media screen and (max-width: 992px) {
    margin: 0 10%;
  }
`
const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 50px;
`

const Title = styled.div`
  text-align: center;
`

const Input = styled.input`
  border-radius: 3px;
  border: 1px solid black;
  padding: 5px;
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

function Login() {
  const { setAuth } = useAuth()
  const LOGIN_URL = '/api/auth/login'
  let navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    setErrMsg('')
  }, [email, password])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      )
      console.log(JSON.stringify(response?.data))
      const token = response?.data?.token
      const userId = response?.data?.userId
      const userRole = response?.data?.role
      setAuth({ token, userId, userRole })
      localStorage.setItem('isLoggedin', true)

      setEmail('')
      setPassword('')
      navigate('/home', { replace: true })
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password')
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Login Failed')
      }
    }
  }

  // const togglePersist = () => {
  //   setPersist((prev) => !prev)
  // }

  // useEffect(() => {
  //   localStorage.setItem('persist', persist)
  // }, [persist])

  return (
    <LoginCard>
      <Title>
        <h1>Connectez-vous !</h1>
      </Title>
      <Form>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          placeholder="Entrez votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Mot de passe</label>
        <Input
          type="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Btn onClick={handleSubmit} type="submit">
          Connexion
        </Btn>
      </Form>
    </LoginCard>
  )
}

export default Login
