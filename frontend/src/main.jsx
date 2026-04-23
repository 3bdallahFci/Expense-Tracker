import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {GridBackgroundDemo} from './components/ui/GridBackground.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GridBackgroundDemo>
    <App />
      </GridBackgroundDemo>
    </BrowserRouter>
  </StrictMode>,
)
