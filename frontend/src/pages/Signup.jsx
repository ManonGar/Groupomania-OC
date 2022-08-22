import styled from 'styled-components'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import colors from '../utils/style/colors'

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const LoginCard = styled.div`
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 8px 16px;
  width: 280px;
  height: 350px;
`
const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 50px;
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
const Input = styled.input`
  border-radius: 3px;
  border: 1px solid black;
  padding: 5px;
`

const Title = styled.div`
  text-align: center;
`

function SignUp() {
  const SIGNUP_URL = 'http://localhost:8000/api/auth/signup'
  let navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post(
        SIGNUP_URL,
        JSON.stringify({ email, password }),
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      )
      console.log(JSON.stringify(response?.data))
      setEmail('')
      setPassword('')
      navigate('/home', { replace: true })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <LoginWrapper>
      <LoginCard>
        <Title>
          <h1>Inscrivez-vous !</h1>
        </Title>
        <Form>
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Mot de passe</label>
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Btn onClick={handleSubmit} type="submit">
            Créer un compte
          </Btn>
        </Form>
      </LoginCard>
    </LoginWrapper>
  )
}

export default SignUp
