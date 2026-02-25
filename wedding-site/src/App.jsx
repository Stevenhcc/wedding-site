import { useState, useEffect, useRef, useCallback } from "react";

/* ───── Photo mapping guide ─────
When deploying to Vercel, create /public/photos/ and add these files:
  1. lake-sunset.jpg         → 481084563...n.jpeg  (Sun Moon Lake golden hour)
  2. hotel-aerial-mist.jpg   → 568750566...n.jpeg  (misty aerial, hotel + lake)
  3. ceremony-hall.jpg        → 487278758...n.jpeg  (banquet hall with round tables & lake view)
  4. hotel-aerial-green.jpg   → 486459009...n.jpeg  (bright aerial, hotel on peninsula)
  5. lake-morning.jpg         → 534489555...n.jpeg  (calm blue lake panorama)
  6. lobby-fireplace.jpg      → 585875276...n.jpeg  (lobby with sunburst mirror + fireplace)
  7. lobby-wide.jpg           → 478060379...n.jpeg  (grand lobby wide angle)
  8. hallway-3f.jpg           → IMG_0190.jpeg       (3F corridor with lake view)
  9. hotel-blue-sky.jpg       → IMG_0189.jpeg       (hotel exterior, blue sky + flowers)
  10. hotel-dusk-fountain.jpg → 488210228...n.jpeg  (entrance at twilight with fountains)
  11. lake-dock-mist.jpg      → 488483192...n.jpeg  (misty lake with dock)
  12. hotel-drone.jpg         → 61790754...n.jpeg   (aerial green hillside)
───── */

const GALLERY_ITEMS = [
  { file: "lake-sunset.jpg", label: "Sun Moon Lake at Sunset", span: 2 },
  { file: "ceremony-hall.jpg", label: "Reception Hall — Lake View", span: 1 },
  { file: "hotel-aerial-mist.jpg", label: "Fleur de Chine — Misty Morning", span: 1 },
  { file: "lobby-fireplace.jpg", label: "Hotel Lobby", span: 1 },
  { file: "hotel-dusk-fountain.jpg", label: "Hotel Entrance at Twilight", span: 1 },
  { file: "lake-dock-mist.jpg", label: "Morning on the Lake", span: 2 },
];

