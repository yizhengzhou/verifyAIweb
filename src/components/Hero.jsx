import { useI18n } from '../context/I18nContext'
import { getAppStoreUrl } from '../utils/getAppStoreUrl'

export default function Hero() {
  const { t } = useI18n()

  return (
    <div className="hero">
      <div className="hero-container">
        <div className="hero-big-text">VerifyAI</div>
        <p className="hero-long-description">{t('hero.description')}</p>
        <div className="cta-buttons">
          <a
            href={getAppStoreUrl()}
            className="btn btn-primary btn-round"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t('hero.ctaButton')} - App Store`}
          >
            {t('hero.ctaButton')}
          </a>
          <a href="#howItWorks" className="btn btn-secondary btn-round">
            {t('hero.ctaSecondary')}
          </a>
        </div>
      </div>
    </div>
  )
}
