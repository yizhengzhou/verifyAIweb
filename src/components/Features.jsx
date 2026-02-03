import { useI18n } from '../context/I18nContext'
import { Heart, Users, Briefcase, ShoppingCart, ScanFace } from 'lucide-react'

const items = [
  { key: 'dating', icon: <Heart size={48} /> },
  { key: 'social', icon: <Users size={48} /> },
  { key: 'business', icon: <Briefcase size={48} /> },
  { key: 'ecommerce', icon: <ShoppingCart size={48} /> },
  { key: 'self_verification', icon: <ScanFace size={48} /> },
]

export default function Features() {
  const { t } = useI18n()

  // Note: "applications" label removed as requested
  // New "Self Verification" item added

  return (
    <section id="features" className="section">
      <div className="section-header">
        <h2
          className="section-title"
          dangerouslySetInnerHTML={{ __html: t('features.title') }}
        />
        <p className="section-description">{t('features.description')}</p>
      </div>
      <div className="card-grid">
        {items.map(({ key, icon }) => (
          <div className="card feature-card" key={key}>
            <div className="feature-icon-bg">{icon}</div>
            <h3>{t(`features.${key}.title`)}</h3>
            <p>{t(`features.${key}.description`)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
