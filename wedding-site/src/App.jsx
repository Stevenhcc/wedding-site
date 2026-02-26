import { useState, useEffect, useRef } from 'react'

const GALLERY = [
  { url: '/photos/lake-sunset.jpg', en: 'Sun Moon Lake at Sunset', zh: '日月潭夕陽', wide: true },
  { url: '/photos/ceremony-hall.jpg', en: 'Soaring Cloud Hall', zh: '雲揚廳' },
  { url: '/photos/hotel-aerial-mist.jpg', en: 'Misty Morning', zh: '晨霧繚繞' },
  { url: '/photos/lobby-fireplace.jpg', en: 'Hotel Lobby', zh: '大廳' },
  { url: '/photos/hotel-entrance-dusk.jpg', en: 'Twilight', zh: '暮色' },
  { url: '/photos/lake-misty.jpg', en: 'Morning on the Lake', zh: '湖畔清晨', wide: true },
  { url: '/photos/hotel-aerial-green.jpg', en: 'Aerial View', zh: '鳥瞰全景' },
  { url: '/photos/hallway-3f.jpg', en: 'Banquet Wing', zh: '宴會走廊' },
]

const T = {
  en: {
    langLabel: '中文',
    nav: ['Home', 'Our Story', 'Schedule', 'Venue', 'RSVP', 'FAQ'],
    hero: { names: 'Steven & Bonnie', date: 'December 19, 2026', day: 'Saturday', venue: 'Fleur de Chine Hotel · Sun Moon Lake, Taiwan', tagline: 'Together with our families, we invite you to celebrate the marriage of', cta: 'RSVP Now' },
    noGift: { title: 'Your Presence Is Our Gift', body: "We kindly ask for no gifts, red envelopes, or monetary contributions. We simply want to share this joyful day with the people we love most. Your presence and your blessing are more than enough." },
    gallery: { title: 'The Venue', sub: 'Fleur de Chine · Sun Moon Lake' },
    story: {
      title: 'Our Story', sub: 'Two lives, two cultures, one love',
      p1: "What began as a connection across the Pacific grew into a love rooted in faith, family, and a shared vision for the future. Steven, from New Jersey, and Bonnie, from Taichung, found in each other a partner for life\u2019s greatest journey.",
      p2: "We were legally married in Taiwan and are overjoyed to celebrate our union with the people who matter most \u2014 at Sun Moon Lake, one of Taiwan\u2019s most beautiful places.",
      p3: "We believe marriage is a gift, and we are grateful for every person who has been part of our story. We look forward to celebrating with you."
    },
    schedule: {
      title: 'Wedding Day', sub: 'Saturday, December 19, 2026',
      events: [
        { time: '10:00 AM', name: 'Wedding Ceremony', venue: 'Soaring Cloud Hall (雲揚廳)', detail: 'Lobby level — enter the hotel and follow the hallway to the banquet wing.' },
        { time: '12:00 PM', name: 'Ceremony Concludes', venue: '', detail: 'Short walk to the reception hall right next door.' },
        { time: '12:30 PM', name: 'Wedding Reception & Banquet', venue: 'Cosmos Cloud B Hall (雲翰B廳)', detail: 'Chinese banquet, celebration, and fellowship.' },
        { time: '3:00 PM', name: 'Farewell', venue: '', detail: 'Send-off with gratitude and joy.' }
      ]
    },
    venue: {
      title: 'Getting There', sub: 'Fleur de Chine Hotel · Sun Moon Lake',
      address: 'No. 23, Zhongzheng Rd, Yuchi Township, Nantou County 555, Taiwan',
      domestic: { title: 'From Within Taiwan', steps: ['Drive to Sun Moon Lake (~1.5 hrs from Taichung), or', 'Take Nantou Bus (南投客運) from Taichung HSR Station directly to Sun Moon Lake', 'Free parking at the hotel for all wedding guests'], note: 'We may arrange a shuttle from Taichung HSR — please indicate on the RSVP if interested.' },
      overseas: { title: 'From Overseas', steps: [{ icon: '✈️', label: 'Fly into Taoyuan International Airport (TPE)' }, { icon: '🚄', label: 'Take HSR from Taoyuan Station → Taichung Station (40 min)' }, { icon: '🚌', label: 'Bus or car from Taichung HSR → Sun Moon Lake (1.5 hrs)' }, { icon: '🏨', label: 'Check in at Fleur de Chine Hotel' }], note: 'We recommend arriving at least one day before the wedding to settle in and enjoy the area.' }
    },
    rsvp: { title: 'RSVP', sub: 'Please respond by November 19, 2026', desc: "Let us know if you can make it! The form takes about 2 minutes and helps us plan seating, meals, and transportation." },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        { q: 'Do I need to bring a gift or red envelope?', a: "No — please don\u2019t! We mean it. No gifts, no red envelopes (紅包), no monetary contributions. Your presence is truly the only gift we want." },
        { q: 'What should I wear?', a: "Formal attire. December at Sun Moon Lake is cool — around 12–18°C (54–64°F) — so bring a warm coat or wrap." },
        { q: 'What about the weather?', a: "Expect cool, crisp weather with possible morning mist. The ceremony and reception are both indoors, but you\u2019ll want warmth for any time outdoors." },
        { q: 'Are children welcome?', a: 'Yes! Children are welcome at both the ceremony and reception.' },
        { q: 'What language will the ceremony be in?', a: 'Both English and Mandarin Chinese.' },
        { q: 'Where exactly is the ceremony?', a: 'All banquet spaces are on the lobby level. Walk in and follow the hallway toward the banquet wing. There will be signage.' },
        { q: "I\u2019m coming from overseas. How do I get there?", a: 'Fly into Taoyuan Airport (TPE), take the HSR to Taichung (40 min), then bus or car to Sun Moon Lake (1.5 hrs). We recommend arriving the day before.' }
      ]
    },
    explore: {
      title: "While You\u2019re Here", sub: 'Things to do around Sun Moon Lake',
      items: [
        { name: 'Sun Moon Lake Cycling Path', desc: "One of the world\u2019s most beautiful bike paths, circling the entire lake." },
        { name: 'Wenwu Temple', desc: 'Grand lakeside Taoist temple with stunning panoramic views, just 1km away.' },
        { name: 'Sun Moon Lake Ropeway', desc: 'Cable car offering aerial views of the lake and mountains.' },
        { name: 'Ita Thao Village', desc: 'Indigenous Thao tribal village — local cuisine, crafts, and cultural experiences.' },
        { name: 'Hotel Hot Springs', desc: 'Fleur de Chine has natural hot springs. Perfect for unwinding after the celebration.' }
      ]
    },
    footer: 'Steven & Bonnie', footerDate: 'December 19, 2026', footerSub: 'Sun Moon Lake, Taiwan',
    footerVerse: '\u201CTwo are better than one, because they have a good return for their labor.\u201D', footerRef: 'Ecclesiastes 4:9'
  },
  zh: {
    langLabel: 'EN',
    nav: ['首頁', '我們的故事', '婚禮流程', '交通指南', '出席回覆', '常見問題'],
    hero: { names: 'Steven & 子芸', date: '2026年12月19日', day: '星期六', venue: '日月潭 · 雲品溫泉酒店', tagline: '我們誠摯地邀請您，一同見證', cta: '立即回覆' },
    noGift: { title: '您的到來就是最好的禮物', body: '我們懇請不收任何禮物、紅包或禮金。我們只希望與最愛的人一起分享這喜樂的一天。您的到來與祝福，就是對我們最大的恩典。' },
    gallery: { title: '婚禮場地', sub: '雲品溫泉酒店 · 日月潭' },
    story: {
      title: '我們的故事', sub: '兩個生命、兩種文化、一份愛',
      p1: '一段跨越太平洋的緣分，成長為以信仰、家庭和共同願景為根基的愛情。Steven來自美國紐澤西，子芸來自台中，兩人在彼此身上找到了人生旅途中最好的夥伴。',
      p2: '我們已在台灣完成結婚登記，現在無比喜悅地邀請對我們最重要的人，一同在美麗的日月潭慶祝我們的結合。',
      p3: '我們相信婚姻是恩賜，感謝每一位在我們生命中留下足跡的人。期待與您一同歡慶。'
    },
    schedule: {
      title: '婚禮流程', sub: '2026年12月19日（星期六）',
      events: [
        { time: '上午 10:00', name: '證婚儀式', venue: '雲揚廳', detail: '大廳樓層——進入酒店後沿走廊前往宴會區。' },
        { time: '中午 12:00', name: '儀式結束', venue: '', detail: '步行至隔壁宴會廳。' },
        { time: '中午 12:30', name: '喜宴', venue: '雲翰B廳', detail: '中式喜宴、歡慶與團契。' },
        { time: '下午 3:00', name: '禮成', venue: '', detail: '歡送賓客，感恩與喜樂。' }
      ]
    },
    venue: {
      title: '交通指南', sub: '雲品溫泉酒店 · 日月潭',
      address: '南投縣魚池鄉日月潭中正路23號',
      domestic: { title: '台灣國內交通', steps: ['自行開車至日月潭（從台中出發約1.5小時），或', '從台中高鐵站搭乘南投客運直達日月潭', '酒店提供婚禮賓客免費停車'], note: '我們可能安排從台中高鐵站出發的接駁車——請在回覆表單中告知是否需要。' },
      overseas: { title: '海外賓客交通', steps: [{ icon: '✈️', label: '飛抵桃園國際機場（TPE）' }, { icon: '🚄', label: '搭乘高鐵：桃園站 → 台中站（約40分鐘）' }, { icon: '🚌', label: '從台中高鐵站搭客運或包車至日月潭（約1.5小時）' }, { icon: '🏨', label: '入住雲品溫泉酒店' }], note: '建議於婚禮前一天抵達，可順便享受日月潭的美景。' }
    },
    rsvp: { title: '出席回覆', sub: '請於2026年11月19日前回覆', desc: '請告訴我們您是否能出席！填寫回覆表單僅需約2分鐘，有助於我們安排座位、餐點及交通。' },
    faq: {
      title: '常見問題',
      items: [
        { q: '需要送禮或包紅包嗎？', a: '不需要！我們是認真的。請不要準備禮物、紅包或禮金。您的到來就是最好的禮物。' },
        { q: '穿著要求？', a: '請著正式服裝。十二月的日月潭氣溫較涼（約12–18°C），請攜帶保暖外套。' },
        { q: '天氣如何？', a: '預計涼爽清新，早晨可能有薄霧。證婚儀式及喜宴皆在室內，但戶外活動需注意保暖。' },
        { q: '可以攜帶小朋友嗎？', a: '歡迎！證婚儀式及喜宴皆歡迎小朋友參加。' },
        { q: '儀式使用什麼語言？', a: '中英雙語進行。' },
        { q: '儀式在哪裡？', a: '所有宴會場地都在大廳樓層。進入酒店後沿走廊前往宴會區，現場會有指示標誌。' },
        { q: '我從海外前來，怎麼到達？', a: '飛抵桃園機場（TPE），搭高鐵至台中（40分鐘），再轉乘客運或包車至日月潭（1.5小時）。建議婚禮前一天抵達。' }
      ]
    },
    explore: {
      title: '日月潭推薦景點', sub: '來都來了，順便走走',
      items: [
        { name: '日月潭環湖自行車道', desc: '全球最美自行車道之一，環繞整個湖畔。' },
        { name: '文武廟', desc: '壯觀的湖畔道教廟宇，距離酒店僅1公里。' },
        { name: '日月潭纜車', desc: '空中纜車欣賞湖景及周圍山景。' },
        { name: '伊達邵部落', desc: '邵族原住民部落——在地美食、手工藝品及文化體驗。' },
        { name: '酒店溫泉', desc: '雲品本身就有天然溫泉，慶祝後最適合放鬆身心。' }
      ]
    },
    footer: 'Steven & 子芸', footerDate: '2026年12月19日', footerSub: '台灣 日月潭',
    footerVerse: '「兩個人總比一個人好，因為二人勞碌同得美好的果效。」', footerRef: '傳道書 4:9'
  }
}

