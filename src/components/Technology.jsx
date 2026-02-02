import { useI18n } from '../context/I18nContext'

const items = [
  { key: 'reverseSearch', icon: '\uD83D\uDD0D' },
  { key: 'metadata', icon: '\uD83D\uDCCA' },
  { key: 'faceMatch', icon: '\uD83D\uDC64' },
]

export default function Technology() {
  const { t } = useI18n()

  return (
    <section id="technology" className="section">
      <div className="section-header">
        <span className="section-label">{t('technology.label')}</span>
        <h2 className="section-title">{t('technology.title')}</h2>
        <p className="section-description">{t('technology.description')}</p>
      </div>
      <div className="tech-grid">
        {items.map(({ key, icon }) => (
          <div className="card" key={key}>
            <div className="card-icon">{icon}</div>
            <h3>{t(`technology.${key}.title`)}</h3>
            <p>{t(`technology.${key}.description`)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
