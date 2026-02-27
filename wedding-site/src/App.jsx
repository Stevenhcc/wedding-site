import { useState, useEffect, useRef, useCallback } from 'react'

/* ─── SVG ICONS ─── */
const Icon = ({ type }) => {
  const icons = {
    plane: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.4-.1.9.3 1.1L9 11.5 6.5 14l-2.8-.7c-.4-.1-.8.1-1 .4l-.1.3c-.2.4 0 .8.3 1l3.3 2 2 3.3c.2.3.6.5 1 .3l.3-.1c.3-.2.5-.6.4-1L9.2 17l2.5-2.5 3.2 5.3c.2.4.7.5 1.1.3l.5-.3c.4-.2.5-.6.5-1.1z"/></svg>,
    train: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><circle cx="8.5" cy="15.5" r="1"/><circle cx="15.5" cy="15.5" r="1"/><path d="M7.5 19l-2 3"/><path d="M16.5 19l2 3"/></svg>,
    bus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6v6"/><path d="M16 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H6C4.9 6 3.9 6.8 3.6 7.8l-1.4 5c-.1.4-.2.8-.2 1.2 0 .4.1.8.2 1.2C2.5 16.3 3 18 3 18h3"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>,
    hotel: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/><path d="M9 22V12h6v10"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/></svg>,
  }
  return <span className="os-icon">{icons[type]}</span>
}

/* ─── BOTANICAL DECORATIONS ─── */
const Leaf = ({ className = '' }) => (
  <svg className={`leaf-svg ${className}`} viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 50 Q30 10 60 8 Q90 6 110 30 Q80 20 60 22 Q30 26 10 50Z" fill="currentColor" opacity="0.08"/>
    <path d="M10 50 Q30 10 60 8 Q90 6 110 30" stroke="currentColor" strokeWidth="1" opacity="0.15" fill="none"/>
    <path d="M10 50 Q40 25 110 30" stroke="currentColor" strokeWidth="0.5" opacity="0.1" fill="none"/>
  </svg>
)

const Sprig = ({ flip }) => (
  <svg className={`sprig ${flip ? 'sprig-flip' : ''}`} viewBox="0 0 40 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 110 Q20 60 20 10" stroke="currentColor" strokeWidth="0.8" opacity="0.2"/>
    <path d="M20 80 Q8 68 6 55" stroke="currentColor" strokeWidth="0.6" opacity="0.15" fill="none"/>
    <path d="M20 60 Q32 48 35 35" stroke="currentColor" strokeWidth="0.6" opacity="0.15" fill="none"/>
    <path d="M20 40 Q10 30 8 18" stroke="currentColor" strokeWidth="0.6" opacity="0.15" fill="none"/>
    <circle cx="6" cy="53" r="3" fill="currentColor" opacity="0.06"/>
    <circle cx="35" cy="33" r="3.5" fill="currentColor" opacity="0.06"/>
    <circle cx="8" cy="16" r="2.5" fill="currentColor" opacity="0.06"/>
    <circle cx="20" cy="8" r="2" fill="currentColor" opacity="0.08"/>
  </svg>
)

