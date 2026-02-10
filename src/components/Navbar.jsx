import { useState, useEffect, useRef } from 'react'
import { useI18n } from '../context/I18nContext'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const { t, lang, changeLanguage, supportedLanguages } = useI18n()
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  const langLabels = { 'zh-TW': '繁中', en: 'EN', ja: '日本語', ko: '한국어' }

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  // Close menu on scroll
  useEffect(() => {
    function handleScroll() {
      if (menuOpen) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [menuOpen])

  return (
    <nav className="navbar" ref={navRef}>
      <div className="container">
        <a href="/" className="logo-link">
          <img src="/logov2.png" alt="VerifyAI logo" width="40" height="40" />
          <span className="logo-wordmark">
            Verify<span className="teal">AI</span>
          </span>
        </a>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          <li>
            <a href="#features" onClick={() => setMenuOpen(false)}>
              {t('nav.features') !== 'nav.features' ? t('nav.features') : t('features.label')}
            </a>
          </li>
          <li>
            <a href="#howItWorks" onClick={() => setMenuOpen(false)}>
              {t('nav.howItWorks')}
            </a>
          </li>
          <li>
            <a href="#faq" onClick={() => setMenuOpen(false)}>
              {t('nav.faq') !== 'nav.faq' ? t('nav.faq') : 'FAQ'}
            </a>
          </li>
          <li className="lang-switcher">
            {supportedLanguages.map((code, i) => (
              <span key={code}>
                {i > 0 && <span className="sep">/</span>}
                <button
                  className={lang === code ? 'active' : ''}
                  onClick={() => changeLanguage(code)}
                >
                  {langLabels[code]}
                </button>
              </span>
            ))}
          </li>
        </ul>
      </div>
    </nav>
  )
}