const content = {
  en: {
    langLabel: "中文",
    nav: ["Home", "Our Story", "Schedule", "Venue", "RSVP", "FAQ"],
    hero: { date: "December 19, 2026", dateDay: "Saturday", venue: "Fleur de Chine Hotel · Sun Moon Lake, Taiwan", tagline: "Join us to celebrate", cta: "RSVP Now" },
    noGift: { title: "Your Presence Is Our Gift", body: "We kindly ask for no gifts, red envelopes, or monetary contributions. We simply want to share this joyful day with the people we love most. Your presence and your blessing are more than enough." },
    gallery: { title: "The Venue", subtitle: "Fleur de Chine · Sun Moon Lake" },
    story: {
      title: "Our Story", subtitle: "Two lives, two cultures, one love",
      p1: "What began as a connection across the Pacific grew into a love rooted in faith, family, and a shared vision for the future. Steven, from New Jersey, and Bonnie, from Taichung, found in each other a partner for life's greatest journey.",
      p2: "We were legally married in Taiwan and are overjoyed to celebrate our union with the people who matter most — at Sun Moon Lake, one of Taiwan's most beautiful places.",
      p3: "We believe marriage is a gift, and we are grateful for every person who has been part of our story. We look forward to celebrating with you.",
    },
    schedule: {
      title: "Wedding Day", subtitle: "December 19, 2026 · Saturday",
      events: [
        { time: "10:00 AM", name: "Wedding Ceremony", venue: "Soaring Cloud Hall (雲揚廳)", detail: "Lobby level — enter the hotel and follow the hallway to the banquet wing. Refreshments served beforehand." },
        { time: "12:00 PM", name: "Ceremony Concludes", venue: "", detail: "Short walk to the reception hall right next door" },
        { time: "12:30 PM", name: "Wedding Reception & Banquet", venue: "Cosmos Cloud B Hall (雲翰B廳)", detail: "Chinese banquet, celebration, and fellowship" },
        { time: "3:00 PM", name: "Farewell", venue: "", detail: "Send-off with gratitude and joy" },
      ],
    },
    venue: {
      title: "Getting There", subtitle: "Fleur de Chine Hotel · Sun Moon Lake",
      address: "No. 23, Zhongzheng Rd, Yuchi Township, Nantou County 555, Taiwan",
      domestic: {
        title: "From Within Taiwan",
        steps: [
          "Drive to Sun Moon Lake (~1.5 hrs from Taichung), or",
          "Take Nantou Bus (南投客運) from Taichung HSR Station directly to Sun Moon Lake",
          "Free parking at the hotel for all wedding guests",
        ],
        note: "We may arrange a shuttle from Taichung HSR — please indicate on the RSVP if interested.",
      },
      overseas: {
        title: "From Overseas",
        steps: [
          { icon: "✈", label: "Fly into Taoyuan International Airport (TPE)" },
          { icon: "🚄", label: "Take HSR from Taoyuan Station → Taichung Station (40 min)" },
          { icon: "🚌", label: "Bus or car from Taichung HSR → Sun Moon Lake (1.5 hrs)" },
          { icon: "🏨", label: "Check in at Fleur de Chine Hotel" },
        ],
        note: "We recommend arriving at least one day before the wedding to settle in and enjoy the area.",
      },
      hotel: {
        title: "Accommodation",
        body: "Wedding guests receive 10% off room rates at Fleur de Chine (Cloud Holiday room type). Sunday–Thursday: up to 8 rooms. Friday–Saturday: up to 5 rooms.",
        cta: "Call 049-285-6788 and mention \"Steven & Bonnie Wedding\" to book.",
      },
    },
    rsvp: {
      title: "RSVP", subtitle: "Please respond by November 19, 2026",
      fields: {
        name: "Full Name", namePh: "Your full name", email: "Email", emailPh: "your@email.com",
        phone: "Phone Number", phonePh: "Your phone number", guests: "Total Guests in Your Party",
        attending: "Attending", attendOpts: ["Ceremony & Reception", "Ceremony Only", "Reception Only", "Unable to Attend"],
        dietary: "Dietary Requirements", dietaryOpts: ["None", "Vegetarian (素食)", "Other"], dietaryOther: "Please specify",
        transport: "Transportation", transportOpts: ["Driving myself", "Interested in shuttle from Taichung HSR", "Coming from overseas — need travel guidance"],
        hotel: "Interested in room block? (10% off)", hotelOpts: ["Yes", "No"],
        notes: "Anything else we should know?", notesPh: "Allergies, accessibility needs, etc.",
        submit: "Open RSVP Form", submitted: "Thank you! We've received your RSVP and can't wait to celebrate with you.",
      },
    },
    faq: {
      title: "FAQ",
      items: [
        { q: "Do I need to bring a gift or red envelope?", a: "No — please don't! We mean it. No gifts, no red envelopes (紅包), no monetary contributions. Your presence is truly the only gift we want." },
        { q: "What should I wear?", a: "Formal attire. December at Sun Moon Lake is cool — around 12–18°C (54–64°F) — so bring a warm coat or wrap." },
        { q: "What about the weather?", a: "Expect cool, crisp weather with possible morning mist. Layers are your friend. The ceremony and reception are both indoors with full climate control, but you'll want warmth for any time outdoors." },
        { q: "Are children welcome?", a: "Yes! Children are welcome at both the ceremony and reception." },
        { q: "What language will the ceremony be in?", a: "Both English and Mandarin Chinese." },
        { q: "Where exactly is the ceremony?", a: "All banquet spaces are on the lobby level (the floor you enter on). Walk in and follow the hallway toward the banquet wing. Soaring Cloud Hall (ceremony) is at the end of the hallway, and Cosmos Cloud B Hall (reception) is nearby. There will be signage." },
        { q: "I'm coming from overseas. How do I get there?", a: "Fly into Taoyuan Airport (TPE), take the HSR to Taichung (40 min), then bus or car to Sun Moon Lake (1.5 hrs). We recommend arriving the day before. See the Getting There section for the full step-by-step." },
        { q: "Can I stay at the hotel?", a: "Yes! 10% off for wedding guests. Call 049-285-6788 and mention our wedding. Book early — rooms are limited." },
      ],
    },
    explore: {
      title: "While You're Here", subtitle: "Things to do around Sun Moon Lake",
      items: [
        { name: "Sun Moon Lake Cycling Path", desc: "One of the world's most beautiful bike paths, circling the entire lake." },
        { name: "Wenwu Temple", desc: "Grand lakeside Taoist temple with stunning panoramic views, just 1km away." },
        { name: "Sun Moon Lake Ropeway", desc: "Cable car offering aerial views of the lake and mountains." },
        { name: "Ita Thao Village", desc: "Indigenous Thao tribal village — local cuisine, crafts, and cultural experiences." },
        { name: "Hotel Hot Springs", desc: "Fleur de Chine has natural hot springs. Perfect for unwinding after the celebration." },
      ],
    },
    footer: "Steven & Bonnie", footerDate: "December 19, 2026",
    footerSub: "Sun Moon Lake, Taiwan",
    footerVerse: "\"Two are better than one, because they have a good return for their labor.\"",
    footerRef: "Ecclesiastes 4:9",
  },
  zh: {
    langLabel: "EN",
    nav: ["首頁", "我們的故事", "婚禮流程", "交通住宿", "出席回覆", "常見問題"],
    hero: { date: "2026年12月19日", dateDay: "星期六", venue: "日月潭 · 雲品溫泉酒店", tagline: "誠摯邀請您一同見證", cta: "立即回覆" },
    noGift: { title: "您的到來就是最好的禮物", body: "我們懇請不收任何禮物、紅包或禮金。我們只希望與最愛的人一起分享這喜樂的一天。您的到來與祝福，就是對我們最大的恩典。" },
    gallery: { title: "婚禮場地", subtitle: "雲品溫泉酒店 · 日月潭" },
    story: {
      title: "我們的故事", subtitle: "兩個生命、兩種文化、一份愛",
      p1: "一段跨越太平洋的緣分，成長為以信仰、家庭和共同願景為根基的愛情。Steven來自美國紐澤西，子芸來自台中，兩人在彼此身上找到了人生旅途中最好的夥伴。",
      p2: "我們已在台灣完成結婚登記，現在無比喜悅地邀請對我們最重要的人，一同在美麗的日月潭慶祝我們的結合。",
      p3: "我們相信婚姻是恩賜，感謝每一位在我們生命中留下足跡的人。期待與您一同歡慶。",
    },
    schedule: {
      title: "婚禮流程", subtitle: "2026年12月19日（六）",
      events: [
        { time: "上午 10:00", name: "證婚儀式", venue: "雲揚廳", detail: "大廳樓層——進入酒店後沿走廊前往宴會區。儀式前提供輕食及飲品。" },
        { time: "中午 12:00", name: "儀式結束", venue: "", detail: "步行至隔壁宴會廳" },
        { time: "中午 12:30", name: "喜宴", venue: "雲翰B廳", detail: "中式喜宴、歡慶與團契" },
        { time: "下午 3:00", name: "禮成", venue: "", detail: "歡送賓客，感恩與喜樂" },
      ],
    },
    venue: {
      title: "交通指南", subtitle: "雲品溫泉酒店 · 日月潭",
      address: "南投縣魚池鄉日月潭中正路23號",
      domestic: {
        title: "台灣國內交通",
        steps: [
          "自行開車至日月潭（從台中出發約1.5小時），或",
          "從台中高鐵站搭乘南投客運直達日月潭",
          "酒店提供婚禮賓客免費停車",
        ],
        note: "我們可能安排從台中高鐵站出發的接駁車——請在回覆表單中告知是否需要。",
      },
      overseas: {
        title: "海外賓客交通",
        steps: [
          { icon: "✈", label: "飛抵桃園國際機場（TPE）" },
          { icon: "🚄", label: "搭乘高鐵：桃園站 → 台中站（約40分鐘）" },
          { icon: "🚌", label: "從台中高鐵站搭客運或包車至日月潭（約1.5小時）" },
          { icon: "🏨", label: "入住雲品溫泉酒店" },
        ],
        note: "建議於婚禮前一天抵達，可順便享受日月潭的美景。",
      },
      hotel: {
        title: "住宿資訊",
        body: "婚禮賓客享雲品假期房型浮動房價九折優惠。週日至週四限8間，週五至週六限5間。",
        cta: "請撥打 049-285-6788，告知「Steven & Bonnie Wedding」即可預訂。",
      },
    },
    rsvp: {
      title: "出席回覆", subtitle: "請於2026年11月19日前回覆",
      fields: {
        name: "姓名", namePh: "您的全名", email: "電子郵件", emailPh: "your@email.com",
        phone: "電話號碼", phonePh: "您的電話號碼", guests: "出席人數（含本人）",
        attending: "出席項目", attendOpts: ["證婚儀式及喜宴", "僅出席證婚儀式", "僅出席喜宴", "無法出席"],
        dietary: "飲食需求", dietaryOpts: ["無特殊需求", "素食", "其他"], dietaryOther: "請說明",
        transport: "交通方式", transportOpts: ["自行開車", "有興趣搭乘台中高鐵站接駁車", "從海外前來——需要交通指引"],
        hotel: "是否需要住宿？（享九折優惠）", hotelOpts: ["是", "否"],
        notes: "其他我們需要知道的事？", notesPh: "過敏、無障礙需求等",
        submit: "前往回覆表單", submitted: "感謝您！我們已收到您的回覆，期待與您一同歡慶。",
      },
    },
    faq: {
      title: "常見問題",
      items: [
        { q: "需要送禮或包紅包嗎？", a: "不需要！我們是認真的。請不要準備禮物、紅包或禮金。您的到來就是最好的禮物。" },
        { q: "穿著要求？", a: "請著正式服裝。十二月的日月潭氣溫較涼（約12–18°C），請攜帶保暖外套。" },
        { q: "天氣如何？", a: "預計涼爽清新，早晨可能有薄霧。建議穿著多層次。證婚儀式及喜宴皆在室內，但戶外活動需注意保暖。" },
        { q: "可以攜帶小朋友嗎？", a: "歡迎！證婚儀式及喜宴皆歡迎小朋友參加。" },
        { q: "儀式使用什麼語言？", a: "中英雙語進行。" },
        { q: "儀式在哪裡？", a: "所有宴會場地都在大廳樓層（即您進入酒店的那一層）。進入酒店後沿走廊前往宴會區，雲揚廳（證婚儀式）在走廊盡頭，雲翰B廳（喜宴）在附近。現場會有指示標誌。" },
        { q: "我從海外前來，怎麼到達？", a: "飛抵桃園機場（TPE），搭高鐵至台中（40分鐘），再轉乘客運或包車至日月潭（1.5小時）。建議婚禮前一天抵達。詳情請參閱交通指南。" },
        { q: "可以住在酒店嗎？", a: "可以！婚禮賓客享九折優惠。請撥打049-285-6788並告知我們的婚禮名稱。房間有限，請盡早預訂。" },
      ],
    },
    explore: {
      title: "日月潭推薦景點", subtitle: "來都來了，順便走走",
      items: [
        { name: "日月潭環湖自行車道", desc: "全球最美自行車道之一，環繞整個湖畔。" },
        { name: "文武廟", desc: "壯觀的湖畔道教廟宇，距離酒店僅1公里。" },
        { name: "日月潭纜車", desc: "空中纜車欣賞湖景及周圍山景。" },
        { name: "伊達邵部落", desc: "邵族原住民部落——在地美食、手工藝品及文化體驗。" },
        { name: "酒店溫泉", desc: "雲品本身就有天然溫泉，慶祝後最適合放鬆身心。" },
      ],
    },
    footer: "Steven & Bonnie", footerDate: "2026年12月19日",
    footerSub: "台灣 日月潭",
    footerVerse: "「兩個人總比一個人好，因為二人勞碌同得美好的果效。」",
    footerRef: "傳道書 4:9",
  },
};

