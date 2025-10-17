import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, MantineProvider } from '@mantine/core'

import "@mantine/core/styles.css"

const themeBYU = createTheme({
  fontFamily: 'Inter, "Helvetica Neue", Helvetica, Arial, sans-serif',

  colors: {
    // BYU Brand colors
    navy: [
      '#E5E8EE', '#C2CADC', '#9DAAC9', '#7689B3',
      '#4F699E', '#2F4C8A', '#002E5D', '#002650',
      '#001C42', '#001235',
    ],
    royal: [
      '#E6EBFA', '#C2CDF4', '#9AACED', '#7089E4',
      '#4868DC', '#1E47D4', '#0033A0', '#002E91',
      '#002882', '#001F6E',
    ],
    lightBlue: [
      '#EAF4FD', '#CDE6FB', '#AED6F8', '#8CC4F5',
      '#6BB3F2', '#4AA2EF', '#0062B8', '#0057A5',
      '#004C91', '#003E78',
    ],
    gray: [
      '#F5F6F7', '#E4E6E8', '#D1D4D8', '#B9BDC3',
      '#9FA5AC', '#878E97', '#6B737D', '#585F68',
      '#454B52', '#33383E',
    ],
  },
  primaryColor: 'royal',
  primaryShade: 6
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={themeBYU}>
      <App />
    </MantineProvider>
  </StrictMode>,
)
