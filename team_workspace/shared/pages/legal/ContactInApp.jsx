import { PageAmbient } from '@/components'
import ContactPageContent from '@/components/common/ContactForm'
import { useAuth } from '@/hooks/AuthContext'

const ContactInApp = () => {
  const { user } = useAuth()
  const ambientVariant = user?.role === 'teacher' ? 'teacher' : 'ambient'

  return (
    <PageAmbient variant={ambientVariant} className="space-y-6">
      <div className="max-w-4xl mx-auto w-full">
        <ContactPageContent />
      </div>
    </PageAmbient>
  )
}

export default ContactInApp
