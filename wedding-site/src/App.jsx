import { useState, useEffect, useRef } from 'react'

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

/* ─── GOLD ORNATE DIVIDER ─── */
const GoldDivider = ({ light }) => (
  <svg className={`gold-div ${light ? 'gold-div-lt' : ''}`} viewBox="0 0 200 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 12h70" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
    <path d="M130 12h70" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
    <g transform="translate(82, 2)">
      <path d="M18 0 C18 6, 12 10, 6 10 C0 10, 0 6, 4 4 C8 2, 12 4, 18 10 C24 4, 28 2, 32 4 C36 6, 36 10, 30 10 C24 10, 18 6, 18 0Z" stroke="currentColor" strokeWidth="0.6" fill="currentColor" fillOpacity="0.08"/>
      <circle cx="18" cy="13" r="1.5" fill="currentColor" opacity="0.5"/>
      <path d="M12 16 Q18 20 24 16" stroke="currentColor" strokeWidth="0.5" opacity="0.4" fill="none"/>
    </g>
    <circle cx="76" cy="12" r="1" fill="currentColor" opacity="0.3"/>
    <circle cx="124" cy="12" r="1" fill="currentColor" opacity="0.3"/>
  </svg>
)

/* ─── GOLD LEAF SPRIG ─── */
const Sprig = ({ flip }) => (
  <svg className={`sprig ${flip ? 'sprig-flip' : ''}`} viewBox="0 0 40 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 110 Q20 60 20 10" stroke="currentColor" strokeWidth="0.7" opacity="0.25"/>
    <path d="M20 80 Q8 68 6 55" stroke="currentColor" strokeWidth="0.5" opacity="0.2" fill="none"/>
    <path d="M20 60 Q32 48 35 35" stroke="currentColor" strokeWidth="0.5" opacity="0.2" fill="none"/>
    <path d="M20 40 Q10 30 8 18" stroke="currentColor" strokeWidth="0.5" opacity="0.2" fill="none"/>
    <path d="M6 55 Q3 50 6 46 Q10 50 6 55Z" fill="currentColor" opacity="0.1"/>
    <path d="M35 35 Q38 30 35 26 Q31 30 35 35Z" fill="currentColor" opacity="0.1"/>
    <path d="M8 18 Q5 13 8 9 Q12 13 8 18Z" fill="currentColor" opacity="0.1"/>
    <circle cx="20" cy="8" r="2" fill="currentColor" opacity="0.12"/>
  </svg>
)

