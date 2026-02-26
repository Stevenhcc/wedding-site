import { useState, useEffect, useRef } from 'react'

/* ─── GALLERY ─── */
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

/* ─── TRANSLATIONS ─── */
const T = {
  en: {
    langLabel: '中文',
    nav: ['Home', 'Our Story', 'Schedule', 'Venue', 'RSVP', 'FAQ'],
    hero: { names: 'Steven & Bonnie', date: 'December 19, 2026', day: 'Saturday', venue: 'Fleur de Chine Hotel · Sun Moon Lake, Taiwan', tagline: 'Join us to celebrate', cta: 'RSVP Now' },
    noGift: { title: 'Your Presence Is Our Gift', body: "We kindly ask for no gifts, red envelopes, or monetary contributions. We simply want to share this joyful day with the people we love most. Your presence and your blessing are more than enough." },
    gallery: { title: 'The Venue', sub: 'Fleur de Chine · Sun Moon Lake' },
    story: {
      title: 'Our Story', sub: 'Two lives, two cultures, one love',
      p1: "What began as a connection across the Pacific grew into a love rooted in faith, family, and a shared vision for the future. Steven, from New Jersey, and Bonnie, from Taichung, found in each other a partner for life\u2019s greatest journey.",
      p2: "We were legally married in Taiwan and are overjoyed to celebrate our union with the people who matter most \u2014 at Sun Moon Lake, one of Taiwan\u2019s most beautiful places.",
      p3: "We believe marriage is a gift, and we are grateful for every person who has been part of our story. We look forward to celebrating with you."
    },
    schedule: {
      title: 'Wedding Day', sub: 'December 19, 2026 · Saturday',
      events: [
        { time: '10:00 AM', name: 'Wedding Ceremony', venue: 'Soaring Cloud Hall (\u96F2\u63DA\u5EF3)', detail: 'Lobby level \u2014 enter the hotel and follow the hallway to the banquet wing.' },
        { time: '12:00 PM', name: 'Ceremony Concludes', venue: '', detail: 'Short walk to the reception hall right next door.' },
        { time: '12:30 PM', name: 'Wedding Reception & Banquet', venue: 'Cosmos Cloud B Hall (\u96F2\u7FF0B\u5EF3)', detail: 'Chinese banquet, celebration, and fellowship.' },
        { time: '3:00 PM', name: 'Farewell', venue: '', detail: 'Send-off with gratitude and joy.' }
      ]
    },
    venue: {
      title: 'Getting There', sub: 'Fleur de Chine Hotel · Sun Moon Lake',
      address: 'No. 23, Zhongzheng Rd, Yuchi Township, Nantou County 555, Taiwan',
      domestic: { title: 'From Within Taiwan', steps: ['Drive to Sun Moon Lake (~1.5 hrs from Taichung), or', 'Take Nantou Bus (\u5357\u6295\u5BA2\u904B) from Taichung HSR Station directly to Sun Moon Lake', 'Free parking at the hotel for all wedding guests'], note: 'We may arrange a shuttle from Taichung HSR \u2014 please indicate on the RSVP if interested.' },
      overseas: { title: 'From Overseas', steps: [{ icon: '\u2708\uFE0F', label: 'Fly into Taoyuan International Airport (TPE)' }, { icon: '\uD83D\uDE84', label: 'Take HSR from Taoyuan Station \u2192 Taichung Station (40 min)' }, { icon: '\uD83D\uDE8C', label: 'Bus or car from Taichung HSR \u2192 Sun Moon Lake (1.5 hrs)' }, { icon: '\uD83C\uDFE8', label: 'Check in at Fleur de Chine Hotel' }], note: 'We recommend arriving at least one day before the wedding to settle in and enjoy the area.' }
    },
    rsvp: { title: 'RSVP', sub: 'Please respond by November 19, 2026', desc: "Let us know if you can make it! Our RSVP form takes about 2 minutes and helps us plan seating, meals, and transportation." },
    faq: {
      title: 'FAQ',
      items: [
        { q: 'Do I need to bring a gift or red envelope?', a: "No \u2014 please don\u2019t! We mean it. No gifts, no red envelopes (\u7D05\u5305), no monetary contributions. Your presence is truly the only gift we want." },
        { q: 'What should I wear?', a: "Formal attire. December at Sun Moon Lake is cool \u2014 around 12\u201318\u00B0C (54\u201364\u00B0F) \u2014 so bring a warm coat or wrap." },
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
        { name: 'Ita Thao Village', desc: 'Indigenous Thao tribal village \u2014 local cuisine, crafts, and cultural experiences.' },
        { name: 'Hotel Hot Springs', desc: 'Fleur de Chine has natural hot springs. Perfect for unwinding after the celebration.' }
      ]
    },
    footer: 'Steven & Bonnie', footerDate: 'December 19, 2026', footerSub: 'Sun Moon Lake, Taiwan',
    footerVerse: '\u201CTwo are better than one, because they have a good return for their labor.\u201D', footerRef: 'Ecclesiastes 4:9'
  },
  zh: {
    langLabel: 'EN',
    nav: ['\u9996\u9801', '\u6211\u5011\u7684\u6545\u4E8B', '\u5A5A\u79AE\u6D41\u7A0B', '\u4EA4\u901A\u6307\u5357', '\u51FA\u5E2D\u56DE\u8986', '\u5E38\u898B\u554F\u984C'],
    hero: { names: 'Steven & \u5B50\u82B8', date: '2026\u5E7412\u670819\u65E5', day: '\u661F\u671F\u516D', venue: '\u65E5\u6708\u6F6D \u00B7 \u96F2\u54C1\u6EAB\u6CC9\u9152\u5E97', tagline: '\u8AA0\u647F\u9080\u8ACB\u60A8\u4E00\u540C\u898B\u8B49', cta: '\u7ACB\u5373\u56DE\u8986' },
    noGift: { title: '\u60A8\u7684\u5230\u4F86\u5C31\u662F\u6700\u597D\u7684\u79AE\u7269', body: '\u6211\u5011\u61C7\u8ACB\u4E0D\u6536\u4EFB\u4F55\u79AE\u7269\u3001\u7D05\u5305\u6216\u79AE\u91D1\u3002\u6211\u5011\u53EA\u5E0C\u671B\u8207\u6700\u611B\u7684\u4EBA\u4E00\u8D77\u5206\u4EAB\u9019\u559C\u6A02\u7684\u4E00\u5929\u3002\u60A8\u7684\u5230\u4F86\u8207\u795D\u798F\uFF0C\u5C31\u662F\u5C0D\u6211\u5011\u6700\u5927\u7684\u6069\u5178\u3002' },
    gallery: { title: '\u5A5A\u79AE\u5834\u5730', sub: '\u96F2\u54C1\u6EAB\u6CC9\u9152\u5E97 \u00B7 \u65E5\u6708\u6F6D' },
    story: {
      title: '\u6211\u5011\u7684\u6545\u4E8B', sub: '\u5169\u500B\u751F\u547D\u3001\u5169\u7A2E\u6587\u5316\u3001\u4E00\u4EFD\u611B',
      p1: '\u4E00\u6BB5\u8DE8\u8D8A\u592A\u5E73\u6D0B\u7684\u7DE3\u5206\uFF0C\u6210\u9577\u70BA\u4EE5\u4FE1\u4EF0\u3001\u5BB6\u5EAD\u548C\u5171\u540C\u9858\u666F\u70BA\u6839\u57FA\u7684\u611B\u60C5\u3002Steven\u4F86\u81EA\u7F8E\u570B\u7D10\u6FA4\u897F\uFF0C\u5B50\u82B8\u4F86\u81EA\u53F0\u4E2D\uFF0C\u5169\u4EBA\u5728\u5F7C\u6B64\u8EAB\u4E0A\u627E\u5230\u4E86\u4EBA\u751F\u65C5\u9014\u4E2D\u6700\u597D\u7684\u5925\u4F34\u3002',
      p2: '\u6211\u5011\u5DF2\u5728\u53F0\u7063\u5B8C\u6210\u7D50\u5A5A\u767B\u8A18\uFF0C\u73FE\u5728\u7121\u6BD4\u559C\u6085\u5730\u9080\u8ACB\u5C0D\u6211\u5011\u6700\u91CD\u8981\u7684\u4EBA\uFF0C\u4E00\u540C\u5728\u7F8E\u9E97\u7684\u65E5\u6708\u6F6D\u6176\u795D\u6211\u5011\u7684\u7D50\u5408\u3002',
      p3: '\u6211\u5011\u76F8\u4FE1\u5A5A\u59FB\u662F\u6069\u8CDC\uFF0C\u611F\u8B1D\u6BCF\u4E00\u4F4D\u5728\u6211\u5011\u751F\u547D\u4E2D\u7559\u4E0B\u8DB3\u8DE1\u7684\u4EBA\u3002\u671F\u5F85\u8207\u60A8\u4E00\u540C\u6B61\u6176\u3002'
    },
    schedule: {
      title: '\u5A5A\u79AE\u6D41\u7A0B', sub: '2026\u5E7412\u670819\u65E5\uFF08\u516D\uFF09',
      events: [
        { time: '\u4E0A\u5348 10:00', name: '\u8B49\u5A5A\u5100\u5F0F', venue: '\u96F2\u63DA\u5EF3', detail: '\u5927\u5EF3\u6A13\u5C64\u2014\u2014\u9032\u5165\u9152\u5E97\u5F8C\u6CBF\u8D70\u5ECA\u524D\u5F80\u5BB4\u6703\u5340\u3002' },
        { time: '\u4E2D\u5348 12:00', name: '\u5100\u5F0F\u7D50\u675F', venue: '', detail: '\u6B65\u884C\u81F3\u96A8\u58C1\u5BB4\u6703\u5EF3\u3002' },
        { time: '\u4E2D\u5348 12:30', name: '\u559C\u5BB4', venue: '\u96F2\u7FF0B\u5EF3', detail: '\u4E2D\u5F0F\u559C\u5BB4\u3001\u6B61\u6176\u8207\u5718\u5951\u3002' },
        { time: '\u4E0B\u5348 3:00', name: '\u79AE\u6210', venue: '', detail: '\u6B61\u9001\u8CD3\u5BA2\uFF0C\u611F\u6069\u8207\u559C\u6A02\u3002' }
      ]
    },
    venue: {
      title: '\u4EA4\u901A\u6307\u5357', sub: '\u96F2\u54C1\u6EAB\u6CC9\u9152\u5E97 \u00B7 \u65E5\u6708\u6F6D',
      address: '\u5357\u6295\u7E23\u9B5A\u6C60\u9109\u65E5\u6708\u6F6D\u4E2D\u6B63\u8DEF23\u865F',
      domestic: { title: '\u53F0\u7063\u570B\u5167\u4EA4\u901A', steps: ['\u81EA\u884C\u958B\u8ECA\u81F3\u65E5\u6708\u6F6D\uFF08\u5F9E\u53F0\u4E2D\u51FA\u767C\u7D041.5\u5C0F\u6642\uFF09\uFF0C\u6216', '\u5F9E\u53F0\u4E2D\u9AD8\u9435\u7AD9\u642D\u4E58\u5357\u6295\u5BA2\u904B\u76F4\u9054\u65E5\u6708\u6F6D', '\u9152\u5E97\u63D0\u4F9B\u5A5A\u79AE\u8CD3\u5BA2\u514D\u8CBB\u505C\u8ECA'], note: '\u6211\u5011\u53EF\u80FD\u5B89\u6392\u5F9E\u53F0\u4E2D\u9AD8\u9435\u7AD9\u51FA\u767C\u7684\u63A5\u99C1\u8ECA\u2014\u2014\u8ACB\u5728\u56DE\u8986\u8868\u55AE\u4E2D\u544A\u77E5\u662F\u5426\u9700\u8981\u3002' },
      overseas: { title: '\u6D77\u5916\u8CD3\u5BA2\u4EA4\u901A', steps: [{ icon: '\u2708\uFE0F', label: '\u98DB\u62B5\u6843\u5712\u570B\u969B\u6A5F\u5834\uFF08TPE\uFF09' }, { icon: '\uD83D\uDE84', label: '\u642D\u4E58\u9AD8\u9435\uFF1A\u6843\u5712\u7AD9 \u2192 \u53F0\u4E2D\u7AD9\uFF08\u7D0440\u5206\u9418\uFF09' }, { icon: '\uD83D\uDE8C', label: '\u5F9E\u53F0\u4E2D\u9AD8\u9435\u7AD9\u642D\u5BA2\u904B\u6216\u5305\u8ECA\u81F3\u65E5\u6708\u6F6D\uFF08\u7D041.5\u5C0F\u6642\uFF09' }, { icon: '\uD83C\uDFE8', label: '\u5165\u4F4F\u96F2\u54C1\u6EAB\u6CC9\u9152\u5E97' }], note: '\u5EFA\u8B70\u65BC\u5A5A\u79AE\u524D\u4E00\u5929\u62B5\u9054\uFF0C\u53EF\u9806\u4FBF\u4EAB\u53D7\u65E5\u6708\u6F6D\u7684\u7F8E\u666F\u3002' }
    },
    rsvp: { title: '\u51FA\u5E2D\u56DE\u8986', sub: '\u8ACB\u65BC2026\u5E7411\u670819\u65E5\u524D\u56DE\u8986', desc: '\u8ACB\u544A\u8A34\u6211\u5011\u60A8\u662F\u5426\u80FD\u51FA\u5E2D\uFF01\u586B\u5BEB\u56DE\u8986\u8868\u55AE\u50C5\u9700\u7D042\u5206\u9418\uFF0C\u6709\u52A9\u65BC\u6211\u5011\u5B89\u6392\u5EA7\u4F4D\u3001\u9910\u9EDE\u53CA\u4EA4\u901A\u3002' },
    faq: {
      title: '\u5E38\u898B\u554F\u984C',
      items: [
        { q: '\u9700\u8981\u9001\u79AE\u6216\u5305\u7D05\u5305\u55CE\uFF1F', a: '\u4E0D\u9700\u8981\uFF01\u6211\u5011\u662F\u8A8D\u771F\u7684\u3002\u8ACB\u4E0D\u8981\u6E96\u5099\u79AE\u7269\u3001\u7D05\u5305\u6216\u79AE\u91D1\u3002\u60A8\u7684\u5230\u4F86\u5C31\u662F\u6700\u597D\u7684\u79AE\u7269\u3002' },
        { q: '\u7A7F\u8457\u8981\u6C42\uFF1F', a: '\u8ACB\u8457\u6B63\u5F0F\u670D\u88DD\u3002\u5341\u4E8C\u6708\u7684\u65E5\u6708\u6F6D\u6C23\u6EAB\u8F03\u6DBC\uFF08\u7D0412\u201318\u00B0C\uFF09\uFF0C\u8ACB\u651C\u5E36\u4FDD\u6696\u5916\u5957\u3002' },
        { q: '\u5929\u6C23\u5982\u4F55\uFF1F', a: '\u9810\u8A08\u6DBC\u723D\u6E05\u65B0\uFF0C\u65E9\u6668\u53EF\u80FD\u6709\u8584\u9727\u3002\u8B49\u5A5A\u5100\u5F0F\u53CA\u559C\u5BB4\u7686\u5728\u5BA4\u5167\uFF0C\u4F46\u6236\u5916\u6D3B\u52D5\u9700\u6CE8\u610F\u4FDD\u6696\u3002' },
        { q: '\u53EF\u4EE5\u651C\u5E36\u5C0F\u670B\u53CB\u55CE\uFF1F', a: '\u6B61\u8FCE\uFF01\u8B49\u5A5A\u5100\u5F0F\u53CA\u559C\u5BB4\u7686\u6B61\u8FCE\u5C0F\u670B\u53CB\u53C3\u52A0\u3002' },
        { q: '\u5100\u5F0F\u4F7F\u7528\u4EC0\u9EBC\u8A9E\u8A00\uFF1F', a: '\u4E2D\u82F1\u96D9\u8A9E\u9032\u884C\u3002' },
        { q: '\u5100\u5F0F\u5728\u54EA\u88E1\uFF1F', a: '\u6240\u6709\u5BB4\u6703\u5834\u5730\u90FD\u5728\u5927\u5EF3\u6A13\u5C64\u3002\u9032\u5165\u9152\u5E97\u5F8C\u6CBF\u8D70\u5ECA\u524D\u5F80\u5BB4\u6703\u5340\uFF0C\u73FE\u5834\u6703\u6709\u6307\u793A\u6A19\u8A8C\u3002' },
        { q: '\u6211\u5F9E\u6D77\u5916\u524D\u4F86\uFF0C\u600E\u9EBC\u5230\u9054\uFF1F', a: '\u98DB\u62B5\u6843\u5712\u6A5F\u5834\uFF08TPE\uFF09\uFF0C\u642D\u9AD8\u9435\u81F3\u53F0\u4E2D\uFF0840\u5206\u9418\uFF09\uFF0C\u518D\u8F49\u4E58\u5BA2\u904B\u6216\u5305\u8ECA\u81F3\u65E5\u6708\u6F6D\uFF081.5\u5C0F\u6642\uFF09\u3002\u5EFA\u8B70\u5A5A\u79AE\u524D\u4E00\u5929\u62B5\u9054\u3002' }
      ]
    },
    explore: {
      title: '\u65E5\u6708\u6F6D\u63A8\u85A6\u666F\u9EDE', sub: '\u4F86\u90FD\u4F86\u4E86\uFF0C\u9806\u4FBF\u8D70\u8D70',
      items: [
        { name: '\u65E5\u6708\u6F6D\u74B0\u6E56\u81EA\u884C\u8ECA\u9053', desc: '\u5168\u7403\u6700\u7F8E\u81EA\u884C\u8ECA\u9053\u4E4B\u4E00\uFF0C\u74B0\u7E5E\u6574\u500B\u6E56\u7554\u3002' },
        { name: '\u6587\u6B66\u5EDF', desc: '\u58EF\u89C0\u7684\u6E56\u7554\u9053\u6559\u5EDF\u5B87\uFF0C\u8DDD\u96E2\u9152\u5E97\u50C51\u516C\u91CC\u3002' },
        { name: '\u65E5\u6708\u6F6D\u7E9C\u8ECA', desc: '\u7A7A\u4E2D\u7E9C\u8ECA\u6B23\u8CDE\u6E56\u666F\u53CA\u5468\u570D\u5C71\u666F\u3002' },
        { name: '\u4F0A\u9054\u90B5\u90E8\u843D', desc: '\u90B5\u65CF\u539F\u4F4F\u6C11\u90E8\u843D\u2014\u2014\u5728\u5730\u7F8E\u98DF\u3001\u624B\u5DE5\u85DD\u54C1\u53CA\u6587\u5316\u9AD4\u9A57\u3002' },
        { name: '\u9152\u5E97\u6EAB\u6CC9', desc: '\u96F2\u54C1\u672C\u8EAB\u5C31\u6709\u5929\u7136\u6EAB\u6CC9\uFF0C\u6176\u795D\u5F8C\u6700\u9069\u5408\u653E\u9B06\u8EAB\u5FC3\u3002' }
      ]
    },
    footer: 'Steven & \u5B50\u82B8', footerDate: '2026\u5E7412\u670819\u65E5', footerSub: '\u53F0\u7063 \u65E5\u6708\u6F6D',
    footerVerse: '\u300C\u5169\u500B\u4EBA\u7E3D\u6BD4\u4E00\u500B\u4EBA\u597D\uFF0C\u56E0\u70BA\u4E8C\u4EBA\u52DE\u7984\u540C\u5F97\u7F8E\u597D\u7684\u679C\u6548\u3002\u300D', footerRef: '\u50B3\u9053\u66F8 4:9'
  }
}

