// Import 
import styled from 'styled-components'
import MianPge from "./MainPage"

// Wrapper 
const AppWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 500px;
    margin: auto;
`

// App
const App = () => {

  return (
    <AppWrapper>
      {<MianPge />}
    </AppWrapper >
  )
}

export default App