/* ─── CONTENT ─── */
const T = {
  en: {
    langLabel: '\u4E2D\u6587',
    nav: ['Home', 'Our Story', 'Schedule', 'Travel', 'RSVP', 'FAQ'],
    hero: {
      pre: 'together with our families, we invite you to celebrate',
      names: 'Steven \u4FAF\u6210',
      amp: '&',
      names2: 'Bonnie \u7C21\u5B50\u82B8',
      date: 'December 19, 2026',
      day: 'Saturday',
      venue: 'Fleur de Chine Hotel \u00B7 Sun Moon Lake, Taiwan',
      cta: 'RSVP',
    },
    noGift: {
      title: 'A little note',
      body: "The greatest gift you can give us is being there. We kindly ask that you skip the red envelopes and monetary gifts \u2014 your love, laughter, and blessings are more than enough.",
    },
    photos: { title: 'Our Journey', sub: 'Moments from our story together' },
    story: {
      title: 'Our Story',
      sub: 'Two lives, two cultures, one love',
      p1: "What started as a spark across the Pacific grew into something neither of us expected. Steven, from New Jersey, and Bonnie, from Taichung, Taiwan \u2014 we found each other in the best way possible.",
      p2: "We got legally married in Taiwan, and now we get to throw the party. We can\u2019t wait to celebrate with the people who\u2019ve meant the most to us \u2014 at Sun Moon Lake, one of Taiwan\u2019s most beautiful places.",
      p3: "We believe marriage is a gift, and we\u2019re so grateful for every person who\u2019s been part of our story. See you there.",
    },
    schedule: {
      title: 'The Day',
      sub: 'Saturday, December 19, 2026',
      events: [
        { time: '10:00 AM', name: 'Ceremony', venue: 'Soaring Cloud Hall \u96F2\u63DA\u5EF3', detail: 'Love, faith, and family.' },
        { time: '12:30 PM', name: 'Banquet & Celebration', venue: 'Cosmos Cloud B Hall \u96F2\u7FF0B\u5EF3', detail: 'Chinese banquet, toasts, and a whole lot of joy.' },
        { time: '3:00 PM', name: 'Farewell', venue: '', detail: 'Send-off with gratitude.' },
      ],
    },
    venue: {
      title: 'Getting There',
      sub: 'Fleur de Chine Hotel \u00B7 Sun Moon Lake',
      address: 'No. 23, Zhongzheng Rd, Yuchi Township, Nantou County 555, Taiwan',
      domestic: {
        title: 'From Within Taiwan',
        steps: [
          'Drive to Sun Moon Lake (~1.5 hrs from Taichung), or',
          'Take Nantou Bus (\u5357\u6295\u5BA2\u904B) from Taichung HSR Station directly to Sun Moon Lake',
          'Free parking at the hotel for wedding guests',
        ],
        note: "We may arrange a shuttle from Taichung HSR \u2014 let us know on the RSVP if you\u2019re interested.",
      },
      overseas: {
        title: 'From Overseas',
        steps: [
          { icon: 'plane', label: 'Fly into Taoyuan International Airport (TPE)' },
          { icon: 'train', label: 'HSR from Taoyuan \u2192 Taichung Station (40 min)' },
          { icon: 'bus', label: 'Bus or car from Taichung HSR \u2192 Sun Moon Lake (1.5 hrs)' },
          { icon: 'hotel', label: 'Check in at Fleur de Chine Hotel' },
        ],
        note: 'We recommend arriving the day before to settle in and explore.',
      },
    },
    rsvp: {
      title: 'RSVP',
      sub: 'Please respond by November 19, 2026',
      desc: "Let us know you\u2019re coming! Takes about 2 minutes \u2014 helps us plan seating, meals, and transport.",
      cta: 'Open RSVP Form',
    },
    faq: {
      title: 'Questions?',
      items: [
        { q: 'What should I wear?', a: "Formal or semi-formal. December at Sun Moon Lake is cool \u2014 around 12\u201318\u00B0C (54\u201364\u00B0F) \u2014 so bring a warm layer." },
        { q: 'What about the weather?', a: "Cool and crisp with possible morning mist. Everything\u2019s indoors, but you\u2019ll want warmth for any time outside." },
        { q: 'How do I find the ceremony and banquet halls?', a: 'Both are on the lobby level. Enter the main entrance and follow the signs toward the banquet wing.' },
        { q: "I\u2019m coming from overseas \u2014 how do I get there?", a: 'Fly into Taoyuan Airport (TPE), HSR to Taichung (40 min), then bus or car to Sun Moon Lake (1.5 hrs). Arrive the day before if you can.' },
      ],
    },
    explore: {
      title: "While You\u2019re Here",
      sub: 'Things to do around Sun Moon Lake',
      items: [
        { name: 'Cycling Path', desc: "One of the world\u2019s most beautiful bike paths, looping the entire lake." },
        { name: 'Wenwu Temple', desc: 'Stunning lakeside temple with panoramic views \u2014 just 1km away.' },
        { name: 'Sun Moon Lake Ropeway', desc: 'Aerial cable car with mountain and lake views.' },
        { name: 'Ita Thao Village', desc: 'Indigenous village \u2014 street food, crafts, and cultural experiences.' },
        { name: 'Hotel Hot Springs', desc: 'Natural hot springs right at the hotel. The perfect wind-down.' },
      ],
    },
    stickyRsvp: 'RSVP',
    footer: 'Steven & Bonnie',
    footerNames: 'Steven \u4FAF\u6210 & Bonnie \u7C21\u5B50\u82B8',
    footerDate: 'December 19, 2026',
    footerSub: 'Sun Moon Lake, Taiwan',
    footerVerse: '\u201CTwo are better than one, because they have a good return for their labor.\u201D',
    footerRef: 'Ecclesiastes 4:9',
  },
  zh: {
    langLabel: 'EN',
    nav: ['\u9996\u9801', '\u6211\u5011\u7684\u6545\u4E8B', '\u5A5A\u79AE\u6D41\u7A0B', '\u4EA4\u901A\u6307\u5357', '\u51FA\u5E2D\u56DE\u8986', '\u5E38\u898B\u554F\u984C'],
    hero: {
      pre: '\u6211\u5011\u8AA0\u647F\u5730\u9080\u8ACB\u60A8\uFF0C\u4E00\u540C\u898B\u8B49\u9019\u7F8E\u597D\u7684\u6642\u523B',
      names: 'Steven \u4FAF\u6210',
      amp: '&',
      names2: 'Bonnie \u7C21\u5B50\u82B8',
      date: '2026\u5E7412\u670819\u65E5',
      day: '\u661F\u671F\u516D',
      venue: '\u65E5\u6708\u6F6D \u00B7 \u96F2\u54C1\u6EAB\u6CC9\u9152\u5E97',
      cta: '\u7ACB\u5373\u56DE\u8986',
    },
    noGift: {
      title: '\u6211\u5011\u7684\u5C0F\u5C0F\u5FC3\u610F',
      body: '\u60A8\u7684\u5230\u4F86\uFF0C\u5C31\u662F\u7D66\u6211\u5011\u6700\u73CD\u8CB4\u7684\u79AE\u7269\u3002\u6211\u5011\u8AA0\u5FC3\u5730\u8ACB\u6C42\u60A8\u4E0D\u8981\u5305\u7D05\u5305\u6216\u9001\u4EFB\u4F55\u79AE\u91D1\u2014\u2014\u60A8\u7684\u611B\u3001\u60A8\u7684\u7B11\u5BB9\u3001\u60A8\u7684\u795D\u798F\uFF0C\u5C31\u662F\u6211\u5011\u6700\u5927\u7684\u5E78\u798F\u3002',
    },
    photos: { title: '\u6211\u5011\u7684\u65C5\u7A0B', sub: '\u4E00\u8DEF\u8D70\u4F86\u7684\u7CBE\u5F69\u7247\u6BB5' },
    story: {
      title: '\u6211\u5011\u7684\u6545\u4E8B',
      sub: '\u5169\u500B\u751F\u547D\u3001\u5169\u7A2E\u6587\u5316\u3001\u4E00\u4EFD\u611B',
      p1: '\u4E00\u6BB5\u8DE8\u8D8A\u592A\u5E73\u6D0B\u7684\u7DE3\u5206\uFF0C\u6210\u9577\u70BA\u4EE5\u4FE1\u4EF0\u3001\u5BB6\u5EAD\u548C\u5171\u540C\u9858\u666F\u70BA\u6839\u57FA\u7684\u611B\u60C5\u3002\u4FAF\u6210\u4F86\u81EA\u7F8E\u570B\u7D10\u6FA4\u897F\uFF0C\u5B50\u82B8\u4F86\u81EA\u53F0\u7063\u53F0\u4E2D\uFF0C\u5169\u4EBA\u5728\u5F7C\u6B64\u8EAB\u4E0A\u627E\u5230\u4E86\u4EBA\u751F\u65C5\u9014\u4E2D\u6700\u597D\u7684\u5925\u4F34\u3002',
      p2: '\u6211\u5011\u5DF2\u5728\u53F0\u7063\u5B8C\u6210\u7D50\u5A5A\u767B\u8A18\uFF0C\u73FE\u5728\u7121\u6BD4\u559C\u6085\u5730\u9080\u8ACB\u5C0D\u6211\u5011\u6700\u91CD\u8981\u7684\u4EBA\uFF0C\u4E00\u540C\u5728\u7F8E\u9E97\u7684\u65E5\u6708\u6F6D\u6176\u795D\u6211\u5011\u7684\u7D50\u5408\u3002',
      p3: '\u6211\u5011\u76F8\u4FE1\u5A5A\u59FB\u662F\u6069\u8CDC\uFF0C\u611F\u8B1D\u6BCF\u4E00\u4F4D\u5728\u6211\u5011\u751F\u547D\u4E2D\u7559\u4E0B\u8DB3\u8DE1\u7684\u4EBA\u3002\u671F\u5F85\u8207\u60A8\u4E00\u540C\u6B61\u6176\u3002',
    },
    schedule: {
      title: '\u5A5A\u79AE\u6D41\u7A0B',
      sub: '2026\u5E7412\u670819\u65E5\uFF08\u661F\u671F\u516D\uFF09',
      events: [
        { time: '\u4E0A\u5348 10:00', name: '\u8B49\u5A5A\u5100\u5F0F', venue: '\u96F2\u63DA\u5EF3', detail: '\u4EE5\u611B\u3001\u4FE1\u4EF0\u8207\u5BB6\u5EAD\u70BA\u4E3B\u984C\u7684\u6176\u5178\u3002' },
        { time: '\u4E2D\u5348 12:30', name: '\u559C\u5BB4', venue: '\u96F2\u7FF0B\u5EF3', detail: '\u4E2D\u5F0F\u559C\u5BB4\u3001\u6B61\u6176\u8207\u5718\u5951\u3002' },
        { time: '\u4E0B\u5348 3:00', name: '\u79AE\u6210', venue: '', detail: '\u6B61\u9001\u8CD3\u5BA2\uFF0C\u611F\u6069\u8207\u559C\u6A02\u3002' },
      ],
    },
    venue: {
      title: '\u4EA4\u901A\u6307\u5357',
      sub: '\u96F2\u54C1\u6EAB\u6CC9\u9152\u5E97 \u00B7 \u65E5\u6708\u6F6D',
      address: '\u5357\u6295\u7E23\u9B5A\u6C60\u9109\u65E5\u6708\u6F6D\u4E2D\u6B63\u8DEF23\u865F',
      domestic: {
        title: '\u53F0\u7063\u570B\u5167\u4EA4\u901A',
        steps: ['\u81EA\u884C\u958B\u8ECA\u81F3\u65E5\u6708\u6F6D\uFF08\u5F9E\u53F0\u4E2D\u51FA\u767C\u7D041.5\u5C0F\u6642\uFF09\uFF0C\u6216', '\u5F9E\u53F0\u4E2D\u9AD8\u9435\u7AD9\u642D\u4E58\u5357\u6295\u5BA2\u904B\u76F4\u9054\u65E5\u6708\u6F6D', '\u9152\u5E97\u63D0\u4F9B\u5A5A\u79AE\u8CD3\u5BA2\u514D\u8CBB\u505C\u8ECA'],
        note: '\u6211\u5011\u53EF\u80FD\u5B89\u6392\u5F9E\u53F0\u4E2D\u9AD8\u9435\u7AD9\u51FA\u767C\u7684\u63A5\u99C1\u8ECA\u2014\u2014\u8ACB\u5728\u56DE\u8986\u8868\u55AE\u4E2D\u544A\u77E5\u662F\u5426\u9700\u8981\u3002',
      },
      overseas: {
        title: '\u6D77\u5916\u8CD3\u5BA2\u4EA4\u901A',
        steps: [
          { icon: 'plane', label: '\u98DB\u62B5\u6843\u5712\u570B\u969B\u6A5F\u5834\uFF08TPE\uFF09' },
          { icon: 'train', label: '\u642D\u4E58\u9AD8\u9435\uFF1A\u6843\u5712\u7AD9 \u2192 \u53F0\u4E2D\u7AD9\uFF08\u7D0440\u5206\u9418\uFF09' },
          { icon: 'bus', label: '\u5F9E\u53F0\u4E2D\u9AD8\u9435\u7AD9\u642D\u5BA2\u904B\u6216\u5305\u8ECA\u81F3\u65E5\u6708\u6F6D\uFF08\u7D041.5\u5C0F\u6642\uFF09' },
          { icon: 'hotel', label: '\u5165\u4F4F\u96F2\u54C1\u6EAB\u6CC9\u9152\u5E97' },
        ],
        note: '\u5EFA\u8B70\u65BC\u5A5A\u79AE\u524D\u4E00\u5929\u62B5\u9054\uFF0C\u53EF\u9806\u4FBF\u4EAB\u53D7\u65E5\u6708\u6F6D\u7684\u7F8E\u666F\u3002',
      },
    },
    rsvp: {
      title: '\u51FA\u5E2D\u56DE\u8986',
      sub: '\u8ACB\u65BC2026\u5E7411\u670819\u65E5\u524D\u56DE\u8986',
      desc: '\u8ACB\u544A\u8A34\u6211\u5011\u60A8\u662F\u5426\u80FD\u51FA\u5E2D\uFF01\u586B\u5BEB\u56DE\u8986\u8868\u55AE\u50C5\u9700\u7D042\u5206\u9418\uFF0C\u6709\u52A9\u65BC\u6211\u5011\u5B89\u6392\u5EA7\u4F4D\u3001\u9910\u9EDE\u53CA\u4EA4\u901A\u3002',
      cta: '\u958B\u555F\u56DE\u8986\u8868\u55AE',
    },
    faq: {
      title: '\u5E38\u898B\u554F\u984C',
      items: [
        { q: '\u7A7F\u8457\u8981\u6C42\uFF1F', a: '\u8ACB\u8457\u6B63\u5F0F\u670D\u88DD\u3002\u5341\u4E8C\u6708\u7684\u65E5\u6708\u6F6D\u6C23\u6EAB\u8F03\u6DBC\uFF08\u7D0412\u201318\u00B0C\uFF09\uFF0C\u8ACB\u651C\u5E36\u4FDD\u6696\u5916\u5957\u3002' },
        { q: '\u5929\u6C23\u5982\u4F55\uFF1F', a: '\u9810\u8A08\u6DBC\u723D\u6E05\u65B0\uFF0C\u65E9\u6668\u53EF\u80FD\u6709\u8584\u9727\u3002\u8B49\u5A5A\u5100\u5F0F\u53CA\u559C\u5BB4\u7686\u5728\u5BA4\u5167\uFF0C\u4F46\u6236\u5916\u6D3B\u52D5\u9700\u6CE8\u610F\u4FDD\u6696\u3002' },
        { q: '\u5982\u4F55\u627E\u5230\u5100\u5F0F\u53CA\u5BB4\u6703\u5EF3\uFF1F', a: '\u5169\u500B\u5EF3\u7686\u4F4D\u65BC\u9152\u5E97\u5927\u5EF3\u6A13\u5C64\u3002\u5F9E\u5927\u9580\u9032\u5165\u5F8C\uFF0C\u6CBF\u8D70\u5ECA\u524D\u5F80\u5BB4\u6703\u5340\uFF0C\u73FE\u5834\u6703\u6709\u6307\u793A\u6A19\u8A8C\u5F15\u5C0E\u60A8\u3002' },
        { q: '\u6211\u5F9E\u6D77\u5916\u524D\u4F86\uFF0C\u600E\u9EBC\u5230\u9054\uFF1F', a: '\u98DB\u62B5\u6843\u5712\u6A5F\u5834\uFF08TPE\uFF09\uFF0C\u642D\u9AD8\u9435\u81F3\u53F0\u4E2D\uFF0840\u5206\u9418\uFF09\uFF0C\u518D\u8F49\u4E58\u5BA2\u904B\u6216\u5305\u8ECA\u81F3\u65E5\u6708\u6F6D\uFF081.5\u5C0F\u6642\uFF09\u3002\u5EFA\u8B70\u5A5A\u79AE\u524D\u4E00\u5929\u62B5\u9054\u3002' },
      ],
    },
    explore: {
      title: '\u5468\u908A\u666F\u9EDE',
      sub: '\u65E5\u6708\u6F6D\u5468\u908A\u63A8\u85A6\u884C\u7A0B',
      items: [
        { name: '\u74B0\u6E56\u81EA\u884C\u8ECA\u9053', desc: '\u4E16\u754C\u6700\u7F8E\u81EA\u884C\u8ECA\u9053\u4E4B\u4E00\uFF0C\u74B0\u7E5E\u6574\u5EA7\u6E56\u6CCA\u3002' },
        { name: '\u6587\u6B66\u5EDF', desc: '\u58EF\u89C0\u7684\u6E56\u7554\u9053\u6559\u5EDF\u5B87\uFF0C\u64C1\u6709\u7D55\u4F73\u5168\u666F\u8996\u91CE\uFF0C\u8DDD\u96E2\u50C51\u516C\u91CC\u3002' },
        { name: '\u65E5\u6708\u6F6D\u7E9C\u8ECA', desc: '\u7A7A\u4E2D\u7E9C\u8ECA\uFF0C\u53EF\u4FEF\u77B0\u6E56\u5149\u5C71\u8272\u3002' },
        { name: '\u4F0A\u9054\u90B5\u90E8\u843D', desc: '\u539F\u4F4F\u6C11\u90B5\u65CF\u90E8\u843D\u2014\u2014\u5728\u5730\u7F8E\u98DF\u3001\u624B\u5DE5\u85DD\u54C1\u8207\u6587\u5316\u9AD4\u9A57\u3002' },
        { name: '\u9152\u5E97\u6EAB\u6CC9', desc: '\u96F2\u54C1\u64C1\u6709\u5929\u7136\u6EAB\u6CC9\uFF0C\u662F\u6176\u795D\u5F8C\u653E\u9B06\u7684\u6700\u4F73\u9078\u64C7\u3002' },
      ],
    },
    stickyRsvp: '\u56DE\u8986',
    footer: 'Steven & Bonnie',
    footerNames: 'Steven \u4FAF\u6210 & Bonnie \u7C21\u5B50\u82B8',
    footerDate: '2026\u5E7412\u670819\u65E5',
    footerSub: '\u65E5\u6708\u6F6D\uFF0C\u53F0\u7063',
    footerVerse: '\u300C\u5169\u500B\u4EBA\u7E3D\u6BD4\u4E00\u500B\u4EBA\u597D\uFF0C\u56E0\u70BA\u4E8C\u4EBA\u52DE\u7984\u540C\u5F97\u7F8E\u597D\u7684\u679C\u6548\u3002\u300D',
    footerRef: '\u50B3\u9053\u66F8 4:9',
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
  const lb = lang === 'en' ? ['Days', 'Hours', 'Min', 'Sec'] : ['\u5929', '\u6642', '\u5206', '\u79D2']
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
      <a href={NOTION_RSVP} target="_blank" rel="noopener noreferrer"
        className={`sticky-rsvp ${showSticky ? 'sticky-show' : ''}`}>
        <span className="sticky-dot" />
        {l.stickyRsvp}
      </a>

      {/* HERO */}
      <header id="home" className="hero">
        <div className="hero-bg" style={{ backgroundImage: 'url(/photos/lake-sunset.jpg)' }} />
        <div className="hero-ov" />
        <div className="hero-grain" />
        <Sprig />
        <Sprig flip />
        <div className={`hero-ct ${heroLoaded ? 'hero-in' : ''}`}>
          <p className="hero-pre h-d1">{l.hero.pre}</p>
          <h1 className="hero-nm h-d2">
            <span className="hero-n1">{l.hero.names}</span>
            <span className="hero-amp">{l.hero.amp}</span>
            <span className="hero-n2">{l.hero.names2}</span>
          </h1>
          <div className="hero-divider h-d3"><GoldDivider light /></div>
          <p className="hero-dt h-d4">{l.hero.date}</p>
          <p className="hero-day h-d5">{l.hero.day}</p>
          <p className="hero-vn h-d6">{l.hero.venue}</p>
          <div className="h-d7"><Countdown lang={lang} /></div>
          <div className="h-d8">
            <a href={NOTION_RSVP} target="_blank" rel="noopener noreferrer" className="hero-btn">{l.hero.cta}</a>
          </div>
        </div>
      </header>

      {/* NOTE */}
      <Sec className="gift-sec" anim="fade">
        <div className="gift">
          <div className="gift-grain" />
          <h3 className="gift-t">{l.noGift.title}</h3>
          <GoldDivider />
          <p className="gift-b">{l.noGift.body}</p>
        </div>
      </Sec>

      {/* STORY */}
      <Sec id="story" anim="up">
        <h2 className="sec-t">{l.story.title}</h2>
        <p className="sec-sub">{l.story.sub}</p>
        <div className="sec-orn"><GoldDivider /></div>
        <Stagger className="story-b" delay={0.2}>
          <p>{l.story.p1}</p>
          <p>{l.story.p2}</p>
          <p>{l.story.p3}</p>
        </Stagger>
      </Sec>

      {/* PHOTOS PLACEHOLDER */}
      <Sec className="photos-sec" anim="scale">
        <h2 className="sec-t">{l.photos.title}</h2>
        <p className="sec-sub">{l.photos.sub}</p>
        <div className="sec-orn"><GoldDivider /></div>
        <div className="photos-placeholder">
          <div className="photos-icon">\uD83D\uDCF7</div>
          <p className="photos-msg">{lang === 'zh' ? '\u5373\u5C07\u4E0A\u50B3\u6211\u5011\u7684\u5408\u7167' : 'Our photos coming soon'}</p>
        </div>
      </Sec>

      {/* SCHEDULE */}
      <Sec id="schedule" className="sched" dark anim="up">
        <div className="sec-grain" />
        <h2 className="sec-t">{l.schedule.title}</h2>
        <p className="sec-sub-big">{l.schedule.sub}</p>
        <div className="sec-orn"><GoldDivider light /></div>
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
        <div className="sec-orn"><GoldDivider /></div>
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
        <iframe className="v-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.8!2d120.912!3d23.868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468d66bcbaf5f5f%3A0xb297928ac211e576!2sFleur%20de%20Chine%20Hotel%20Sun%20Moon%20Lake!5e0!3m2!1sen!2stw!4v1700000000000"
          allowFullScreen loading="lazy" title="Map" />
      </Sec>

      {/* RSVP */}
      <Sec id="rsvp" className="rsvp-sec" dark anim="scale">
        <div className="sec-grain" />
        <h2 className="sec-t">{l.rsvp.title}</h2>
        <p className="sec-sub-big">{l.rsvp.sub}</p>
        <div className="sec-orn"><GoldDivider light /></div>
        <p className="rsvp-d">{l.rsvp.desc}</p>
        <a href={NOTION_RSVP} target="_blank" rel="noopener noreferrer" className="rsvp-btn">{l.rsvp.cta}</a>
      </Sec>

      {/* FAQ */}
      <Sec id="faq" className="faq-sec" anim="up">
        <h2 className="sec-t">{l.faq.title}</h2>
        <div className="sec-orn"><GoldDivider /></div>
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
        <div className="sec-orn"><GoldDivider /></div>
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
        <div className="sec-grain" />
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
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Noto+Serif+TC:wght@300;400;500;600&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');

:root {
  --teal: #004D4D;
  --teal-l: #006B6B;
  --teal-d: #003838;
  --gold: #BF9B30;
  --gold-l: #D4B34A;
  --gold-d: #9A7D25;
  --cream: #FFFDEB;
  --cream-d: #F5F0D8;
  --ruby: #A0002F;
  --ruby-l: #C4183E;
  --coral: #E79EAA;
  --dk: #1A1A18;
  --txt: #2C2822;
  --mid: #5A5248;
  --lt: #8A7E72;
  --serif: 'Playfair Display', 'Noto Serif TC', Georgia, serif;
  --sans: 'DM Sans', 'Noto Serif TC', -apple-system, sans-serif;
  --ease: cubic-bezier(.16, 1, .3, 1);
  --ease-s: cubic-bezier(.34, 1.56, .64, 1);
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box }
::selection { background: rgba(191, 155, 48, .15) }
html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased }
.root { font-family: var(--serif); color: var(--txt); background: var(--cream); min-height: 100vh; overflow-x: hidden }

/* ─ Texture overlays ─ */
.hero-grain, .sec-grain, .gift-grain {
  position: absolute; inset: 0; pointer-events: none; z-index: 1;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  opacity: .5;
}
.sec-grain { opacity: .35 }

/* ─ Gold divider ─ */
.gold-div { width: 160px; height: 20px; color: var(--gold); display: block; margin: 0 auto }
.gold-div-lt { color: var(--gold-l); opacity: .7 }

/* ─ Stagger ─ */
.stg-i { opacity: 0; transform: translateY(18px); transition: opacity .7s var(--ease), transform .7s var(--ease) }
.stg-v { opacity: 1; transform: none }

/* ─ Botanical ─ */
.sprig { position: absolute; width: 30px; height: 90px; color: var(--gold); opacity: .3; z-index: 2; pointer-events: none }
.hero .sprig { bottom: 60px; left: 8% }
.hero .sprig-flip { left: auto; right: 8%; transform: scaleX(-1) }
.ft .sprig { top: 30px; left: 10%; opacity: .2 }
.ft .sprig-flip { left: auto; right: 10%; transform: scaleX(-1) }

/* ─ NAV ─ */
.nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; transition: all .5s var(--ease) }
.nav-s { background: rgba(0, 77, 77, .95); backdrop-filter: blur(16px); box-shadow: 0 1px 0 rgba(191, 155, 48, .1) }
.nav-in { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 18px 36px }
.nav-logo { font-family: var(--serif); font-size: 18px; letter-spacing: 3px; color: var(--gold); font-weight: 500; cursor: pointer; font-style: italic; transition: opacity .3s }
.nav-logo:hover { opacity: .65 }
.nav:not(.nav-s) .nav-logo { color: var(--gold-l) }
.nav-lk { display: flex; gap: 28px; align-items: center }
.nav-a { font-family: var(--sans); font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; background: none; border: none; cursor: pointer; font-weight: 400; transition: color .3s }
.nav-s .nav-a { color: rgba(255,253,235,.55) }
.nav:not(.nav-s) .nav-a { color: rgba(255,255,255,.6) }
.nav-a:hover { color: var(--gold) }
.lang-b { font-family: var(--sans); font-size: 12px; letter-spacing: 2px; padding: 7px 18px; border: 1px solid var(--gold); border-radius: 50px; background: transparent; color: var(--gold); cursor: pointer; transition: all .4s var(--ease) }
.lang-b:hover { background: var(--gold); color: var(--teal-d) }
.nav-tog { display: none; background: none; border: none; cursor: pointer; width: 32px; height: 32px; position: relative; z-index: 1001 }
.ham, .ham::before, .ham::after { display: block; width: 22px; height: 1.5px; position: absolute; transition: all .4s var(--ease-s) }
.ham { top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(255,255,255,.7) }
.nav-s .ham { background: var(--gold) }
.ham::before { content: ''; top: -7px; left: 0; background: inherit }
.ham::after { content: ''; top: 7px; left: 0; background: inherit }
.ham-x { background: transparent !important }
.ham-x::before { top: 0; transform: rotate(45deg); background: var(--gold) !important }
.ham-x::after { top: 0; transform: rotate(-45deg); background: var(--gold) !important }

