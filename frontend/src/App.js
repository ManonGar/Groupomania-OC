import RequireAuth from './components/Auth'
import PersistLogin from './components/PersistLogin'

import Home from './pages/Home'
import Login from './pages/Login'
import Layout from './pages/Layout'
// import Logout from './pages/Logout'
import Post from './pages/Post'
import SignUp from './pages/Signup'
import NewPost from './pages/New'
import EditPost from './components/EditPost'
import Error from './components/Error'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/logout" element={<Logout />} /> */}
        <Route path="/signup" element={<SignUp />} />

        {/* protected routes */}
        {/* <Route element={<PersistLogin />}> */}
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<Home />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/add" element={<NewPost />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/posts/:id" element={<Post />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Route>

      <Route path="*" element={<Error />} />
      {/* </Route> */}
    </Routes>
  )
}

export default App
