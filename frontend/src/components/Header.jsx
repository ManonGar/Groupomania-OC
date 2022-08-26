import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../utils/style/colors'
import logo from './../assets/logo.png'

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  margin-bottom: 45px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

const Logo = styled.img`
  width: 300px;
`

const StyledLink = styled(Link)`
  padding: 12px;
  color: #8186a0;
  text-decoration: none;
  font-size: 18px;
  ${(props) =>
    props.$isFullLink &&
    `color: white; border-radius: 8px; background-color: ${colors.primary};
    @media screen and (max-width: 768px) {
      background-color: transparent;
      color: #8186a0;
    }`}
`
const LogOutBtn = styled.button`
  padding: 12px;
  color: #8186a0;
  text-decoration: none;
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
`

const HomeLink = styled(Link)``

function Header() {
  let navigate = useNavigate()
  const userId = localStorage.getItem('userId')

  const logout = async () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <Navbar>
      <HomeLink to="/home">
        <Logo src={logo} alt="logo-groupomania" />
      </HomeLink>

      <nav>
        {userId ? (
          <LogOutBtn onClick={logout}>Me déconnecter</LogOutBtn>
        ) : (
          <div>
            <StyledLink to="/login">Se connecter</StyledLink>
            <StyledLink to="/signup" $isFullLink>
              Créer un compte
            </StyledLink>
          </div>
        )}
      </nav>
    </Navbar>
  )
}

export default Header
