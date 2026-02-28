import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './router/router';
import 'aos/dist/aos.css';
import Aos from 'aos';
import AuthProvider from './contexts/AuthContext/AuthProvider';
import 'leaflet/dist/leaflet.css';

Aos.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist max-w-7xl mx-5 md:mx-auto'>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  </StrictMode>,
)
