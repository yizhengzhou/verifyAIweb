import { useI18n } from '../context/I18nContext'

const APP_STORE_URL = 'https://apps.apple.com/tw/app/verifyai-%E5%BD%B1%E5%83%8F%E6%90%9C%E5%B0%8B/id6754511420'

export default function CTA() {
  const { t } = useI18n()

  return (
    <section className="cta-section">
      <h2>{t('cta.title')}</h2>
      <p>{t('cta.description')}</p>
      <a
        href={APP_STORE_URL}
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
