import { useI18n } from '../../context/I18nContext'
import { Link } from 'react-router-dom'
import './LegalPage.css'

export default function PrivacyPolicy() {
  const { t, lang, changeLanguage } = useI18n()

  // Update document title
  if (typeof document !== 'undefined') {
    document.title = `${t('privacyPolicy.pageTitle')} - VerifyAI`
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.content = t('privacyPolicy.metaDescription')
  }

  const sections = t('privacyPolicy.sections')
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
              ← {t('privacyPolicy.backToHome')}
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
        <h1 className="legal-title">{t('privacyPolicy.title')}</h1>
        <p className="legal-last-updated">{t('privacyPolicy.lastUpdated')}</p>
        <p className="legal-intro">{t('privacyPolicy.intro')}</p>

        {sectionArray.map((section, idx) => (
          <section className="legal-section" key={idx}>
            <h2>
              <span className="section-number">{idx + 1}</span>
              {section.title}
            </h2>
            {section.subsections && section.subsections.map((sub, sIdx) => (
              <div key={sIdx}>
                {sub.subtitle && <h3>{sub.subtitle}</h3>}
                {sub.paragraphs && sub.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
                {sub.items && (
                  <ul>
                    {sub.items.map((item, iIdx) => (
                      <li key={iIdx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
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
            {t('privacyPolicy.contactText')}{' '}
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
