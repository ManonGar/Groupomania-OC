import { useNavigate } from 'react-router-dom'
import AuthContext from '../../utils/context'
import { useContext } from 'react'

function Logout() {
  let navigate = useNavigate()
  const { setAuth } = useContext(AuthContext)

  const handleLogout = () => {
    fetch('http://localhost:8000/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(function (response) {
        return response.text()
      })
      .then(function (data) {
        setAuth({})
        navigate('/login', { replace: true })
      })
      .catch((err) => console.log('Erreur : ' + err))
  }

  return (
    <button type="button" onClick={handleLogout}>
      Se déconnecter
    </button>
  )
}

export default Logout
