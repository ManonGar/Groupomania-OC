import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import { createGlobalStyle } from 'styled-components'
import App from './App'
import Header from './components/Header'
import { AuthProvider } from './utils/context'

const GlobalStyle = createGlobalStyle`
    div {
        font-family: 'Lato';
        font-size: 16px;
    }
`

const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(
//   <React.StrictMode>
//     <Router>
//       <AuthProvider>
//         <GlobalStyle />
//         <Header />
// <Routes>
//   <Route path="/" element={<Layout />}>
//     {/* public routes */}
//     <Route path="/login" element={<Login />} />
//     {/* <Route path="/logout" element={<Logout />} /> */}
//     <Route path="/signup" element={<SignUp />} />

//     {/* protected routes */}
//     <Route element={<PersistLogin />}>
//       <Route element={<RequireAuth />}>
//         <Route path="/" element={<Home />} />
//       </Route>

//       <Route element={<RequireAuth />}>
//         <Route path="/add" element={<NewPost />} />
//       </Route>

//       <Route element={<RequireAuth />}>
//         <Route path="/posts/:id" element={<Post />} />
//       </Route>

//       <Route element={<RequireAuth />}>
//         <Route path="/edit/:id" element={<EditPost />} />
//       </Route>
//     </Route>

//     <Route path="*" element={<Error />} />
//   </Route>
// </Routes>
//       </AuthProvider>
//     </Router>
//   </React.StrictMode>
// )

root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
)