/* ─── CONTENT ─── */
const T = {
  en: {
    langLabel: '中文',
    nav: ['Home', 'Our Story', 'Schedule', 'Travel', 'RSVP', 'FAQ'],
    hero: {
      pre: 'together with our families, we invite you to celebrate',
      names: 'Steven 侯成',
      amp: '&',
      names2: 'Bonnie 簡子芸',
      date: 'December 19, 2026',
      day: 'Saturday',
      venue: 'Fleur de Chine Hotel · Sun Moon Lake, Taiwan',
      cta: 'RSVP',
    },
    noGift: {
      title: 'A little note',
      body: "The greatest gift you can give us is being there. We kindly ask that you skip the red envelopes and monetary gifts — your love, laughter, and blessings are more than enough.",
    },
    photos: { title: 'Our Journey', sub: 'Moments from our story together' },
    story: {
      title: 'Our Story',
      sub: 'Two lives, two cultures, one love',
      p1: "What started as a spark across the Pacific grew into something neither of us expected. Steven, from New Jersey, and Bonnie, from Taichung, Taiwan — we found each other in the best way possible.",
      p2: "We got legally married in Taiwan, and now we get to throw the party. We can't wait to celebrate with the people who've meant the most to us — at Sun Moon Lake, one of Taiwan's most beautiful places.",
      p3: "We believe marriage is a gift, and we're so grateful for every person who's been part of our story. See you there.",
    },
    schedule: {
      title: 'The Day',
      sub: 'Saturday, December 19, 2026',
      events: [
        { time: '10:00 AM', name: 'Ceremony', venue: 'Soaring Cloud Hall 雲揚廳', detail: 'Love, faith, and family.' },
        { time: '12:30 PM', name: 'Banquet & Celebration', venue: 'Cosmos Cloud B Hall 雲翰B廳', detail: 'Chinese banquet, toasts, and a whole lot of joy.' },
        { time: '3:00 PM', name: 'Farewell', venue: '', detail: 'Send-off with gratitude.' },
      ],
    },
    venue: {
      title: 'Getting There',
      sub: 'Fleur de Chine Hotel · Sun Moon Lake',
      address: 'No. 23, Zhongzheng Rd, Yuchi Township, Nantou County 555, Taiwan',
      domestic: {
        title: 'From Within Taiwan',
        steps: [
          'Drive to Sun Moon Lake (~1.5 hrs from Taichung), or',
          'Take Nantou Bus (南投客運) from Taichung HSR Station directly to Sun Moon Lake',
          'Free parking at the hotel for wedding guests',
        ],
        note: "We may arrange a shuttle from Taichung HSR — let us know on the RSVP if you\u2019re interested.",
      },
      overseas: {
        title: 'From Overseas',
        steps: [
          { icon: 'plane', label: 'Fly into Taoyuan International Airport (TPE)' },
          { icon: 'train', label: 'HSR from Taoyuan → Taichung Station (40 min)' },
          { icon: 'bus', label: 'Bus or car from Taichung HSR → Sun Moon Lake (1.5 hrs)' },
          { icon: 'hotel', label: 'Check in at Fleur de Chine Hotel' },
        ],
        note: 'We recommend arriving the day before to settle in and explore.',
      },
    },
    rsvp: {
      title: 'RSVP',
      sub: 'Please respond by November 19, 2026',
      desc: "Let us know you're coming! Takes about 2 minutes — helps us plan seating, meals, and transport.",
      cta: 'Open RSVP Form',
    },
    faq: {
      title: 'Questions?',
      items: [
        { q: 'What should I wear?', a: "Formal or semi-formal. December at Sun Moon Lake is cool — around 12–18°C (54–64°F) — so bring a warm layer." },
        { q: 'What about the weather?', a: "Cool and crisp with possible morning mist. Everything's indoors, but you'll want warmth for any time outside." },
        { q: 'How do I find the ceremony and banquet halls?', a: 'Both are on the lobby level. Enter the main entrance and follow the signs toward the banquet wing.' },
        { q: "I'm coming from overseas — how do I get there?", a: 'Fly into Taoyuan Airport (TPE), HSR to Taichung (40 min), then bus or car to Sun Moon Lake (1.5 hrs). Arrive the day before if you can.' },
      ],
    },
    explore: {
      title: "While You're Here",
      sub: 'Things to do around Sun Moon Lake',
      items: [
        { name: 'Cycling Path', desc: "One of the world's most beautiful bike paths, looping the entire lake." },
        { name: 'Wenwu Temple', desc: 'Stunning lakeside temple with panoramic views — just 1km away.' },
        { name: 'Sun Moon Lake Ropeway', desc: 'Aerial cable car with mountain and lake views.' },
        { name: 'Ita Thao Village', desc: 'Indigenous village — street food, crafts, and cultural experiences.' },
        { name: 'Hotel Hot Springs', desc: 'Natural hot springs right at the hotel. The perfect wind-down.' },
      ],
    },
    stickyRsvp: 'RSVP',
    footer: 'Steven & Bonnie',
    footerNames: 'Steven 侯成 & Bonnie 簡子芸',
    footerDate: 'December 19, 2026',
    footerSub: 'Sun Moon Lake, Taiwan',
    footerVerse: '"Two are better than one, because they have a good return for their labor."',
    footerRef: 'Ecclesiastes 4:9',
  },
  zh: {
    langLabel: 'EN',
    nav: ['首頁', '我們的故事', '婚禮流程', '交通指南', '出席回覆', '常見問題'],
    hero: {
      pre: '我們誠摯地邀請您，一同見證這美好的時刻',
      names: 'Steven 侯成',
      amp: '&',
      names2: 'Bonnie 簡子芸',
      date: '2026年12月19日',
      day: '星期六',
      venue: '日月潭 · 雲品溫泉酒店',
      cta: '立即回覆',
    },
    noGift: {
      title: '我們的小小心意',
      body: '您的到來，就是給我們最珍貴的禮物。我們誠心地請求您不要包紅包或送任何禮金——您的愛、您的笑容、您的祝福，就是我們最大的幸福。',
    },
    photos: { title: '我們的旅程', sub: '一路走來的精彩片段' },
    story: {
      title: '我們的故事',
      sub: '兩個生命、兩種文化、一份愛',
      p1: '一段跨越太平洋的緣分，成長為以信仰、家庭和共同願景為根基的愛情。侯成來自美國紐澤西，子芸來自台灣台中，兩人在彼此身上找到了人生旅途中最好的夥伴。',
      p2: '我們已在台灣完成結婚登記，現在無比喜悅地邀請對我們最重要的人，一同在美麗的日月潭慶祝我們的結合。',
      p3: '我們相信婚姻是恩賜，感謝每一位在我們生命中留下足跡的人。期待與您一同歡慶。',
    },
    schedule: {
      title: '婚禮流程',
      sub: '2026年12月19日（星期六）',
      events: [
        { time: '上午 10:00', name: '證婚儀式', venue: '雲揚廳', detail: '以愛、信仰與家庭為主題的慶典。' },
        { time: '中午 12:30', name: '喜宴', venue: '雲翰B廳', detail: '中式喜宴、歡慶與團契。' },
        { time: '下午 3:00', name: '禮成', venue: '', detail: '歡送賓客，感恩與喜樂。' },
      ],
    },
    venue: {
      title: '交通指南',
      sub: '雲品溫泉酒店 · 日月潭',
      address: '南投縣魚池鄉日月潭中正路23號',
      domestic: {
        title: '台灣國內交通',
        steps: ['自行開車至日月潭（從台中出發約1.5小時），或', '從台中高鐵站搭乘南投客運直達日月潭', '酒店提供婚禮賓客免費停車'],
        note: '我們可能安排從台中高鐵站出發的接駁車——請在回覆表單中告知是否需要。',
      },
      overseas: {
        title: '海外賓客交通',
        steps: [
          { icon: 'plane', label: '飛抵桃園國際機場（TPE）' },
          { icon: 'train', label: '搭乘高鐵：桃園站 → 台中站（約40分鐘）' },
          { icon: 'bus', label: '從台中高鐵站搭客運或包車至日月潭（約1.5小時）' },
          { icon: 'hotel', label: '入住雲品溫泉酒店' },
        ],
        note: '建議於婚禮前一天抵達，可順便享受日月潭的美景。',
      },
    },
    rsvp: {
      title: '出席回覆',
      sub: '請於2026年11月19日前回覆',
      desc: '請告訴我們您是否能出席！填寫回覆表單僅需約2分鐘，有助於我們安排座位、餐點及交通。',
      cta: '開啟回覆表單',
    },
    faq: {
      title: '常見問題',
      items: [
        { q: '穿著要求？', a: '請著正式服裝。十二月的日月潭氣溫較涼（約12–18°C），請攜帶保暖外套。' },
        { q: '天氣如何？', a: '預計涼爽清新，早晨可能有薄霧。證婚儀式及喜宴皆在室內，但戶外活動需注意保暖。' },
        { q: '如何找到儀式及宴會廳？', a: '兩個廳皆位於酒店大廳樓層。從大門進入後，沿走廊前往宴會區，現場會有指示標誌引導您。' },
        { q: '我從海外前來，怎麼到達？', a: '飛抵桃園機場（TPE），搭高鐵至台中（40分鐘），再轉乘客運或包車至日月潭（1.5小時）。建議婚禮前一天抵達。' },
      ],
    },
    explore: {
      title: '周邊景點',
      sub: '日月潭周邊推薦行程',
      items: [
        { name: '環湖自行車道', desc: '世界最美自行車道之一，環繞整座湖泊。' },
        { name: '文武廟', desc: '壯觀的湖畔道教廟宇，擁有絕佳全景視野，距離僅1公里。' },
        { name: '日月潭纜車', desc: '空中纜車，可俯瞰湖光山色。' },
        { name: '伊達邵部落', desc: '原住民邵族部落——在地美食、手工藝品與文化體驗。' },
        { name: '酒店溫泉', desc: '雲品擁有天然溫泉，是慶祝後放鬆的最佳選擇。' },
      ],
    },
    stickyRsvp: '回覆',
    footer: 'Steven & Bonnie',
    footerNames: 'Steven 侯成 & Bonnie 簡子芸',
    footerDate: '2026年12月19日',
    footerSub: '日月潭，台灣',
    footerVerse: '「兩個人總比一個人好，因為二人勞碌同得美好的果效。」',
    footerRef: '傳道書 4:9',
  },
}

