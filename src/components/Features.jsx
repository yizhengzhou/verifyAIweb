import { useI18n } from '../context/I18nContext'

const items = [
  { key: 'dating', icon: '\u2764\uFE0F' },
  { key: 'social', icon: '\uD83D\uDC65' },
  { key: 'business', icon: '\uD83D\uDCBC' },
  { key: 'ecommerce', icon: '\uD83D\uDECD\uFE0F' },
]

export default function Features() {
  const { t } = useI18n()

  return (
    <section id="features" className="section">
      <div className="section-header">
        <span className="section-label">{t('features.label')}</span>
        <h2
          className="section-title"
          dangerouslySetInnerHTML={{ __html: t('features.title') }}
        />
        <p className="section-description">{t('features.description')}</p>
      </div>
      <div className="card-grid">
        {items.map(({ key, icon }) => (
          <div className="card" key={key}>
            <div className="card-icon">{icon}</div>
            <h3>{t(`features.${key}.title`)}</h3>
            <p>{t(`features.${key}.description`)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
