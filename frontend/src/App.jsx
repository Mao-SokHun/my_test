import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/hooks'
import { LanguageProvider } from '@/lib/LanguageProvider'
import MainLayout from './components/layout/MainLayout'
import AdminLayout from './components/layout/AdminLayout'
import ProtectedRoute from './components/layout/ProtectedRoute'

import Login from './pages/auth/Login'
import AdminLogin from './pages/auth/AdminLogin'
import CreateAccount from './pages/auth/CreateAccount'
import CompleteProfile from './pages/onboarding/CompleteProfile'
import ChooseCommunity from './pages/onboarding/ChooseCommunity'
import TeacherSubscription from './pages/teacher/TeacherSubscription'
import Home from './pages/student/Home'
import Schedule from './pages/student/Schedule'
import Community from './pages/student/Community'
import Profile from './pages/student/Profile'
import StudentEditProfile from './pages/student/StudentEditProfile'
import Notifications from './pages/student/Notifications'
import BookSession from './pages/student/BookSession'
import SessionReview from './pages/student/SessionReview'
import TeacherHome from './pages/teacher/TeacherHome'
import ProfileSetting from './pages/teacher/ProfileSetting'
import Analytics from './pages/teacher/Analytics'
import EditProfile from './pages/teacher/EditProfile'
import TeacherPublicProfile from './pages/teacher/TeacherPublicProfile'
import TeacherMyProfile from './pages/teacher/TeacherMyProfile'
import TeacherBilling from './pages/teacher/TeacherBilling'
import TeacherCreatePost from './pages/teacher/TeacherCreatePost'
import CreateCommunity from './pages/community/CreateCommunity'
import CommunityDetail from './pages/community/CommunityDetail'
import AdminDashboard from './pages/admin/AdminDashboard'
import UserManagement from './pages/admin/UserManagement'
import ContentManagement from './pages/admin/ContentManagement'
import SystemReports from './pages/admin/SystemReports'
import RoleManagement from './pages/admin/RoleManagement'
import AdminSettings from './pages/admin/AdminSettings'
import HelpCenter from './pages/admin/HelpCenter'
import TermsOfService from './pages/admin/TermsOfService'
import PrivacyPolicy from './pages/admin/PrivacyPolicy'
import ContactSupport from './pages/admin/ContactSupport'
import Billing from './pages/admin/Billing'
import LegalWrapper from './components/common/LegalWrapper'
import {
  Landing,
  NotFound,
  Messages,
  SearchResults,
  Leaderboard,
  TeacherDetail,
  Contact,
  Help,
  Privacy,
  Terms,
} from './pages'

const AdminOrPublicHelp = ({ AdminPage }) => {
  const { user } = useAuth()
  if (user?.role === 'admin') {
    return (
      <ProtectedRoute role="admin">
        <AdminLayout><AdminPage /></AdminLayout>
      </ProtectedRoute>
    )
  }
  return <Navigate to="/help" replace />
}

const AdminOrPublicContact = ({ AdminPage }) => {
  const { user } = useAuth()
  if (user?.role === 'admin') {
    return (
      <ProtectedRoute role="admin">
        <AdminLayout><AdminPage /></AdminLayout>
      </ProtectedRoute>
    )
  }
  return <Navigate to="/contact" replace />
}

/** Root: redirect logged-in users to their home page, guests see Landing */
const RootRedirect = () => {
  const { user } = useAuth()
  if (!user) return <Landing />
  if (user.role === 'teacher') return <Navigate to="/teacher/home" replace />
  if (user.role === 'admin')   return <Navigate to="/admin" replace />
  return <Navigate to="/home" replace />
}