const NOTION_RSVP = 'https://www.notion.so/tgre/3121cfcfd40f80b3a9f6d8e0251df083?pvs=106'

/* ─── HOOKS ─── */
function useReveal(th = 0.12) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect() } }, { threshold: th })
    o.observe(el)
    return () => o.disconnect()
  }, [])
  return [ref, v]
}

/* ─── COUNTDOWN ─── */
function Countdown({ lang }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const tgt = new Date('2026-12-19T10:00:00+08:00')
    const tick = () => {
      const d = tgt - new Date()
      if (d <= 0) return
      setT({ d: Math.floor(d / 864e5), h: Math.floor((d % 864e5) / 36e5), m: Math.floor((d % 36e5) / 6e4), s: Math.floor((d % 6e4) / 1e3) })
    }
    tick()
    const id = setInterval(tick, 1e3)
    return () => clearInterval(id)
  }, [])
  const lb = lang === 'en' ? ['Days', 'Hours', 'Min', 'Sec'] : ['天', '時', '分', '秒']
  return (
    <div className="cd">
      {[t.d, t.h, t.m, t.s].map((v, i) => (
        <div key={i} className="cd-u">
          <span className="cd-n">{String(v).padStart(2, '0')}</span>
          <span className="cd-l">{lb[i]}</span>
        </div>
      ))}
    </div>
  )
}

/* ─── SECTION ─── */
function Sec({ children, className = '', id, dark, anim = 'up' }) {
  const [ref, vis] = useReveal()
  return (
    <section id={id} ref={ref} className={`sec ${dark ? 'sec-dk' : ''} sec-${anim} ${vis ? 'sec-v' : ''} ${className}`}>
      {children}
    </section>
  )
}

/* ─── STAGGER CHILDREN ─── */
function Stagger({ children, className = '', delay = 0.09 }) {
  const [ref, vis] = useReveal(0.05)
  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div key={i} className={`stg-i ${vis ? 'stg-v' : ''}`} style={{ transitionDelay: `${i * delay}s` }}>
              {child}
            </div>
          ))
        : children}
    </div>
  )
}

