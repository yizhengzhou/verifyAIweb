import { useI18n } from '../context/I18nContext'

export default function Mission() {
  const { t, lang } = useI18n()

  // Founder story blog link per current locale (ko falls back to en)
  const blogSlug =
    lang === 'zh-TW' ? 'why-i-built-verifyai-zh'
    : lang === 'ja' ? 'why-i-built-verifyai-ja'
    : 'why-i-built-verifyai-en'
  const blogLine =
    lang === 'zh-TW' ? '閱讀完整創辦故事：朋友的長輩被網路詐騙之後 →'
    : lang === 'ja' ? '創設のストーリーを読む：友人の親御さんがネット詐欺に遭った後で →'
    : lang === 'ko' ? '창립 스토리 읽기 →'
    : 'Read the full founder story — after a friend\'s parent was scammed online →'

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

          <div className="mission-founder-link" style={{
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(60, 179, 155, 0.2)',
            textAlign: 'center'
          }}>
            <a
              href={`/blog/${blogSlug}`}
              style={{
                color: '#3CB39B',
                textDecoration: 'none',
                fontSize: '1.05rem',
                fontWeight: 500,
                lineHeight: 1.6
              }}
            >
              {blogLine}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
