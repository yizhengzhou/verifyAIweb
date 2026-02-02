import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const I18nContext = createContext()

const SUPPORTED_LANGUAGES = ['zh-TW', 'en', 'ja', 'ko']

function detectLanguage() {
  const saved = localStorage.getItem('preferredLanguage')
  if (saved && SUPPORTED_LANGUAGES.includes(saved)) return saved

  const browser = navigator.language || navigator.userLanguage || ''
  if (browser.startsWith('zh')) return 'zh-TW'
  if (browser.startsWith('ja')) return 'ja'
  if (browser.startsWith('ko')) return 'ko'
  return 'en'
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(detectLanguage)
  const [translations, setTranslations] = useState({})
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch(`/locales/${lang}.json`)
        if (!res.ok) throw new Error(`Failed to load ${lang}`)
        const data = await res.json()
        if (!cancelled) {
          setTranslations(data)
          setReady(true)
          document.documentElement.lang = lang
          document.title = get(data, 'meta.title') || document.title
          const desc = document.querySelector('meta[name="description"]')
          if (desc) desc.content = get(data, 'meta.description') || desc.content
        }
      } catch (err) {
        console.error('i18n load error:', err)
        if (lang !== 'zh-TW' && !cancelled) {
          setLang('zh-TW')
        }
      }
    }
    load()
    return () => { cancelled = true }
  }, [lang])

  const changeLanguage = useCallback((newLang) => {
    if (SUPPORTED_LANGUAGES.includes(newLang)) {
      localStorage.setItem('preferredLanguage', newLang)
      setLang(newLang)
    }
  }, [])

  const t = useCallback((key) => {
    return get(translations, key) || key
  }, [translations])

  return (
    <I18nContext.Provider value={{ lang, t, changeLanguage, ready, supportedLanguages: SUPPORTED_LANGUAGES }}>
      {children}
    </I18nContext.Provider>
  )
}

function get(obj, path) {
  const keys = path.split('.')
  let val = obj
  for (const k of keys) {
    if (val && typeof val === 'object' && k in val) {
      val = val[k]
    } else {
      return undefined
    }
  }
  return val
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