/* ─ STICKY RSVP ─ */
.sticky-rsvp {
  position: fixed; bottom: 28px; right: 28px; z-index: 900;
  display: flex; align-items: center; gap: 8px;
  padding: 14px 28px;
  font-family: var(--sans); font-size: 14px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; text-decoration: none;
  background: var(--ruby); color: var(--cream);
  border-radius: 50px;
  box-shadow: 0 4px 20px rgba(160, 0, 47, .3), 0 1px 4px rgba(0,0,0,.1);
  transform: translateY(80px); opacity: 0;
  transition: transform .5s var(--ease-s), opacity .5s var(--ease), background .3s, box-shadow .3s;
}
.sticky-rsvp:hover { background: var(--ruby-l); box-shadow: 0 6px 28px rgba(160, 0, 47, .4) }
.sticky-show { transform: none; opacity: 1 }
.sticky-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--cream); opacity: .6; animation: pulse 2s ease-in-out infinite }
@keyframes pulse { 0%, 100% { opacity: .6; transform: scale(1) } 50% { opacity: 1; transform: scale(1.3) } }

/* ─ HERO ─ */
.hero { position: relative; min-height: 100vh; min-height: 100dvh; display: flex; align-items: center; justify-content: center; text-align: center; overflow: hidden }
.hero-bg { position: absolute; inset: -20px; background-size: cover; background-position: center 35%; filter: saturate(1.1) contrast(0.9) brightness(0.6) }
.hero-ov { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,77,77,.3) 0%, rgba(0,56,56,.5) 50%, rgba(0,38,38,.75) 100%) }

