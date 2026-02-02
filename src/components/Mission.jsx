import { useI18n } from '../context/I18nContext'

export default function Mission() {
  const { t } = useI18n()

  return (
    <section id="mission" className="mission">
      <div className="mission-inner">
        <div className="section-header">
          <span className="section-label">{t('mission.label')}</span>
          <h2 className="section-title">{t('mission.title')}</h2>
          <p className="section-description">{t('mission.description')}</p>
        </div>
        <blockquote>{t('mission.quote')}</blockquote>
        <p className="mission-body">{t('mission.body')}</p>
      </div>
    </section>
  )
}
