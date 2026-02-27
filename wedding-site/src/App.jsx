import { useState, useEffect, useRef, useCallback } from ‘react’

/* ─── HOTEL / VENUE GALLERY ─── */
const VENUE_PHOTOS = [
{ url: ‘/photos/lake-sunset.jpg’, en: ‘Sun Moon Lake at Sunset’, zh: ‘日月潭夕陽’, wide: true },
{ url: ‘/photos/ceremony-hall.jpg’, en: ‘Soaring Cloud Hall’, zh: ‘雲揚廳’ },
{ url: ‘/photos/hotel-aerial-mist.jpg’, en: ‘Misty Morning’, zh: ‘晨霧繚繞’ },
{ url: ‘/photos/lobby-fireplace.jpg’, en: ‘Hotel Lobby’, zh: ‘大廳’ },
{ url: ‘/photos/hotel-entrance-dusk.jpg’, en: ‘Twilight’, zh: ‘暮色’ },
{ url: ‘/photos/lake-misty.jpg’, en: ‘Morning on the Lake’, zh: ‘湖畔清晨’, wide: true },
{ url: ‘/photos/hotel-aerial-green.jpg’, en: ‘Aerial View’, zh: ‘鳥瞰全景’ },
{ url: ‘/photos/hallway-3f.jpg’, en: ‘Banquet Wing’, zh: ‘宴會走廊’ },
]

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

