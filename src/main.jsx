import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react'

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain='dev-ljahqokfhsufb3vj.us.auth0.com'
    clientId='aUWnxgv83Idyt2jQy8tleWkyWX0QV662'
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <StrictMode>
      <App />
    </StrictMode>
  </Auth0Provider>
)
