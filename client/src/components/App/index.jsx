import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

import GlobalStyles from '../../styles/global'
import defaultTheme from '../../styles/themes/default'

import Header from '../Header'
import AppRoutes from '../../Routes'

import { Container } from './styles'

function App() {
  return (

    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />

        <Container>
          <Header />
          <AppRoutes />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