.hero-ct { position: relative; z-index: 3; color: var(--cream); padding: 100px 32px 80px }
.hero-ct > * { opacity: 0; transform: translateY(24px); transition: opacity .8s var(--ease), transform .8s var(--ease) }
.hero-in .h-d1 { opacity: 1; transform: none; transition-delay: .3s }
.hero-in .h-d2 { opacity: 1; transform: none; transition-delay: .5s }
.hero-in .h-d3 { opacity: 1; transform: none; transition-delay: .7s }
.hero-in .h-d4 { opacity: 1; transform: none; transition-delay: .85s }
.hero-in .h-d5 { opacity: 1; transform: none; transition-delay: .95s }
.hero-in .h-d6 { opacity: 1; transform: none; transition-delay: 1.05s }
.hero-in .h-d7 { opacity: 1; transform: none; transition-delay: 1.2s }
.hero-in .h-d8 { opacity: 1; transform: none; transition-delay: 1.4s }

.hero-pre { font-size: 17px; color: rgba(255,253,235,.5); margin-bottom: 20px; font-weight: 400; font-style: italic; line-height: 1.6 }
.hero-nm { font-size: clamp(30px, 5.5vw, 52px); font-weight: 400; letter-spacing: 1px; line-height: 1.2; font-style: italic }
.hero-n1, .hero-n2 { display: block }
.hero-amp { display: block; font-size: .55em; color: var(--gold); margin: 6px 0; font-style: italic; font-weight: 400 }
.hero-divider { margin: 22px auto; display: flex; justify-content: center }
.hero-dt { font-size: clamp(24px, 4.5vw, 40px); letter-spacing: 0.5px; font-weight: 400 }
.hero-day { font-family: var(--sans); font-size: 17px; letter-spacing: 3px; color: rgba(255,253,235,.45); margin-top: 6px; font-weight: 300 }
.hero-vn { font-family: var(--sans); font-size: 15px; letter-spacing: 1.5px; color: rgba(255,253,235,.35); margin-top: 12px; font-weight: 300 }