/* ─── CONTENT ─── */
const T = {
en: {
langLabel: ‘中文’,
nav: [‘Home’, ‘Our Story’, ‘Schedule’, ‘Venue’, ‘RSVP’, ‘FAQ’],
hero: { names: ‘Steven & Bonnie’, date: ‘December 19, 2026’, day: ‘Saturday’, venue: ‘Fleur de Chine Hotel · Sun Moon Lake, Taiwan’, tagline: ‘Together with our families, we joyfully invite you to celebrate’, cta: ‘RSVP Now’, fullNames: ‘Steven Hou (\u4FAF\u6210) & Bonnie Chien (\u7C21\u5B50\u82B8)’ },
noGift: { title: ‘A Note from Us’, body: “The greatest gift you can give us is your presence on our special day. We respectfully ask that you not bring red envelopes or monetary gifts \u2014 your love, your laughter, and your blessing are all we could ever wish for.” },
photos: { title: ‘Our Journey’, sub: ‘Moments from our story together’ },
gallery: { title: ‘The Venue’, sub: ‘Fleur de Chine · Sun Moon Lake’ },
story: {
title: ‘Our Story’, sub: ‘Two lives, two cultures, one love’,
p1: “What began as a connection across the Pacific grew into a love rooted in faith, family, and a shared vision for the future. Steven, from New Jersey, and Bonnie, from Taichung, Taiwan, found in each other a partner for life\u2019s greatest journey.”,
p2: “We were legally married in Taiwan and are overjoyed to celebrate our union with the people who matter most \u2014 at Sun Moon Lake, one of Taiwan\u2019s most beautiful places.”,
p3: “We believe marriage is a gift, and we are grateful for every person who has been part of our story. We look forward to celebrating with you.”
},
schedule: {
title: ‘Wedding Day’, sub: ‘Saturday, December 19, 2026’,
events: [
{ time: ‘10:00 AM’, name: ‘Wedding Ceremony’, venue: ‘Soaring Cloud Hall (\u96F2\u63DA\u5EF3)’, detail: ‘A celebration of love, faith, and family.’ },
{ time: ‘12:30 PM’, name: ‘Wedding Reception & Banquet’, venue: ‘Cosmos Cloud B Hall (\u96F2\u7FF0B\u5EF3)’, detail: ‘Chinese banquet, celebration, and fellowship.’ },
{ time: ‘3:00 PM’, name: ‘Farewell’, venue: ‘’, detail: ‘Send-off with gratitude and joy.’ }
]
},
venue: {
title: ‘Getting There’, sub: ‘Fleur de Chine Hotel · Sun Moon Lake’,
address: ‘No. 23, Zhongzheng Rd, Yuchi Township, Nantou County 555, Taiwan’,
domestic: { title: ‘From Within Taiwan’, steps: [‘Drive to Sun Moon Lake (~1.5 hrs from Taichung), or’, ‘Take Nantou Bus (\u5357\u6295\u5BA2\u904B) from Taichung HSR Station directly to Sun Moon Lake’, ‘Free parking at the hotel for all wedding guests’], note: ‘We may arrange a shuttle from Taichung HSR \u2014 please indicate on the RSVP if interested.’ },
overseas: { title: ‘From Overseas’, steps: [{ icon: ‘plane’, label: ‘Fly into Taoyuan International Airport (TPE)’ }, { icon: ‘train’, label: ‘Take HSR from Taoyuan Station \u2192 Taichung Station (40 min)’ }, { icon: ‘bus’, label: ‘Bus or car from Taichung HSR \u2192 Sun Moon Lake (1.5 hrs)’ }, { icon: ‘hotel’, label: ‘Check in at Fleur de Chine Hotel’ }], note: ‘We recommend arriving at least one day before the wedding to settle in and enjoy the area.’ }
},
rsvp: { title: ‘RSVP’, sub: ‘Please respond by November 19, 2026’, desc: “Let us know if you can make it! The form takes about 2 minutes and helps us plan seating, meals, and transportation.”, cta: ‘Open RSVP Form’ },
faq: {
title: ‘Frequently Asked Questions’,
items: [
{ q: ‘What should I wear?’, a: “Formal attire. December at Sun Moon Lake is cool \u2014 around 12\u201318\u00B0C (54\u201364\u00B0F) \u2014 so bring a warm coat or wrap.” },
{ q: ‘What about the weather?’, a: “Expect cool, crisp weather with possible morning mist. The ceremony and reception are both indoors, but you\u2019ll want warmth for any time outdoors.” },
{ q: ‘How do I find the ceremony and banquet halls?’, a: ‘Both halls are on the lobby level of the hotel. Enter through the main entrance and follow the hallway toward the banquet wing \u2014 there will be signage to guide you.’ },
{ q: “I\u2019m coming from overseas. How do I get there?”, a: ‘Fly into Taoyuan Airport (TPE), take the HSR to Taichung (40 min), then bus or car to Sun Moon Lake (1.5 hrs). We recommend arriving the day before.’ }
]
},
explore: {
title: “While You\u2019re Here”, sub: ‘Things to do around Sun Moon Lake’,
items: [
{ name: ‘Sun Moon Lake Cycling Path’, desc: “One of the world\u2019s most beautiful bike paths, circling the entire lake.” },
{ name: ‘Wenwu Temple’, desc: ‘Grand lakeside Taoist temple with stunning panoramic views, just 1km away.’ },
{ name: ‘Sun Moon Lake Ropeway’, desc: ‘Cable car offering aerial views of the lake and mountains.’ },
{ name: ‘Ita Thao Village’, desc: ‘Indigenous Thao tribal village \u2014 local cuisine, crafts, and cultural experiences.’ },
{ name: ‘Hotel Hot Springs’, desc: ‘Fleur de Chine has natural hot springs. Perfect for unwinding after the celebration.’ }
]
},
footer: ‘Steven & Bonnie’, footerDate: ‘December 19, 2026’, footerSub: ‘Sun Moon Lake, Taiwan’, footerNames: ‘Steven Hou (\u4FAF\u6210) & Bonnie Chien (\u7C21\u5B50\u82B8)’,
footerVerse: ‘\u201CTwo are better than one, because they have a good return for their labor.\u201D’, footerRef: ‘Ecclesiastes 4:9’
},
zh: {
langLabel: ‘EN’,
nav: [’\u9996\u9801’, ‘\u6211\u5011\u7684\u6545\u4E8B’, ‘\u5A5A\u79AE\u6D41\u7A0B’, ‘\u4EA4\u901A\u6307\u5357’, ‘\u51FA\u5E2D\u56DE\u8986’, ‘\u5E38\u898B\u554F\u984C’],
hero: { names: ‘\u4FAF\u6210 & \u5B50\u82B8’, date: ‘2026\u5E7412\u670819\u65E5’, day: ‘\u661F\u671F\u516D’, venue: ‘\u65E5\u6708\u6F6D \u00B7 \u96F2\u54C1\u6EAB\u6CC9\u9152\u5E97’, tagline: ‘\u6211\u5011\u8AA0\u647F\u5730\u9080\u8ACB\u60A8\uFF0C\u4E00\u540C\u898B\u8B49\u9019\u7F8E\u597D\u7684\u6642\u523B’, cta: ‘\u7ACB\u5373\u56DE\u8986’, fullNames: ‘Steven Hou (\u4FAF\u6210) & Bonnie Chien (\u7C21\u5B50\u82B8)’ },
noGift: { title: ‘\u6211\u5011\u7684\u5C0F\u5C0F\u5FC3\u610F’, body: ‘\u60A8\u7684\u5230\u4F86\uFF0C\u5C31\u662F\u7D66\u6211\u5011\u6700\u73CD\u8CB4\u7684\u7984\u7269\u3002\u6211\u5011\u8AA0\u5FC3\u5730\u8ACB\u6C42\u60A8\u4E0D\u8981\u5305\u7D05\u5305\u6216\u9001\u4EFB\u4F55\u79AE\u91D1\u2014\u2014\u60A8\u7684\u611B\u3001\u60A8\u7684\u7B11\u5BB9\u3001\u60A8\u7684\u795D\u798F\uFF0C\u5C31\u662F\u6211\u5011\u6700\u5927\u7684\u5E78\u798F\u3002’ },
photos: { title: ‘\u6211\u5011\u7684\u65C5\u7A0B’, sub: ‘\u4E00\u8DEF\u8D70\u4F86\u7684\u7CBE\u5F69\u7247\u6BB5’ },
gallery: { title: ‘\u5A5A\u79AE\u5834\u5730’, sub: ‘\u96F2\u54C1\u6EAB\u6CC9\u9152\u5E97 \u00B7 \u65E5\u6708\u6F6D’ },
story: {
title: ‘\u6211\u5011\u7684\u6545\u4E8B’, sub: ‘\u5169\u500B\u751F\u547D\u3001\u5169\u7A2E\u6587\u5316\u3001\u4E00\u4EFD\u611B’,
p1: ‘\u4E00\u6BB5\u8DE8\u8D8A\u592A\u5E73\u6D0B\u7684\u7DE3\u5206\uFF0C\u6210\u9577\u70BA\u4EE5\u4FE1\u4EF0\u3001\u5BB6\u5EAD\u548C\u5171\u540C\u9858\u666F\u70BA\u6839\u57FA\u7684\u611B\u60C5\u3002\u4FAF\u6210\u4F86\u81EA\u7F8E\u570B\u7D10\u6FA4\u897F\uFF0C\u5B50\u82B8\u4F86\u81EA\u53F0\u7063\u53F0\u4E2D\uFF0C\u5169\u4EBA\u5728\u5F7C\u6B64\u8EAB\u4E0A\u627E\u5230\u4E86\u4EBA\u751F\u65C5\u9014\u4E2D\u6700\u597D\u7684\u5925\u4F34\u3002’,
p2: ‘\u6211\u5011\u5DF2\u5728\u53F0\u7063\u5B8C\u6210\u7D50\u5A5A\u767B\u8A18\uFF0C\u73FE\u5728\u7121\u6BD4\u559C\u6085\u5730\u9080\u8ACB\u5C0D\u6211\u5011\u6700\u91CD\u8981\u7684\u4EBA\uFF0C\u4E00\u540C\u5728\u7F8E\u9E97\u7684\u65E5\u6708\u6F6D\u6176\u795D\u6211\u5011\u7684\u7D50\u5408\u3002’,
p3: ‘\u6211\u5011\u76F8\u4FE1\u5A5A\u59FB\u662F\u6069\u8CDC\uFF0C\u611F\u8B1D\u6BCF\u4E00\u4F4D\u5728\u6211\u5011\u751F\u547D\u4E2D\u7559\u4E0B\u8DB3\u8DE1\u7684\u4EBA\u3002\u671F\u5F85\u8207\u60A8\u4E00\u540C\u6B61\u6176\u3002’
},
schedule: {
title: ‘\u5A5A\u79AE\u6D41\u7A0B’, sub: ‘2026\u5E7412\u670819\u65E5\uFF08\u661F\u671F\u516D\uFF09’,
events: [
{ time: ‘\u4E0A\u5348 10:00’, name: ‘\u8B49\u5A5A\u5100\u5F0F’, venue: ‘\u96F2\u63DA\u5EF3’, detail: ‘\u4EE5\u611B\u3001\u4FE1\u4EF0\u8207\u5BB6\u5EAD\u70BA\u4E3B\u984C\u7684\u6176\u5178\u3002’ },
{ time: ‘\u4E2D\u5348 12:30’, name: ‘\u559C\u5BB4’, venue: ‘\u96F2\u7FF0B\u5EF3’, detail: ‘\u4E2D\u5F0F\u559C\u5BB4\u3001\u6B61\u6176\u8207\u5718\u5951\u3002’ },
{ time: ‘\u4E0B\u5348 3:00’, name: ‘\u79AE\u6210’, venue: ‘’, detail: ‘\u6B61\u9001\u8CD3\u5BA2\uFF0C\u611F\u6069\u8207\u559C\u6A02\u3002’ }
]
},
venue: {
title: ‘\u4EA4\u901A\u6307\u5357’, sub: ‘\u96F2\u54C1\u6EAB\u6CC9\u9152\u5E97 \u00B7 \u65E5\u6708\u6F6D’,
address: ‘\u5357\u6295\u7E23\u9B5A\u6C60\u9109\u65E5\u6708\u6F6D\u4E2D\u6B63\u8DEF23\u865F’,
domestic: { title: ‘\u53F0\u7063\u570B\u5167\u4EA4\u901A’, steps: [’\u81EA\u884C\u958B\u8ECA\u81F3\u65E5\u6708\u6F6D\uFF08\u5F9E\u53F0\u4E2D\u51FA\u767C\u7D041.5\u5C0F\u6642\uFF09\uFF0C\u6216’, ‘\u5F9E\u53F0\u4E2D\u9AD8\u9435\u7AD9\u642D\u4E58\u5357\u6295\u5BA2\u904B\u76F4\u9054\u65E5\u6708\u6F6D’, ‘\u9152\u5E97\u63D0\u4F9B\u5A5A\u79AE\u8CD3\u5BA2\u514D\u8CBB\u505C\u8ECA’], note: ‘\u6211\u5011\u53EF\u80FD\u5B89\u6392\u5F9E\u53F0\u4E2D\u9AD8\u9435\u7AD9\u51FA\u767C\u7684\u63A5\u99C1\u8ECA\u2014\u2014\u8ACB\u5728\u56DE\u8986\u8868\u55AE\u4E2D\u544A\u77E5\u662F\u5426\u9700\u8981\u3002’ },
overseas: { title: ‘\u6D77\u5916\u8CD3\u5BA2\u4EA4\u901A’, steps: [{ icon: ‘plane’, label: ‘\u98DB\u62B5\u6843\u5712\u570B\u969B\u6A5F\u5834\uFF08TPE\uFF09’ }, { icon: ‘train’, label: ‘\u642D\u4E58\u9AD8\u9435\uFF1A\u6843\u5712\u7AD9 \u2192 \u53F0\u4E2D\u7AD9\uFF08\u7D0440\u5206\u9418\uFF09’ }, { icon: ‘bus’, label: ‘\u5F9E\u53F0\u4E2D\u9AD8\u9435\u7AD9\u642D\u5BA2\u904B\u6216\u5305\u8ECA\u81F3\u65E5\u6708\u6F6D\uFF08\u7D041.5\u5C0F\u6642\uFF09’ }, { icon: ‘hotel’, label: ‘\u5165\u4F4F\u96F2\u54C1\u6EAB\u6CC9\u9152\u5E97’ }], note: ‘\u5EFA\u8B70\u65BC\u5A5A\u79AE\u524D\u4E00\u5929\u62B5\u9054\uFF0C\u53EF\u9806\u4FBF\u4EAB\u53D7\u65E5\u6708\u6F6D\u7684\u7F8E\u666F\u3002’ }
},
rsvp: { title: ‘\u51FA\u5E2D\u56DE\u8986’, sub: ‘\u8ACB\u65BC2026\u5E7411\u670819\u65E5\u524D\u56DE\u8986’, desc: ‘\u8ACB\u544A\u8A34\u6211\u5011\u60A8\u662F\u5426\u80FD\u51FA\u5E2D\uFF01\u586B\u5BEB\u56DE\u8986\u8868\u55AE\u50C5\u9700\u7D042\u5206\u9418\uFF0C\u6709\u52A9\u65BC\u6211\u5011\u5B89\u6392\u5EA7\u4F4D\u3001\u9910\u9EDE\u53CA\u4EA4\u901A\u3002’, cta: ‘\u958B\u555F\u56DE\u8986\u8868\u55AE’ },
faq: {
title: ‘\u5E38\u898B\u554F\u984C’,
items: [
{ q: ‘\u7A7F\u8457\u8981\u6C42\uFF1F’, a: ‘\u8ACB\u8457\u6B63\u5F0F\u670D\u88DD\u3002\u5341\u4E8C\u6708\u7684\u65E5\u6708\u6F6D\u6C23\u6EAB\u8F03\u6DBC\uFF08\u7D0412\u201318\u00B0C\uFF09\uFF0C\u8ACB\u651C\u5E36\u4FDD\u6696\u5916\u5957\u3002’ },
{ q: ‘\u5929\u6C23\u5982\u4F55\uFF1F’, a: ‘\u9810\u8A08\u6DBC\u723D\u6E05\u65B0\uFF0C\u65E9\u6668\u53EF\u80FD\u6709\u8584\u9727\u3002\u8B49\u5A5A\u5100\u5F0F\u53CA\u559C\u5BB4\u7686\u5728\u5BA4\u5167\uFF0C\u4F46\u6236\u5916\u6D3B\u52D5\u9700\u6CE8\u610F\u4FDD\u6696\u3002’ },
{ q: ‘\u5982\u4F55\u627E\u5230\u5100\u5F0F\u53CA\u5BB4\u6703\u5EF3\uFF1F’, a: ‘\u5169\u500B\u5EF3\u7686\u4F4D\u65BC\u9152\u5E97\u5927\u5EF3\u6A13\u5C64\u3002\u5F9E\u5927\u9580\u9032\u5165\u5F8C\uFF0C\u6CBF\u8D70\u5ECA\u524D\u5F80\u5BB4\u6703\u5340\uFF0C\u73FE\u5834\u6703\u6709\u6307\u793A\u6A19\u8A8C\u5F15\u5C0E\u60A8\u3002’ },
{ q: ‘\u6211\u5F9E\u6D77\u5916\u524D\u4F86\uFF0C\u600E\u9EBC\u5230\u9054\uFF1F’, a: ‘\u98DB\u62B5\u6843\u5712\u6A5F\u5834\uFF08TPE\uFF09\uFF0C\u642D\u9AD8\u9435\u81F3\u53F0\u4E2D\uFF0840\u5206\u9418\uFF09\uFF0C\u518D\u8F49\u4E58\u5BA2\u904B\u6216\u5305\u8ECA\u81F3\u65E5\u6708\u6F6D\uFF081.5\u5C0F\u6642\uFF09\u3002\u5EFA\u8B70\u5A5A\u79AE\u524D\u4E00\u5929\u62B5\u9054\u3002’ }
]
},
explore: {
title: “While You\u2019re Here”, sub: ‘Things to do around Sun Moon Lake’,
items: [
{ name: ‘Sun Moon Lake Cycling Path’, desc: “One of the world\u2019s most beautiful bike paths, circling the entire lake.” },
{ name: ‘Wenwu Temple’, desc: ‘Grand lakeside Taoist temple with stunning panoramic views, just 1km away.’ },
{ name: ‘Sun Moon Lake Ropeway’, desc: ‘Cable car offering aerial views of the lake and mountains.’ },
{ name: ‘Ita Thao Village’, desc: ‘Indigenous Thao tribal village \u2014 local cuisine, crafts, and cultural experiences.’ },
{ name: ‘Hotel Hot Springs’, desc: ‘Fleur de Chine has natural hot springs. Perfect for unwinding after the celebration.’ }
]
},
footer: ‘Steven & Bonnie’, footerDate: ‘December 19, 2026’, footerSub: ‘Sun Moon Lake, Taiwan’, footerNames: ‘Steven Hou (\u4FAF\u6210) & Bonnie Chien (\u7C21\u5B50\u82B8)’,
footerVerse: ‘\u201CTwo are better than one, because they have a good return for their labor.\u201D’, footerRef: ‘Ecclesiastes 4:9’
}
}

