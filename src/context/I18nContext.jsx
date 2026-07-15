import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'

const I18nContext = createContext()

const SUPPORTED_LANGUAGES = ['zh-TW', 'en', 'ja', 'ko']

const COUNTRY_LANG_MAP = {
  TW: 'zh-TW', HK: 'zh-TW', MO: 'zh-TW',
  JP: 'ja',
  KR: 'ko',
}

function getBrowserLang() {
  const b = navigator.language || navigator.userLanguage || ''
  if (b.startsWith('zh')) return 'zh-TW'
  if (b.startsWith('ja')) return 'ja'
  if (b.startsWith('ko')) return 'ko'
  return 'en'
}

async function detectLangFromIP() {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), 3000)
  try {
    const res = await fetch('https://get.geojs.io/v1/ip/country.json', { signal: controller.signal })
    const { country } = await res.json()
    clearTimeout(id)
    return COUNTRY_LANG_MAP[country] ?? null
  } catch {
    clearTimeout(id)
    return null
  }
}

function getInitialLang() {
  const params = new URLSearchParams(window.location.search)
  const urlLang = params.get('lang')
  if (urlLang && SUPPORTED_LANGUAGES.includes(urlLang)) {
    localStorage.setItem('preferredLanguage', urlLang)
    return urlLang
  }
  const saved = localStorage.getItem('preferredLanguage')
  if (saved && SUPPORTED_LANGUAGES.includes(saved)) return saved
  return getBrowserLang()
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)
  const [translations, setTranslations] = useState({})
  const [ready, setReady] = useState(false)
  const geoFired = useRef(false)

  useEffect(() => {
    if (geoFired.current) return
    const saved = localStorage.getItem('preferredLanguage')
    if (saved && SUPPORTED_LANGUAGES.includes(saved)) return
    geoFired.current = true

    detectLangFromIP().then((ipLang) => {
      const resolved = ipLang ?? getBrowserLang()
      localStorage.setItem('preferredLanguage', resolved)
      setLang(resolved)
    })
  }, [])

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
