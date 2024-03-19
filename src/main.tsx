import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from '@/routes/router'

import { SesionProvider } from '@/contexts/Sesion'

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <SesionProvider>
      <RouterProvider router={router} />
    </SesionProvider>
)
