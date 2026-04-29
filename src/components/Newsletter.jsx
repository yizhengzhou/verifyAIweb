import { useState } from 'react'
import { useI18n } from '../context/I18nContext'

export default function Newsletter() {
  const { t, lang } = useI18n()
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    if (status === 'submitting') return

    setStatus('submitting')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, lang, website }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="newsletter-success">{t('footer.newsletter.success')}</p>
    )
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
      <p className="newsletter-hint">{t('footer.newsletter.hint')}</p>
      <div className="newsletter-row">
        <input
          type="email"
          required
          placeholder={t('footer.newsletter.placeholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'submitting'}
          aria-label={t('footer.newsletter.placeholder')}
        />
        <button type="submit" disabled={status === 'submitting' || !email}>
          {status === 'submitting'
            ? t('footer.newsletter.submitting')
            : t('footer.newsletter.button')}
        </button>
      </div>
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="newsletter-honeypot"
      />
      {status === 'error' && (
        <p className="newsletter-error">{t('footer.newsletter.error')}</p>
      )}
    </form>
  )
}