const NOTION_RSVP = 'https://tgre.notion.site/ebd//3cfd6488a9a04288938a7ff90c5c4351?v=3121cfcfd40f801c9b8d000c968932b2'

/* ─── REVEAL HOOK ─── */
function useReveal(threshold = 0.1) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, v]
}

/* ─── COUNTDOWN ─── */
function Countdown({ lang }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const target = new Date('2026-12-19T10:00:00+08:00')
    const tick = () => {
      const diff = target - new Date()
      if (diff <= 0) return
      setT({ d: Math.floor(diff / 864e5), h: Math.floor(diff % 864e5 / 36e5), m: Math.floor(diff % 36e5 / 6e4), s: Math.floor(diff % 6e4 / 1e3) })
    }
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id)
  }, [])
  const labels = lang === 'en' ? ['Days','Hours','Min','Sec'] : ['\u5929','\u6642','\u5206','\u79D2']
  return (
    <div className="cd">
      {[t.d, t.h, t.m, t.s].map((v, i) => (
        <div key={i} className="cd-u">
          <span className="cd-n">{String(v).padStart(2,'0')}</span>
          <span className="cd-l">{labels[i]}</span>
        </div>
      ))}
    </div>
  )
}

/* ─── REVEAL SECTION ─── */
function Reveal({ children, className = '', id, dark }) {
  const [ref, vis] = useReveal()
  return (
    <section id={id} ref={ref} className={`sec ${dark ? 'sec-dk' : ''} ${vis ? 'sec-vis' : ''} ${className}`}>
      {children}
    </section>
  )
}