const NOTION_RSVP = ‘https://www.notion.so/tgre/3121cfcfd40f80b3a9f6d8e0251df083?pvs=106’

/* ─── HOOKS ─── */
function useReveal(th = 0.12) {
const ref = useRef(null); const [v, setV] = useState(false)
useEffect(() => { const el = ref.current; if (!el) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect() } }, { threshold: th }); o.observe(el); return () => o.disconnect() }, [])
return [ref, v]
}

function useParallax() {
const [y, setY] = useState(0)
useEffect(() => { const fn = () => setY(window.scrollY); window.addEventListener(‘scroll’, fn, { passive: true }); return () => window.removeEventListener(‘scroll’, fn) }, [])
return y
}

/* ─── FLOATING PETALS ─── */
function Petals() {
return (
<div className="petals" aria-hidden="true">
{Array.from({ length: 12 }).map((_, i) => (
<div key={i} className=“petal” style={{
left: `${Math.random() * 100}%`,
animationDelay: `${Math.random() * 8}s`,
animationDuration: `${10 + Math.random() * 8}s`,
opacity: 0.15 + Math.random() * 0.15,
fontSize: `${10 + Math.random() * 14}px`
}}>✿</div>
))}
</div>
)
}

/* ─── COUNTDOWN ─── */
function Countdown({ lang }) {
const [t, setT] = useState({ d:0,h:0,m:0,s:0 })
const [flip, setFlip] = useState(false)
useEffect(() => { const tgt = new Date(‘2026-12-19T10:00:00+08:00’); const tick = () => { const d = tgt-new Date(); if(d<=0)return; setT({d:Math.floor(d/864e5),h:Math.floor(d%864e5/36e5),m:Math.floor(d%36e5/6e4),s:Math.floor(d%6e4/1e3)}); setFlip(f=>!f) }; tick(); const id=setInterval(tick,1e3); return()=>clearInterval(id) }, [])
const lb = lang===‘en’?[‘Days’,‘Hours’,‘Min’,‘Sec’]:[’\u5929’,’\u6642’,’\u5206’,’\u79D2’]
return <div className="cd">{[t.d,t.h,t.m,t.s].map((v,i)=><div key={i} className="cd-u"><span className={`cd-n ${i===3?'cd-tick':''}`} data-flip={flip}>{String(v).padStart(2,‘0’)}</span><span className="cd-l">{lb[i]}</span></div>)}</div>
}

