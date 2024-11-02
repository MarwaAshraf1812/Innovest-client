
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '@/App'
import Register from '@/pages/Auth/Register'
import Login from '@/pages/Auth/Login'
import PublicRoutes from '@/components/PublicRoutes'

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/register',
    element: <PublicRoutes><Register /></PublicRoutes>,
  },
  {
    path: '/login',
    element: <PublicRoutes><Login /></PublicRoutes>,
  }
])

const AppRouters = () => {
  return <RouterProvider router={Router} />
}

export default AppRouters