/* ─── MAIN APP ─── */
export default function App() {
  const [lang, setLang] = useState('zh')
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [showSticky, setShowSticky] = useState(false)
  const l = T[lang]

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 80)
      setShowSticky(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setTimeout(() => setHeroLoaded(true), 200) }, [])

  const ids = ['home', 'story', 'schedule', 'venue', 'rsvp', 'faq']
  const go = (i) => { document.getElementById(ids[i])?.scrollIntoView({ behavior: 'smooth' }); setMenu(false) }

  return (
    <div className="root notranslate" translate="no">
      <style>{CSS}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? 'nav-s' : ''}`}>
        <div className="nav-in">
          <span className="nav-logo" onClick={() => go(0)}>S & B</span>
          <button className="nav-tog" onClick={() => setMenu(!menu)} aria-label="Menu">
            <span className={`ham ${menu ? 'ham-x' : ''}`} />
          </button>
          <div className={`nav-lk ${menu ? 'nav-lk-open' : ''}`}>
            {l.nav.map((n, i) => (
              <button key={i} className="nav-a" onClick={() => go(i)}>{n}</button>
            ))}
            <button className="lang-b" onClick={() => { setLang(lang === 'en' ? 'zh' : 'en'); setMenu(false) }}>
              {l.langLabel}
            </button>
          </div>
        </div>
      </nav>

      {/* STICKY RSVP */}
      <a
        href={NOTION_RSVP}
        target="_blank"
        rel="noopener noreferrer"
        className={`sticky-rsvp ${showSticky ? 'sticky-show' : ''}`}
      >
        <span className="sticky-dot" />
        {l.stickyRsvp}
      </a>

      {/* HERO */}
      <header id="home" className="hero">
        <div className="hero-bg" style={{ backgroundImage: 'url(/photos/lake-sunset.jpg)' }} />
        <div className="hero-ov" />
        <Sprig />
        <Sprig flip />
        <div className={`hero-ct ${heroLoaded ? 'hero-in' : ''}`}>
          <p className="hero-pre h-d1">{l.hero.pre}</p>
          <h1 className="hero-nm h-d2">
            <span className="hero-n1">{l.hero.names}</span>
            <span className="hero-amp">{l.hero.amp}</span>
            <span className="hero-n2">{l.hero.names2}</span>
          </h1>
          <div className="hero-divider h-d3"><Leaf className="hero-leaf" /></div>
          <p className="hero-dt h-d4">{l.hero.date}</p>
          <p className="hero-day h-d5">{l.hero.day}</p>
          <p className="hero-vn h-d6">{l.hero.venue}</p>
          <div className="h-d7"><Countdown lang={lang} /></div>
          <div className="h-d8">
            <a href={NOTION_RSVP} target="_blank" rel="noopener noreferrer" className="hero-btn">{l.hero.cta}</a>
          </div>
        </div>
      </header>

      {/* NOTE — NO RED ENVELOPES */}
      <Sec className="gift-sec" anim="fade">
        <div className="gift">
          <Leaf className="gift-leaf gift-leaf-l" />
          <Leaf className="gift-leaf gift-leaf-r" />
          <h3 className="gift-t">{l.noGift.title}</h3>
          <p className="gift-b">{l.noGift.body}</p>
        </div>
      </Sec>

      {/* STORY */}
      <Sec id="story" anim="up">
        <h2 className="sec-t">{l.story.title}</h2>
        <p className="sec-sub">{l.story.sub}</p>
        <div className="sec-orn"><Leaf /></div>
        <Stagger className="story-b" delay={0.2}>
          <p>{l.story.p1}</p>
          <p>{l.story.p2}</p>
          <p>{l.story.p3}</p>
        </Stagger>
      </Sec>

      {/* PHOTOS — placeholder */}
      <Sec className="photos-sec" anim="scale">
        <h2 className="sec-t">{l.photos.title}</h2>
        <p className="sec-sub">{l.photos.sub}</p>
        <div className="sec-orn"><Leaf /></div>
        <div className="photos-placeholder">
          <div className="photos-icon">📷</div>
          <p className="photos-msg">{lang === 'zh' ? '即將上傳我們的合照' : 'Our photos coming soon'}</p>
        </div>
      </Sec>

      {/* SCHEDULE */}
      <Sec id="schedule" className="sched" anim="up">
        <h2 className="sec-t">{l.schedule.title}</h2>
        <p className="sec-sub-big">{l.schedule.sub}</p>
        <div className="sec-orn"><Leaf /></div>
        <Stagger className="tl" delay={0.15}>
          {l.schedule.events.map((ev, i) => (
            <div key={i} className="tl-i">
              <div className="tl-tm">{ev.time}</div>
              <div className="tl-dot"><div className="tl-dot-in" /></div>
              <div className="tl-ct">
                <h4 className="tl-nm">{ev.name}</h4>
                {ev.venue && <p className="tl-vn">{ev.venue}</p>}
                <p className="tl-dt">{ev.detail}</p>
              </div>
            </div>
          ))}
        </Stagger>
      </Sec>

      {/* GETTING THERE */}
      <Sec id="venue" anim="up">
        <h2 className="sec-t">{l.venue.title}</h2>
        <p className="sec-sub">{l.venue.sub}</p>
        <div className="sec-orn"><Leaf /></div>
        <p className="v-addr">{l.venue.address}</p>
        <Stagger className="v-grid" delay={0.2}>
          <div className="v-card">
            <h4 className="v-card-t">{l.venue.domestic.title}</h4>
            <ul className="v-steps">{l.venue.domestic.steps.map((s, i) => <li key={i}>{s}</li>)}</ul>
            <p className="v-note">{l.venue.domestic.note}</p>
          </div>
          <div className="v-card">
            <h4 className="v-card-t">{l.venue.overseas.title}</h4>
            <Stagger className="v-os" delay={0.12}>
              {l.venue.overseas.steps.map((s, i) => (
                <div key={i} className="os-s">
                  <Icon type={s.icon} />
                  <span className="os-l">{s.label}</span>
                </div>
              ))}
            </Stagger>
            <p className="v-note">{l.venue.overseas.note}</p>
          </div>
        </Stagger>
        <iframe
          className="v-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.8!2d120.912!3d23.868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468d66bcbaf5f5f%3A0xb297928ac211e576!2sFleur%20de%20Chine%20Hotel%20Sun%20Moon%20Lake!5e0!3m2!1sen!2stw!4v1700000000000"
          allowFullScreen loading="lazy" title="Map"
        />
      </Sec>

      {/* RSVP */}
      <Sec id="rsvp" className="rsvp-sec" dark anim="scale">
        <h2 className="sec-t">{l.rsvp.title}</h2>
        <p className="sec-sub-big">{l.rsvp.sub}</p>
        <div className="sec-orn sec-orn-lt"><Leaf /></div>
        <p className="rsvp-d">{l.rsvp.desc}</p>
        <a href={NOTION_RSVP} target="_blank" rel="noopener noreferrer" className="rsvp-btn">{l.rsvp.cta}</a>
      </Sec>

      {/* FAQ */}
      <Sec id="faq" className="faq-sec" anim="up">
        <h2 className="sec-t">{l.faq.title}</h2>
        <div className="sec-orn"><Leaf /></div>
        <Stagger className="faq-ls" delay={0.1}>
          {l.faq.items.map((item, i) => (
            <div key={i} className={`faq-i ${openFaq === i ? 'faq-open' : ''}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="faq-q">
                <span>{item.q}</span>
                <span className={`faq-ic ${openFaq === i ? 'faq-ic-open' : ''}`}>+</span>
              </div>
              <div className="faq-a"><p>{item.a}</p></div>
            </div>
          ))}
        </Stagger>
      </Sec>

      {/* EXPLORE */}
      <Sec className="exp-sec" anim="up">
        <h2 className="sec-t">{l.explore.title}</h2>
        <p className="sec-sub">{l.explore.sub}</p>
        <div className="sec-orn"><Leaf /></div>
        <Stagger className="exp-g" delay={0.1}>
          {l.explore.items.map((item, i) => (
            <div key={i} className="exp-c">
              <div className="exp-num">{String(i + 1).padStart(2, '0')}</div>
              <h4 className="exp-n">{item.name}</h4>
              <p className="exp-d">{item.desc}</p>
            </div>
          ))}
        </Stagger>
      </Sec>

      {/* FOOTER */}
      <footer className="ft">
        <Sprig />
        <Sprig flip />
        <div className="ft-nm">{l.footer}</div>
        <div className="ft-fn">{l.footerNames}</div>
        <div className="ft-dt">{l.footerDate}</div>
        <div className="ft-sub">{l.footerSub}</div>
        <div className="ft-v">{l.footerVerse}</div>
        <div className="ft-r">{l.footerRef}</div>
      </footer>
    </div>
  )
}

