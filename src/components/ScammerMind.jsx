import { useState } from 'react'
import Footer from './Footer'

export default function ScammerMind() {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch('/api/scammer-mind', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      })
      const data = await res.json()
      if (data?.success) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMsg(data?.message || '訂閱失敗、請稍後再試')
      }
    } catch {
      setStatus('error')
      setErrorMsg('網路錯誤、請稍後再試')
    }
  }

  return (
    <>
      <main style={styles.main}>
        <header style={styles.header}>
          <a href="/" style={styles.logoLink}>
            <span style={styles.logoMark}>V</span>
            <span style={styles.logoText}>VerifyAI</span>
          </a>
          <span style={styles.badge}>反詐教育素材 · 免費</span>
        </header>

        <section style={styles.hero}>
          <h1 style={styles.title}>
            Sugar-Baby Riri 操作手冊註解版
          </h1>
          <p style={styles.subtitle}>給目標族群的識別指南</p>
          <p style={styles.lede}>
            日本年入 1000 万詐騙女子渡辺真衣 2022 年自費出版的教戰手冊、
            我們逐句拆給你看詐騙者怎麼想、怎麼挑目標、怎麼建立信任、怎麼把錢「請」出來。
            讀完你會多一份「我認得這是第幾階段的哪一個動作」的識別力。
          </p>
        </section>

        <section style={styles.chapters}>
          <h2 style={styles.h2}>章節預覽</h2>
          <ol style={styles.chapterList}>
            <li><strong>第 0 章</strong>　這本手冊的來歷：作者、案件、判決</li>
            <li><strong>第 1 章</strong>　詐騙者怎麼設計「想保護的女孩」人設</li>
            <li><strong>第 2 章</strong>　詐騙者把目標分三類：要、平、給</li>
            <li><strong>第 3 章</strong>　詐騙者去哪裡找目標</li>
            <li><strong>第 4 章</strong>　首次接觸的紅旗</li>
            <li><strong>第 5 章</strong>　四個讓你深陷的心理機制（Cialdini 四原則）</li>
            <li><strong>第 6 章</strong>　金錢索取的七階段故事弧</li>
            <li><strong>第 7 章</strong>　紅旗自查清單：你是不是正在被鎖定？</li>
            <li><strong>附錄 A</strong>　VerifyAI 反詐工具怎麼對應這些戰術</li>
            <li><strong>附錄 B</strong>　資料來源、引用聲明、聯絡</li>
            <li><strong>附錄 C</strong>　延伸閱讀</li>
          </ol>
        </section>

        <section style={styles.formSection}>
          <h2 style={styles.h2}>輸入電子郵件、立刻寄到信箱</h2>
          {status === 'success' ? (
            <div style={styles.successBox}>
              <p style={{ margin: 0, fontSize: 17 }}>
                ✓ 訂閱成功、請查收信箱（含垃圾郵件夾）。
              </p>
              <p style={{ marginTop: 8, fontSize: 14, color: '#666' }}>
                若 10 分鐘內沒收到、請聯絡 support@fork.work
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                disabled={status === 'sending'}
              />
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                style={styles.honeypot}
                aria-hidden="true"
              />
              <button
                type="submit"
                style={{
                  ...styles.button,
                  opacity: status === 'sending' ? 0.6 : 1,
                  cursor: status === 'sending' ? 'wait' : 'pointer',
                }}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? '寄送中…' : '立刻寄到信箱'}
              </button>
              {status === 'error' && (
                <p style={styles.errorMsg}>{errorMsg}</p>
              )}
            </form>
          )}
          <p style={styles.disclaimer}>
            訂閱後同時加入 VerifyAI 反詐電子報（每週一封、隨時退訂）。
            你的電子郵件僅用於寄送本素材及後續電子報、不會分享給第三方。
          </p>
        </section>

        <section style={styles.legal}>
          <h3 style={styles.h3}>引用與立場聲明</h3>
          <p style={styles.legalText}>
            本作品依日本著作権法第 32 條「引用」要件、美國 17 U.S.C. § 107 fair use 原則、
            台灣著作權法第 52 條進行：引用片段累計不超過原書 5%、每段日文不超過 30 字、
            評論文字佔 PDF 內容 80% 以上、屬於 transformative 評論性合理使用。
          </p>
          <p style={styles.legalText}>
            本作品對原書描述之手法進行批判、警示、解構、絕無教導讀者複製該等手法之意圖。
            讀者完整閱讀本作品、僅能獲得識別詐騙之防禦能力。
          </p>
          <p style={styles.legalSmall}>
            原書資訊：渡辺真衣 著《1ヶ月1000万頂く頂き女子りりちゃんの【みんなを稼がせるマニュアル】》、
            2022 年 5 月 29 日自費出版。著作權異議聯絡：dmca@fork.work
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}

const styles = {
  main: {
    maxWidth: 760,
    margin: '0 auto',
    padding: '40px 20px 80px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang TC", "Helvetica Neue", sans-serif',
    color: '#222',
    lineHeight: 1.7,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 48,
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    textDecoration: 'none',
    color: '#3CB39B',
  },
  logoMark: {
    background: '#3CB39B',
    color: '#fff',
    width: 32,
    height: 32,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 600,
  },
  badge: {
    background: '#fef3c7',
    color: '#92400e',
    fontSize: 12,
    padding: '4px 10px',
    borderRadius: 999,
    fontWeight: 600,
  },
  hero: {
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    margin: 0,
    color: '#111',
    lineHeight: 1.3,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    margin: '8px 0 24px',
  },
  lede: {
    fontSize: 16,
    color: '#333',
  },
  chapters: {
    background: '#f9fafb',
    padding: 24,
    borderRadius: 12,
    marginBottom: 48,
  },
  h2: {
    fontSize: 20,
    color: '#3CB39B',
    marginTop: 0,
  },
  h3: {
    fontSize: 16,
    color: '#666',
    marginTop: 0,
  },
  chapterList: {
    margin: 0,
    paddingLeft: 20,
    fontSize: 15,
  },
  formSection: {
    background: '#fff',
    border: '2px solid #3CB39B',
    padding: 32,
    borderRadius: 12,
    marginBottom: 48,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  input: {
    padding: '14px 16px',
    fontSize: 16,
    border: '1px solid #d1d5db',
    borderRadius: 8,
    fontFamily: 'inherit',
  },
  honeypot: {
    position: 'absolute',
    left: '-9999px',
    width: 1,
    height: 1,
    opacity: 0,
  },
  button: {
    padding: '14px 24px',
    fontSize: 16,
    fontWeight: 600,
    background: '#3CB39B',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontFamily: 'inherit',
  },
  successBox: {
    background: '#dcfce7',
    color: '#166534',
    padding: 20,
    borderRadius: 8,
  },
  errorMsg: {
    color: '#dc2626',
    fontSize: 14,
    margin: 0,
  },
  disclaimer: {
    fontSize: 13,
    color: '#666',
    marginTop: 16,
    marginBottom: 0,
  },
  legal: {
    fontSize: 14,
    color: '#666',
    borderTop: '1px solid #e5e7eb',
    paddingTop: 24,
  },
  legalText: {
    fontSize: 14,
    color: '#555',
  },
  legalSmall: {
    fontSize: 12,
    color: '#888',
    marginTop: 16,
  },
}
