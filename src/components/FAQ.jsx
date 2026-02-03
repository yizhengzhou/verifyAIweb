import { useState } from 'react'
import { useI18n } from '../context/I18nContext'
import { ChevronDown } from 'lucide-react'

const FAQ_COUNT = 9

export default function FAQ() {
  const { t } = useI18n()
  const [openIndex, setOpenIndex] = useState(null)

  function toggle(index) {
    setOpenIndex(openIndex === index ? null : index)
  }

  const items = []
  for (let i = 0; i < FAQ_COUNT; i++) {
    const q = t(`faq.items.${i}.question`)
    const a = t(`faq.items.${i}.answer`)
    if (q && q !== `faq.items.${i}.question`) {
      items.push({ question: q, answer: a })
    }
  }

  return (
    <section id="faq" className="faq">
      <div className="section-header">
        <span className="section-label">{t('faq.label')}</span>
        <h2 className="section-title">{t('faq.title')}</h2>
        <p className="section-description">{t('faq.description')}</p>
      </div>
      <div className="faq-list">
        {items.map((item, i) => (
          <div className={`faq-item${openIndex === i ? ' open' : ''}`} key={i}>
            <button className="faq-question" onClick={() => toggle(i)}>
              <span>{item.question}</span>
              <span className={`faq-chevron ${openIndex === i ? 'open' : ''}`}>
                <ChevronDown size={20} />
              </span>
            </button>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
