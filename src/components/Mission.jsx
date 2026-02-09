import { useI18n } from '../context/I18nContext'

export default function Mission() {
  const { t } = useI18n()

  return (
    <section id="mission" className="mission">
      <div className="mission-inner">
        <div className="section-header">
          <span className="section-label">{t('mission.label')}</span>
          <h2 className="section-title">{t('mission.title')}</h2>
          <p className="section-description">{t('mission.intro')}</p>
        </div>

        <div className="mission-content">
          <h3 className="mission-subtitle">{t('mission.valuesTitle')}</h3>

          <div className="mission-values">
            <div className="mission-value">
              <div className="value-number">01</div>
              <h4 className="value-title">{t('mission.value1.title')}</h4>
              <p className="value-description">{t('mission.value1.description')}</p>
            </div>

            <div className="mission-value">
              <div className="value-number">02</div>
              <h4 className="value-title">{t('mission.value2.title')}</h4>
              <p className="value-description">{t('mission.value2.description')}</p>
              {t('mission.value2.citation') && (
                <cite className="value-citation">{t('mission.value2.citation')}</cite>
              )}
            </div>

            <div className="mission-value">
              <div className="value-number">03</div>
              <h4 className="value-title">{t('mission.value3.title')}</h4>
              <p className="value-description">{t('mission.value3.description')}</p>
            </div>

            <div className="mission-value">
              <div className="value-number">04</div>
              <h4 className="value-title">{t('mission.value4.title')}</h4>
              <p className="value-description">{t('mission.value4.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
