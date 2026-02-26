import { useState, useEffect, useRef } from 'react'

const GALLERY = [
  { url: '/photos/lake-sunset.jpg', label: 'Sun Moon Lake at Sunset', span: 2 },
  { url: '/photos/ceremony-hall.jpg', label: 'Soaring Cloud Hall — Ceremony', span: 1 },
  { url: '/photos/hotel-aerial-mist.jpg', label: 'Fleur de Chine — Misty Morning', span: 1 },
  { url: '/photos/lobby-fireplace.jpg', label: 'Hotel Lobby', span: 1 },
  { url: '/photos/hotel-entrance-dusk.jpg', label: 'Hotel Entrance at Twilight', span: 1 },
  { url: '/photos/lake-misty.jpg', label: 'Morning on the Lake', span: 2 },
  { url: '/photos/hotel-aerial-green.jpg', label: 'Aerial View — Sun Moon Lake', span: 1 },
  { url: '/photos/hallway-3f.jpg', label: 'Banquet Wing Hallway', span: 1 },
]

const T = {
  en: {
    langLabel: '中文',
    nav: ['Home', 'Our Story', 'Schedule', 'Venue', 'RSVP', 'FAQ'],
    hero: { date: 'December 19, 2026', dateDay: 'Saturday', venue: 'Fleur de Chine Hotel · Sun Moon Lake, Taiwan', tagline: 'Join us to celebrate', cta: 'RSVP Now' },
    noGift: { title: 'Your Presence Is Our Gift', body: "We kindly ask for no gifts, red envelopes, or monetary contributions. We simply want to share this joyful day with the people we love most. Your presence and your blessing are more than enough." },
    gallery: { title: 'The Venue', subtitle: 'Fleur de Chine · Sun Moon Lake' },
    story: {
      title: 'Our Story', subtitle: 'Two lives, two cultures, one love',
      p1: "What began as a connection across the Pacific grew into a love rooted in faith, family, and a shared vision for the future. Steven, from New Jersey, and Bonnie, from Taichung, found in each other a partner for life\u2019s greatest journey.",
      p2: "We were legally married in Taiwan and are overjoyed to celebrate our union with the people who matter most \u2014 at Sun Moon Lake, one of Taiwan\u2019s most beautiful places.",
      p3: "We believe marriage is a gift, and we are grateful for every person who has been part of our story. We look forward to celebrating with you."
    },
    schedule: {
      title: 'Wedding Day', subtitle: 'December 19, 2026 · Saturday',
      events: [
        { time: '10:00 AM', name: 'Wedding Ceremony', venue: 'Soaring Cloud Hall (\u96F2\u63DA\u5EF3)', detail: 'Lobby level \u2014 enter the hotel and follow the hallway to the banquet wing. Refreshments served beforehand.' },
        { time: '12:00 PM', name: 'Ceremony Concludes', venue: '', detail: 'Short walk to the reception hall right next door' },
        { time: '12:30 PM', name: 'Wedding Reception & Banquet', venue: 'Cosmos Cloud B Hall (\u96F2\u7FF0B\u5EF3)', detail: 'Chinese banquet, celebration, and fellowship' },
        { time: '3:00 PM', name: 'Farewell', venue: '', detail: 'Send-off with gratitude and joy' }
      ]
    },
    venue: {
      title: 'Getting There', subtitle: 'Fleur de Chine Hotel · Sun Moon Lake',
      address: 'No. 23, Zhongzheng Rd, Yuchi Township, Nantou County 555, Taiwan',
      addressZh: '\u5357\u6295\u7E23\u9B5A\u6C60\u9109\u65E5\u6708\u6F6D\u4E2D\u6B63\u8DEF23\u865F',
      domestic: {
        title: 'From Within Taiwan',
        steps: ['Drive to Sun Moon Lake (~1.5 hrs from Taichung), or', 'Take Nantou Bus (\u5357\u6295\u5BA2\u904B) from Taichung HSR Station directly to Sun Moon Lake', 'Free parking at the hotel for all wedding guests'],
        note: 'We may arrange a shuttle from Taichung HSR \u2014 please indicate on the RSVP if interested.'
      },
      overseas: {
        title: 'From Overseas',
        steps: [
          { icon: '\u2708', label: 'Fly into Taoyuan International Airport (TPE)' },
          { icon: '\uD83D\uDE84', label: 'Take HSR from Taoyuan Station \u2192 Taichung Station (40 min)' },
          { icon: '\uD83D\uDE8C', label: 'Bus or car from Taichung HSR \u2192 Sun Moon Lake (1.5 hrs)' },
          { icon: '\uD83C\uDFE8', label: 'Check in at Fleur de Chine Hotel' }
        ],
        note: 'We recommend arriving at least one day before the wedding to settle in and enjoy the area.'
      },
    },
    rsvp: {
      title: 'RSVP', subtitle: 'Please respond by November 19, 2026',
      desc: "Let us know if you can make it! Our RSVP form takes about 2 minutes and helps us plan seating, meals, and transportation.",
      submit: 'Open RSVP Form'
    },
    faq: {
      title: 'FAQ',
      items: [
        { q: 'Do I need to bring a gift or red envelope?', a: "No \u2014 please don\u2019t! We mean it. No gifts, no red envelopes (\u7D05\u5305), no monetary contributions. Your presence is truly the only gift we want." },
        { q: 'What should I wear?', a: "Formal attire. December at Sun Moon Lake is cool \u2014 around 12\u201318\u00B0C (54\u201364\u00B0F) \u2014 so bring a warm coat or wrap." },
        { q: 'What about the weather?', a: "Expect cool, crisp weather with possible morning mist. Layers are your friend. The ceremony and reception are both indoors with full climate control, but you\u2019ll want warmth for any time outdoors." },
        { q: 'Are children welcome?', a: 'Yes! Children are welcome at both the ceremony and reception.' },
        { q: 'What language will the ceremony be in?', a: 'Both English and Mandarin Chinese.' },
        { q: 'Where exactly is the ceremony?', a: "All banquet spaces are on the lobby level (the floor you enter on). Walk in and follow the hallway toward the banquet wing. Soaring Cloud Hall (ceremony) is at the end of the hallway, and Cosmos Cloud B Hall (reception) is nearby. There will be signage." },
        { q: "I\u2019m coming from overseas. How do I get there?", a: "Fly into Taoyuan Airport (TPE), take the HSR to Taichung (40 min), then bus or car to Sun Moon Lake (1.5 hrs). We recommend arriving the day before. See the Getting There section for the full step-by-step." }
      ]
    },
    explore: {
      title: "While You\u2019re Here", subtitle: 'Things to do around Sun Moon Lake',
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
    nav: ['\u9996\u9801', '\u6211\u5011\u7684\u6545\u4E8B', '\u5A5A\u79AE\u6D41\u7A0B', '\u4EA4\u901A\u4F4F\u5BBF', '\u51FA\u5E2D\u56DE\u8986', '\u5E38\u898B\u554F\u984C'],
    hero: { date: '2026\u5E7412\u670819\u65E5', dateDay: '\u661F\u671F\u516D', venue: '\u65E5\u6708\u6F6D \u00B7 \u96F2\u54C1\u6EAB\u6CC9\u9152\u5E97', tagline: '\u8AA0\u647F\u9080\u8ACB\u60A8\u4E00\u540C\u898B\u8B49', cta: '\u7ACB\u5373\u56DE\u8986' },
    noGift: { title: '\u60A8\u7684\u5230\u4F86\u5C31\u662F\u6700\u597D\u7684\u79AE\u7269', body: '\u6211\u5011\u61C7\u8ACB\u4E0D\u6536\u4EFB\u4F55\u79AE\u7269\u3001\u7D05\u5305\u6216\u79AE\u91D1\u3002\u6211\u5011\u53EA\u5E0C\u671B\u8207\u6700\u611B\u7684\u4EBA\u4E00\u8D77\u5206\u4EAB\u9019\u559C\u6A02\u7684\u4E00\u5929\u3002\u60A8\u7684\u5230\u4F86\u8207\u795D\u798F\uFF0C\u5C31\u662F\u5C0D\u6211\u5011\u6700\u5927\u7684\u6069\u5178\u3002' },
    gallery: { title: '\u5A5A\u79AE\u5834\u5730', subtitle: '\u96F2\u54C1\u6EAB\u6CC9\u9152\u5E97 \u00B7 \u65E5\u6708\u6F6D' },
    story: {
      title: '\u6211\u5011\u7684\u6545\u4E8B', subtitle: '\u5169\u500B\u751F\u547D\u3001\u5169\u7A2E\u6587\u5316\u3001\u4E00\u4EFD\u611B',
      p1: '\u4E00\u6BB5\u8DE8\u8D8A\u592A\u5E73\u6D0B\u7684\u7DE3\u5206\uFF0C\u6210\u9577\u70BA\u4EE5\u4FE1\u4EF0\u3001\u5BB6\u5EAD\u548C\u5171\u540C\u9858\u666F\u70BA\u6839\u57FA\u7684\u611B\u60C5\u3002Steven\u4F86\u81EA\u7F8E\u570B\u7D10\u6FA4\u897F\uFF0C\u5B50\u82B8\u4F86\u81EA\u53F0\u4E2D\uFF0C\u5169\u4EBA\u5728\u5F7C\u6B64\u8EAB\u4E0A\u627E\u5230\u4E86\u4EBA\u751F\u65C5\u9014\u4E2D\u6700\u597D\u7684\u5925\u4F34\u3002',
      p2: '\u6211\u5011\u5DF2\u5728\u53F0\u7063\u5B8C\u6210\u7D50\u5A5A\u767B\u8A18\uFF0C\u73FE\u5728\u7121\u6BD4\u559C\u6085\u5730\u9080\u8ACB\u5C0D\u6211\u5011\u6700\u91CD\u8981\u7684\u4EBA\uFF0C\u4E00\u540C\u5728\u7F8E\u9E97\u7684\u65E5\u6708\u6F6D\u6176\u795D\u6211\u5011\u7684\u7D50\u5408\u3002',
      p3: '\u6211\u5011\u76F8\u4FE1\u5A5A\u59FB\u662F\u6069\u8CDE\uFF0C\u611F\u8B1D\u6BCF\u4E00\u4F4D\u5728\u6211\u5011\u751F\u547D\u4E2D\u7559\u4E0B\u8DB3\u8DE1\u7684\u4EBA\u3002\u671F\u5F85\u8207\u60A8\u4E00\u540C\u6B61\u6176\u3002'
    },
    schedule: {
      title: '\u5A5A\u79AE\u6D41\u7A0B', subtitle: '2026\u5E7412\u670819\u65E5\uFF08\u516D\uFF09',
      events: [
        { time: '\u4E0A\u5348 10:00', name: '\u8B49\u5A5A\u5100\u5F0F', venue: '\u96F2\u63DA\u5EF3', detail: '\u5927\u5EF3\u6A13\u5C64\u2014\u2014\u9032\u5165\u9152\u5E97\u5F8C\u6CBF\u8D70\u5ECA\u524D\u5F80\u5BB4\u6703\u5340\u3002\u5100\u5F0F\u524D\u63D0\u4F9B\u8F15\u98DF\u53CA\u98F2\u54C1\u3002' },
        { time: '\u4E2D\u5348 12:00', name: '\u5100\u5F0F\u7D50\u675F', venue: '', detail: '\u6B65\u884C\u81F3\u96A8\u58C1\u5BB4\u6703\u5EF3' },
        { time: '\u4E2D\u5348 12:30', name: '\u559C\u5BB4', venue: '\u96F2\u7FF0B\u5EF3', detail: '\u4E2D\u5F0F\u559C\u5BB4\u3001\u6B61\u6176\u8207\u5718\u5951' },
        { time: '\u4E0B\u5348 3:00', name: '\u79AE\u6210', venue: '', detail: '\u6B61\u9001\u8CD3\u5BA2\uFF0C\u611F\u6069\u8207\u559C\u6A02' }
      ]
    },
    venue: {
      title: '\u4EA4\u901A\u6307\u5357', subtitle: '\u96F2\u54C1\u6EAB\u6CC9\u9152\u5E97 \u00B7 \u65E5\u6708\u6F6D',
      address: '\u5357\u6295\u7E23\u9B5A\u6C60\u9109\u65E5\u6708\u6F6D\u4E2D\u6B63\u8DEF23\u865F',
      domestic: {
        title: '\u53F0\u7063\u570B\u5167\u4EA4\u901A',
        steps: ['\u81EA\u884C\u958B\u8ECA\u81F3\u65E5\u6708\u6F6D\uFF08\u5F9E\u53F0\u4E2D\u51FA\u767C\u7D041.5\u5C0F\u6642\uFF09\uFF0C\u6216', '\u5F9E\u53F0\u4E2D\u9AD8\u9435\u7AD9\u642D\u4E58\u5357\u6295\u5BA2\u904B\u76F4\u9054\u65E5\u6708\u6F6D', '\u9152\u5E97\u63D0\u4F9B\u5A5A\u79AE\u8CD3\u5BA2\u514D\u8CBB\u505C\u8ECA'],
        note: '\u6211\u5011\u53EF\u80FD\u5B89\u6392\u5F9E\u53F0\u4E2D\u9AD8\u9435\u7AD9\u51FA\u767C\u7684\u63A5\u99C1\u8ECA\u2014\u2014\u8ACB\u5728\u56DE\u8986\u8868\u55AE\u4E2D\u544A\u77E5\u662F\u5426\u9700\u8981\u3002'
      },
      overseas: {
        title: '\u6D77\u5916\u8CD3\u5BA2\u4EA4\u901A',
        steps: [
          { icon: '\u2708', label: '\u98DB\u62B5\u6843\u5712\u570B\u969B\u6A5F\u5834\uFF08TPE\uFF09' },
          { icon: '\uD83D\uDE84', label: '\u642D\u4E58\u9AD8\u9435\uFF1A\u6843\u5712\u7AD9 \u2192 \u53F0\u4E2D\u7AD9\uFF08\u7D0440\u5206\u9418\uFF09' },
          { icon: '\uD83D\uDE8C', label: '\u5F9E\u53F0\u4E2D\u9AD8\u9435\u7AD9\u642D\u5BA2\u904B\u6216\u5305\u8ECA\u81F3\u65E5\u6708\u6F6D\uFF08\u7D041.5\u5C0F\u6642\uFF09' },
          { icon: '\uD83C\uDFE8', label: '\u5165\u4F4F\u96F2\u54C1\u6EAB\u6CC9\u9152\u5E97' }
        ],
        note: '\u5EFA\u8B70\u65BC\u5A5A\u79AE\u524D\u4E00\u5929\u62B5\u9054\uFF0C\u53EF\u9806\u4FBF\u4EAB\u53D7\u65E5\u6708\u6F6D\u7684\u7F8E\u666F\u3002'
      },
    },
    rsvp: {
      title: '\u51FA\u5E2D\u56DE\u8986', subtitle: '\u8ACB\u65BC2026\u5E7411\u670819\u65E5\u524D\u56DE\u8986',
      desc: '\u8ACB\u544A\u8A34\u6211\u5011\u60A8\u662F\u5426\u80FD\u51FA\u5E2D\uFF01\u586B\u5BEB\u56DE\u8986\u8868\u55AE\u50C5\u9700\u7D042\u5206\u9418\uFF0C\u6709\u52A9\u65BC\u6211\u5011\u5B89\u6392\u5EA7\u4F4D\u3001\u9910\u9EDE\u53CA\u4EA4\u901A\u3002',
      submit: '\u524D\u5F80\u56DE\u8986\u8868\u55AE'
    },
    faq: {
      title: '\u5E38\u898B\u554F\u984C',
      items: [
        { q: '\u9700\u8981\u9001\u79AE\u6216\u5305\u7D05\u5305\u55CE\uFF1F', a: '\u4E0D\u9700\u8981\uFF01\u6211\u5011\u662F\u8A8D\u771F\u7684\u3002\u8ACB\u4E0D\u8981\u6E96\u5099\u79AE\u7269\u3001\u7D05\u5305\u6216\u79AE\u91D1\u3002\u60A8\u7684\u5230\u4F86\u5C31\u662F\u6700\u597D\u7684\u79AE\u7269\u3002' },
        { q: '\u7A7F\u8457\u8981\u6C42\uFF1F', a: '\u8ACB\u8457\u6B63\u5F0F\u670D\u88DD\u3002\u5341\u4E8C\u6708\u7684\u65E5\u6708\u6F6D\u6C23\u6EAB\u8F03\u6DBC\uFF08\u7D0412\u201318\u00B0C\uFF09\uFF0C\u8ACB\u651C\u5E36\u4FDD\u6696\u5916\u5957\u3002' },
        { q: '\u5929\u6C23\u5982\u4F55\uFF1F', a: '\u9810\u8A08\u6DBC\u723D\u6E05\u65B0\uFF0C\u65E9\u6668\u53EF\u80FD\u6709\u8584\u9727\u3002\u5EFA\u8B70\u7A7F\u8457\u591A\u5C64\u6B21\u3002\u8B49\u5A5A\u5100\u5F0F\u53CA\u559C\u5BB4\u7686\u5728\u5BA4\u5167\uFF0C\u4F46\u6236\u5916\u6D3B\u52D5\u9700\u6CE8\u610F\u4FDD\u6696\u3002' },
        { q: '\u53EF\u4EE5\u651C\u5E36\u5C0F\u670B\u53CB\u55CE\uFF1F', a: '\u6B61\u8FCE\uFF01\u8B49\u5A5A\u5100\u5F0F\u53CA\u559C\u5BB4\u7686\u6B61\u8FCE\u5C0F\u670B\u53CB\u53C3\u52A0\u3002' },
        { q: '\u5100\u5F0F\u4F7F\u7528\u4EC0\u9EBC\u8A9E\u8A00\uFF1F', a: '\u4E2D\u82F1\u96D9\u8A9E\u9032\u884C\u3002' },
        { q: '\u5100\u5F0F\u5728\u54EA\u88E1\uFF1F', a: '\u6240\u6709\u5BB4\u6703\u5834\u5730\u90FD\u5728\u5927\u5EF3\u6A13\u5C64\u3002\u9032\u5165\u9152\u5E97\u5F8C\u6CBF\u8D70\u5ECA\u524D\u5F80\u5BB4\u6703\u5340\uFF0C\u96F2\u63DA\u5EF3\uFF08\u8B49\u5A5A\u5100\u5F0F\uFF09\u5728\u8D70\u5ECA\u76E1\u982D\uFF0C\u96F2\u7FF0B\u5EF3\uFF08\u559C\u5BB4\uFF09\u5728\u9644\u8FD1\u3002\u73FE\u5834\u6703\u6709\u6307\u793A\u6A19\u8A8C\u3002' },
        { q: '\u6211\u5F9E\u6D77\u5916\u524D\u4F86\uFF0C\u600E\u9EBC\u5230\u9054\uFF1F', a: '\u98DB\u62B5\u6843\u5712\u6A5F\u5834\uFF08TPE\uFF09\uFF0C\u642D\u9AD8\u9435\u81F3\u53F0\u4E2D\uFF0840\u5206\u9418\uFF09\uFF0C\u518D\u8F49\u4E58\u5BA2\u904B\u6216\u5305\u8ECA\u81F3\u65E5\u6708\u6F6D\uFF081.5\u5C0F\u6642\uFF09\u3002\u5EFA\u8B70\u5A5A\u79AE\u524D\u4E00\u5929\u62B5\u9054\u3002\u8A73\u60C5\u8ACB\u53C3\u95B1\u4EA4\u901A\u6307\u5357\u3002' },
        { q: '\u53EF\u4EE5\u4F4F\u5728\u9152\u5E97\u55CE\uFF1F', a: '\u53EF\u4EE5\uFF01\u5A5A\u79AE\u8CD3\u5BA2\u4EAB\u4E5D\u6298\u512A\u60E0\u3002\u8ACB\u64A5\u6253049-285-6788\u4E26\u544A\u77E5\u6211\u5011\u7684\u5A5A\u79AE\u540D\u7A31\u3002\u623F\u9593\u6709\u9650\uFF0C\u8ACB\u76E1\u65E9\u9810\u8A02\u3002' }
      ]
    },
    explore: {
      title: '\u65E5\u6708\u6F6D\u63A8\u85A6\u666F\u9EDE', subtitle: '\u4F86\u90FD\u4F86\u4E86\uFF0C\u9806\u4FBF\u8D70\u8D70',
      items: [
        { name: '\u65E5\u6708\u6F6D\u74B0\u6E56\u81EA\u884C\u8ECA\u9053', desc: '\u5168\u7403\u6700\u7F8E\u81EA\u884C\u8ECA\u9053\u4E4B\u4E00\uFF0C\u74B0\u7E5E\u6574\u500B\u6E56\u7554\u3002' },
        { name: '\u6587\u6B66\u5EDF', desc: '\u58EF\u89C0\u7684\u6E56\u7554\u9053\u6559\u5EDF\u5B87\uFF0C\u8DDD\u96E2\u9152\u5E97\u50C51\u516C\u91CC\u3002' },
        { name: '\u65E5\u6708\u6F6D\u7E9C\u8ECA', desc: '\u7A7A\u4E2D\u7E9C\u8ECA\u6B23\u8CDE\u6E56\u666F\u53CA\u5468\u570D\u5C71\u666F\u3002' },
        { name: '\u4F0A\u9054\u90B5\u90E8\u843D', desc: '\u90B5\u65CF\u539F\u4F4F\u6C11\u90E8\u843D\u2014\u2014\u5728\u5730\u7F8E\u98DF\u3001\u624B\u5DE5\u85DD\u54C1\u53CA\u6587\u5316\u9AD4\u9A57\u3002' },
        { name: '\u9152\u5E97\u6EAB\u6CC9', desc: '\u96F2\u54C1\u672C\u8EAB\u5C31\u6709\u5929\u7136\u6EAB\u6CC9\uFF0C\u6176\u795D\u5F8C\u6700\u9069\u5408\u653E\u9B06\u8EAB\u5FC3\u3002' }
      ]
    },
    footer: 'Steven & Bonnie', footerDate: '2026\u5E7412\u670819\u65E5', footerSub: '\u53F0\u7063 \u65E5\u6708\u6F6D',
    footerVerse: '\u300C\u5169\u500B\u4EBA\u7E3D\u6BD4\u4E00\u500B\u4EBA\u597D\uFF0C\u56E0\u70BA\u4E8C\u4EBA\u52DE\u7922\u540C\u5F97\u7F8E\u597D\u7684\u679C\u6548\u3002\u300D', footerRef: '\u50B3\u9053\u66F8 4:9'
  }
}

function useReveal() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, style: { opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.8s ease, transform 0.8s ease' } }
}

function Countdown({ lang }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const target = new Date('2026-12-19T10:00:00+08:00')
    const tick = () => {
      const diff = target - new Date()
      if (diff <= 0) return setT({ d: 0, h: 0, m: 0, s: 0 })
      setT({ d: Math.floor(diff / 864e5), h: Math.floor(diff % 864e5 / 36e5), m: Math.floor(diff % 36e5 / 6e4), s: Math.floor(diff % 6e4 / 1e3) })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  const labels = lang === 'en' ? ['Days', 'Hours', 'Min', 'Sec'] : ['\u5929', '\u6642', '\u5206', '\u79D2']
  return (
    <div className="cd">
      {[t.d, t.h, t.m, t.s].map((v, i) => (
        <div className="cu" key={i}><div className="cn">{v}</div><div className="cl">{labels[i]}</div></div>
      ))}
    </div>
  )
}

function Gallery({ title, subtitle }) {
  const r = useReveal()
  return (
    <section className="gal" ref={r.ref} style={r.style}>
      <div className="gal-inner">
        <div className="st" style={{ color: '#faf8f4' }}>{title}</div>
        <div className="ss" style={{ color: '#8a7b6a', marginBottom: 40 }}>{subtitle}</div>
        <div className="gg">
          {GALLERY.map((item, i) => (
            <div key={i} className={`gi ${item.span === 2 ? 'gs' : ''}`} style={{ backgroundImage: `url(${item.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <span className="gl">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const RSVP_URL = 'https://www.notion.so/tgre/3121cfcfd40f80b3a9f6d8e0251df083?pvs=106'

export default function App() {
  const [lang, setLang] = useState('zh')
  const [menuOpen, setMenuOpen] = useState(false)
  const l = T[lang]
  const secs = useRef([])
  const scrollTo = (i) => { secs.current[i]?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }

  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal(), r4 = useReveal(), r5 = useReveal(), r6 = useReveal()

  return (
    <div className="root">
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="nf">
        <div className="ni">
          <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 11, letterSpacing: 3, color: '#c8a96e', fontWeight: 300 }}>S & B</span>
          <button className="mt" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '\u2715' : '\u2630'}</button>
          <div className={`nl ${menuOpen ? 'open' : ''}`}>
            {l.nav.map((n, i) => <button key={i} className="nb" onClick={() => scrollTo(i)}>{n}</button>)}
            <button className="lb" onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}>{l.langLabel}</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hs" ref={el => secs.current[0] = el}>
        <div className="hn">Steven<span className="ha">&</span>Bonnie</div>
        <div className="ht">{l.hero.tagline}</div>
        <div className="hd">{l.hero.dateDay} · {l.hero.date}</div>
        <div className="hv">{l.hero.venue}</div>
        <Countdown lang={lang} />
        <a href={RSVP_URL} target="_blank" rel="noopener noreferrer" className="hc" style={{ textDecoration: 'none' }}>{l.hero.cta}</a>
      </section>

      {/* NO GIFT */}
      <div className="gb">
        <div className="gt">{l.noGift.title}</div>
        <div className="gp">{l.noGift.body}</div>
      </div>

      {/* GALLERY */}
      <Gallery title={l.gallery.title} subtitle={l.gallery.subtitle} />

      {/* STORY */}
      <div ref={r1.ref} style={r1.style}>
        <section className="sc" ref={el => secs.current[1] = el}>
          <div className="st">{l.story.title}</div>
          <div className="ss">{l.story.subtitle}</div>
          <div className="dv" />
          <p className="sp">{l.story.p1}</p>
          <p className="sp">{l.story.p2}</p>
          <p className="sp">{l.story.p3}</p>
        </section>
      </div>

      {/* SCHEDULE */}
      <div ref={r2.ref} style={r2.style}>
        <section style={{ background: '#f0ebe1' }} ref={el => secs.current[2] = el}>
          <div className="sc">
            <div className="st">{l.schedule.title}</div>
            <div className="ss">{l.schedule.subtitle}</div>
            <div className="dv" />
            {l.schedule.events.map((ev, i) => (
              <div className="ti" key={i}>
                <div className="tt">{ev.time}</div>
                <div>
                  <div className="tn">{ev.name}</div>
                  {ev.venue && <div className="tv">{ev.venue}</div>}
                  <div className="td">{ev.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* VENUE */}
      <div ref={r3.ref} style={r3.style}>
        <section className="sc" ref={el => secs.current[3] = el}>
          <div className="st">{l.venue.title}</div>
          <div className="ss">{l.venue.subtitle}</div>
          <div className="dv" />
          <p style={{ textAlign: 'center', fontSize: 14, color: '#a0917e', fontStyle: 'italic', marginBottom: 4 }}>{l.venue.address}</p>
          {lang === 'en' && <p style={{ textAlign: 'center', fontSize: 13, color: '#b8ad9e', marginBottom: 36 }}>{T.en.venue.addressZh}</p>}
          {lang === 'zh' && <div style={{ marginBottom: 36 }} />}

          <div className="vb">
            <div className="vt">{l.venue.domestic.title}</div>
            {l.venue.domestic.steps.map((s, i) => <div className="vs" key={i}>{s}</div>)}
            <div className="vn">{l.venue.domestic.note}</div>
          </div>

          <div className="vb">
            <div className="vt">{l.venue.overseas.title}</div>
            {l.venue.overseas.steps.map((s, i) => (
              <div className="os" key={i}>
                <div className="oi">{s.icon}</div>
                <div className="ol">{s.label}</div>
              </div>
            ))}
            <div className="vn">{l.venue.overseas.note}</div>
          </div>


          <iframe className="mc" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.8!2d120.912!3d23.868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468d66bcbaf5f5f%3A0xb297928ac211e576!2sFleur%20de%20Chine%20Hotel%20Sun%20Moon%20Lake!5e0!3m2!1sen!2stw!4v1700000000000" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Fleur de Chine" />
        </section>
      </div>

      {/* RSVP */}
      <div ref={r4.ref} style={r4.style}>
        <section style={{ background: '#f0ebe1' }} ref={el => secs.current[4] = el}>
          <div className="sc">
            <div className="st">{l.rsvp.title}</div>
            <div className="ss">{l.rsvp.subtitle}</div>
            <div className="dv" />
            <div style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
              <p style={{ fontSize: 16, lineHeight: 2, color: '#4a3f33', fontWeight: 300, marginBottom: 36 }}>{l.rsvp.desc}</p>
              <a href={RSVP_URL} target="_blank" rel="noopener noreferrer" className="fb" style={{ display: 'inline-block', width: 'auto', padding: '16px 48px', textDecoration: 'none', textAlign: 'center' }}>{l.rsvp.submit}</a>
            </div>
          </div>
        </section>
      </div>

      {/* FAQ */}
      <div ref={r5.ref} style={r5.style}>
        <section className="sc" ref={el => secs.current[5] = el}>
          <div className="st">{l.faq.title}</div>
          <div className="ss">&nbsp;</div>
          <div className="dv" />
          {l.faq.items.map((item, i) => (
            <div className="qi" key={i}>
              <div className="qq">{item.q}</div>
              <div className="qa">{item.a}</div>
            </div>
          ))}
        </section>
      </div>

      {/* EXPLORE */}
      <div ref={r6.ref} style={r6.style}>
        <section style={{ background: '#f0ebe1' }}>
          <div className="sc">
            <div className="st">{l.explore.title}</div>
            <div className="ss">{l.explore.subtitle}</div>
            <div className="dv" />
            {l.explore.items.map((item, i) => (
              <div className="ei" key={i}>
                <div className="en2">{item.name}</div>
                <div className="ed">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="ft">
        <div className="fn">{l.footer}</div>
        <div className="fd2">{l.footerDate}</div>
        <div className="fu">{l.footerSub}</div>
        <div className="fvr">{l.footerVerse}</div>
        <div className="frf">{l.footerRef}</div>
      </footer>
    </div>
  )
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Noto+Serif+TC:wght@300;400;500;600&family=Josefin+Sans:wght@300;400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}::selection{background:#c8a96e30}html{scroll-behavior:smooth}
.root{font-family:'Cormorant Garamond','Noto Serif TC',Georgia,serif;color:#2c2417;background:#faf8f4;min-height:100vh}

.nf{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(250,248,244,0.92);backdrop-filter:blur(12px);border-bottom:1px solid rgba(200,169,110,0.12)}
.ni{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:14px 32px}
.nl{display:flex;gap:28px;align-items:center}
.nb{font-family:'Josefin Sans','Noto Serif TC',sans-serif;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#6b5d4d;cursor:pointer;background:none;border:none;font-weight:300;transition:color 0.2s}.nb:hover{color:#c8a96e}
.lb{font-family:'Josefin Sans','Noto Serif TC',sans-serif;font-size:10px;letter-spacing:2px;padding:6px 16px;border:1px solid #c8a96e;background:transparent;color:#c8a96e;cursor:pointer;transition:all 0.2s}.lb:hover{background:#c8a96e;color:#fff}
.mt{display:none;background:none;border:none;color:#6b5d4d;cursor:pointer;font-size:20px}

.hs{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:120px 32px 80px;background:linear-gradient(180deg,#faf8f4 0%,#f5f0e8 50%,#ede6d8 100%)}
.hn{font-size:clamp(44px,8vw,82px);font-weight:300;letter-spacing:3px;color:#2c2417;line-height:1.15}
.ha{font-size:clamp(26px,4vw,42px);font-weight:300;color:#c8a96e;font-style:italic;display:block;margin:2px 0}
.ht{font-size:15px;color:#a0917e;font-style:italic;margin-top:28px;font-weight:300}
.hd{font-family:'Josefin Sans','Noto Serif TC',sans-serif;font-size:13px;letter-spacing:5px;text-transform:uppercase;color:#8a7b6a;margin-top:10px;font-weight:300}
.hv{font-family:'Josefin Sans','Noto Serif TC',sans-serif;font-size:11px;letter-spacing:2px;color:#a0917e;margin-top:6px;font-weight:300}
.cd{display:flex;gap:28px;justify-content:center;margin-top:32px;flex-wrap:wrap}
.cu{text-align:center;min-width:56px}.cn{font-family:'Josefin Sans',sans-serif;font-size:28px;font-weight:300;color:#2c2417}.cl{font-family:'Josefin Sans','Noto Serif TC',sans-serif;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#a0917e;margin-top:4px}
.hc{margin-top:48px;padding:14px 40px;font-family:'Josefin Sans','Noto Serif TC',sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;border:1px solid #c8a96e;background:transparent;color:#c8a96e;cursor:pointer;transition:all 0.3s}.hc:hover{background:#c8a96e;color:#fff}

.gb{background:#2c2417;color:#d4c9b8;text-align:center;padding:52px 32px}
.gt{font-size:22px;font-weight:400;color:#c8a96e;margin-bottom:16px;letter-spacing:1px}
.gp{font-size:15px;line-height:1.9;max-width:600px;margin:0 auto;font-weight:300;color:#b8ad9e}

.gal{background:#1e1a14;padding:80px 32px}
.gal-inner{max-width:1000px;margin:0 auto}
.gg{display:grid;grid-template-columns:repeat(2,1fr);gap:6px}
.gi{aspect-ratio:4/3;display:flex;align-items:flex-end;padding:16px;position:relative;overflow:hidden;background-size:cover;background-position:center}
.gs{grid-column:span 2;aspect-ratio:21/9}
.gl{font-family:'Josefin Sans',sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.7);position:relative;z-index:1;text-shadow:0 1px 4px rgba(0,0,0,0.5)}

.sc{max-width:800px;margin:0 auto;padding:100px 32px}
.st{font-size:clamp(28px,5vw,40px);font-weight:300;text-align:center;color:#2c2417;margin-bottom:8px}
.ss{font-family:'Josefin Sans','Noto Serif TC',sans-serif;font-size:12px;letter-spacing:3px;text-transform:uppercase;text-align:center;color:#a0917e;font-weight:300;margin-bottom:48px}
.dv{width:40px;height:1px;background:#c8a96e;margin:0 auto 48px}
.sp{font-size:16px;line-height:2;color:#4a3f33;font-weight:300;margin-bottom:24px;text-align:center}

.ti{display:grid;grid-template-columns:100px 1fr;gap:24px;padding:24px 0;border-bottom:1px solid rgba(200,169,110,0.12)}
.tt{font-family:'Josefin Sans','Noto Serif TC',sans-serif;font-size:12px;letter-spacing:1.5px;color:#c8a96e;padding-top:4px}
.tn{font-size:18px;font-weight:400;color:#2c2417;margin-bottom:4px}.tv{font-size:13px;color:#a0917e;font-style:italic;margin-bottom:4px}.td{font-size:14px;color:#6b5d4d;font-weight:300}

.vb{padding:36px 0;border-bottom:1px solid rgba(200,169,110,0.10)}
.vt{font-family:'Josefin Sans','Noto Serif TC',sans-serif;font-size:12px;letter-spacing:2.5px;text-transform:uppercase;color:#c8a96e;margin-bottom:16px}
.vs{font-size:14px;color:#4a3f33;font-weight:300;line-height:1.9;padding-left:16px;border-left:2px solid rgba(200,169,110,0.2);margin-bottom:8px}
.vn{font-size:13px;color:#a0917e;font-style:italic;margin-top:12px}
.os{display:flex;align-items:flex-start;gap:16px;padding:12px 0}
.oi{font-size:22px;width:36px;text-align:center;flex-shrink:0;line-height:1}
.ol{font-size:15px;color:#4a3f33;font-weight:300;line-height:1.7}
.hbox{background:#f0ebe1;padding:28px 32px;border-radius:2px;margin-top:24px}
.hbt{font-family:'Josefin Sans','Noto Serif TC',sans-serif;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#c8a96e;margin-bottom:12px}
.hbb{font-size:15px;color:#4a3f33;font-weight:300;line-height:1.8;margin-bottom:12px}
.hba{font-size:14px;color:#8a7b6a;font-weight:400}

.fb{display:block;width:100%;padding:16px;font-family:'Josefin Sans','Noto Serif TC',sans-serif;font-size:12px;letter-spacing:3px;text-transform:uppercase;border:1px solid #c8a96e;background:#c8a96e;color:#fff;cursor:pointer;transition:all 0.3s;margin-top:40px}.fb:hover{background:#b8963e}

.qi{padding:28px 0;border-bottom:1px solid rgba(200,169,110,0.10)}
.qq{font-size:17px;font-weight:400;color:#2c2417;margin-bottom:10px}.qa{font-size:15px;line-height:1.8;color:#6b5d4d;font-weight:300}
.ei{padding:20px 0;border-bottom:1px solid rgba(200,169,110,0.10)}
.en2{font-size:16px;font-weight:400;color:#2c2417;margin-bottom:4px}.ed{font-size:14px;color:#6b5d4d;font-weight:300;line-height:1.7}

.ft{text-align:center;padding:72px 32px;background:#2c2417;color:#d4c9b8}
.fn{font-size:clamp(24px,4vw,36px);font-weight:300;color:#faf8f4;letter-spacing:1px;margin-bottom:4px}
.fd2{font-family:'Josefin Sans','Noto Serif TC',sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#c8a96e;margin-bottom:4px}
.fu{font-family:'Josefin Sans','Noto Serif TC',sans-serif;font-size:11px;letter-spacing:2px;color:#6b5d4d}
.fvr{font-size:15px;font-style:italic;color:#8a7b6a;margin-top:28px;font-weight:300;max-width:500px;margin-left:auto;margin-right:auto;line-height:1.8}
.frf{font-family:'Josefin Sans','Noto Serif TC',sans-serif;font-size:10px;letter-spacing:2px;color:#6b5d4d;margin-top:6px}

.mc{width:100%;height:300px;border:none;margin-top:32px;border-radius:2px}

@media(max-width:768px){
  .nl{display:none}.nl.open{display:flex;flex-direction:column;position:absolute;top:56px;left:0;right:0;background:rgba(250,248,244,0.98);padding:20px;gap:16px;border-bottom:1px solid rgba(200,169,110,0.12)}.mt{display:block}
  .gg{grid-template-columns:1fr}.gs{grid-column:span 1;aspect-ratio:16/9}
}
@media(max-width:640px){.ti{grid-template-columns:80px 1fr;gap:16px}.sc{padding:72px 24px}.gb{padding:40px 24px}}
`
