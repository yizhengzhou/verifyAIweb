import { useI18n } from '../context/I18nContext'
import { Search, FileText, ScanFace } from 'lucide-react'

const items = [
  { key: 'reverseSearch', icon: <Search size={40} /> },
  { key: 'metadata', icon: <FileText size={40} /> },
  { key: 'faceMatch', icon: <ScanFace size={40} /> },
]

export default function Technology() {
  const { t } = useI18n()

  return (
    <section id="technology" className="section-green">
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
