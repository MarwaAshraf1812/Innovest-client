import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '@/App'
import Register from '@/pages/Auth/Register'
import Login from '@/pages/Auth/Login'
import PublicRoutes from '@/components/PublicRoutes'
import ProtectedRoutes from '@/components/ProtectedRoutes'
import ForgotPassword from '@/pages/Auth/ForgotPasswoed'
import ResetPassword from '@/pages/Auth/ResetPassword'
import EntrepreneurDashboard from '@/components/dashboards/EntrepreneurDashboard'
import AdminDashboard from '@/components/dashboards/AdminDashboard'
import InvestorDashboard from '@/components/dashboards/InvestorDashboard'
import { AppProvider } from '@/contexts/AppContext'

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/register',
    element: (
      <PublicRoutes>
        <Register />
      </PublicRoutes>
    ),
  },
  {
    path: '/login',
    element: (
      <PublicRoutes>
        <Login />
      </PublicRoutes>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <PublicRoutes>
        <ForgotPassword />
      </PublicRoutes>
    ),
  },
  {
    path: '/reset-password',
    element: (
      <PublicRoutes>
        <ResetPassword />
      </PublicRoutes>
    ),
  },
  {
    path: '/entrepreneur-dashboard',
    element: (
      <ProtectedRoutes>
        <EntrepreneurDashboard />
      </ProtectedRoutes>
    ),
  },
  {
    path: '/admin-dashboard',
    element: (
      <ProtectedRoutes>
        <AdminDashboard />
      </ProtectedRoutes>
    ),
  },
  {
    path: '/investor-dashboard',
    element: (
      <ProtectedRoutes>
        <InvestorDashboard />
      </ProtectedRoutes>
    ),
  },
  {
    path: '*',
    element: (
      <PublicRoutes>
        <Login />
      </PublicRoutes>
    ),
  },
])

const AppRouters = () => {
  return (
    <AppProvider>
      <RouterProvider router={Router} />
    </AppProvider>
  )
}

export default AppRouters
