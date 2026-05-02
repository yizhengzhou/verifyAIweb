import { useI18n } from '../context/I18nContext'
import { getAppStoreUrl } from '../utils/getAppStoreUrl'

export default function CTA() {
  const { t } = useI18n()

  return (
    <section className="cta-section">
      <h2>{t('cta.title')}</h2>
      <p>{t('cta.description')}</p>
      <a
        href={getAppStoreUrl()}
        className="btn"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t('cta.button')} - App Store`}
      >
        {t('cta.button')}
      </a>
      {t('cta.note') && t('cta.note') !== 'cta.note' && (
        <p className="cta-note">{t('cta.note')}</p>
      )}
    </section>
  )
}
