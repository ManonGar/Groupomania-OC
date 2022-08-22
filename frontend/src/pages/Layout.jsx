import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  margin: 0 10%;
  @media screen and (max-width: 768px) {
    margin: 0 10%;
  }
`
const Layout = () => {
  return (
    <main className="App">
      {/* <Container> */}
      <Outlet />
      {/* </Container> */}
    </main>
  )
}

export default Layout
