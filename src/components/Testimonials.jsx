import { useI18n } from '../context/I18nContext'
import { GraduationCap, HeartCrack, Shield } from 'lucide-react'

const items = [
  { key: 'expert', icon: <GraduationCap size={32} /> },
  { key: 'victim', icon: <HeartCrack size={32} /> },
  { key: 'team', icon: <Shield size={32} /> },
]

export default function Testimonials() {
  const { t } = useI18n()

  return (
    <section id="testimonials" className="section">
      <div className="section-header">
        <span className="section-label">{t('testimonials.label')}</span>
        <h2 className="section-title">{t('testimonials.title')}</h2>
        <p className="section-description">{t('testimonials.description')}</p>
      </div>
      <div className="card-grid">
        {items.map(({ key, icon }) => (
          <div className="testimonial-card" key={key}>
            <div className="testimonial-icon">{icon}</div>
            <div className="testimonial-role">{t(`testimonials.${key}.role`)}</div>
            <p className="testimonial-quote">{t(`testimonials.${key}.quote`)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
