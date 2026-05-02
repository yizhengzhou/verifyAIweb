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

export function getAppStoreUrl() {
  const lang = navigator.language || (navigator.languages && navigator.languages[0]) || 'en'
  const country = LANG_TO_COUNTRY[lang] || LANG_TO_COUNTRY[lang.split('-')[0]] || 'us'
  return `https://apps.apple.com/${country}/app/id${APP_ID}`
}
