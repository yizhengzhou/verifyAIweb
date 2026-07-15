// 用於在 React StrictMode 等情況下，對特定的頁面瀏覽事件去重
const firedEvents = new Set();

/**
 * 從 URL 讀取 UTM 參數與 campaign_id
 * @returns {Object} UTM 參數物件
 */
export function getUtmParams() {
  if (typeof window === 'undefined') return { campaign_id: 'none' };
  
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get('utm_source');
  const utmMedium = params.get('utm_medium');
  const utmCampaign = params.get('utm_campaign');
  const utmContent = params.get('utm_content');
  const utmTerm = params.get('utm_term');
  // 優先從 URL 中的 campaign_id 或 utm_campaign 讀取，無則設為 'none'
  const campaignId = params.get('campaign_id') || utmCampaign || 'none';

  return {
    utm_source: utmSource || null,
    utm_medium: utmMedium || null,
    utm_campaign: utmCampaign || null,
    utm_content: utmContent || null,
    utm_term: utmTerm || null,
    campaign_id: campaignId
  };
}

/**
 * 判斷並解析流量來源群組 (source_group)
 * @param {string} referrer document.referrer
 * @param {string} search window.location.search
 * @returns {string} organic_search | google_ads | direct | referral | social
 */
export function parseSourceGroup(referrer, search) {
  const params = new URLSearchParams(search);
  const utmSource = params.get('utm_source');
  const gclid = params.get('gclid');
  const wbraid = params.get('wbraid');
  const gbraid = params.get('gbraid');
  
  // Google Ads 特有參數
  if (gclid || wbraid || gbraid || utmSource === 'google' || utmSource === 'google_ads') {
    return 'google_ads';
  }
  
  if (utmSource) {
    const sourceLower = utmSource.toLowerCase();
    if (['facebook', 'instagram', 'twitter', 'x', 'tiktok', 'youtube', 'linkedin', 'pinterest'].some(s => sourceLower.includes(s))) {
      return 'social';
    }
  }

  if (referrer) {
    try {
      const refUrl = new URL(referrer);
      const host = refUrl.hostname.toLowerCase();
      
      // 搜尋引擎
      if (['google.', 'bing.', 'yahoo.', 'baidu.', 'duckduckgo.', 'yandex.'].some(s => host.includes(s))) {
        return 'organic_search';
      }
      
      // 社群媒體
      if (['facebook.com', 'instagram.com', 't.co', 'twitter.com', 'x.com', 'tiktok.com', 'youtube.com', 'linkedin.com', 'pinterest.com'].some(s => host.includes(s))) {
        return 'social';
      }
      
      return 'referral';
    } catch (e) {
      // referrer 格式不正確或為空時 fallback
    }
  }
  
  return 'direct';
}

/**
 * 發送標準事件
 * @param {string} eventName 事件名稱
 * @param {Object} params 事件參數
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return;

  // 1. 針對特定頁面瀏覽事件在 React StrictMode 下進行去重
  if (eventName === 'view_landing' || eventName === 'view_guide') {
    const key = `${eventName}:${JSON.stringify(params)}`;
    if (firedEvents.has(key)) {
      return;
    }
    firedEvents.add(key);
  }

  // 2. 參數必填防呆（將 undefined 與 null 轉為 'none'）
  const processedParams = {};
  Object.keys(params).forEach(key => {
    const val = params[key];
    processedParams[key] = (val === undefined || val === null) ? 'none' : val;
  });

  // 3. Debug 模式 (localStorage.debug='verifyai') 輸出 log
  try {
    if (window.localStorage && window.localStorage.getItem('debug') === 'verifyai') {
      console.log(`[VerifyAI Tracking] Event: "${eventName}"`, processedParams);
    }
  } catch (e) {
    // 忽略 localStorage 讀取限制（例如 Safari 無痕模式）
  }

  // 4. 發送至 gtag
  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, processedParams);
    } catch (err) {
      console.error('[VerifyAI Tracking] gtag error:', err);
    }
  }
}

/**
 * 包裝 click_app_store 事件
 * @param {string} ctaId 下載路徑唯一識別碼
 * @param {string} ctaLocation 物理區塊位置
 * @param {string} pageType 當前頁面類型
 * @param {string} [language] 當前網頁語系
 */
export function trackAppStoreClick(ctaId, ctaLocation, pageType, language) {
  if (typeof window === 'undefined') return;

  const utmParams = getUtmParams();
  const effectiveLanguage = language || document.documentElement.lang || navigator.language || 'en';

  const params = {
    cta_id: ctaId,
    cta_location: ctaLocation,
    page_type: pageType,
    page_path: window.location.pathname,
    language: effectiveLanguage,
    destination_app_id: '6754511420',
    campaign_id: utmParams.campaign_id
  };

  trackEvent('click_app_store', params);

  // 6.1 廣告轉換事件並聯觸發機制
  if (ctaId === 'rt_ad_us_shorts') {
    if (typeof window.gtag === 'function') {
      try {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-18226736945/tHpKCJrLtr0cELHel_ND',
          'value': 1.0,
          'currency': 'USD'
        });
      } catch (err) {
        console.error('[VerifyAI Tracking] Google Ads conversion parallel call error:', err);
      }
    }
  }
}