const NOTION_RSVP = 'https://tgre.notion.site/ebd//3cfd6488a9a04288938a7ff90c5c4351?v=3121cfcfd40f801c9b8d000c968932b2'

function useReveal(threshold = 0.08) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, []); return [ref, v]
}

function Countdown({ lang }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const target = new Date('2026-12-19T10:00:00+08:00')
    const tick = () => { const diff = target - new Date(); if (diff <= 0) return; setT({ d: Math.floor(diff/864e5), h: Math.floor(diff%864e5/36e5), m: Math.floor(diff%36e5/6e4), s: Math.floor(diff%6e4/1e3) }) }
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id)
  }, [])
  const lbl = lang === 'en' ? ['Days','Hours','Min','Sec'] : ['天','時','分','秒']
  return <div className="cd">{[t.d,t.h,t.m,t.s].map((v,i) => <div key={i} className="cd-u"><span className="cd-n">{String(v).padStart(2,'0')}</span><span className="cd-l">{lbl[i]}</span></div>)}</div>
}

function Sec({ children, className='', id, dark }) {
  const [ref, vis] = useReveal()
  return <section id={id} ref={ref} className={`sec ${dark?'sec-dk':''} ${vis?'sec-v':''} ${className}`}>{children}</section>
}

export default function App() {
  const [lang, setLang] = useState('zh')
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const l = T[lang]

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true }); return () => window.removeEventListener('scroll', fn)
  }, [])

  const ids = ['home','story','schedule','venue','rsvp','faq']
  const go = i => { document.getElementById(ids[i])?.scrollIntoView({ behavior: 'smooth' }); setMenu(false) }

  return (
    <div className="root">
      <style>{CSS}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled?'nav-s':''}`}>
        <div className="nav-in">
          <span className="nav-logo" onClick={() => go(0)}>S & B</span>
          <button className="nav-tog" onClick={() => setMenu(!menu)} aria-label="Menu">
            <span className={`ham ${menu?'ham-x':''}`}/>
          </button>
          <div className={`nav-lk ${menu?'nav-lk-open':''}`}>
            {l.nav.map((n,i) => <button key={i} className="nav-a" onClick={() => go(i)}>{n}</button>)}
            <button className="lang-b" onClick={() => { setLang(lang==='en'?'zh':'en'); setMenu(false) }}>{l.langLabel}</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header id="home" className="hero">
        <div className="hero-bg" style={{ backgroundImage: 'url(/photos/lake-sunset.jpg)' }} />
        <div className="hero-ov" />
        <div className="hero-ct">
          <p className="hero-tag">{l.hero.tagline}</p>
          <h1 className="hero-nm">{l.hero.names}</h1>
          <div className="hero-line" />
          <p className="hero-dt">{l.hero.date}</p>
          <p className="hero-day">{l.hero.day}</p>
          <p className="hero-vn">{l.hero.venue}</p>
          <Countdown lang={lang} />
          <button className="hero-btn" onClick={() => go(4)}>{l.hero.cta}</button>
        </div>
      </header>

      {/* NO GIFT */}
      <div className="gift">
        <div className="gift-in">
          <h3 className="gift-t">{l.noGift.title}</h3>
          <p className="gift-b">{l.noGift.body}</p>
        </div>
      </div>

      {/* GALLERY */}
      <Sec id="gallery" className="gal-sec" dark>
        <h2 className="sec-t">{l.gallery.title}</h2>
        <p className="sec-s">{l.gallery.sub}</p>
        <div className="sec-ln" />
        <div className="gal-g">
          {GALLERY.map((p,i) => (
            <div key={i} className={`gal-i ${p.wide?'gal-w':''}`}>
              <div className="gal-img" style={{ backgroundImage: `url(${p.url})` }} />
              <span className="gal-lb">{lang==='zh'?p.zh:p.en}</span>
            </div>
          ))}
        </div>
      </Sec>

      {/* STORY */}
      <Sec id="story">
        <h2 className="sec-t">{l.story.title}</h2>
        <p className="sec-s">{l.story.sub}</p>
        <div className="sec-ln" />
        <div className="story-b">
          <p>{l.story.p1}</p>
          <p>{l.story.p2}</p>
          <p>{l.story.p3}</p>
        </div>
      </Sec>

      {/* SCHEDULE */}
      <Sec id="schedule" className="sched">
        <h2 className="sec-t">{l.schedule.title}</h2>
        <p className="sec-s sec-s-big">{l.schedule.sub}</p>
        <div className="sec-ln" />
        <div className="tl">
          {l.schedule.events.map((ev,i) => (
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
        </div>
      </Sec>

      {/* VENUE */}
      <Sec id="venue">
        <h2 className="sec-t">{l.venue.title}</h2>
        <p className="sec-s">{l.venue.sub}</p>
        <div className="sec-ln" />
        <p className="v-addr">{l.venue.address}</p>
        <div className="v-grid">
          <div className="v-card">
            <h4 className="v-card-t">{l.venue.domestic.title}</h4>
            <ul className="v-steps">{l.venue.domestic.steps.map((s,i) => <li key={i}>{s}</li>)}</ul>
            <p className="v-note">{l.venue.domestic.note}</p>
          </div>
          <div className="v-card">
            <h4 className="v-card-t">{l.venue.overseas.title}</h4>
            <div className="v-os">{l.venue.overseas.steps.map((s,i) => <div key={i} className="os-s"><span className="os-i">{s.icon}</span><span className="os-l">{s.label}</span></div>)}</div>
            <p className="v-note">{l.venue.overseas.note}</p>
          </div>
        </div>
        <iframe className="v-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.8!2d120.912!3d23.868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468d66bcbaf5f5f%3A0xb297928ac211e576!2sFleur%20de%20Chine%20Hotel%20Sun%20Moon%20Lake!5e0!3m2!1sen!2stw!4v1700000000000" allowFullScreen loading="lazy" title="Map" />
      </Sec>

      {/* RSVP */}
      <Sec id="rsvp" className="rsvp-sec">
        <h2 className="sec-t">{l.rsvp.title}</h2>
        <p className="sec-s sec-s-big">{l.rsvp.sub}</p>
        <div className="sec-ln" />
        <p className="rsvp-d">{l.rsvp.desc}</p>
        <div className="rsvp-card">
          <iframe className="rsvp-if" src={NOTION_RSVP} allowFullScreen loading="lazy" title="RSVP" />
        </div>
      </Sec>

      {/* FAQ */}
      <Sec id="faq" className="faq-sec">
        <h2 className="sec-t">{l.faq.title}</h2>
        <div className="sec-ln" />
        <div className="faq-ls">
          {l.faq.items.map((item,i) => (
            <div key={i} className={`faq-i ${openFaq===i?'faq-open':''}`} onClick={() => setOpenFaq(openFaq===i?null:i)}>
              <div className="faq-q"><span>{item.q}</span><span className="faq-ic">{openFaq===i?'−':'+'}</span></div>
              <div className="faq-a"><p>{item.a}</p></div>
            </div>
          ))}
        </div>
      </Sec>

      {/* EXPLORE */}
      <Sec className="exp-sec">
        <h2 className="sec-t">{l.explore.title}</h2>
        <p className="sec-s">{l.explore.sub}</p>
        <div className="sec-ln" />
        <div className="exp-g">
          {l.explore.items.map((item,i) => (
            <div key={i} className="exp-c">
              <h4 className="exp-n">{item.name}</h4>
              <p className="exp-d">{item.desc}</p>
            </div>
          ))}
        </div>
      </Sec>

      {/* FOOTER */}
      <footer className="ft">
        <div className="ft-nm">{l.footer}</div>
        <div className="ft-dt">{l.footerDate}</div>
        <div className="ft-sub">{l.footerSub}</div>
        <div className="ft-v">{l.footerVerse}</div>
        <div className="ft-r">{l.footerRef}</div>
      </footer>
    </div>
  )
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Noto+Serif+TC:wght@300;400;500;600&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');

:root{
  --cream:#FAF7F2;--warm:#F3EDE3;--gold:#B8956A;--gold-l:#D4B98A;
  --dk:#1C1915;--txt:#2E2820;--mid:#5C5045;--lt:#8E7F6E;
  --serif:'Playfair Display','Noto Serif TC',Georgia,serif;
  --sans:'DM Sans','Noto Serif TC',-apple-system,sans-serif;
}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
::selection{background:rgba(184,149,106,.18)}
html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
.root{font-family:var(--serif);color:var(--txt);background:var(--cream);min-height:100vh;overflow-x:hidden}

/* NAV */
.nav{position:fixed;top:0;left:0;right:0;z-index:1000;transition:all .4s}
.nav-s{background:rgba(250,247,242,.96);backdrop-filter:blur(16px);box-shadow:0 1px 0 rgba(184,149,106,.1)}
.nav-in{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:18px 36px}
.nav-logo{font-family:var(--sans);font-size:14px;letter-spacing:5px;color:var(--gold);font-weight:500;cursor:pointer}
.nav:not(.nav-s) .nav-logo{color:rgba(255,255,255,.85)}
.nav-lk{display:flex;gap:28px;align-items:center}
.nav-a{font-family:var(--sans);font-size:13px;letter-spacing:1.5px;text-transform:uppercase;background:none;border:none;cursor:pointer;font-weight:400;transition:color .3s}
.nav-s .nav-a{color:var(--mid)}.nav:not(.nav-s) .nav-a{color:rgba(255,255,255,.75)}
.nav-a:hover{color:var(--gold)}
.lang-b{font-family:var(--sans);font-size:12px;letter-spacing:2px;padding:8px 20px;border:1px solid var(--gold);background:transparent;color:var(--gold);cursor:pointer;transition:all .3s}
.lang-b:hover{background:var(--gold);color:#fff}
.nav-tog{display:none;background:none;border:none;cursor:pointer;width:32px;height:32px;position:relative;z-index:1001}
.ham,.ham::before,.ham::after{display:block;width:22px;height:1.5px;position:absolute;transition:all .3s}
.ham{top:50%;left:50%;transform:translate(-50%,-50%);background:var(--mid)}
.nav:not(.nav-s) .ham{background:rgba(255,255,255,.8)}
.ham::before{content:'';top:-7px;left:0;background:inherit}.ham::after{content:'';top:7px;left:0;background:inherit}
.ham-x{background:transparent!important}.ham-x::before{top:0;transform:rotate(45deg);background:var(--mid)!important}.ham-x::after{top:0;transform:rotate(-45deg);background:var(--mid)!important}

/* HERO — date prominent, names balanced */
.hero{position:relative;min-height:100vh;min-height:100dvh;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden}
.hero-bg{position:absolute;inset:0;background-size:cover;background-position:center 35%;transform:scale(1.04);animation:heroZ 20s ease-out forwards}
@keyframes heroZ{to{transform:scale(1)}}
.hero-ov{position:absolute;inset:0;background:linear-gradient(180deg,rgba(28,25,21,.2) 0%,rgba(28,25,21,.42) 40%,rgba(28,25,21,.68) 100%)}
.hero-ct{position:relative;z-index:1;color:#fff;padding:100px 32px 80px;animation:fadeUp 1s ease-out .3s both}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
.hero-tag{font-family:var(--sans);font-size:15px;letter-spacing:2px;color:rgba(255,255,255,.6);margin-bottom:20px;font-weight:300;line-height:1.6}
.hero-nm{font-size:clamp(34px,6.5vw,56px);font-weight:400;letter-spacing:2px;line-height:1.15}
.hero-line{width:48px;height:1px;background:var(--gold-l);margin:28px auto}
.hero-dt{font-family:var(--sans);font-size:clamp(18px,3vw,24px);letter-spacing:2px;color:rgba(255,255,255,.9);font-weight:400}
.hero-day{font-family:var(--sans);font-size:16px;letter-spacing:2px;color:rgba(255,255,255,.6);margin-top:4px;font-weight:300}
.hero-vn{font-family:var(--sans);font-size:15px;letter-spacing:1.5px;color:rgba(255,255,255,.5);margin-top:10px;font-weight:300}
.cd{display:flex;gap:28px;justify-content:center;margin-top:36px}
.cd-u{text-align:center;min-width:52px}
.cd-n{display:block;font-family:var(--sans);font-size:32px;font-weight:300;color:#fff}
.cd-l{font-family:var(--sans);font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.4);margin-top:4px;display:block}
.hero-btn{margin-top:40px;padding:16px 52px;font-family:var(--sans);font-size:14px;letter-spacing:2.5px;text-transform:uppercase;border:1px solid rgba(255,255,255,.35);background:transparent;color:#fff;cursor:pointer;transition:all .4s}
.hero-btn:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.6)}

/* GIFT */
.gift{background:var(--dk);color:rgba(212,201,184,.85);text-align:center;padding:64px 36px}
.gift-in{max-width:640px;margin:0 auto}
.gift-t{font-size:26px;font-weight:400;color:var(--gold);margin-bottom:20px}
.gift-b{font-size:17px;line-height:2;font-weight:300;color:rgba(184,173,158,.8)}

/* SECTIONS */
.sec{padding:100px 40px;opacity:0;transform:translateY(24px);transition:opacity .8s ease,transform .8s ease}
.sec-v{opacity:1;transform:none}
.sec-dk{background:var(--dk);color:rgba(250,247,242,.9)}
.sec-t{font-size:clamp(30px,4.5vw,40px);font-weight:300;letter-spacing:1px;text-align:center;margin-bottom:12px}
.sec-dk .sec-t{color:var(--cream)}
.sec-s{font-family:var(--sans);font-size:14px;letter-spacing:2px;text-transform:uppercase;text-align:center;color:var(--lt);font-weight:300}
.sec-s-big{font-size:17px;letter-spacing:1.5px;text-transform:none;color:var(--mid);font-weight:400}
.sec-dk .sec-s{color:rgba(184,149,106,.6)}
.sec-ln{width:40px;height:1px;background:var(--gold);margin:28px auto 52px;opacity:.5}

/* GALLERY */
.gal-sec{padding-bottom:0}
.gal-g{max-width:1060px;margin:0 auto;display:grid;grid-template-columns:repeat(2,1fr);gap:5px}
.gal-i{position:relative;overflow:hidden;aspect-ratio:4/3;cursor:default}
.gal-w{grid-column:span 2;aspect-ratio:21/9}
.gal-img{position:absolute;inset:0;background-size:cover;background-position:center;transition:transform .7s cubic-bezier(.16,1,.3,1)}
.gal-i:hover .gal-img{transform:scale(1.04)}
.gal-lb{position:absolute;bottom:16px;left:20px;font-family:var(--sans);font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.7);text-shadow:0 1px 8px rgba(0,0,0,.5);z-index:1}

/* STORY */
.story-b{max-width:680px;margin:0 auto;text-align:center}
.story-b p{font-size:18px;line-height:2.1;color:var(--mid);font-weight:300;margin-bottom:28px}

/* SCHEDULE */
.sched{background:var(--warm)}
.tl{max-width:720px;margin:0 auto;position:relative}
.tl::before{content:'';position:absolute;left:118px;top:12px;bottom:12px;width:1px;background:rgba(184,149,106,.22)}
.tl-i{display:grid;grid-template-columns:100px 32px 1fr;padding:28px 0;align-items:start}
.tl-tm{font-family:var(--sans);font-size:15px;letter-spacing:1px;color:var(--gold);text-align:right;padding-top:3px;font-weight:500}
.tl-dot{display:flex;justify-content:center;padding-top:7px}
.tl-dot-in{width:10px;height:10px;border-radius:50%;border:2px solid var(--gold);background:var(--warm);position:relative;z-index:1}
.tl-nm{font-size:21px;font-weight:400;color:var(--txt);margin-bottom:6px}
.tl-vn{font-size:15px;color:var(--gold);font-style:italic;margin-bottom:5px}
.tl-dt{font-size:16px;color:var(--mid);font-weight:300;line-height:1.7}

/* VENUE */
.v-addr{text-align:center;font-family:var(--sans);font-size:16px;color:var(--lt);margin-bottom:44px;font-weight:300}
.v-grid{max-width:840px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:28px}
.v-card{padding:36px;background:var(--warm);border-radius:4px}
.v-card-t{font-family:var(--sans);font-size:13px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin-bottom:22px;font-weight:500}
.v-steps{list-style:none;padding:0}
.v-steps li{font-size:16px;color:var(--mid);font-weight:300;line-height:1.85;padding-left:18px;position:relative;margin-bottom:8px}
.v-steps li::before{content:'·';position:absolute;left:0;color:var(--gold);font-weight:700;font-size:20px;line-height:1.55}
.v-note{font-size:15px;color:var(--lt);font-style:italic;margin-top:18px;line-height:1.75}
.v-os{display:flex;flex-direction:column;gap:6px}
.os-s{display:flex;align-items:center;gap:16px;padding:10px 0}
.os-i{font-size:22px;width:36px;text-align:center;flex-shrink:0}
.os-l{font-size:16px;color:var(--mid);font-weight:300;line-height:1.6}
.v-map{width:100%;max-width:840px;height:340px;border:none;margin:44px auto 0;display:block;border-radius:4px}

/* RSVP — light bg card so Notion blends in */
.rsvp-sec{background:var(--warm)}
.rsvp-d{text-align:center;max-width:580px;margin:0 auto 40px;font-size:17px;line-height:1.9;font-weight:300;color:var(--mid)}
.rsvp-card{max-width:840px;margin:0 auto;background:#fff;border-radius:6px;box-shadow:0 2px 20px rgba(0,0,0,.06);overflow:hidden;padding:8px}
.rsvp-if{width:100%;height:760px;border:none;border-radius:4px}

/* FAQ */
.faq-sec{background:var(--cream)}
.faq-ls{max-width:720px;margin:0 auto}
.faq-i{border-bottom:1px solid rgba(184,149,106,.12);cursor:pointer;transition:background .3s}
.faq-i:hover{background:rgba(184,149,106,.04)}
.faq-q{display:flex;justify-content:space-between;align-items:center;padding:26px 4px;gap:20px}
.faq-q span:first-child{font-size:19px;font-weight:400;color:var(--txt);line-height:1.5}
.faq-ic{font-family:var(--sans);font-size:24px;color:var(--gold);flex-shrink:0}
.faq-a{max-height:0;overflow:hidden;transition:max-height .45s cubic-bezier(.16,1,.3,1),padding .45s}
.faq-open .faq-a{max-height:300px;padding:0 4px 26px}
.faq-a p{font-size:17px;line-height:1.95;color:var(--mid);font-weight:300}

/* EXPLORE */
.exp-sec{background:var(--dk);color:var(--cream)}
.exp-sec .sec-t{color:var(--cream)}
.exp-sec .sec-s{color:rgba(184,149,106,.55)}
.exp-g{max-width:920px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px}
.exp-c{padding:30px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);border-radius:4px;transition:background .3s}
.exp-c:hover{background:rgba(255,255,255,.07)}
.exp-n{font-size:18px;font-weight:400;color:var(--cream);margin-bottom:10px}
.exp-d{font-size:15px;color:rgba(184,173,158,.7);font-weight:300;line-height:1.75}

/* FOOTER */
.ft{text-align:center;padding:80px 36px;background:var(--dk);border-top:1px solid rgba(255,255,255,.04);color:rgba(212,201,184,.8)}
.ft-nm{font-size:clamp(28px,4vw,36px);font-weight:300;color:var(--cream);letter-spacing:1px;margin-bottom:10px}
.ft-dt{font-family:var(--sans);font-size:14px;letter-spacing:3px;text-transform:uppercase;color:var(--gold);margin-bottom:4px}
.ft-sub{font-family:var(--sans);font-size:13px;letter-spacing:2px;color:rgba(107,93,77,.6)}
.ft-v{font-size:17px;font-style:italic;color:rgba(138,123,106,.6);margin-top:36px;font-weight:300;max-width:480px;margin-left:auto;margin-right:auto;line-height:1.9}
.ft-r{font-family:var(--sans);font-size:12px;letter-spacing:2px;color:rgba(107,93,77,.45);margin-top:8px}

/* MOBILE */
@media(max-width:768px){
  .nav-lk{display:none;flex-direction:column;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(250,247,242,.98);backdrop-filter:blur(20px);justify-content:center;align-items:center;gap:28px;z-index:999}
  .nav-lk-open{display:flex}
  .nav-lk-open .nav-a{color:var(--mid)!important;font-size:16px;letter-spacing:2px}
  .nav-tog{display:block}
  .sec{padding:72px 28px}
  .nav-in{padding:16px 24px}
  .gal-g{grid-template-columns:1fr}.gal-w{grid-column:span 1;aspect-ratio:16/9}.gal-i{aspect-ratio:16/10}
  .v-grid{grid-template-columns:1fr}
  .tl::before{left:92px}.tl-i{grid-template-columns:76px 28px 1fr}
  .cd{gap:20px}.cd-n{font-size:26px}
  .hero-btn{padding:14px 40px;font-size:13px}
  .rsvp-if{height:640px}
  .exp-g{grid-template-columns:1fr}
  .hero-nm{font-size:clamp(30px,7vw,48px)}
}
@media(max-width:480px){
  .hero-ct{padding:90px 20px 60px}
  .hero-tag{font-size:14px}
  .hero-dt{font-size:18px}
  .hero-day{font-size:14px}
  .hero-vn{font-size:13px}
  .sec-t{font-size:26px}
  .story-b p{font-size:16px}
  .tl-i{grid-template-columns:62px 22px 1fr}.tl::before{left:73px}
  .tl-nm{font-size:18px}.tl-dt{font-size:15px}.tl-tm{font-size:14px}
  .v-card{padding:28px}
  .rsvp-if{height:560px}
  .sec{padding:56px 20px}
  .sec-ln{margin:22px auto 40px}
  .faq-q span:first-child{font-size:17px}
  .faq-a p{font-size:16px}
  .rsvp-d{font-size:16px}
  .gift-t{font-size:22px}.gift-b{font-size:16px}
  .ft-v{font-size:16px}
}
`
