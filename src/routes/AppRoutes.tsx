import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '@/App'
import Register from '@/pages/Auth/Register'
import Login from '@/pages/Auth/Login'
import PublicRoutes from '@/components/PublicRoutes'
import ProtectedRoutes from '@/components/ProtectedRoutes'
import ForgotPassword from '@/pages/Auth/ForgotPasswoed'
import ResetPassword from '@/pages/Auth/ResetPassword'
import { AppProvider } from '@/contexts/AppContext'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import InvestorDashboard from '@/pages/InvestorDashboard/Dashboard'
import EntrepreneurDashboard from '@/pages/EntrepreneurDashboard/Dashboard'
import AdminDashboard from '@/pages/AdminDashboard/Dashboard'
import Admins from '@/pages/AdminDashboard/Admins'
import Communities from '@/pages/AdminDashboard/Communities'
import Members from '@/pages/AdminDashboard/Members'
import { Settings } from 'lucide-react'
import ProfilePage from '@/pages/AdminDashboard/ProfilePage'

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
    path: '/admin-dashboard/*',
    element: (
      <ProtectedRoutes>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
    children: [
      { path: '', element: <AdminDashboard /> },
      { path: 'admins', element: <Admins /> },
      { path: 'communities', element: <Communities /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'members', element: <Members /> },
      { path: 'settings', element: <Settings /> },

    ],
  },
  {
    path: '/entrepreneur-dashboard/*',
    element: (
      <ProtectedRoutes>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
    children: [
      { path: '', element: <EntrepreneurDashboard /> },
    ],
  },
  {
    path: '/investor-dashboard/*',
    element: (
      <ProtectedRoutes>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
    children: [
      { path: '', element: <InvestorDashboard /> },
    ],
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