.cd { display: flex; gap: 24px; justify-content: center; margin-top: 32px }
.cd-u { text-align: center; min-width: 48px }
.cd-n { display: block; font-family: var(--sans); font-size: 28px; font-weight: 300; color: var(--cream) }
.cd-l { font-family: var(--sans); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: rgba(191,155,48,.5); margin-top: 4px; display: block }

.hero-btn {
  display: inline-block; margin-top: 36px; padding: 15px 48px;
  font-family: var(--sans); font-size: 14px; letter-spacing: 2px; text-transform: uppercase; text-decoration: none;
  border: 1px solid var(--gold); border-radius: 50px;
  background: rgba(191,155,48,.08); color: var(--gold);
  transition: all .4s var(--ease);
}
.hero-btn:hover { background: var(--gold); color: var(--teal-d) }

/* ─ GIFT ─ */
.gift-sec { padding: 0 !important }
.gift {
  position: relative; overflow: hidden;
  background: var(--teal);
  text-align: center; padding: 72px 36px;
}
.gift-t { font-size: 24px; font-weight: 400; color: var(--gold); margin-bottom: 18px; font-style: italic }
.gift-b { font-size: 17px; line-height: 2; font-weight: 300; color: rgba(255,253,235,.65); max-width: 580px; margin: 18px auto 0 }

