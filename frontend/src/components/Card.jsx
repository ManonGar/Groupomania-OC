import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../utils/style/colors'
import { Link } from 'react-router-dom'

const CardText = styled.p`
  color: ${colors.tertiary};
  font-size: 16px;
`

const CardTitle = styled.div`
  color: ${colors.primary};
  font-size: 22px;
  font-weight: bold;
  text-align: center;
`
const CardImage = styled.img`
  height: 100px;
  width: 100%;
  object-fit: contain;
`
const CardWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border: 1px solid ${colors.secondary};
  border-radius: 8px;
  width: 350px;
  transition: 200ms;
  box-shadow: 2px 2px 10px #e2e3e9;
  text-decoration: none;
  @media screen and (max-width: 768px) {
    width: 300px;
  }
`
function Card({ title, content, picture, id }) {
  return (
    <div>
      <CardWrapper to={`/posts/${id}`}>
        <CardTitle>{title}</CardTitle>
        <CardText>{content}</CardText>
        <CardImage src={picture} alt="image" />
      </CardWrapper>
    </div>
  )
}

Card.propTypes = {
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  id: PropTypes.string,
}

export default Card
