import styled from 'styled-components'
import Posts from '../components/Posts'
import colors from '../utils/style/colors'
import { Link } from 'react-router-dom'

const MainContainer = styled.div`
  margin: 20px 60px;
`
const TitleContainer = styled.div`
  margin-bottom: 60px;
  color: ${colors.tertiary};
  text-align: center;
`
const NewPostLink = styled(Link)`
  background-color: ${colors.secondary};
  color: ${colors.primary};
  border: none;
  padding: 8px;
  border-radius: 4px;
  text-decoration: none;
  &:hover {
    background-color: ${colors.primary};
    color: white;
  }
`

function Home() {
  return (
    <MainContainer>
      <TitleContainer>
        <h1>Messages</h1>
        <NewPostLink to="/add">Nouveau message</NewPostLink>
      </TitleContainer>
      <Posts />
    </MainContainer>
  )
}

export default Home
