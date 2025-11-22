import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Toaster } from 'react-hot-toast'
import UseAnimationFrame from './components/UseAnimationFrame.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster />
        <App />
        {/* Global animation overlay */}
        <UseAnimationFrame />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
