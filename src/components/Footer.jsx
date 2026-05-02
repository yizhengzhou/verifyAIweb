import { Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext'
import Newsletter from './Newsletter'
import { getAppStoreUrl } from '../utils/getAppStoreUrl'

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
              <a href={getAppStoreUrl()} target="_blank" rel="noopener noreferrer">
                {t('footer.product.changelog')}
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>{t('footer.legal.title')}</h3>
          <ul>
            <li>
              <Link to="/privacy">
                {t('footer.legal.privacy')}
              </Link>
            </li>
            <li>
              <Link to="/terms">
                {t('footer.legal.terms')}
              </Link>
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
