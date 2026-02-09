import { useState } from 'react'
import { useI18n } from '../context/I18nContext'

const SHARE_URL = 'https://apps.apple.com/tw/app/verifyai-%E5%BD%B1%E5%83%8F%E6%90%9C%E5%B0%8B/id6754511420'

export default function Campaign() {
  const { t } = useI18n()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  function handleSubscribe(e) {
    e.preventDefault()
    if (!email) return
    // TODO: integrate with Mailchimp/Brevo API
    console.log('Subscribe:', email)
    setSubmitted(true)
    setEmail('')
  }

  function copyLink() {
    navigator.clipboard.writeText(SHARE_URL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function goToApp() {
    window.open(SHARE_URL, '_blank', 'noopener')
  }

  return (
    <section id="campaign" className="campaign">
      <div className="campaign-inner">
        <div className="section-header">
          <h2 className="section-title">{t('campaign.title')}</h2>
          <p className="section-description">{t('campaign.description')}</p>
        </div>

        <div className="campaign-grid">
          <div className="campaign-subscribe">
            <h3>{t('campaign.subscribe.title')}</h3>
            <p className="sub-desc">{t('campaign.subscribe.description')}</p>
            {submitted ? (
              <p className="subscribe-success">{t('campaign.subscribe.success')}</p>
            ) : (
              <form className="subscribe-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('campaign.subscribe.placeholder')}
                  required
                />
                <button type="submit">{t('campaign.subscribe.button')}</button>
              </form>
            )}
            <p className="subscribe-note">{t('campaign.subscribe.note')}</p>
          </div>

          <div className="campaign-share">
            <h3>{t('campaign.share.title')}</h3>
            <p className="share-desc">{t('campaign.share.description')}</p>
            <div className="share-buttons">
              <button className="share-btn app-store" onClick={goToApp}>
                {t('campaign.share.goToApp') || '立即前往 VerifyAI'}
              </button>
              <button className="share-btn copy" onClick={copyLink}>
                {t('campaign.share.copy')}
              </button>
            </div>
            <p className="copy-toast">{copied ? t('campaign.share.copied') : ''}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