/* ─── SECTION WRAPPER ─── */
function Sec({children,className=’’,id,dark,anim=‘up’}){
const[ref,vis]=useReveal();
return <section id={id} ref={ref} className={`sec ${dark?'sec-dk':''} sec-${anim} ${vis?'sec-v':''} ${className}`}>{children}</section>
}

/* ─── STAGGER CHILDREN ─── */
function Stagger({ children, className = ‘’, delay = 0.08 }) {
const [ref, vis] = useReveal(0.05)
return (
<div ref={ref} className={className}>
{Array.isArray(children) ? children.map((child, i) => (
<div key={i} className={`stg-i ${vis ? 'stg-v' : ''}`} style={{ transitionDelay: `${i * delay}s` }}>
{child}
</div>
)) : children}
</div>
)
}

/* ─── MAGNETIC BUTTON ─── */
function MagBtn({ children, className = ‘’, …props }) {
const ref = useRef(null)
const handleMove = useCallback((e) => {
const btn = ref.current; if (!btn) return
const r = btn.getBoundingClientRect()
const x = (e.clientX - r.left - r.width / 2) * 0.15
const y = (e.clientY - r.top - r.height / 2) * 0.15
btn.style.transform = `translate(${x}px, ${y}px)`
}, [])
const handleLeave = useCallback(() => { if (ref.current) ref.current.style.transform = ‘’ }, [])
return <button ref={ref} className={`mag-btn ${className}`} onMouseMove={handleMove} onMouseLeave={handleLeave} {…props}>{children}</button>
}

/* ─── TEXT REVEAL ─── */
function TextReveal({ text, className = ‘’, tag: Tag = ‘h2’ }) {
const [ref, vis] = useReveal(0.2)
return <Tag ref={ref} className={`txt-rv ${vis ? 'txt-rv-v' : ''} ${className}`}><span className="txt-rv-in">{text}</span></Tag>
}

