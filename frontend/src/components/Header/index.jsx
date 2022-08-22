import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import logo from '../../assets/logo.png'
import AuthContext from '../../utils/context'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import useAuth from '../../hooks/useAuth'
import Logout from '../Logout'
// import useAuth from '../../hooks/useAuth'

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
  const { setAuth } = useContext(AuthContext)
  const { auth } = useAuth()
  const navigate = useNavigate()
  // const { LoggedIn } = useAuth()
  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({})
    localStorage.setItem('isLoggedin', false)
    navigate('/login')
  }

  return (
    <Navbar>
      <HomeLink to="/home">
        <Logo src={logo} alt="logo-groupomania" />
      </HomeLink>

      <nav>
        {auth?.token ? (
          <LogOutBtn onClick={logout}>Me déconnecter</LogOutBtn>
        ) : (
          <div>
            <StyledLink to="/login">Se connecter</StyledLink>
            <StyledLink to="/signup" $isFullLink>
              Créer un compte
            </StyledLink>
          </div>
        )}
        {/* <Logout /> */}
      </nav>
    </Navbar>
  )
}

export default Header
