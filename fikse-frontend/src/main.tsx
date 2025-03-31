import { StrictMode } from 'react'
import './index.css'
import { RouterProvider } from 'react-router';
import ReactDOM from 'react-dom/client';
import { router } from './Router/router.tsx';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
