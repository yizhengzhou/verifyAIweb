import { Routes, Route } from 'react-router-dom'
import { useI18n } from './context/I18nContext'
import SeoLanding from './components/SeoLanding'
import TermsOfService from './components/legal/TermsOfService'
import PrivacyPolicy from './components/legal/PrivacyPolicy'
import ScammerMind from './components/ScammerMind'
import ScrollToTop from './components/ScrollToTop'

function HomePage() {
  return <SeoLanding />
}

export default function App() {
  const { ready } = useI18n()

  if (!ready) return null

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/scammer-mind" element={<ScammerMind />} />
      </Routes>
    </>
  )
}
