import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios';

// Set base URL for API requests. In production, this will point to your Render backend.
// In development, Vite proxy handles it, but this acts as a fallback.
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'https://pricepeek-api.onrender.com';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
