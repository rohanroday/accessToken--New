import {createBrowserRouter} from 'react-router'
import Login from '../features/auth/pages/Login'
import Register from '../features/auth/pages/Register'
import Me from '../features/auth/pages/Me'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Login />,
  },
  {
    path:"/register",
    element:<Register />,
  },
  {
    path:"/me",
    element:<Me />,
  },
])

export default router
