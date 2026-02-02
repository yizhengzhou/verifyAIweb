import { useI18n } from './context/I18nContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Technology from './components/Technology'
import Mission from './components/Mission'
import Testimonials from './components/Testimonials'
import Campaign from './components/Campaign'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  const { ready } = useI18n()

  if (!ready) return null

  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Technology />
      <Mission />
      <Testimonials />
      <Campaign />
      <FAQ />
      <CTA />
      <Footer />
    </>
  )
}
