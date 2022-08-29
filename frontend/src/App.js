import { Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Post from './pages/OnePost'
import SignUp from './pages/Signup'
import NewPost from './pages/NewPost'
import EditPost from './pages/EditPost'
import Error from './components/Error'

function App() {
  const userId = localStorage.getItem('userId')
  return (
    <Routes>
      {/* public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* protected routes */}

      <Route path="/home" element={userId ? <Home /> : <Login />} />
      {/* </Route> */}

      {/* <Route element={<RequireAuth />}> */}
      <Route path="/add" element={userId ? <NewPost /> : <Login />} />
      {/* </Route> */}

      {/* <Route element={<RequireAuth />}> */}
      <Route path="/posts/:id" element={userId ? <Post /> : <Login />} />
      {/* </Route> */}

      {/* <Route element={<RequireAuth />}> */}
      <Route path="/edit/:id" element={userId ? <EditPost /> : <Login />} />

      <Route path="*" element={<Error />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App
