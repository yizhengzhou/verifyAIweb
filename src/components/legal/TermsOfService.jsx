import { useI18n } from '../../context/I18nContext'
import { Link } from 'react-router-dom'
import './LegalPage.css'

export default function TermsOfService() {
  const { t, lang, changeLanguage } = useI18n()

  // Update document title
  if (typeof document !== 'undefined') {
    document.title = `${t('termsOfService.pageTitle')} - VerifyAI`
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.content = t('termsOfService.metaDescription')
  }

  const sections = t('termsOfService.sections')
  const sectionArray = Array.isArray(sections) ? sections : []

  return (
    <div className="legal-page">
      {/* Header */}
      <header className="legal-header">
        <div className="legal-header-inner">
          <Link to="/" className="legal-logo">
            <img src="/logov2.png" alt="VerifyAI" />
            <span>VerifyAI</span>
          </Link>
          <nav className="legal-nav">
            <Link to="/" className="legal-back-link">
              ← {t('termsOfService.backToHome')}
            </Link>
            <div className="legal-lang-switcher">
              <button
                className={`legal-lang-btn ${lang === 'zh-TW' ? 'active' : ''}`}
                onClick={() => changeLanguage('zh-TW')}
              >
                中文
              </button>
              <button
                className={`legal-lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
              >
                EN
              </button>
              <button
                className={`legal-lang-btn ${lang === 'ja' ? 'active' : ''}`}
                onClick={() => changeLanguage('ja')}
              >
                日本語
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="legal-content">
        <h1 className="legal-title">{t('termsOfService.title')}</h1>
        <p className="legal-last-updated">{t('termsOfService.lastUpdated')}</p>
        <p className="legal-intro">{t('termsOfService.intro')}</p>

        {sectionArray.map((section, idx) => (
          <section className="legal-section" key={idx}>
            <h2>
              <span className="section-number">{idx + 1}</span>
              {section.title}
            </h2>
            {section.paragraphs && section.paragraphs.map((p, pIdx) => (
              <p key={pIdx}>{p}</p>
            ))}
            {section.items && (
              <ul>
                {section.items.map((item, iIdx) => (
                  <li key={iIdx}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <div className="legal-contact-box">
          <p>
            {t('termsOfService.contactText')}{' '}
            <a href="mailto:yizheng@fork.work">yizheng@fork.work</a>
          </p>
        </div>
      </main>

      <footer className="legal-footer">
        <p>{t('footer.copyright')}</p>
      </footer>
    </div>
  )
}