/* ─ SECTIONS ─ */
.sec { padding: 96px 40px; overflow: hidden; position: relative }
.sec-up { opacity: 0; transform: translateY(36px); transition: opacity .8s var(--ease), transform .8s var(--ease) }
.sec-fade { opacity: 0; transition: opacity 1s var(--ease) }
.sec-scale { opacity: 0; transform: scale(.97); transition: opacity .8s var(--ease), transform .8s var(--ease) }
.sec-v.sec-up, .sec-v.sec-fade, .sec-v.sec-scale { opacity: 1; transform: none }
.sec-dk { background: var(--teal); color: var(--cream) }

.sec-t { font-size: clamp(28px, 4.5vw, 40px); font-weight: 400; letter-spacing: 0.5px; text-align: center; margin-bottom: 10px; font-style: italic }
.sec-dk .sec-t { color: var(--cream) }
.sec-sub { font-family: var(--sans); font-size: 14px; letter-spacing: 1.5px; text-align: center; color: var(--lt); font-weight: 300 }
.sec-sub-big { font-family: var(--serif); font-size: 18px; text-align: center; color: var(--mid); font-weight: 400; font-style: italic }
.sec-dk .sec-sub, .sec-dk .sec-sub-big { color: rgba(255,253,235,.35) }

.sec-orn { display: flex; justify-content: center; margin: 24px auto 48px }
.sec-dk .sec-orn { opacity: .6 }