/* ─── STYLES ─── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Noto+Serif+TC:wght@300;400;500;600&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');

:root {
  --cream: #FAF8F4;
  --warm: #F3EDE4;
  --blush: #F5E6E0;
  --sage: #8BA888;
  --sage-l: #A8C5A0;
  --sage-d: #6B8F66;
  --rose: #C9908A;
  --rose-l: #DFAEA8;
  --rose-d: #B07A74;
  --gold: #B8956A;
  --dk: #2C2822;
  --txt: #3A3530;
  --mid: #6B6158;
  --lt: #9B8E82;
  --serif: 'Cormorant Garamond', 'Noto Serif TC', Georgia, serif;
  --sans: 'DM Sans', 'Noto Serif TC', -apple-system, sans-serif;
  --ease: cubic-bezier(.16, 1, .3, 1);
  --ease-s: cubic-bezier(.34, 1.56, .64, 1);
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box }
::selection { background: rgba(201, 144, 138, .15) }
html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased }
.root { font-family: var(--serif); color: var(--txt); background: var(--cream); min-height: 100vh; overflow-x: hidden }

/* ─ Stagger ─ */
.stg-i { opacity: 0; transform: translateY(18px); transition: opacity .7s var(--ease), transform .7s var(--ease) }
.stg-v { opacity: 1; transform: none }

/* ─ Botanical decorations ─ */
.leaf-svg { width: 80px; height: 40px; color: var(--sage) }
.sprig { position: absolute; width: 30px; height: 90px; color: var(--sage); opacity: .4; z-index: 1; pointer-events: none }
.hero .sprig { bottom: 60px; left: 8% }
.hero .sprig-flip { left: auto; right: 8%; transform: scaleX(-1) }
.ft .sprig { top: 30px; left: 10%; opacity: .25 }
.ft .sprig-flip { left: auto; right: 10%; transform: scaleX(-1) }

