import { useI18n } from '../context/I18nContext'
import { getAppStoreUrl } from '../utils/getAppStoreUrl'
import { trackAppStoreClick } from '../utils/tracking'

export default function CTA() {
  const { t, lang } = useI18n()

  return (
    <section className="cta-section">
      <h2>{t('cta.title')}</h2>
      <p>{t('cta.description')}</p>
      <a
        href={getAppStoreUrl(lang, 'rt_home_bottom')}
        className="btn"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t('cta.button')} - App Store`}
        onClick={() => trackAppStoreClick('rt_home_bottom', 'bottom', 'home', lang)}
      >
        {t('cta.button')}
      </a>
      {t('cta.note') && t('cta.note') !== 'cta.note' && (
        <p className="cta-note">{t('cta.note')}</p>
      )}
    </section>
  )
}
