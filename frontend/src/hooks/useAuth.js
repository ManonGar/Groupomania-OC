import { useContext } from 'react'
import AuthContext from '../utils/context'

const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth
