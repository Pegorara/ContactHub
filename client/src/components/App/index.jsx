import { ThemeProvider } from 'styled-components'

import GlobalStyles from '../../styles/global'
import defaultTheme from '../../styles/themes/default'

import { Container } from './styles'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />

      <Container>
        <h1>Welcome to the App</h1>
        <p>This is a simple React application with styled-components.</p>
      </Container>
    </ThemeProvider>
  )
}

export default App
