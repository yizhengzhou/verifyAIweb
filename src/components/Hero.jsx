import { useI18n } from '../context/I18nContext'

const APP_STORE_URL = 'https://apps.apple.com/tw/app/verifyai-%E5%BD%B1%E5%83%8F%E6%90%9C%E5%B0%8B/id6754511420'

export default function Hero() {
  const { t } = useI18n()

  return (
    <div className="hero">
      <div className="hero-card">
        <span className="hero-label">{t('hero.label')}</span>
        <h1>
          {t('hero.title')}
          <br />
          <span className="subtitle">{t('hero.subtitle')}</span>
        </h1>
        <p className="hero-description">{t('hero.description')}</p>
        <div className="cta-buttons">
          <a
            href={APP_STORE_URL}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t('hero.ctaButton')} - App Store`}
          >
            {t('hero.ctaButton')}
          </a>
          <a href="#howItWorks" className="btn btn-secondary">
            {t('hero.ctaSecondary')}
          </a>
        </div>
      </div>
    </div>
  )
}
