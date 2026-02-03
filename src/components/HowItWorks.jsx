import { useI18n } from '../context/I18nContext'
import { Upload, Cpu, CheckCircle } from 'lucide-react'
import Carousel from './Carousel'

const steps = [
  { key: 'step1', icon: <Upload size={32} /> },
  { key: 'step2', icon: <Cpu size={32} /> },
  { key: 'step3', icon: <CheckCircle size={32} /> },
]

export default function HowItWorks() {
  const { t } = useI18n()

  return (
    <section id="howItWorks" className="section-full section-alt">
      <div className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="section-header">
          <span className="section-label">{t('howItWorks.label')}</span>
          <h2 className="section-title">{t('howItWorks.title')}</h2>
          <p className="section-description">{t('howItWorks.description')}</p>
        </div>
        <div className="card-grid">
          {steps.map(({ key, icon }) => (
            <div className="card" key={key}>
              <div className="card-icon">{icon}</div>
              <h3>
                <span className="step-number">{t(`howItWorks.${key}.number`)}</span>
                {t(`howItWorks.${key}.title`)}
              </h3>
              <p>{t(`howItWorks.${key}.description`)}</p>
            </div>
          ))}
        </div>

        <div className="carousel-container" style={{ marginTop: '60px' }}>
          <Carousel />
        </div>
      </div>
    </section>
  )
}