const AppRoutes = () => (
  <Routes>
    {/* Root */}
    <Route path="/" element={<RootRedirect />} />

    {/* Public auth */}
    <Route path="/login"          element={<Login />} />
    <Route path="/admin/login"    element={<AdminLogin />} />
    <Route path="/create-account" element={<CreateAccount />} />
    <Route path="/teacher/landing" element={<Navigate to="/create-account?role=teacher" replace />} />
    <Route path="/teacher/subscription" element={
      <ProtectedRoute role="teacher">
        <MainLayout><TeacherSubscription /></MainLayout>
      </ProtectedRoute>
    } />

    {/* Onboarding */}
    <Route path="/onboarding/complete-profile" element={<CompleteProfile />} />
    <Route path="/onboarding/choose-community" element={<ChooseCommunity />} />

    {/* ───── STUDENT routes (MainLayout sidebar) ───── */}
    {/* /home and /schedule are accessible to both students and teachers (top-nav tabs) */}
    <Route path="/home" element={
      <ProtectedRoute role={null}>
        <MainLayout><Home /></MainLayout>
      </ProtectedRoute>
    } />
    <Route path="/schedule" element={
      <ProtectedRoute role={null}>
        <MainLayout><Schedule /></MainLayout>
      </ProtectedRoute>
    } />
    <Route path="/profile" element={
      <ProtectedRoute role="student">
        <MainLayout><Profile /></MainLayout>
      </ProtectedRoute>
    } />
    <Route path="/student/edit-profile" element={
      <ProtectedRoute role="student">
        <MainLayout><StudentEditProfile /></MainLayout>
      </ProtectedRoute>
    } />
    <Route path="/book/:teacherId" element={
      <ProtectedRoute role="student">
        <BookSession />
      </ProtectedRoute>
    } />
    <Route path="/session/:sessionId/review" element={
      <ProtectedRoute role="student">
        <SessionReview />
      </ProtectedRoute>
    } />

    {/* ───── TEACHER routes (MainLayout sidebar) ───── */}
    <Route path="/teacher/home" element={
      <ProtectedRoute role="teacher">
        <MainLayout><TeacherHome /></MainLayout>
      </ProtectedRoute>
    } />
    <Route path="/teacher/analytics" element={
      <ProtectedRoute role="teacher">
        <MainLayout><Analytics /></MainLayout>
      </ProtectedRoute>
    } />
    <Route path="/teacher/settings" element={
      <ProtectedRoute role="teacher">
        <MainLayout><ProfileSetting /></MainLayout>
      </ProtectedRoute>
    } />
    <Route path="/teacher/edit-profile" element={
      <ProtectedRoute role="teacher">
        <MainLayout><EditProfile /></MainLayout>
      </ProtectedRoute>
    } />
    <Route path="/teacher/my-profile" element={
      <ProtectedRoute role="teacher">
        <MainLayout><TeacherMyProfile /></MainLayout>
      </ProtectedRoute>
    } />
    <Route path="/teacher/billing" element={
      <ProtectedRoute role="teacher">
        <MainLayout><TeacherBilling /></MainLayout>
      </ProtectedRoute>
    } />
    <Route path="/teacher/create-post" element={
      <ProtectedRoute role="teacher">
        <MainLayout><TeacherCreatePost /></MainLayout>
      </ProtectedRoute>
    } />
    <Route path="/teacher/profile/:id" element={
      <ProtectedRoute role="teacher">
        <MainLayout><TeacherPublicProfile /></MainLayout>
      </ProtectedRoute>
    } />

    {/* ───── SHARED routes (student + teacher) ───── */}
    <Route path="/community" element={
      <ProtectedRoute role={null}>
        <MainLayout><Community /></MainLayout>
      </ProtectedRoute>
    } />
    <Route path="/community/create" element={
      <ProtectedRoute role={null}>
        <MainLayout><CreateCommunity /></MainLayout>
      </ProtectedRoute>
    } />
    <Route path="/community/:id" element={
      <ProtectedRoute role={null}>
        <MainLayout><CommunityDetail /></MainLayout>
      </ProtectedRoute>
    } />
    <Route path="/messages" element={
      <ProtectedRoute role={null}>
        <MainLayout><Messages /></MainLayout>
      </ProtectedRoute>
    } />
    <Route path="/notifications" element={
      <ProtectedRoute role={null}>
        <MainLayout><Notifications /></MainLayout>
      </ProtectedRoute>
    } />
    <Route path="/search" element={
      <ProtectedRoute role={null}>
        <MainLayout><SearchResults /></MainLayout>
      </ProtectedRoute>
    } />
    <Route path="/leaderboard" element={
      <ProtectedRoute role={null}>
        <MainLayout><Leaderboard /></MainLayout>
      </ProtectedRoute>
    } />
    <Route path="/teacher/:id" element={
      <ProtectedRoute role={null}>
        <MainLayout><TeacherDetail /></MainLayout>
      </ProtectedRoute>
    } />

    {/* ───── ADMIN routes (AdminLayout) ───── */}
    <Route path="/admin" element={
      <ProtectedRoute role="admin">
        <AdminLayout><AdminDashboard /></AdminLayout>
      </ProtectedRoute>
    } />
    <Route path="/admin/users" element={
      <ProtectedRoute role="admin">
        <AdminLayout><UserManagement /></AdminLayout>
      </ProtectedRoute>
    } />
    <Route path="/admin/content" element={
      <ProtectedRoute role="admin">
        <AdminLayout><ContentManagement /></AdminLayout>
      </ProtectedRoute>
    } />
    <Route path="/admin/reports" element={
      <ProtectedRoute role="admin">
        <AdminLayout><SystemReports /></AdminLayout>
      </ProtectedRoute>
    } />
    <Route path="/admin/roles" element={
      <ProtectedRoute role="admin">
        <AdminLayout><RoleManagement /></AdminLayout>
      </ProtectedRoute>
    } />
    <Route path="/admin/settings" element={
      <ProtectedRoute role="admin">
        <AdminLayout><AdminSettings /></AdminLayout>
      </ProtectedRoute>
    } />
    <Route path="/admin/help" element={<AdminOrPublicHelp AdminPage={HelpCenter} />} />
    <Route path="/admin/terms" element={
      <ProtectedRoute role="admin">
        <AdminLayout><TermsOfService /></AdminLayout>
      </ProtectedRoute>
    } />
    <Route path="/admin/privacy" element={
      <ProtectedRoute role="admin">
        <AdminLayout><PrivacyPolicy /></AdminLayout>
      </ProtectedRoute>
    } />
    <Route path="/admin/contact" element={<AdminOrPublicContact AdminPage={ContactSupport} />} />
    <Route path="/admin/billing" element={
      <ProtectedRoute role="admin">
        <AdminLayout><Billing /></AdminLayout>
      </ProtectedRoute>
    } />

    {/* Legal & support — in-app when logged in as student/teacher */}
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/terms" element={<Terms />} />
    {/* Help & contact — always public pages (no login); in-app users get “Back to app” bar */}
    <Route path="/help" element={<Help />} />
    <Route path="/contact" element={<Contact />} />

    {/* 404 */}
    <Route path="*" element={<NotFound />} />
  </Routes>
)

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