function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, style: { opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.8s ease, transform 0.8s ease" } };
}

function Countdown({ lang }) {
  const [d, setD] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const t = new Date("2026-12-19T10:00:00+08:00");
    const tick = () => { const ms = t - new Date(); if (ms <= 0) return setD({ d: 0, h: 0, m: 0, s: 0 }); setD({ d: Math.floor(ms/864e5), h: Math.floor(ms%864e5/36e5), m: Math.floor(ms%36e5/6e4), s: Math.floor(ms%6e4/1e3) }); };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);
  const l = lang === "en" ? ["Days","Hours","Min","Sec"] : ["天","時","分","秒"];
  return (<div className="cd">{[d.d,d.h,d.m,d.s].map((v,i)=>(<div key={i} className="cu"><div className="cn">{v}</div><div className="cl">{l[i]}</div></div>))}</div>);
}

function Gallery({ title, subtitle }) {
  const f = useFadeIn();
  const colors = [
    "linear-gradient(135deg,#3a5a7c,#8b4a5e)","linear-gradient(135deg,#b89a6a,#7a5c2e)",
    "linear-gradient(135deg,#2c4e5e,#6aaf80)","linear-gradient(135deg,#9a8060,#5a3a1a)",
    "linear-gradient(135deg,#4a5a7a,#3a4a6a)","linear-gradient(135deg,#3a6a86,#5a8aae)",
  ];
  return (
    <section className="gal" ref={f.ref} style={f.style}>
      <div className="gal-inner">
        <div className="st" style={{color:"#faf8f4"}}>{title}</div>
        <div className="ss" style={{color:"#8a7b6a",marginBottom:40}}>{subtitle}</div>
        <div className="gg">
          {GALLERY_ITEMS.map((p,i) => (
            <div key={i} className={`gi ${p.span===2?"gs":""}`} style={{background:colors[i]}}>
              <span className="gl">{p.label}</span>
              <div className="gph">↑ {p.file}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function WeddingSite() {
  const [lang, setLang] = useState("en");
  const [mob, setMob] = useState(false);
  const t = content[lang];
  const refs = useRef([]);
  const go = i => { refs.current[i]?.scrollIntoView({behavior:"smooth"}); setMob(false); };
  const RSVP_URL = "https://www.notion.so/tgre/3121cfcfd40f80b3a9f6d8e0251df083?pvs=106";

  const f1=useFadeIn(),f2=useFadeIn(),f3=useFadeIn(),f4=useFadeIn(),f5=useFadeIn(),f6=useFadeIn(),f7=useFadeIn();

  return (
    <div className="root">
      <style>{`
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
.gi{aspect-ratio:4/3;display:flex;align-items:flex-end;padding:16px;position:relative;overflow:hidden}
.gs{grid-column:span 2;aspect-ratio:21/9}
.gl{font-family:'Josefin Sans',sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.5);position:relative;z-index:1}
.gph{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:rgba(255,255,255,0.15);font-family:'Josefin Sans',sans-serif;font-size:11px;letter-spacing:1px;text-align:center;white-space:nowrap}

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

.fg{margin-bottom:28px}
.fl{display:block;font-family:'Josefin Sans','Noto Serif TC',sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a7b6a;margin-bottom:8px}
.fi,.fs,.fa{width:100%;padding:12px 0;font-family:'Cormorant Garamond','Noto Serif TC',serif;font-size:16px;color:#2c2417;border:none;border-bottom:1px solid #d4c9b8;background:transparent;outline:none;transition:border-color 0.2s}
.fi:focus,.fs:focus,.fa:focus{border-bottom-color:#c8a96e}.fi::placeholder,.fa::placeholder{color:#c4b9a8}
.fs{cursor:pointer;-webkit-appearance:none;appearance:none}.fa{resize:vertical;min-height:60px}
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
      `}</style>

      <nav className="nf"><div className="ni">
        <span style={{fontFamily:"'Josefin Sans',sans-serif",fontSize:11,letterSpacing:3,color:"#c8a96e",fontWeight:300}}>S & B</span>
        <button className="mt" onClick={()=>setMob(!mob)}>{mob?"✕":"☰"}</button>
        <div className={`nl ${mob?"open":""}`}>
          {t.nav.map((l,i)=><button key={i} className="nb" onClick={()=>go(i)}>{l}</button>)}
          <button className="lb" onClick={()=>setLang(lang==="en"?"zh":"en")}>{t.langLabel}</button>
        </div>
      </div></nav>

      <section className="hs" ref={el=>refs.current[0]=el}>
        <div className="hn">Steven<span className="ha">&</span>Bonnie</div>
        <div className="ht">{t.hero.tagline}</div>
        <div className="hd">{t.hero.dateDay} · {t.hero.date}</div>
        <div className="hv">{t.hero.venue}</div>
        <Countdown lang={lang}/>
        <a href={RSVP_URL} target="_blank" rel="noopener noreferrer" className="hc" style={{textDecoration:"none"}}>{t.hero.cta}</a>
      </section>

      <div className="gb"><div className="gt">{t.noGift.title}</div><div className="gp">{t.noGift.body}</div></div>

      <Gallery title={t.gallery.title} subtitle={t.gallery.subtitle}/>

      <div ref={f1.ref} style={f1.style}>
        <section className="sc" ref={el=>refs.current[1]=el}>
          <div className="st">{t.story.title}</div><div className="ss">{t.story.subtitle}</div><div className="dv"/>
          <p className="sp">{t.story.p1}</p><p className="sp">{t.story.p2}</p><p className="sp">{t.story.p3}</p>
        </section>
      </div>

      <div ref={f2.ref} style={f2.style}>
        <section style={{background:"#f0ebe1"}} ref={el=>refs.current[2]=el}>
          <div className="sc">
            <div className="st">{t.schedule.title}</div><div className="ss">{t.schedule.subtitle}</div><div className="dv"/>
            {t.schedule.events.map((ev,i)=>(<div className="ti" key={i}><div className="tt">{ev.time}</div><div><div className="tn">{ev.name}</div>{ev.venue&&<div className="tv">{ev.venue}</div>}<div className="td">{ev.detail}</div></div></div>))}
          </div>
        </section>
      </div>

      <div ref={f3.ref} style={f3.style}>
        <section className="sc" ref={el=>refs.current[3]=el}>
          <div className="st">{t.venue.title}</div><div className="ss">{t.venue.subtitle}</div><div className="dv"/>
          <p style={{textAlign:"center",fontSize:14,color:"#a0917e",fontStyle:"italic",marginBottom:4}}>{t.venue.address}</p>
          {lang==="en"&&<p style={{textAlign:"center",fontSize:13,color:"#b8ad9e",marginBottom:36}}>南投縣魚池鄉日月潭中正路23號</p>}
          {lang==="zh"&&<div style={{marginBottom:36}}/>}

          <div className="vb"><div className="vt">{t.venue.domestic.title}</div>
            {t.venue.domestic.steps.map((s,i)=><div className="vs" key={i}>{s}</div>)}
            <div className="vn">{t.venue.domestic.note}</div>
          </div>

          <div className="vb"><div className="vt">{t.venue.overseas.title}</div>
            {t.venue.overseas.steps.map((s,i)=>(<div className="os" key={i}><div className="oi">{s.icon}</div><div className="ol">{s.label}</div></div>))}
            <div className="vn">{t.venue.overseas.note}</div>
          </div>

          <div className="hbox"><div className="hbt">{t.venue.hotel.title}</div><div className="hbb">{t.venue.hotel.body}</div><div className="hba">{t.venue.hotel.cta}</div></div>

          <iframe className="mc" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.8!2d120.912!3d23.868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468d66bcbaf5f5f%3A0xb297928ac211e576!2sFleur%20de%20Chine%20Hotel%20Sun%20Moon%20Lake!5e0!3m2!1sen!2stw!4v1700000000000" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Fleur de Chine"/>
        </section>
      </div>

      <div ref={f4.ref} style={f4.style}>
        <section style={{background:"#f0ebe1"}} ref={el=>refs.current[4]=el}>
          <div className="sc">
            <div className="st">{t.rsvp.title}</div><div className="ss">{t.rsvp.subtitle}</div><div className="dv"/>
            <div style={{textAlign:"center",maxWidth:520,margin:"0 auto"}}>
              <p style={{fontSize:16,lineHeight:2,color:"#4a3f33",fontWeight:300,marginBottom:36}}>
                {lang === "en"
                  ? "Let us know if you can make it! Our RSVP form takes about 2 minutes and helps us plan seating, meals, and transportation."
                  : "請告訴我們您是否能出席！填寫回覆表單僅需約2分鐘，有助於我們安排座位、餐點及交通。"}
              </p>
              <a href={RSVP_URL} target="_blank" rel="noopener noreferrer" className="fb" style={{display:"inline-block",width:"auto",padding:"16px 48px",textDecoration:"none",textAlign:"center"}}>
                {t.rsvp.fields.submit}
              </a>
            </div>
          </div>
        </section>
      </div>

      <div ref={f5.ref} style={f5.style}>
        <section className="sc" ref={el=>refs.current[5]=el}>
          <div className="st">{t.faq.title}</div><div className="ss">&nbsp;</div><div className="dv"/>
          {t.faq.items.map((item,i)=>(<div className="qi" key={i}><div className="qq">{item.q}</div><div className="qa">{item.a}</div></div>))}
        </section>
      </div>

      <div ref={f6.ref} style={f6.style}>
        <section style={{background:"#f0ebe1"}}>
          <div className="sc">
            <div className="st">{t.explore.title}</div><div className="ss">{t.explore.subtitle}</div><div className="dv"/>
            {t.explore.items.map((item,i)=>(<div className="ei" key={i}><div className="en2">{item.name}</div><div className="ed">{item.desc}</div></div>))}
          </div>
        </section>
      </div>

      <footer className="ft">
        <div className="fn">{t.footer}</div>
        <div className="fd2">{t.footerDate}</div>
        <div className="fu">{t.footerSub}</div>
        <div className="fvr">{t.footerVerse}</div>
        <div className="frf">{t.footerRef}</div>
      </footer>
    </div>
  );
}