/* ─ PHOTOS PLACEHOLDER ─ */
.photos-sec { background: var(--cream-d); text-align: center }
.photos-placeholder {
  max-width: 700px; margin: 0 auto; padding: 72px 40px;
  border: 1px solid rgba(191,155,48,.2); border-radius: 20px;
  background: rgba(255,253,235,.5); transition: border-color .4s;
}
.photos-placeholder:hover { border-color: rgba(191,155,48,.45) }
.photos-icon { font-size: 32px; margin-bottom: 14px; opacity: .35 }
.photos-msg { font-size: 19px; color: var(--lt); font-style: italic; font-weight: 400 }

/* ─ STORY ─ */
.story-b { max-width: 660px; margin: 0 auto; text-align: center }
.story-b p { font-size: 18px; line-height: 2.1; color: var(--mid); font-weight: 300; margin-bottom: 24px }

/* ─ SCHEDULE ─ */
.sched { background: var(--teal) }
.tl { max-width: 700px; margin: 0 auto; position: relative }
.tl::before { content: ''; position: absolute; left: 118px; top: 12px; bottom: 12px; width: 1px; background: rgba(191,155,48,.15) }
.tl-i { display: grid; grid-template-columns: 100px 32px 1fr; padding: 26px 0; align-items: start }
.tl-tm { font-family: var(--sans); font-size: 15px; letter-spacing: 1px; color: var(--gold); text-align: right; padding-top: 3px; font-weight: 500 }
.tl-dot { display: flex; justify-content: center; padding-top: 7px }
.tl-dot-in { width: 10px; height: 10px; border-radius: 50%; border: 2px solid var(--gold); background: var(--teal); position: relative; z-index: 1; transition: transform .4s var(--ease-s), background .4s }
.tl-i:hover .tl-dot-in { transform: scale(1.3); background: var(--gold) }
.tl-nm { font-size: 20px; font-weight: 500; color: var(--cream); margin-bottom: 5px; transition: color .3s }
.tl-i:hover .tl-nm { color: var(--gold-l) }
.tl-vn { font-size: 15px; color: var(--gold); font-style: italic; margin-bottom: 4px; opacity: .6 }
.tl-dt { font-size: 16px; color: rgba(255,253,235,.55); font-weight: 300; line-height: 1.7 }

