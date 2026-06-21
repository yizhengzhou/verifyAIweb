import { useI18n } from '../context/I18nContext'
import { getAppStoreUrl } from '../utils/getAppStoreUrl'
import PipelineAnimation from './PipelineAnimation'

export default function Hero() {
  const { t, lang } = useI18n()
  const pipelineLocale = t('pipeline')

  return (
    <div className="hero">
      {/* Pipeline animation background */}
      {pipelineLocale && <PipelineAnimation locale={pipelineLocale} />}

      <div className="hero-container">
        <div className="hero-big-text">VerifyAI</div>
        <p className="hero-long-description">{t('hero.description')}</p>
        <div className="cta-buttons">
          <a
            href={getAppStoreUrl(lang)}
            className="btn btn-primary btn-round"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t('hero.ctaButton')} - App Store`}
            onClick={() => {
              if (window.gtag) {
                window.gtag('event', 'conversion', { send_to: 'AW-18226736945/tHpKCJrLtr0cELHel_ND' })
              }
            }}
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