const APP_ID = '6754511420'

const LANG_TO_COUNTRY = {
  'zh-TW': 'tw',
  'zh-HK': 'hk',
  'zh-MO': 'mo',
  'zh': 'tw',
  'ja': 'jp',
  'ko': 'kr',
  'en-US': 'us',
  'en-GB': 'gb',
  'en-AU': 'au',
  'en-CA': 'ca',
  'en-NZ': 'nz',
  'en-SG': 'sg',
  'en': 'us',
  'de': 'de',
  'fr': 'fr',
  'es': 'es',
  'es-MX': 'mx',
  'it': 'it',
  'pt-BR': 'br',
  'pt': 'pt',
  'nl': 'nl',
  'sv': 'se',
  'da': 'dk',
  'fi': 'fi',
  'nb': 'no',
  'ru': 'ru',
  'pl': 'pl',
  'tr': 'tr',
  'ar': 'sa',
  'th': 'th',
  'id': 'id',
  'ms': 'my',
  'vi': 'vn',
}

export function getAppStoreUrl(lang, ctaId = null) {
  const effectiveLang = lang || (typeof navigator !== 'undefined' ? (navigator.language || (navigator.languages && navigator.languages[0])) : 'en') || 'en'
  const country = LANG_TO_COUNTRY[effectiveLang] || LANG_TO_COUNTRY[effectiveLang.split('-')[0]] || 'us'
  let url = `https://apps.apple.com/${country}/app/id${APP_ID}?pt=93593962&mt=8`
  
  let finalCt = ctaId || 'direct'
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    const utmSource = params.get('utm_source')
    const utmCampaign = params.get('utm_campaign')
    if (utmSource || utmCampaign) {
      finalCt = `${finalCt}_${utmSource || 'src'}_${utmCampaign || 'cmp'}`
    }
  }
  
  url += `&ct=${encodeURIComponent(finalCt)}`
  return url
}

export function getAppStoreUrlWithCta(lang, ctaId) {
  return getAppStoreUrl(lang, ctaId)
}
