import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PublicNavbar, AppFooter } from '@/components'
import ContactPageContent from '@/components/common/ContactForm'

const Contact = () => (
  <div className="min-h-screen bg-slate-50 flex flex-col">
    <PublicNavbar />
    <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-primary-500 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      <ContactPageContent />
    </main>
    <AppFooter variant="full" />
  </div>
)

export default Contact
