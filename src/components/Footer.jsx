import { useI18n } from '../context/I18nContext'
import Newsletter from './Newsletter'

const APP_STORE_URL = 'https://apps.apple.com/tw/app/verifyai-%E5%BD%B1%E5%83%8F%E6%90%9C%E5%B0%8B/id6754511420'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>{t('footer.brandTitle')}</h3>
          <p>{t('footer.brandDescription')}</p>
        </div>

        <div className="footer-section footer-section-newsletter">
          <h3>{t('footer.newsletter.title')}</h3>
          <Newsletter />
        </div>

        <div className="footer-section">
          <h3>{t('footer.product.title')}</h3>
          <ul>
            <li><a href="#features">{t('footer.product.features')}</a></li>
            <li><a href="#technology">{t('footer.product.technology')}</a></li>
            <li>
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
                {t('footer.product.changelog')}
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>{t('footer.legal.title')}</h3>
          <ul>
            <li>
              <a href="https://yizhengzhou.github.io/verifyai-legal" target="_blank" rel="noopener noreferrer">
                {t('footer.legal.privacy')}
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>{t('footer.contact.title')}</h3>
          <p className="footer-email">
            {t('footer.contact.email')}{' '}
            <a href="mailto:verifyai.image.search@gmail.com">verifyai.image.search@gmail.com</a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t('footer.copyright')}</p>
      </div>
    </footer>
  )
}