/* ─── MAIN APP ─── */
export default function App() {
const [lang, setLang] = useState(‘zh’)
const [menu, setMenu] = useState(false)
const [scrolled, setScrolled] = useState(false)
const [openFaq, setOpenFaq] = useState(null)
const [heroLoaded, setHeroLoaded] = useState(false)
const scrollY = useParallax()
const l = T[lang]

useEffect(() => { const fn=()=>setScrolled(window.scrollY>80); window.addEventListener(‘scroll’,fn,{passive:true}); return()=>window.removeEventListener(‘scroll’,fn) }, [])
useEffect(() => { setTimeout(() => setHeroLoaded(true), 200) }, [])
const ids = [‘home’,‘story’,‘schedule’,‘venue’,‘rsvp’,‘faq’]
const go = i => { document.getElementById(ids[i])?.scrollIntoView({behavior:‘smooth’}); setMenu(false) }

return (
<div className="root notranslate" translate="no">
<style>{CSS}</style>

```
  {/* NAV */}
  <nav className={`nav ${scrolled?'nav-s':''}`}>
    <div className="nav-in">
      <span className="nav-logo" onClick={()=>go(0)}>S & B</span>
      <button className="nav-tog" onClick={()=>setMenu(!menu)} aria-label="Menu"><span className={`ham ${menu?'ham-x':''}`}/></button>
      <div className={`nav-lk ${menu?'nav-lk-open':''}`}>
        {l.nav.map((n,i)=><button key={i} className="nav-a" onClick={()=>go(i)}>{n}</button>)}
        <button className="lang-b" onClick={()=>{setLang(lang==='en'?'zh':'en');setMenu(false)}}>{l.langLabel}</button>
      </div>
    </div>
  </nav>

  {/* HERO — watercolor with parallax & staggered entrance */}
  <header id="home" className="hero">
    <div className="hero-bg" style={{backgroundImage:'url(/photos/lake-sunset.jpg)', transform: `scale(1.08) translateY(${scrollY * 0.25}px)`}} />
    <div className="hero-texture" />
    <Petals />
    <div className="hero-ov" />
    <div className={`hero-ct ${heroLoaded ? 'hero-in' : ''}`}>
      <p className="hero-tag h-d1">{l.hero.tagline}</p>
      <h1 className="hero-nm h-d2">{l.hero.names}</h1>
      <p className="hero-fn h-d3">{l.hero.fullNames}</p>
      <div className="hero-orn h-d4"><span className="orn-spin">&#10047;</span></div>
      <p className="hero-dt h-d5">{l.hero.date}</p>
      <p className="hero-day h-d6">{l.hero.day}</p>
      <p className="hero-vn h-d7">{l.hero.venue}</p>
      <div className="h-d8"><Countdown lang={lang} /></div>
      <div className="h-d9"><MagBtn className="hero-btn" onClick={()=>go(4)}>{l.hero.cta}</MagBtn></div>
    </div>
  </header>

  {/* NO RED ENVELOPES — elegant entrance */}
  <Sec className="gift-sec" anim="fade">
    <div className="gift">
      <div className="gift-in">
        <div className="gift-icon">&#10084;</div>
        <h3 className="gift-t">{l.noGift.title}</h3>
        <p className="gift-b">{l.noGift.body}</p>
      </div>
    </div>
  </Sec>

  {/* OUR STORY — paragraphs stagger in */}
  <Sec id="story" anim="up">
    <TextReveal text={l.story.title} className="sec-t" />
    <p className="sec-s">{l.story.sub}</p>
    <div className="sec-ln" />
    <Stagger className="story-b" delay={0.2}>
      <p>{l.story.p1}</p>
      <p>{l.story.p2}</p>
      <p>{l.story.p3}</p>
    </Stagger>
  </Sec>

  {/* OUR PHOTOS — placeholder */}
  <Sec className="photos-sec" anim="scale">
    <TextReveal text={l.photos.title} className="sec-t" />
    <p className="sec-s">{l.photos.sub}</p>
    <div className="sec-ln" />
    <div className="photos-placeholder">
      <div className="photos-icon">&#128247;</div>
      <p className="photos-msg">{lang === 'zh' ? '即將上傳我們的合照' : 'Our photos coming soon'}</p>
    </div>
  </Sec>

  {/* SCHEDULE — timeline items stagger */}
  <Sec id="schedule" className="sched" anim="up">
    <TextReveal text={l.schedule.title} className="sec-t" />
    <p className="sec-s sec-s-big">{l.schedule.sub}</p>
    <div className="sec-ln" />
    <Stagger className="tl" delay={0.15}>
      {l.schedule.events.map((ev,i)=>(
        <div key={i} className="tl-i">
          <div className="tl-tm">{ev.time}</div>
          <div className="tl-dot"><div className="tl-dot-in"/></div>
          <div className="tl-ct">
            <h4 className="tl-nm">{ev.name}</h4>
            {ev.venue && <p className="tl-vn">{ev.venue}</p>}
            <p className="tl-dt">{ev.detail}</p>
          </div>
        </div>
      ))}
    </Stagger>
  </Sec>

  {/* VENUE */}
  <Sec id="venue" anim="up">
    <TextReveal text={l.venue.title} className="sec-t" />
    <p className="sec-s">{l.venue.sub}</p>
    <div className="sec-ln" />
    <p className="v-addr">{l.venue.address}</p>
    <Stagger className="v-grid" delay={0.2}>
      <div className="v-card">
        <h4 className="v-card-t">{l.venue.domestic.title}</h4>
        <ul className="v-steps">{l.venue.domestic.steps.map((s,i)=><li key={i}>{s}</li>)}</ul>
        <p className="v-note">{l.venue.domestic.note}</p>
      </div>
      <div className="v-card">
        <h4 className="v-card-t">{l.venue.overseas.title}</h4>
        <Stagger className="v-os" delay={0.12}>
          {l.venue.overseas.steps.map((s,i)=><div key={i} className="os-s"><Icon type={s.icon}/><span className="os-l">{s.label}</span></div>)}
        </Stagger>
        <p className="v-note">{l.venue.overseas.note}</p>
      </div>
    </Stagger>
    <iframe className="v-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.8!2d120.912!3d23.868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468d66bcbaf5f5f%3A0xb297928ac211e576!2sFleur%20de%20Chine%20Hotel%20Sun%20Moon%20Lake!5e0!3m2!1sen!2stw!4v1700000000000" allowFullScreen loading="lazy" title="Map" />
  </Sec>

  {/* VENUE GALLERY — staggered grid reveal */}
  <Sec className="vgal-sec" dark anim="fade">
    <TextReveal text={l.gallery.title} className="sec-t" />
    <p className="sec-s">{l.gallery.sub}</p>
    <div className="sec-ln" />
    <Stagger className="gal-g" delay={0.08}>
      {VENUE_PHOTOS.map((p,i)=>(
        <div key={i} className={`gal-i ${p.wide?'gal-w':''}`}>
          <div className="gal-img" style={{backgroundImage:`url(${p.url})`}} />
          <div className="gal-shine" />
          <span className="gal-lb">{lang==='zh'?p.zh:p.en}</span>
        </div>
      ))}
    </Stagger>
  </Sec>

  {/* RSVP — dramatic entrance */}
  <Sec id="rsvp" className="rsvp-sec" anim="scale">
    <TextReveal text={l.rsvp.title} className="sec-t" />
    <p className="sec-s sec-s-big">{l.rsvp.sub}</p>
    <div className="sec-ln" />
    <p className="rsvp-d">{l.rsvp.desc}</p>
    <a href={NOTION_RSVP} target="_blank" rel="noopener noreferrer" className="rsvp-btn"><span className="rsvp-btn-text">{l.rsvp.cta}</span><span className="rsvp-btn-shine" /></a>
  </Sec>

  {/* FAQ — smooth accordion */}
  <Sec id="faq" className="faq-sec" anim="up">
    <TextReveal text={l.faq.title} className="sec-t" />
    <div className="sec-ln" />
    <Stagger className="faq-ls" delay={0.1}>
      {l.faq.items.map((item,i)=>(
        <div key={i} className={`faq-i ${openFaq===i?'faq-open':''}`} onClick={()=>setOpenFaq(openFaq===i?null:i)}>
          <div className="faq-q"><span>{item.q}</span><span className={`faq-ic ${openFaq===i?'faq-ic-open':''}`}>+</span></div>
          <div className="faq-a"><p>{item.a}</p></div>
        </div>
      ))}
    </Stagger>
  </Sec>

  {/* EXPLORE — card hover effects */}
  <Sec className="exp-sec" anim="up">
    <TextReveal text={l.explore.title} className="sec-t" />
    <p className="sec-s">{l.explore.sub}</p>
    <div className="sec-ln" />
    <Stagger className="exp-g" delay={0.1}>
      {l.explore.items.map((item,i)=>(<div key={i} className="exp-c"><div className="exp-num">{String(i+1).padStart(2,'0')}</div><h4 className="exp-n">{item.name}</h4><p className="exp-d">{item.desc}</p></div>))}
    </Stagger>
  </Sec>

  {/* FOOTER */}
  <footer className="ft">
    <Petals />
    <div className="ft-nm">{l.footer}</div>
    <div className="ft-fn">{l.footerNames}</div>
    <div className="ft-dt">{l.footerDate}</div>
    <div className="ft-sub">{l.footerSub}</div>
    <div className="ft-v">{l.footerVerse}</div>
    <div className="ft-r">{l.footerRef}</div>
  </footer>
</div>
```

)
}