/* ─ NAV ─ */
.nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; transition: all .5s var(--ease) }
.nav-s { background: rgba(250, 248, 244, .95); backdrop-filter: blur(16px); box-shadow: 0 1px 0 rgba(139, 168, 136, .1) }
.nav-in { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 18px 36px }
.nav-logo { font-family: var(--serif); font-size: 18px; letter-spacing: 3px; color: var(--sage); font-weight: 500; cursor: pointer; font-style: italic; transition: opacity .3s }
.nav-logo:hover { opacity: .65 }
.nav:not(.nav-s) .nav-logo { color: rgba(255,255,255,.85) }
.nav-lk { display: flex; gap: 28px; align-items: center }
.nav-a { font-family: var(--sans); font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; background: none; border: none; cursor: pointer; font-weight: 400; transition: color .3s }
.nav-s .nav-a { color: var(--mid) }
.nav:not(.nav-s) .nav-a { color: rgba(255,255,255,.7) }
.nav-a:hover { color: var(--sage) }
.lang-b { font-family: var(--sans); font-size: 12px; letter-spacing: 2px; padding: 7px 18px; border: 1px solid var(--sage); border-radius: 50px; background: transparent; color: var(--sage); cursor: pointer; transition: all .4s var(--ease) }
.lang-b:hover { background: var(--sage); color: #fff }
.nav-tog { display: none; background: none; border: none; cursor: pointer; width: 32px; height: 32px; position: relative; z-index: 1001 }
.ham, .ham::before, .ham::after { display: block; width: 22px; height: 1.5px; position: absolute; transition: all .4s var(--ease-s) }
.ham { top: 50%; left: 50%; transform: translate(-50%, -50%); background: var(--mid) }
.nav:not(.nav-s) .ham { background: rgba(255,255,255,.8) }
.ham::before { content: ''; top: -7px; left: 0; background: inherit }
.ham::after { content: ''; top: 7px; left: 0; background: inherit }
.ham-x { background: transparent !important }
.ham-x::before { top: 0; transform: rotate(45deg); background: var(--mid) !important }
.ham-x::after { top: 0; transform: rotate(-45deg); background: var(--mid) !important }

/* ─ STICKY RSVP ─ */
.sticky-rsvp {
  position: fixed; bottom: 28px; right: 28px; z-index: 900;
  display: flex; align-items: center; gap: 8px;
  padding: 14px 28px;
  font-family: var(--sans); font-size: 14px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; text-decoration: none;
  background: var(--rose); color: #fff;
  border-radius: 50px;
  box-shadow: 0 4px 20px rgba(201, 144, 138, .35), 0 1px 4px rgba(0,0,0,.08);
  transform: translateY(80px); opacity: 0;
  transition: transform .5s var(--ease-s), opacity .5s var(--ease), background .3s, box-shadow .3s;
  cursor: pointer;
}
.sticky-rsvp:hover { background: var(--rose-d); box-shadow: 0 6px 28px rgba(201, 144, 138, .45), 0 2px 8px rgba(0,0,0,.1) }
.sticky-show { transform: none; opacity: 1 }
.sticky-dot { width: 8px; height: 8px; border-radius: 50%; background: #fff; opacity: .7; animation: pulse 2s ease-in-out infinite }
@keyframes pulse { 0%, 100% { opacity: .7; transform: scale(1) } 50% { opacity: 1; transform: scale(1.3) } }

/* ─ HERO ─ */
.hero { position: relative; min-height: 100vh; min-height: 100dvh; display: flex; align-items: center; justify-content: center; text-align: center; overflow: hidden }
.hero-bg { position: absolute; inset: -20px; background-size: cover; background-position: center 35%; filter: saturate(1.4) contrast(0.85) brightness(1.05) blur(1px) }
.hero-ov { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(250,248,244,.08) 0%, rgba(44,40,34,.15) 30%, rgba(44,40,34,.55) 100%) }

.hero-ct { position: relative; z-index: 3; color: #fff; padding: 100px 32px 80px }
.hero-ct > * { opacity: 0; transform: translateY(24px); transition: opacity .8s var(--ease), transform .8s var(--ease) }
.hero-in .h-d1 { opacity: 1; transform: none; transition-delay: .3s }
.hero-in .h-d2 { opacity: 1; transform: none; transition-delay: .5s }
.hero-in .h-d3 { opacity: 1; transform: none; transition-delay: .7s }
.hero-in .h-d4 { opacity: 1; transform: none; transition-delay: .85s }
.hero-in .h-d5 { opacity: 1; transform: none; transition-delay: .95s }
.hero-in .h-d6 { opacity: 1; transform: none; transition-delay: 1.05s }
.hero-in .h-d7 { opacity: 1; transform: none; transition-delay: 1.2s }
.hero-in .h-d8 { opacity: 1; transform: none; transition-delay: 1.4s }

.hero-pre { font-size: 17px; color: rgba(255,255,255,.65); margin-bottom: 20px; font-weight: 300; font-style: italic; line-height: 1.6 }
.hero-nm { font-size: clamp(30px, 5.5vw, 52px); font-weight: 300; letter-spacing: 1px; line-height: 1.2; font-style: italic }
.hero-n1, .hero-n2 { display: block }
.hero-amp { display: block; font-size: .55em; color: var(--rose-l); margin: 6px 0; font-style: italic; font-weight: 300 }
.hero-divider { margin: 22px auto; display: flex; justify-content: center }
.hero-leaf { color: rgba(255,255,255,.3); width: 60px }
.hero-dt { font-size: clamp(24px, 4.5vw, 40px); letter-spacing: 0.5px; font-weight: 300 }
.hero-day { font-family: var(--sans); font-size: 17px; letter-spacing: 3px; color: rgba(255,255,255,.6); margin-top: 6px; font-weight: 300 }
.hero-vn { font-family: var(--sans); font-size: 15px; letter-spacing: 1.5px; color: rgba(255,255,255,.45); margin-top: 12px; font-weight: 300 }

.cd { display: flex; gap: 24px; justify-content: center; margin-top: 32px }
.cd-u { text-align: center; min-width: 48px }
.cd-n { display: block; font-family: var(--sans); font-size: 28px; font-weight: 300; color: #fff }
.cd-l { font-family: var(--sans); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,.35); margin-top: 4px; display: block }

.hero-btn {
  display: inline-block; margin-top: 36px;
  padding: 15px 48px;
  font-family: var(--sans); font-size: 14px; letter-spacing: 2px; text-transform: uppercase; text-decoration: none;
  border: 1.5px solid rgba(255,255,255,.3);
  border-radius: 50px;
  background: rgba(255,255,255,.08); color: #fff;
  transition: all .4s var(--ease);
}
.hero-btn:hover { background: rgba(255,255,255,.18); border-color: rgba(255,255,255,.5) }

/* ─ GIFT ─ */
.gift-sec { padding: 0 !important }
.gift {
  position: relative;
  background: linear-gradient(135deg, var(--blush) 0%, #F8EDE8 100%);
  text-align: center; padding: 72px 36px; overflow: hidden;
}
.gift-leaf { position: absolute; opacity: .5; width: 100px }
.gift-leaf-l { top: 16px; left: -10px; transform: rotate(-20deg) }
.gift-leaf-r { bottom: 16px; right: -10px; transform: rotate(160deg) }
.gift-t { font-size: 24px; font-weight: 400; color: var(--rose-d); margin-bottom: 18px; font-style: italic }
.gift-b { font-size: 17px; line-height: 2; font-weight: 300; color: var(--mid); max-width: 580px; margin: 0 auto }

/* ─ SECTIONS ─ */
.sec { padding: 96px 40px; overflow: hidden }
.sec-up { opacity: 0; transform: translateY(36px); transition: opacity .8s var(--ease), transform .8s var(--ease) }
.sec-fade { opacity: 0; transition: opacity 1s var(--ease) }
.sec-scale { opacity: 0; transform: scale(.97); transition: opacity .8s var(--ease), transform .8s var(--ease) }
.sec-v.sec-up, .sec-v.sec-fade, .sec-v.sec-scale { opacity: 1; transform: none }
.sec-dk { background: var(--dk); color: rgba(250,248,244,.9) }

.sec-t { font-size: clamp(28px, 4.5vw, 40px); font-weight: 300; letter-spacing: 0.5px; text-align: center; margin-bottom: 10px; font-style: italic }
.sec-dk .sec-t { color: var(--cream) }
.sec-sub { font-family: var(--sans); font-size: 14px; letter-spacing: 1.5px; text-align: center; color: var(--lt); font-weight: 300 }
.sec-sub-big { font-family: var(--serif); font-size: 18px; text-align: center; color: var(--mid); font-weight: 300; font-style: italic }
.sec-dk .sec-sub, .sec-dk .sec-sub-big { color: rgba(200,190,178,.5) }

.sec-orn { display: flex; justify-content: center; margin: 24px auto 48px; color: var(--sage) }
.sec-orn-lt { color: var(--sage-l) }
.sec-dk .sec-orn { opacity: .4 }

/* ─ PHOTOS PLACEHOLDER ─ */
.photos-sec { background: var(--warm); text-align: center }
.photos-placeholder {
  max-width: 700px; margin: 0 auto; padding: 72px 40px;
  border: 2px dashed rgba(139,168,136,.25); border-radius: 20px;
  background: rgba(255,255,255,.4); transition: border-color .4s;
}
.photos-placeholder:hover { border-color: rgba(139,168,136,.5) }
.photos-icon { font-size: 32px; margin-bottom: 14px; opacity: .4 }
.photos-msg { font-size: 19px; color: var(--lt); font-style: italic; font-weight: 300 }

/* ─ STORY ─ */
.story-b { max-width: 660px; margin: 0 auto; text-align: center }
.story-b p { font-size: 18px; line-height: 2.1; color: var(--mid); font-weight: 300; margin-bottom: 24px }

/* ─ SCHEDULE ─ */
.sched { background: var(--warm) }
.tl { max-width: 700px; margin: 0 auto; position: relative }
.tl::before { content: ''; position: absolute; left: 118px; top: 12px; bottom: 12px; width: 1px; background: rgba(139,168,136,.2) }
.tl-i { display: grid; grid-template-columns: 100px 32px 1fr; padding: 26px 0; align-items: start }
.tl-tm { font-family: var(--sans); font-size: 15px; letter-spacing: 1px; color: var(--sage); text-align: right; padding-top: 3px; font-weight: 500 }
.tl-dot { display: flex; justify-content: center; padding-top: 7px }
.tl-dot-in { width: 10px; height: 10px; border-radius: 50%; border: 2px solid var(--sage); background: var(--warm); position: relative; z-index: 1; transition: transform .4s var(--ease-s), background .4s }
.tl-i:hover .tl-dot-in { transform: scale(1.3); background: var(--sage) }
.tl-nm { font-size: 20px; font-weight: 400; color: var(--txt); margin-bottom: 5px; transition: color .3s }
.tl-i:hover .tl-nm { color: var(--sage-d) }
.tl-vn { font-size: 15px; color: var(--sage); font-style: italic; margin-bottom: 4px }
.tl-dt { font-size: 16px; color: var(--mid); font-weight: 300; line-height: 1.7 }

/* ─ VENUE ─ */
.v-addr { text-align: center; font-family: var(--sans); font-size: 16px; color: var(--lt); margin-bottom: 40px; font-weight: 300 }
.v-grid { max-width: 820px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 24px }
.v-card { padding: 34px; background: var(--warm); border-radius: 16px; transition: transform .4s var(--ease), box-shadow .4s }
.v-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,.05) }
.v-card-t { font-family: var(--sans); font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: var(--sage); margin-bottom: 20px; font-weight: 500 }
.v-steps { list-style: none; padding: 0 }
.v-steps li { font-size: 16px; color: var(--mid); font-weight: 300; line-height: 1.85; padding-left: 18px; position: relative; margin-bottom: 6px }
.v-steps li::before { content: '·'; position: absolute; left: 0; color: var(--sage); font-weight: 700; font-size: 20px; line-height: 1.55 }
.v-note { font-size: 15px; color: var(--lt); font-style: italic; margin-top: 16px; line-height: 1.75 }
.v-os { display: flex; flex-direction: column; gap: 4px }
.os-s { display: flex; align-items: center; gap: 14px; padding: 8px 0; transition: transform .3s var(--ease) }
.os-s:hover { transform: translateX(5px) }
.os-icon { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; flex-shrink: 0; color: var(--sage); transition: color .3s }
.os-s:hover .os-icon { color: var(--sage-d) }
.os-icon svg { width: 20px; height: 20px }
.os-l { font-size: 16px; color: var(--mid); font-weight: 300; line-height: 1.6 }
.v-map { width: 100%; max-width: 820px; height: 320px; border: none; margin: 40px auto 0; display: block; border-radius: 16px; opacity: 0; animation: fadeUp .8s var(--ease) .5s forwards }
@keyframes fadeUp { to { opacity: 1 } }

/* ─ RSVP ─ */
.rsvp-sec { background: var(--dk); text-align: center }
.rsvp-sec .sec-t { color: var(--cream) }
.rsvp-d { text-align: center; max-width: 540px; margin: 0 auto 40px; font-size: 17px; line-height: 2; font-weight: 300; color: rgba(200,190,178,.7) }
.rsvp-btn {
  display: inline-block; padding: 18px 64px;
  font-family: var(--sans); font-size: 15px; letter-spacing: 2px; text-transform: uppercase; text-decoration: none;
  border: none; border-radius: 50px;
  background: var(--rose); color: #fff;
  box-shadow: 0 4px 20px rgba(201,144,138,.3);
  transition: all .4s var(--ease);
}
.rsvp-btn:hover { background: var(--rose-d); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(201,144,138,.4) }

/* ─ FAQ ─ */
.faq-sec { background: var(--cream) }
.faq-ls { max-width: 700px; margin: 0 auto }
.faq-i { border-bottom: 1px solid rgba(139,168,136,.12); cursor: pointer; transition: background .3s }
.faq-i:hover { background: rgba(139,168,136,.04) }
.faq-q { display: flex; justify-content: space-between; align-items: center; padding: 24px 4px; gap: 20px }
.faq-q span:first-child { font-size: 19px; font-weight: 400; color: var(--txt); line-height: 1.5 }
.faq-ic { font-family: var(--sans); font-size: 22px; color: var(--sage); flex-shrink: 0; transition: transform .4s var(--ease-s); display: inline-block }
.faq-ic-open { transform: rotate(45deg) }
.faq-a { max-height: 0; overflow: hidden; transition: max-height .5s var(--ease), padding .5s }
.faq-open .faq-a { max-height: 300px; padding: 0 4px 24px }
.faq-a p { font-size: 17px; line-height: 1.9; color: var(--mid); font-weight: 300 }

/* ─ EXPLORE ─ */
.exp-sec { background: var(--warm) }
.exp-g { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 18px }
.exp-c { padding: 30px; background: var(--cream); border-radius: 16px; transition: transform .4s var(--ease), box-shadow .4s; position: relative; overflow: hidden }
.exp-c::before { content: ''; position: absolute; top: 0; left: 0; width: 0; height: 3px; background: linear-gradient(90deg, var(--sage), var(--rose-l)); transition: width .5s var(--ease); border-radius: 3px 3px 0 0 }
.exp-c:hover::before { width: 100% }
.exp-c:hover { transform: translateY(-3px); box-shadow: 0 10px 32px rgba(0,0,0,.05) }
.exp-num { font-family: var(--sans); font-size: 11px; letter-spacing: 2px; color: var(--sage); margin-bottom: 10px; opacity: .5 }
.exp-n { font-size: 18px; font-weight: 400; color: var(--txt); margin-bottom: 8px; transition: color .3s }
.exp-c:hover .exp-n { color: var(--sage-d) }
.exp-d { font-size: 15px; color: var(--mid); font-weight: 300; line-height: 1.75 }

/* ─ FOOTER ─ */
.ft { text-align: center; padding: 76px 36px; background: var(--dk); color: rgba(200,190,178,.8); position: relative; overflow: hidden }
.ft-nm { font-size: clamp(26px, 4vw, 36px); font-weight: 300; color: var(--cream); letter-spacing: 0.5px; margin-bottom: 6px; font-style: italic }
.ft-fn { font-family: var(--sans); font-size: 13px; letter-spacing: 1.5px; color: rgba(139,168,136,.4); margin-bottom: 14px }
.ft-dt { font-family: var(--sans); font-size: 14px; letter-spacing: 2px; color: var(--sage); margin-bottom: 4px }
.ft-sub { font-family: var(--sans); font-size: 13px; letter-spacing: 1.5px; color: rgba(107,93,77,.5) }
.ft-v { font-size: 17px; font-style: italic; color: rgba(138,123,106,.5); margin-top: 32px; font-weight: 300; max-width: 460px; margin-left: auto; margin-right: auto; line-height: 1.9 }
.ft-r { font-family: var(--sans); font-size: 12px; letter-spacing: 2px; color: rgba(107,93,77,.4); margin-top: 8px }

/* ─ MOBILE ─ */
@media (max-width: 768px) {
  .nav-lk { display: none; flex-direction: column; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(250,248,244,.98); backdrop-filter: blur(20px); justify-content: center; align-items: center; gap: 28px; z-index: 999 }
  .nav-lk-open { display: flex }
  .nav-lk-open .nav-a { color: var(--mid) !important; font-size: 16px; letter-spacing: 2px }
  .nav-tog { display: block }
  .sec { padding: 68px 28px }
  .nav-in { padding: 16px 24px }
  .v-grid { grid-template-columns: 1fr }
  .tl::before { left: 92px }
  .tl-i { grid-template-columns: 76px 28px 1fr }
  .cd { gap: 18px }
  .cd-n { font-size: 24px }
  .hero-btn { padding: 13px 38px; font-size: 13px }
  .exp-g { grid-template-columns: 1fr }
  .hero-nm { font-size: clamp(26px, 7vw, 44px) }
  .sprig { display: none }
  .sticky-rsvp { bottom: 20px; right: 20px; padding: 12px 24px; font-size: 13px }
}
@media (max-width: 480px) {
  .hero-ct { padding: 88px 20px 56px }
  .hero-pre { font-size: 15px }
  .hero-dt { font-size: 22px }
  .hero-day { font-size: 14px }
  .hero-vn { font-size: 13px }
  .sec-t { font-size: 24px }
  .story-b p { font-size: 16px }
  .tl-i { grid-template-columns: 62px 22px 1fr }
  .tl::before { left: 73px }
  .tl-nm { font-size: 18px }
  .tl-dt { font-size: 15px }
  .tl-tm { font-size: 14px }
  .v-card { padding: 26px; border-radius: 12px }
  .sec { padding: 52px 20px }
  .sec-orn { margin: 20px auto 36px }
  .faq-q span:first-child { font-size: 17px }
  .faq-a p { font-size: 16px }
  .rsvp-d { font-size: 16px }
  .rsvp-btn { padding: 16px 44px; font-size: 14px }
  .gift { padding: 56px 22px }
  .gift-t { font-size: 21px }
  .gift-b { font-size: 16px }
  .ft-v { font-size: 16px }
  .photos-placeholder { padding: 56px 22px; border-radius: 14px }
  .gift-leaf { display: none }
  .v-map { border-radius: 10px }
  .exp-c { border-radius: 12px }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important }
}
`
