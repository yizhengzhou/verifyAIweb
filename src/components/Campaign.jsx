import { useState } from 'react'
import { useI18n } from '../context/I18nContext'
import { getAppStoreUrl } from '../utils/getAppStoreUrl'

export default function Campaign() {
  const { t } = useI18n()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const [copied, setCopied] = useState(false)

  async function handleSubscribe(e) {
    e.preventDefault()
    if (!email || submitting) return

    setSubmitting(true)
    setError(false)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: '【VerifyAI】新用戶訂閱通知',
          from_name: 'VerifyAI 訂閱系統',
          email: 'verifyai.image.search@gmail.com',
          message: `新用戶已訂閱 VerifyAI 電子報！\n\n訂閱 Email：${email}\n時間：${new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}`,
          replyto: email,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
        setEmail('')
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(getAppStoreUrl()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function goToApp() {
    window.open(getAppStoreUrl(), '_blank', 'noopener')
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
                  disabled={submitting}
                />
                <button type="submit" disabled={submitting}>
                  {submitting ? '...' : t('campaign.subscribe.button')}
                </button>
              </form>
            )}
            {error && (
              <p className="subscribe-error">{t('campaign.subscribe.error') || '送出失敗，請稍後再試'}</p>
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