/* ─ VENUE ─ */
.v-addr { text-align: center; font-family: var(--sans); font-size: 16px; color: var(--lt); margin-bottom: 40px; font-weight: 300 }
.v-grid { max-width: 820px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 24px }
.v-card { padding: 34px; background: var(--cream); border: 1px solid rgba(191,155,48,.15); border-radius: 16px; transition: transform .4s var(--ease), box-shadow .4s, border-color .4s }
.v-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,.06); border-color: rgba(191,155,48,.35) }
.v-card-t { font-family: var(--sans); font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: var(--gold-d); margin-bottom: 20px; font-weight: 500 }
.v-steps { list-style: none; padding: 0 }
.v-steps li { font-size: 16px; color: var(--mid); font-weight: 300; line-height: 1.85; padding-left: 18px; position: relative; margin-bottom: 6px }
.v-steps li::before { content: '\u00B7'; position: absolute; left: 0; color: var(--gold); font-weight: 700; font-size: 20px; line-height: 1.55 }
.v-note { font-size: 15px; color: var(--lt); font-style: italic; margin-top: 16px; line-height: 1.75 }
.v-os { display: flex; flex-direction: column; gap: 4px }
.os-s { display: flex; align-items: center; gap: 14px; padding: 8px 0; transition: transform .3s var(--ease) }
.os-s:hover { transform: translateX(5px) }
.os-icon { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; flex-shrink: 0; color: var(--gold); transition: color .3s }
.os-s:hover .os-icon { color: var(--gold-d) }
.os-icon svg { width: 20px; height: 20px }
.os-l { font-size: 16px; color: var(--mid); font-weight: 300; line-height: 1.6 }
.v-map { width: 100%; max-width: 820px; height: 320px; border: none; margin: 40px auto 0; display: block; border-radius: 16px; opacity: 0; animation: fadeUp .8s var(--ease) .5s forwards }
@keyframes fadeUp { to { opacity: 1 } }

/* ─ RSVP ─ */
.rsvp-sec { background: var(--teal-d); text-align: center }
.rsvp-sec .sec-t { color: var(--cream) }
.rsvp-d { text-align: center; max-width: 540px; margin: 0 auto 40px; font-size: 17px; line-height: 2; font-weight: 300; color: rgba(255,253,235,.5) }
.rsvp-btn {
  display: inline-block; padding: 18px 64px;
  font-family: var(--sans); font-size: 15px; letter-spacing: 2px; text-transform: uppercase; text-decoration: none;
  border: none; border-radius: 50px;
  background: var(--gold); color: var(--teal-d);
  box-shadow: 0 4px 20px rgba(191,155,48,.25);
  transition: all .4s var(--ease); font-weight: 500;
}
.rsvp-btn:hover { background: var(--gold-l); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(191,155,48,.35) }

/* ─ FAQ ─ */
.faq-sec { background: var(--cream) }
.faq-ls { max-width: 700px; margin: 0 auto }
.faq-i { border-bottom: 1px solid rgba(191,155,48,.1); cursor: pointer; transition: background .3s }
.faq-i:hover { background: rgba(191,155,48,.04) }
.faq-q { display: flex; justify-content: space-between; align-items: center; padding: 24px 4px; gap: 20px }
.faq-q span:first-child { font-size: 19px; font-weight: 500; color: var(--txt); line-height: 1.5 }
.faq-ic { font-family: var(--sans); font-size: 22px; color: var(--gold); flex-shrink: 0; transition: transform .4s var(--ease-s); display: inline-block }
.faq-ic-open { transform: rotate(45deg) }
.faq-a { max-height: 0; overflow: hidden; transition: max-height .5s var(--ease), padding .5s }
.faq-open .faq-a { max-height: 300px; padding: 0 4px 24px }
.faq-a p { font-size: 17px; line-height: 1.9; color: var(--mid); font-weight: 300 }

/* ─ EXPLORE ─ */
.exp-sec { background: var(--cream-d) }
.exp-g { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 18px }
.exp-c { padding: 30px; background: var(--cream); border: 1px solid rgba(191,155,48,.1); border-radius: 16px; transition: transform .4s var(--ease), box-shadow .4s, border-color .4s; position: relative; overflow: hidden }
.exp-c::before { content: ''; position: absolute; top: 0; left: 0; width: 0; height: 3px; background: linear-gradient(90deg, var(--gold), var(--coral)); transition: width .5s var(--ease); border-radius: 3px 3px 0 0 }
.exp-c:hover::before { width: 100% }
.exp-c:hover { transform: translateY(-3px); box-shadow: 0 10px 32px rgba(0,0,0,.05); border-color: rgba(191,155,48,.3) }
.exp-num { font-family: var(--sans); font-size: 11px; letter-spacing: 2px; color: var(--gold); margin-bottom: 10px; opacity: .5 }
.exp-n { font-size: 18px; font-weight: 500; color: var(--txt); margin-bottom: 8px; transition: color .3s }
.exp-c:hover .exp-n { color: var(--gold-d) }
.exp-d { font-size: 15px; color: var(--mid); font-weight: 300; line-height: 1.75 }

/* ─ FOOTER ─ */
.ft { text-align: center; padding: 76px 36px; background: var(--dk); color: rgba(255,253,235,.6); position: relative; overflow: hidden }
.ft-nm { font-size: clamp(26px, 4vw, 36px); font-weight: 400; color: var(--cream); letter-spacing: 0.5px; margin-bottom: 6px; font-style: italic }
.ft-fn { font-family: var(--sans); font-size: 13px; letter-spacing: 1.5px; color: rgba(191,155,48,.35); margin-bottom: 14px }
.ft-dt { font-family: var(--sans); font-size: 14px; letter-spacing: 2px; color: var(--gold); margin-bottom: 4px }
.ft-sub { font-family: var(--sans); font-size: 13px; letter-spacing: 1.5px; color: rgba(191,155,48,.25) }
.ft-v { font-size: 17px; font-style: italic; color: rgba(255,253,235,.3); margin-top: 32px; font-weight: 400; max-width: 460px; margin-left: auto; margin-right: auto; line-height: 1.9 }
.ft-r { font-family: var(--sans); font-size: 12px; letter-spacing: 2px; color: rgba(191,155,48,.2); margin-top: 8px }

/* ─ MOBILE ─ */
@media (max-width: 768px) {
  .nav-lk { display: none; flex-direction: column; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,56,56,.98); backdrop-filter: blur(20px); justify-content: center; align-items: center; gap: 28px; z-index: 999 }
  .nav-lk-open { display: flex }
  .nav-lk-open .nav-a { color: rgba(255,253,235,.6) !important; font-size: 16px; letter-spacing: 2px }
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
  .v-map { border-radius: 10px }
  .exp-c { border-radius: 12px }
  .gold-div { width: 120px }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important }
}
`