/* ─── APP ─── */
export default function App() {
  const [lang, setLang] = useState('zh')
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const l = T[lang]

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const ids = ['home','story','schedule','venue','rsvp','faq']
  const go = i => { document.getElementById(ids[i])?.scrollIntoView({ behavior: 'smooth' }); setMenu(false) }

  return (
    <div className="root">
      <style>{CSS}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? 'nav-s' : ''}`}>
        <div className="nav-in">
          <span className="nav-logo" onClick={() => go(0)}>S & B</span>
          <button className="nav-tog" onClick={() => setMenu(!menu)} aria-label="Menu">
            <span className={`ham ${menu ? 'ham-x' : ''}`} />
          </button>
          <div className={`nav-lk ${menu ? 'nav-lk-open' : ''}`}>
            {l.nav.map((n, i) => <button key={i} className="nav-a" onClick={() => go(i)}>{n}</button>)}
            <button className="lang-b" onClick={() => { setLang(lang === 'en' ? 'zh' : 'en'); setMenu(false) }}>{l.langLabel}</button>
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
      <Reveal id="gallery" className="gal-sec" dark>
        <h2 className="sec-t">{l.gallery.title}</h2>
        <p className="sec-s">{l.gallery.sub}</p>
        <div className="sec-ln" />
        <div className="gal-g">
          {GALLERY.map((p, i) => (
            <div key={i} className={`gal-i ${p.wide ? 'gal-w' : ''}`}>
              <div className="gal-img" style={{ backgroundImage: `url(${p.url})` }} />
              <span className="gal-lb">{lang === 'zh' ? p.zh : p.en}</span>
            </div>
          ))}
        </div>
      </Reveal>

      {/* STORY */}
      <Reveal id="story">
        <h2 className="sec-t">{l.story.title}</h2>
        <p className="sec-s">{l.story.sub}</p>
        <div className="sec-ln" />
        <div className="story-b">
          <p>{l.story.p1}</p>
          <p>{l.story.p2}</p>
          <p>{l.story.p3}</p>
        </div>
      </Reveal>

      {/* SCHEDULE */}
      <Reveal id="schedule" className="sched-sec">
        <h2 className="sec-t">{l.schedule.title}</h2>
        <p className="sec-s">{l.schedule.sub}</p>
        <div className="sec-ln" />
        <div className="tl">
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
        </div>
      </Reveal>

      {/* VENUE */}
      <Reveal id="venue">
        <h2 className="sec-t">{l.venue.title}</h2>
        <p className="sec-s">{l.venue.sub}</p>
        <div className="sec-ln" />
        <p className="v-addr">{l.venue.address}</p>
        <div className="v-grid">
          <div className="v-card">
            <h4 className="v-card-t">{l.venue.domestic.title}</h4>
            <ul className="v-steps">
              {l.venue.domestic.steps.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
            <p className="v-note">{l.venue.domestic.note}</p>
          </div>
          <div className="v-card">
            <h4 className="v-card-t">{l.venue.overseas.title}</h4>
            <div className="v-os">
              {l.venue.overseas.steps.map((s, i) => (
                <div key={i} className="os-s"><span className="os-i">{s.icon}</span><span className="os-l">{s.label}</span></div>
              ))}
            </div>
            <p className="v-note">{l.venue.overseas.note}</p>
          </div>
        </div>
        <iframe className="v-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.8!2d120.912!3d23.868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468d66bcbaf5f5f%3A0xb297928ac211e576!2sFleur%20de%20Chine%20Hotel%20Sun%20Moon%20Lake!5e0!3m2!1sen!2stw!4v1700000000000" allowFullScreen loading="lazy" title="Map" />
      </Reveal>

      {/* RSVP */}
      <Reveal id="rsvp" className="rsvp-sec" dark>
        <h2 className="sec-t">{l.rsvp.title}</h2>
        <p className="sec-s">{l.rsvp.sub}</p>
        <div className="sec-ln" />
        <p className="rsvp-d">{l.rsvp.desc}</p>
        <div className="rsvp-wrap">
          <iframe className="rsvp-if" src={NOTION_RSVP} allowFullScreen loading="lazy" title="RSVP" />
        </div>
      </Reveal>

      {/* FAQ */}
      <Reveal id="faq">
        <h2 className="sec-t">{l.faq.title}</h2>
        <div className="sec-ln" />
        <div className="faq-ls">
          {l.faq.items.map((item, i) => (
            <div key={i} className={`faq-i ${openFaq === i ? 'faq-open' : ''}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="faq-q">
                <span>{item.q}</span>
                <span className="faq-ic">{openFaq === i ? '\u2212' : '+'}</span>
              </div>
              <div className="faq-a"><p>{item.a}</p></div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* EXPLORE */}
      <Reveal className="exp-sec">
        <h2 className="sec-t">{l.explore.title}</h2>
        <p className="sec-s">{l.explore.sub}</p>
        <div className="sec-ln" />
        <div className="exp-g">
          {l.explore.items.map((item, i) => (
            <div key={i} className="exp-c">
              <h4 className="exp-n">{item.name}</h4>
              <p className="exp-d">{item.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>

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

/* ═══════════════════════════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Noto+Serif+TC:wght@300;400;500;600&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');

:root {
  --cream:#FAF7F2; --warm:#F3EDE3; --gold:#B8956A; --gold-l:#D4B98A;
  --dk:#1C1915; --txt:#2E2820; --mid:#6B5D4D; --lt:#9E8E7B;
  --serif:'Playfair Display','Noto Serif TC',Georgia,serif;
  --sans:'DM Sans','Noto Serif TC',-apple-system,sans-serif;
}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
::selection{background:rgba(184,149,106,.18)}
html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
.root{font-family:var(--serif);color:var(--txt);background:var(--cream);min-height:100vh;overflow-x:hidden}

/* ── NAV ── */
.nav{position:fixed;top:0;left:0;right:0;z-index:1000;transition:all .4s cubic-bezier(.16,1,.3,1)}
.nav-s{background:rgba(250,247,242,.95);backdrop-filter:blur(20px) saturate(1.2);box-shadow:0 1px 0 rgba(184,149,106,.1)}
.nav-in{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:20px 40px}
.nav-logo{font-family:var(--sans);font-size:13px;letter-spacing:5px;color:var(--gold);font-weight:500;cursor:pointer}
.nav:not(.nav-s) .nav-logo{color:rgba(255,255,255,.85)}
.nav-lk{display:flex;gap:28px;align-items:center}
.nav-a{font-family:var(--sans);font-size:11px;letter-spacing:2px;text-transform:uppercase;background:none;border:none;cursor:pointer;font-weight:400;transition:color .3s}
.nav-s .nav-a{color:var(--mid)}.nav:not(.nav-s) .nav-a{color:rgba(255,255,255,.7)}
.nav-a:hover{color:var(--gold)}
.lang-b{font-family:var(--sans);font-size:10px;letter-spacing:2px;padding:7px 18px;border:1px solid var(--gold);background:transparent;color:var(--gold);cursor:pointer;transition:all .3s}
.lang-b:hover{background:var(--gold);color:#fff}
.nav-tog{display:none;background:none;border:none;cursor:pointer;width:28px;height:28px;position:relative;z-index:1001}
.ham,.ham::before,.ham::after{display:block;width:20px;height:1.5px;position:absolute;transition:all .3s}
.ham{top:50%;left:50%;transform:translate(-50%,-50%);background:var(--mid)}
.nav:not(.nav-s) .ham{background:rgba(255,255,255,.8)}
.ham::before{content:'';top:-6px;left:0;background:inherit}.ham::after{content:'';top:6px;left:0;background:inherit}
.ham-x{background:transparent!important}.ham-x::before{top:0;transform:rotate(45deg);background:var(--mid)!important}.ham-x::after{top:0;transform:rotate(-45deg);background:var(--mid)!important}

/* ── HERO ── */
.hero{position:relative;min-height:100vh;min-height:100dvh;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden}
.hero-bg{position:absolute;inset:0;background-size:cover;background-position:center 35%;transform:scale(1.06);animation:heroZ 25s ease-out forwards}
@keyframes heroZ{to{transform:scale(1)}}
.hero-ov{position:absolute;inset:0;background:linear-gradient(180deg,rgba(28,25,21,.25) 0%,rgba(28,25,21,.4) 35%,rgba(28,25,21,.65) 100%)}
.hero-ct{position:relative;z-index:1;color:#fff;padding:120px 32px 80px;animation:fadeUp 1.2s ease-out .3s both}
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
.hero-tag{font-family:var(--sans);font-size:12px;letter-spacing:5px;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:24px;font-weight:300}
.hero-nm{font-size:clamp(40px,9vw,78px);font-weight:300;letter-spacing:3px;line-height:1.12}
.hero-line{width:52px;height:1px;background:var(--gold-l);margin:30px auto;animation:growLn 1s ease-out 1s both}
@keyframes growLn{from{width:0;opacity:0}to{width:52px;opacity:1}}
.hero-dt{font-family:var(--sans);font-size:14px;letter-spacing:3px;color:rgba(255,255,255,.8);font-weight:300}
.hero-vn{font-family:var(--sans);font-size:12px;letter-spacing:2px;color:rgba(255,255,255,.5);margin-top:6px;font-weight:300}
.cd{display:flex;gap:24px;justify-content:center;margin-top:36px}
.cd-u{text-align:center}
.cd-n{display:block;font-family:var(--sans);font-size:30px;font-weight:300;color:#fff;letter-spacing:1px}
.cd-l{font-family:var(--sans);font-size:9px;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,.4);margin-top:4px;display:block}
.hero-btn{margin-top:44px;padding:16px 52px;font-family:var(--sans);font-size:11px;letter-spacing:3.5px;text-transform:uppercase;border:1px solid rgba(255,255,255,.35);background:transparent;color:#fff;cursor:pointer;transition:all .4s}
.hero-btn:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.65)}

/* ── GIFT ── */
.gift{background:var(--dk);color:rgba(212,201,184,.85);text-align:center;padding:60px 32px}
.gift-in{max-width:620px;margin:0 auto}
.gift-t{font-size:23px;font-weight:400;color:var(--gold);margin-bottom:18px;letter-spacing:.5px}
.gift-b{font-size:15px;line-height:2.05;font-weight:300;color:rgba(184,173,158,.8)}

/* ── SECTIONS ── */
.sec{padding:100px 40px;opacity:0;transform:translateY(28px);transition:opacity .85s ease,transform .85s ease}
.sec-vis{opacity:1;transform:none}
.sec-dk{background:var(--dk);color:rgba(250,247,242,.9)}
.sec-t{font-size:clamp(28px,5vw,42px);font-weight:300;letter-spacing:1px;text-align:center;margin-bottom:10px}
.sec-dk .sec-t{color:var(--cream)}
.sec-s{font-family:var(--sans);font-size:12px;letter-spacing:3px;text-transform:uppercase;text-align:center;color:var(--lt);font-weight:300}
.sec-dk .sec-s{color:rgba(184,149,106,.65)}
.sec-ln{width:40px;height:1px;background:var(--gold);margin:24px auto 48px;opacity:.5}

/* ── GALLERY ── */
.gal-sec{padding-bottom:0}
.gal-g{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(2,1fr);gap:4px}
.gal-i{position:relative;overflow:hidden;aspect-ratio:4/3;cursor:default}
.gal-w{grid-column:span 2;aspect-ratio:21/9}
.gal-img{position:absolute;inset:0;background-size:cover;background-position:center;transition:transform .8s cubic-bezier(.16,1,.3,1)}
.gal-i:hover .gal-img{transform:scale(1.06)}
.gal-lb{position:absolute;bottom:16px;left:20px;font-family:var(--sans);font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.7);text-shadow:0 1px 6px rgba(0,0,0,.5);z-index:1}

/* ── STORY ── */
.story-b{max-width:660px;margin:0 auto;text-align:center}
.story-b p{font-size:17px;line-height:2.15;color:var(--mid);font-weight:300;margin-bottom:26px}

/* ── SCHEDULE ── */
.sched-sec{background:var(--warm)}
.tl{max-width:700px;margin:0 auto;position:relative}
.tl::before{content:'';position:absolute;left:108px;top:10px;bottom:10px;width:1px;background:rgba(184,149,106,.22)}
.tl-i{display:grid;grid-template-columns:92px 28px 1fr;padding:28px 0;align-items:start}
.tl-tm{font-family:var(--sans);font-size:13px;letter-spacing:1px;color:var(--gold);text-align:right;padding-top:3px;font-weight:500}
.tl-dot{display:flex;justify-content:center;padding-top:7px}
.tl-dot-in{width:9px;height:9px;border-radius:50%;border:1.5px solid var(--gold);background:var(--warm);position:relative;z-index:1}
.tl-nm{font-size:19px;font-weight:400;color:var(--txt);margin-bottom:5px}
.tl-vn{font-size:13px;color:var(--gold);font-style:italic;margin-bottom:4px}
.tl-dt{font-size:14px;color:var(--mid);font-weight:300;line-height:1.7}

/* ── VENUE ── */
.v-addr{text-align:center;font-family:var(--sans);font-size:14px;color:var(--lt);margin-bottom:40px;font-weight:300}
.v-grid{max-width:820px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:28px}
.v-card{padding:32px;background:var(--warm);border-radius:3px}
.v-card-t{font-family:var(--sans);font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:var(--gold);margin-bottom:20px;font-weight:500}
.v-steps{list-style:none;padding:0}
.v-steps li{font-size:14px;color:var(--mid);font-weight:300;line-height:1.85;padding-left:16px;position:relative;margin-bottom:6px}
.v-steps li::before{content:'\u00B7';position:absolute;left:0;color:var(--gold);font-weight:700;font-size:18px;line-height:1.6}
.v-note{font-size:13px;color:var(--lt);font-style:italic;margin-top:16px;line-height:1.7}
.v-os{display:flex;flex-direction:column;gap:4px}
.os-s{display:flex;align-items:center;gap:14px;padding:10px 0}
.os-i{font-size:20px;width:32px;text-align:center;flex-shrink:0}
.os-l{font-size:14px;color:var(--mid);font-weight:300;line-height:1.6}
.v-map{width:100%;max-width:820px;height:320px;border:none;margin:40px auto 0;display:block;border-radius:3px}

/* ── RSVP ── */
.rsvp-sec{padding-bottom:40px}
.rsvp-d{text-align:center;max-width:560px;margin:0 auto 40px;font-size:15px;line-height:1.95;font-weight:300;color:rgba(184,173,158,.8)}
.rsvp-wrap{max-width:820px;margin:0 auto;background:rgba(255,255,255,.03);border-radius:4px;overflow:hidden}
.rsvp-if{width:100%;height:720px;border:none}

/* ── FAQ ── */
.faq-ls{max-width:700px;margin:0 auto}
.faq-i{border-bottom:1px solid rgba(184,149,106,.1);cursor:pointer;transition:background .3s}
.faq-i:hover{background:rgba(184,149,106,.03)}
.faq-q{display:flex;justify-content:space-between;align-items:center;padding:24px 4px;gap:16px}
.faq-q span:first-child{font-size:17px;font-weight:400;color:var(--txt);line-height:1.5}
.faq-ic{font-family:var(--sans);font-size:22px;color:var(--gold);flex-shrink:0;transition:transform .3s}
.faq-a{max-height:0;overflow:hidden;transition:max-height .45s cubic-bezier(.16,1,.3,1),padding .45s}
.faq-open .faq-a{max-height:300px;padding:0 4px 24px}
.faq-a p{font-size:15px;line-height:1.95;color:var(--mid);font-weight:300}

/* ── EXPLORE ── */
.exp-sec{background:var(--warm)}
.exp-g{max-width:920px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px}
.exp-c{padding:28px;background:var(--cream);border-radius:3px;transition:transform .3s,box-shadow .3s}
.exp-c:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(0,0,0,.05)}
.exp-n{font-size:17px;font-weight:400;color:var(--txt);margin-bottom:8px}
.exp-d{font-size:14px;color:var(--mid);font-weight:300;line-height:1.7}

/* ── FOOTER ── */
.ft{text-align:center;padding:80px 32px;background:var(--dk);color:rgba(212,201,184,.8)}
.ft-nm{font-size:clamp(26px,4vw,38px);font-weight:300;color:var(--cream);letter-spacing:1px;margin-bottom:8px}
.ft-dt{font-family:var(--sans);font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--gold);margin-bottom:4px}
.ft-sub{font-family:var(--sans);font-size:11px;letter-spacing:2px;color:rgba(107,93,77,.6)}
.ft-v{font-size:16px;font-style:italic;color:rgba(138,123,106,.65);margin-top:32px;font-weight:300;max-width:480px;margin-left:auto;margin-right:auto;line-height:1.9}
.ft-r{font-family:var(--sans);font-size:10px;letter-spacing:2px;color:rgba(107,93,77,.45);margin-top:8px}

/* ── MOBILE ── */
@media(max-width:768px){
  .nav-lk{display:none;flex-direction:column;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(250,247,242,.98);backdrop-filter:blur(20px);justify-content:center;align-items:center;gap:24px;z-index:999}
  .nav-lk-open{display:flex}
  .nav-lk-open .nav-a{color:var(--mid)!important;font-size:13px;letter-spacing:3px}
  .nav-tog{display:block}
  .sec{padding:72px 24px}
  .nav-in{padding:16px 24px}
  .gal-g{grid-template-columns:1fr}.gal-w{grid-column:span 1;aspect-ratio:16/9}.gal-i{aspect-ratio:16/10}
  .v-grid{grid-template-columns:1fr}
  .tl::before{left:88px}.tl-i{grid-template-columns:72px 24px 1fr}
  .cd{gap:18px}.cd-n{font-size:24px}
  .hero-nm{letter-spacing:1px}
  .hero-btn{padding:14px 38px}
  .rsvp-if{height:620px}
  .exp-g{grid-template-columns:1fr}
}
@media(max-width:480px){
  .hero-ct{padding:100px 20px 60px}
  .sec-t{font-size:26px}
  .story-b p{font-size:15px}
  .tl-i{grid-template-columns:58px 20px 1fr}.tl::before{left:68px}
  .v-card{padding:24px}
  .rsvp-if{height:540px}
  .sec{padding:60px 20px}
  .sec-ln{margin:20px auto 36px}
}
`