const CSS = `
@import url(‘https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Noto+Serif+TC:wght@300;400;500;600&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap’);

:root{
–cream:#FAF7F2;–warm:#F0EAE0;–gold:#B8956A;–gold-l:#D4B98A;
–dk:#1C1915;–txt:#2E2820;–mid:#5C5045;–lt:#8E7F6E;
–serif:‘Cormorant Garamond’,‘Noto Serif TC’,Georgia,serif;
–sans:‘DM Sans’,‘Noto Serif TC’,-apple-system,sans-serif;
–ease-out-expo:cubic-bezier(.16,1,.3,1);
–ease-spring:cubic-bezier(.34,1.56,.64,1);
}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
::selection{background:rgba(184,149,106,.18)}
html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
.root{font-family:var(–serif);color:var(–txt);background:var(–cream);min-height:100vh;overflow-x:hidden}

/* ─── STAGGER ANIMATION ─── */
.stg-i{opacity:0;transform:translateY(20px);transition:opacity .7s var(–ease-out-expo),transform .7s var(–ease-out-expo)}
.stg-v{opacity:1;transform:none}

/* ─── TEXT REVEAL ─── */
.txt-rv{overflow:hidden}.txt-rv-in{display:block;transform:translateY(105%);transition:transform .9s var(–ease-out-expo)}
.txt-rv-v .txt-rv-in{transform:none}

/* ─── MAGNETIC BUTTON ─── */
.mag-btn{transition:transform .3s var(–ease-out-expo)}

/* ─── FLOATING PETALS ─── */
.petals{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:2}
.petal{position:absolute;top:-30px;color:var(–gold-l);animation:petalFall linear infinite;font-size:14px}
@keyframes petalFall{
0%{transform:translateY(-30px) rotate(0deg) translateX(0);opacity:0}
10%{opacity:1}
90%{opacity:1}
100%{transform:translateY(calc(100vh + 30px)) rotate(720deg) translateX(80px);opacity:0}
}

/* ─── NAV ─── */
.nav{position:fixed;top:0;left:0;right:0;z-index:1000;transition:all .5s var(–ease-out-expo)}
.nav-s{background:rgba(250,247,242,.96);backdrop-filter:blur(16px);box-shadow:0 1px 0 rgba(184,149,106,.1)}
.nav-in{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:18px 36px}
.nav-logo{font-family:var(–serif);font-size:18px;letter-spacing:3px;color:var(–gold);font-weight:500;cursor:pointer;font-style:italic;transition:opacity .3s}
.nav-logo:hover{opacity:.7}
.nav:not(.nav-s) .nav-logo{color:rgba(255,255,255,.85)}
.nav-lk{display:flex;gap:28px;align-items:center}
.nav-a{font-family:var(–sans);font-size:13px;letter-spacing:1.5px;text-transform:uppercase;background:none;border:none;cursor:pointer;font-weight:400;transition:color .3s,transform .3s;position:relative}
.nav-s .nav-a{color:var(–mid)}.nav:not(.nav-s) .nav-a{color:rgba(255,255,255,.75)}
.nav-a:hover{color:var(–gold);transform:translateY(-1px)}
.nav-a::after{content:’’;position:absolute;bottom:-4px;left:50%;width:0;height:1px;background:var(–gold);transition:all .3s var(–ease-out-expo);transform:translateX(-50%)}
.nav-a:hover::after{width:100%}
.lang-b{font-family:var(–sans);font-size:12px;letter-spacing:2px;padding:8px 20px;border:1px solid var(–gold);background:transparent;color:var(–gold);cursor:pointer;transition:all .4s var(–ease-out-expo)}
.lang-b:hover{background:var(–gold);color:#fff;transform:scale(1.05)}
.nav-tog{display:none;background:none;border:none;cursor:pointer;width:32px;height:32px;position:relative;z-index:1001}
.ham,.ham::before,.ham::after{display:block;width:22px;height:1.5px;position:absolute;transition:all .4s var(–ease-spring)}
.ham{top:50%;left:50%;transform:translate(-50%,-50%);background:var(–mid)}
.nav:not(.nav-s) .ham{background:rgba(255,255,255,.8)}
.ham::before{content:’’;top:-7px;left:0;background:inherit}.ham::after{content:’’;top:7px;left:0;background:inherit}
.ham-x{background:transparent!important}.ham-x::before{top:0;transform:rotate(45deg);background:var(–mid)!important}.ham-x::after{top:0;transform:rotate(-45deg);background:var(–mid)!important}

/* ─── HERO — watercolor + parallax ─── */
.hero{position:relative;min-height:100vh;min-height:100dvh;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden}
.hero-bg{position:absolute;inset:-80px;background-size:cover;background-position:center 35%;filter:saturate(1.5) contrast(0.82) brightness(1.08) blur(1.2px);will-change:transform;transition:filter 1s}
.hero-texture{position:absolute;inset:0;background:repeating-conic-gradient(rgba(255,255,255,.012) 0% 25%,transparent 0% 50%) 0 0/60px 60px;mix-blend-mode:overlay;opacity:.6}
.hero-ov{position:absolute;inset:0;background:linear-gradient(180deg,rgba(250,247,242,.12) 0%,rgba(28,25,21,.12) 30%,rgba(28,25,21,.55) 100%)}

/* Hero staggered entrance */
.hero-ct{position:relative;z-index:3;color:#fff;padding:100px 32px 80px}
.hero-ct>*{opacity:0;transform:translateY(30px);transition:opacity .8s var(–ease-out-expo),transform .8s var(–ease-out-expo)}
.hero-in .h-d1{opacity:1;transform:none;transition-delay:.3s}
.hero-in .h-d2{opacity:1;transform:none;transition-delay:.5s}
.hero-in .h-d3{opacity:1;transform:none;transition-delay:.65s}
.hero-in .h-d4{opacity:1;transform:none;transition-delay:.8s}
.hero-in .h-d5{opacity:1;transform:none;transition-delay:.95s}
.hero-in .h-d6{opacity:1;transform:none;transition-delay:1.05s}
.hero-in .h-d7{opacity:1;transform:none;transition-delay:1.15s}
.hero-in .h-d8{opacity:1;transform:none;transition-delay:1.3s}
.hero-in .h-d9{opacity:1;transform:none;transition-delay:1.5s}

.hero-tag{font-size:18px;color:rgba(255,255,255,.7);margin-bottom:16px;font-weight:300;font-style:italic;line-height:1.6;letter-spacing:.5px}
.hero-nm{font-size:clamp(36px,6vw,58px);font-weight:300;letter-spacing:3px;line-height:1.15;font-style:italic}
.hero-fn{font-family:var(–sans);font-size:15px;letter-spacing:2px;color:rgba(255,255,255,.5);margin-top:10px;font-weight:300}
.hero-orn{font-size:20px;color:var(–gold-l);margin:20px auto;opacity:.7;letter-spacing:8px}
.orn-spin{display:inline-block;animation:ornSpin 12s linear infinite}
@keyframes ornSpin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
.hero-dt{font-family:var(–serif);font-size:clamp(28px,5vw,44px);letter-spacing:1px;color:#fff;font-weight:300}
.hero-day{font-family:var(–sans);font-size:18px;letter-spacing:3px;color:rgba(255,255,255,.65);margin-top:6px;font-weight:300}
.hero-vn{font-family:var(–sans);font-size:16px;letter-spacing:1.5px;color:rgba(255,255,255,.5);margin-top:14px;font-weight:300}

/* Countdown with tick */
.cd{display:flex;gap:28px;justify-content:center;margin-top:36px}
.cd-u{text-align:center;min-width:52px}
.cd-n{display:block;font-family:var(–sans);font-size:32px;font-weight:300;color:#fff;transition:transform .3s var(–ease-spring)}
.cd-tick[data-flip=“true”]{animation:cdTick .3s var(–ease-spring)}
@keyframes cdTick{0%{transform:scale(1)}50%{transform:scale(1.15)}100%{transform:scale(1)}}
.cd-l{font-family:var(–sans);font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.4);margin-top:4px;display:block}
.hero-btn{margin-top:40px;padding:16px 52px;font-family:var(–sans);font-size:14px;letter-spacing:2.5px;text-transform:uppercase;border:1px solid rgba(255,255,255,.35);background:transparent;color:#fff;cursor:pointer;transition:all .4s var(–ease-out-expo);position:relative;overflow:hidden}
.hero-btn::before{content:’’;position:absolute;inset:0;background:rgba(255,255,255,.08);transform:translateX(-100%);transition:transform .5s var(–ease-out-expo)}
.hero-btn:hover::before{transform:none}
.hero-btn:hover{border-color:rgba(255,255,255,.6)}

/* ─── GIFT — elegant fade-in ─── */
.gift-sec{padding:0!important}.gift-sec .sec-ln{display:none}
.gift{background:var(–dk);color:rgba(212,201,184,.85);text-align:center;padding:80px 36px}
.gift-in{max-width:620px;margin:0 auto}
.gift-icon{font-size:28px;color:var(–gold-l);margin-bottom:20px;opacity:.6;animation:heartbeat 2s ease-in-out infinite}
@keyframes heartbeat{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}
.gift-t{font-size:26px;font-weight:400;color:var(–gold);margin-bottom:20px;font-style:italic}
.gift-b{font-size:17px;line-height:2.1;font-weight:300;color:rgba(184,173,158,.8)}

/* ─── SECTIONS ─── */
.sec{padding:100px 40px;overflow:hidden}
.sec-up{opacity:0;transform:translateY(40px);transition:opacity .9s var(–ease-out-expo),transform .9s var(–ease-out-expo)}
.sec-fade{opacity:0;transition:opacity 1.2s var(–ease-out-expo)}
.sec-scale{opacity:0;transform:scale(.96);transition:opacity .9s var(–ease-out-expo),transform .9s var(–ease-out-expo)}
.sec-v.sec-up,.sec-v.sec-fade,.sec-v.sec-scale{opacity:1;transform:none}
.sec-dk{background:var(–dk);color:rgba(250,247,242,.9)}
.sec-t{font-size:clamp(30px,4.5vw,42px);font-weight:300;letter-spacing:1px;text-align:center;margin-bottom:12px;font-style:italic}
.sec-dk .sec-t{color:var(–cream)}
.sec-s{font-family:var(–sans);font-size:14px;letter-spacing:2px;text-transform:uppercase;text-align:center;color:var(–lt);font-weight:300}
.sec-s-big{font-size:17px;letter-spacing:1.5px;text-transform:none;color:var(–mid);font-weight:400}
.sec-dk .sec-s{color:rgba(184,149,106,.6)}
.sec-ln{width:40px;height:1px;background:var(–gold);margin:28px auto 52px;opacity:.5;transition:width .8s var(–ease-out-expo) .3s}
.sec-v .sec-ln{width:60px}

/* ─── PHOTOS PLACEHOLDER ─── */
.photos-sec{background:var(–warm);text-align:center}
.photos-placeholder{max-width:800px;margin:0 auto;padding:80px 40px;border:2px dashed rgba(184,149,106,.25);border-radius:12px;background:rgba(255,255,255,.35);transition:border-color .4s}
.photos-placeholder:hover{border-color:rgba(184,149,106,.5)}
.photos-icon{font-size:36px;margin-bottom:16px;opacity:.4;animation:float 3s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
.photos-msg{font-size:20px;color:var(–lt);font-style:italic;font-weight:300}

/* ─── STORY ─── */
.story-b{max-width:680px;margin:0 auto;text-align:center}
.story-b p{font-size:18px;line-height:2.1;color:var(–mid);font-weight:300;margin-bottom:28px}

/* ─── SCHEDULE ─── */
.sched{background:var(–warm)}
.tl{max-width:720px;margin:0 auto;position:relative}
.tl::before{content:’’;position:absolute;left:118px;top:12px;bottom:12px;width:1px;background:rgba(184,149,106,.22)}
.tl-i{display:grid;grid-template-columns:100px 32px 1fr;padding:28px 0;align-items:start}
.tl-tm{font-family:var(–sans);font-size:15px;letter-spacing:1px;color:var(–gold);text-align:right;padding-top:3px;font-weight:500}
.tl-dot{display:flex;justify-content:center;padding-top:7px}
.tl-dot-in{width:10px;height:10px;border-radius:50%;border:2px solid var(–gold);background:var(–warm);position:relative;z-index:1;transition:transform .4s var(–ease-spring),background .4s}
.tl-i:hover .tl-dot-in{transform:scale(1.4);background:var(–gold)}
.tl-nm{font-size:21px;font-weight:400;color:var(–txt);margin-bottom:6px;transition:color .3s}
.tl-i:hover .tl-nm{color:var(–gold)}
.tl-vn{font-size:15px;color:var(–gold);font-style:italic;margin-bottom:5px}
.tl-dt{font-size:16px;color:var(–mid);font-weight:300;line-height:1.7}

/* ─── VENUE ─── */
.v-addr{text-align:center;font-family:var(–sans);font-size:16px;color:var(–lt);margin-bottom:44px;font-weight:300}
.v-grid{max-width:840px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:28px}
.v-card{padding:36px;background:var(–warm);border-radius:4px;transition:transform .4s var(–ease-out-expo),box-shadow .4s}
.v-card:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,.06)}
.v-card-t{font-family:var(–sans);font-size:13px;letter-spacing:2px;text-transform:uppercase;color:var(–gold);margin-bottom:22px;font-weight:500}
.v-steps{list-style:none;padding:0}
.v-steps li{font-size:16px;color:var(–mid);font-weight:300;line-height:1.85;padding-left:18px;position:relative;margin-bottom:8px}
.v-steps li::before{content:’\00B7’;position:absolute;left:0;color:var(–gold);font-weight:700;font-size:20px;line-height:1.55}
.v-note{font-size:15px;color:var(–lt);font-style:italic;margin-top:18px;line-height:1.75}
.v-os{display:flex;flex-direction:column;gap:6px}
.os-s{display:flex;align-items:center;gap:16px;padding:10px 0;transition:transform .3s var(–ease-out-expo)}
.os-s:hover{transform:translateX(6px)}
.os-icon{display:flex;align-items:center;justify-content:center;width:38px;height:38px;flex-shrink:0;color:var(–gold);transition:transform .4s var(–ease-spring)}
.os-s:hover .os-icon{transform:scale(1.15)}
.os-icon svg{width:22px;height:22px}
.os-l{font-size:16px;color:var(–mid);font-weight:300;line-height:1.6}
.v-map{width:100%;max-width:840px;height:340px;border:none;margin:44px auto 0;display:block;border-radius:4px;opacity:0;animation:mapIn .8s var(–ease-out-expo) .5s forwards}
@keyframes mapIn{to{opacity:1}}

/* ─── VENUE GALLERY ─── */
.vgal-sec{padding-bottom:0}
.gal-g{max-width:1060px;margin:0 auto;display:grid;grid-template-columns:repeat(2,1fr);gap:5px}
.gal-i{position:relative;overflow:hidden;aspect-ratio:4/3;cursor:default}
.gal-w{grid-column:span 2;aspect-ratio:21/9}
.gal-img{position:absolute;inset:0;background-size:cover;background-position:center;transition:transform .8s var(–ease-out-expo),filter .8s}
.gal-i:hover .gal-img{transform:scale(1.06);filter:brightness(1.05)}
.gal-shine{position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.15) 0%,transparent 50%);opacity:0;transition:opacity .6s}
.gal-i:hover .gal-shine{opacity:1}
.gal-lb{position:absolute;bottom:16px;left:20px;font-family:var(–sans);font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.7);text-shadow:0 1px 8px rgba(0,0,0,.5);z-index:1;transform:translateY(6px);opacity:0;transition:all .5s var(–ease-out-expo)}
.gal-i:hover .gal-lb{transform:none;opacity:1}

/* ─── RSVP ─── */
.rsvp-sec{background:var(–dk);text-align:center}
.rsvp-sec .sec-t{color:var(–cream)}
.rsvp-sec .sec-s{color:rgba(184,149,106,.6)}
.rsvp-d{text-align:center;max-width:560px;margin:0 auto 44px;font-size:17px;line-height:2;font-weight:300;color:rgba(184,173,158,.75)}
.rsvp-btn{display:inline-block;padding:22px 72px;font-family:var(–sans);font-size:16px;letter-spacing:3px;text-transform:uppercase;text-decoration:none;border:2px solid var(–gold);background:var(–gold);color:#fff;cursor:pointer;transition:all .5s var(–ease-out-expo);position:relative;overflow:hidden}
.rsvp-btn-text{position:relative;z-index:1}
.rsvp-btn-shine{position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);transition:left .6s var(–ease-out-expo)}
.rsvp-btn:hover .rsvp-btn-shine{left:100%}
.rsvp-btn:hover{background:transparent;color:var(–gold-l);transform:scale(1.02)}

/* ─── FAQ ─── */
.faq-sec{background:var(–cream)}
.faq-ls{max-width:720px;margin:0 auto}
.faq-i{border-bottom:1px solid rgba(184,149,106,.12);cursor:pointer;transition:background .3s}
.faq-i:hover{background:rgba(184,149,106,.04)}
.faq-q{display:flex;justify-content:space-between;align-items:center;padding:26px 4px;gap:20px}
.faq-q span:first-child{font-size:19px;font-weight:400;color:var(–txt);line-height:1.5}
.faq-ic{font-family:var(–sans);font-size:24px;color:var(–gold);flex-shrink:0;transition:transform .4s var(–ease-spring);display:inline-block}
.faq-ic-open{transform:rotate(45deg)}
.faq-a{max-height:0;overflow:hidden;transition:max-height .5s var(–ease-out-expo),padding .5s}
.faq-open .faq-a{max-height:300px;padding:0 4px 26px}
.faq-a p{font-size:17px;line-height:1.95;color:var(–mid);font-weight:300}

/* ─── EXPLORE ─── */
.exp-sec{background:var(–warm)}
.exp-g{max-width:920px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px}
.exp-c{padding:32px;background:var(–cream);border-radius:4px;transition:transform .4s var(–ease-out-expo),box-shadow .4s;position:relative;overflow:hidden}
.exp-c::before{content:’’;position:absolute;top:0;left:0;width:3px;height:0;background:var(–gold);transition:height .5s var(–ease-out-expo)}
.exp-c:hover::before{height:100%}
.exp-c:hover{transform:translateY(-4px);box-shadow:0 12px 36px rgba(0,0,0,.06)}
.exp-num{font-family:var(–sans);font-size:11px;letter-spacing:2px;color:var(–gold);margin-bottom:12px;opacity:.6}
.exp-n{font-size:18px;font-weight:400;color:var(–txt);margin-bottom:10px;transition:color .3s}
.exp-c:hover .exp-n{color:var(–gold)}
.exp-d{font-size:15px;color:var(–mid);font-weight:300;line-height:1.75}

/* ─── FOOTER ─── */
.ft{text-align:center;padding:80px 36px;background:var(–dk);color:rgba(212,201,184,.8);position:relative;overflow:hidden}
.ft-nm{font-size:clamp(28px,4vw,38px);font-weight:300;color:var(–cream);letter-spacing:1px;margin-bottom:6px;font-style:italic}
.ft-fn{font-family:var(–sans);font-size:13px;letter-spacing:1.5px;color:rgba(184,149,106,.5);margin-bottom:14px}
.ft-dt{font-family:var(–sans);font-size:14px;letter-spacing:3px;text-transform:uppercase;color:var(–gold);margin-bottom:4px}
.ft-sub{font-family:var(–sans);font-size:13px;letter-spacing:2px;color:rgba(107,93,77,.6)}
.ft-v{font-size:17px;font-style:italic;color:rgba(138,123,106,.6);margin-top:36px;font-weight:300;max-width:480px;margin-left:auto;margin-right:auto;line-height:1.9}
.ft-r{font-family:var(–sans);font-size:12px;letter-spacing:2px;color:rgba(107,93,77,.45);margin-top:8px}

/* ─── MOBILE ─── */
@media(max-width:768px){
.nav-lk{display:none;flex-direction:column;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(250,247,242,.98);backdrop-filter:blur(20px);justify-content:center;align-items:center;gap:28px;z-index:999}
.nav-lk-open{display:flex}
.nav-lk-open .nav-a{color:var(–mid)!important;font-size:16px;letter-spacing:2px}
.nav-tog{display:block}
.sec{padding:72px 28px}
.nav-in{padding:16px 24px}
.gal-g{grid-template-columns:1fr}.gal-w{grid-column:span 1;aspect-ratio:16/9}.gal-i{aspect-ratio:16/10}
.gal-lb{transform:none;opacity:.8}
.v-grid{grid-template-columns:1fr}
.tl::before{left:92px}.tl-i{grid-template-columns:76px 28px 1fr}
.cd{gap:20px}.cd-n{font-size:26px}
.hero-btn{padding:14px 40px;font-size:13px}
.exp-g{grid-template-columns:1fr}
.hero-nm{font-size:clamp(30px,7vw,48px)}
.petals{display:none}
}
@media(max-width:480px){
.hero-ct{padding:90px 20px 60px}
.hero-tag{font-size:16px}
.hero-dt{font-size:24px}
.hero-day{font-size:15px}
.hero-vn{font-size:14px}
.sec-t{font-size:26px}
.story-b p{font-size:16px}
.tl-i{grid-template-columns:62px 22px 1fr}.tl::before{left:73px}
.tl-nm{font-size:18px}.tl-dt{font-size:15px}.tl-tm{font-size:14px}
.v-card{padding:28px}
.sec{padding:56px 20px}
.sec-ln{margin:22px auto 40px}
.faq-q span:first-child{font-size:17px}
.faq-a p{font-size:16px}
.rsvp-d{font-size:16px}
.rsvp-btn{padding:18px 48px;font-size:14px}
.gift{padding:60px 24px}
.gift-t{font-size:22px}.gift-b{font-size:16px}
.ft-v{font-size:16px}
.photos-placeholder{padding:60px 24px}
}

/* ─── REDUCED MOTION ─── */
@media(prefers-reduced-motion:reduce){
*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
.petals{display:none}
}
`
