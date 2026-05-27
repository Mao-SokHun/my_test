import { useAuth, getStoredUser } from '@/hooks/AuthContext'
import AppLayout from '../layout/AppLayout'

const isAppUser = (u) => u?.role === 'student' || u?.role === 'teacher'

/**
 * Logged-in students/teachers see legal/support pages inside AppLayout.
 * Guests see the public standalone page (PublicNavbar).
 */
const LegalPageRoute = ({ inApp: InAppPage, public: PublicPage }) => {
  const { user } = useAuth()
  const activeUser = user ?? getStoredUser()

  if (isAppUser(activeUser)) {
    return (
      <AppLayout>
        <InAppPage />
      </AppLayout>
    )
  }

  return <PublicPage />
}

export default LegalPageRoute
