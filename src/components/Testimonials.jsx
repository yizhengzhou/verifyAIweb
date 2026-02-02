import { useI18n } from '../context/I18nContext'

const items = [
  { key: 'expert', icon: '\uD83C\uDF93' },
  { key: 'victim', icon: '\uD83D\uDC94' },
  { key: 'team', icon: '\uD83D\uDEE1\uFE0F' },
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
