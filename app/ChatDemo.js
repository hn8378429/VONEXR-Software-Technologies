"use client";

import { Fragment, useEffect, useRef, useState } from "react";

const START = [
  { id: 1, from: "them", text: "Do you have the black hoodie in large?", time: "10:42" },
  { id: 2, from: "us", text: "Yes, 6 left in large. Rs 3,499. Want me to place the order?", time: "10:42 ✓✓" },
  { id: 3, from: "them", text: "Yes, deliver to Karachi.", time: "10:43" },
  { id: 4, from: "us", text: "Done. Order #1042 confirmed. Delivery in 2 to 3 days.", time: "10:43 ✓✓" },
];

const START_CHIPS = ["What sizes do you have?", "How much is delivery?", "What can VONEXR build for me?"];
const DEFAULT_CHIPS = ["What is the price?", "Do you have discounts?", "What can VONEXR build for me?"];
const CTA = " Want an agent like this for your business? Message VONEXR on WhatsApp.";

/* ---------------------------------------------------------------
   Har rule: keys (words/phrases), reply, chips (agle suggestions)
   - single word: prefix se match hota hai ("size" -> "sizes")
   - 3 ya kam letters wale words poore match hone chahiye
   - phrase (space wala) ka wazan 2 hai
   - barabar score par pehla rule jeetta hai
---------------------------------------------------------------- */
const RULES = [
  /* ---------- STORE ---------- */
  {
    keys: ["track", "tracking", "where is my order", "order status", "order number", "parcel", "shipped", "status", "dispatched"],
    reply: "Please share your order number, like #1042, and I will check it for you.",
    awaiting: "track",
    chips: ["#1042", "How much is delivery?", "Can I return an item?"],
  },
  {
    keys: ["return", "exchange", "refund", "replace", "wrong size", "damaged", "defective", "money back"],
    reply: "You can exchange or return within 7 days if the tag is still on. If an item arrives damaged or in the wrong size, we replace it free. Want me to start an exchange?",
    chips: ["Track my order", "What sizes do you have?", "Do you have discounts?"],
  },
  {
    keys: ["discount", "offer", "sale", "coupon", "promo", "deal", "free delivery", "code", "cheaper", "off"],
    reply: "Right now you get free delivery above Rs 5,000, and 10% off your first order with code WELCOME10.",
    chips: ["What is the price?", "Place the order", "How much is delivery?"],
  },
  {
    keys: ["size", "large", "medium", "small", "xl", "xxl", "fit", "fitting", "chart"],
    reply: "The hoodie is available in S, M, L and XL. Large has 6 left and medium has 11. Which size should I reserve?",
    awaiting: "order",
    chips: ["Is it in stock?", "How much is delivery?", "Place the order"],
  },
  {
    keys: ["stock", "available", "availability", "left", "restock", "sold out", "remaining"],
    reply: "Large has 6 left, medium has 11, and small and XL are available too. Want me to reserve one for you?",
    awaiting: "order",
    chips: ["What is the price?", "How much is delivery?", "Place the order"],
  },
  {
    keys: ["deliver", "shipping", "ship", "karachi", "lahore", "islamabad", "rawalpindi", "peshawar", "quetta", "multan", "faisalabad", "city", "cities", "courier", "delivery charge", "delivery fee"],
    reply: "We deliver all over Pakistan. Karachi takes 2 to 3 days and other cities 3 to 5 days. Delivery is Rs 200 under Rs 5,000 and free above that.",
    chips: ["Can I pay cash on delivery?", "Track my order", "Do you have discounts?"],
  },
  {
    keys: ["pay", "payment", "cod", "cash", "card", "easypaisa", "jazzcash", "bank", "transfer", "advance", "installment"],
    reply: "You can pay by cash on delivery, card, bank transfer, Easypaisa or JazzCash. Card and wallet payments are confirmed instantly.",
    chips: ["How much is delivery?", "Can I return an item?", "Place the order"],
  },
  {
    keys: ["color", "colour", "black", "grey", "gray", "navy", "shade"],
    reply: "The hoodie comes in black, grey and navy. Black is the most popular. Which one would you like?",
    awaiting: "order",
    chips: ["What sizes do you have?", "Is it in stock?", "What is the price?"],
  },
  {
    keys: ["fabric", "material", "cotton", "fleece", "wash", "care", "quality", "shrink", "warm", "winter", "gsm", "soft"],
    reply: "It is a 320 GSM cotton fleece: soft inside, warm for winter and it holds its shape. Machine wash cold, inside out, and it should not shrink much.",
    chips: ["What sizes do you have?", "What colors are there?", "What is the price?"],
  },
  {
    keys: ["price", "cost", "rate", "kitne", "kitna", "qeemat", "expensive", "cheap", "afford"],
    reply: "The black hoodie is Rs 3,499. Orders above Rs 5,000 get free delivery, and new customers get 10% off with code WELCOME10. Want me to place an order?",
    awaiting: "order",
    chips: ["What sizes do you have?", "How much is delivery?", "Can I pay cash on delivery?"],
  },
  {
    keys: ["jeans", "shirt", "tshirt", "cap", "caps", "jacket", "hoodie", "trouser", "shoes", "catalog", "collection", "products", "joggers", "other"],
    reply: "We sell hoodies, t-shirts, jackets, joggers and caps. The black hoodie is our best seller. Tell me what you are looking for and I will check sizes and price.",
    chips: ["What sizes do you have?", "What is the price?", "What colors are there?"],
  },
  {
    keys: ["gift", "wrap", "wrapping", "present", "birthday", "surprise"],
    reply: "Yes! Gift wrapping is Rs 250, and we can add a handwritten note. Just tell me when you place the order.",
    chips: ["Place the order", "How much is delivery?", "What is the price?"],
  },
  {
    keys: ["location", "address", "where are you", "visit", "timing", "open", "hours", "close", "branch", "pickup", "shop"],
    reply: "We are online 24/7, and our Karachi pickup point is open 11 am to 9 pm, Monday to Saturday. Most customers just order online.",
    chips: ["How much is delivery?", "Place the order", "How can I contact you?"],
  },
  {
    keys: ["order", "buy", "purchase", "book", "reserve", "checkout", "place", "confirm"],
    reply: (ctx) => {
      const n = ctx.orderNo++;
      return `Done! Order #${n} is placed for the black hoodie in large. You will get a WhatsApp update when it ships.`;
    },
    chips: ["Track my order", "Can I pay cash on delivery?", "Do you have discounts?"],
  },

  /* ---------- VONEXR ---------- */
  {
    keys: ["how much does", "cost of a", "quote", "budget", "charges", "fixed price", "kitna lagega", "kharcha", "vonexr cost"],
    reply: "Price depends on the pages and features, so VONEXR gives a fixed quote before any work starts, with no surprise charges. Tap Get a free quote and you will hear back within a day.",
    chips: ["How long does it take?", "How do I get started?", "Can you build an AI agent?"],
    vonexr: true,
  },
  {
    keys: ["how long does it take", "how long does a", "how long will a", "how long to build", "timeline", "deadline", "turnaround", "kitne din"],
    reply: "A simple business website takes about a week. Online stores and web apps usually take two to four weeks, depending on features. An AI agent depends on how much data it needs to connect.",
    chips: ["How much does it cost?", "What tech do you use?", "Do you offer support later?"],
    vonexr: true,
  },
  {
    keys: ["ai agent", "agent", "chatbot", "whatsapp bot", "whatsapp agent", "like you", "automate", "automation", "assistant", "gpt", "bot", "ai"],
    reply: "An AI agent answers customer questions, books appointments, takes orders and hands over to a human when needed. It can live on your website chat or WhatsApp. I am a small demo. A real one is connected to your products and data.",
    chips: ["How much does it cost?", "How long does it take?", "Show me your work"],
    vonexr: true,
  },
  {
    keys: ["how to start", "get started", "how does it work", "how do i hire", "hire", "work with you", "start a project", "process", "next step", "kaise shuru"],
    reply: "It is simple: 1) tell us your goal on WhatsApp or the form, 2) get a fixed quote and timeline, 3) we build and you review each stage, 4) we launch, train you and support you. Tap Get a free quote to begin.",
    chips: ["How much does it cost?", "Show me your work", "How can I contact you?"],
    vonexr: true,
  },
  {
    keys: ["portfolio", "your work", "previous work", "past work", "examples", "projects", "sample", "demo"],
    reply: "VONEXR has built an AI-driven book with an Urdu and English chatbot, a furniture store, a beauty store demo, a Ramzan Calendar app, a New Year countdown, a resume builder and more. Scroll to Projects we have built, and each card opens the live site.",
    chips: ["What can VONEXR build for me?", "How much does it cost?", "How do I get started?"],
    vonexr: true,
  },
  {
    keys: ["tech", "stack", "nextjs", "next js", "react", "python", "openai", "claude", "framework"],
    reply: "VONEXR builds with Next.js, React, TypeScript, Tailwind CSS and Python, and connects OpenAI and Claude APIs for AI agents. Sites are hosted on Vercel.",
    chips: ["How much does it cost?", "How long does it take?", "Show me your work"],
    vonexr: true,
  },
  {
    keys: ["after launch", "maintenance", "support", "bug", "hosting", "domain"],
    reply: "Yes, support continues after launch: bug fixes, content updates and new features. Mention what you need when you ask for a quote.",
    chips: ["How much does it cost?", "How do I get started?", "How can I contact you?"],
    vonexr: true,
  },
  {
    keys: ["join your team", "join vonexr", "developer job", "hiring", "job", "career", "freelance", "work for you", "internship"],
    reply: "VONEXR works with developers project by project. Check the Developer? Work with us section and apply on WhatsApp with your portfolio.",
    chips: ["What tech do you use?", "What can VONEXR build for me?", "How can I contact you?"],
    vonexr: true,
  },
  {
    keys: ["contact", "phone", "number", "email", "call", "human", "real person", "talk to", "owner", "founder", "rabta", "reach you"],
    reply: "You can reach the VONEXR team with the WhatsApp button on this page, the contact form near the bottom, or by email or LinkedIn. They reply within a day.",
    chips: ["How do I get started?", "How much does it cost?", "Show me your work"],
    vonexr: true,
  },
  {
    keys: ["urdu", "roman", "language", "hindi", "english", "zubaan"],
    reply: "I understand English and Roman Urdu keywords. A real agent from VONEXR can be set up to chat in both Urdu and English.",
    chips: ["Can you build an AI agent?", "How much does it cost?", "Show me your work"],
    vonexr: true,
  },
  {
    keys: ["vonexr", "service", "what do you build", "what can you build", "what do you do", "what can vonexr", "build", "webs", "startup", "company", "business", "software", "kya banate", "web app", "app"],
    reply: "VONEXR is a software team that builds websites and web apps, AI agents and chatbots, automation like WhatsApp bots and order alerts, and UI and UX design. I am one example: an AI agent that answers store customers any time. What does your business need?",
    chips: ["How much does it cost?", "How long does it take?", "Show me your work"],
    vonexr: true,
  },

  /* ---------- GENERAL ---------- */
  {
    keys: ["how are you", "how r u", "kaise ho", "kaisay ho", "kya haal", "whats up", "how do you do"],
    reply: "I am doing great, thanks for asking! Ready to help with anything about the store or VONEXR.",
  },
  {
    keys: ["who are you", "your name", "tum kaun", "aap kaun", "are you a bot", "are you real", "are you human", "are you ai", "bot ho", "kon ho"],
    reply: "I am the VONEXR AI agent, a demo built for a clothing store. I am software, not a person, but I can answer instantly at any hour. A real agent can be built for your business.",
    vonexr: true,
    chips: ["What can VONEXR build for me?", "How much does it cost?", "Show me your work"],
  },
  {
    keys: ["what time is it", "current time", "whats the time", "kitne baje", "time kya", "today date", "what date", "what day"],
    reply: () =>
      `Right now it is ${new Date().toLocaleString([], { weekday: "long", hour: "2-digit", minute: "2-digit" })} on your device.`,
  },
  {
    keys: ["joke", "funny", "laugh", "mazaq", "mazak"],
    reply: "Why did the developer go broke? Because he used up all his cache.",
  },
  {
    keys: ["thanks", "thank", "shukriya", "shukria", "thx", "jazakallah", "great", "awesome", "perfect"],
    reply: "You are welcome! Anything else I can help with?",
  },
  {
    keys: ["bye", "goodbye", "allah hafiz", "khuda hafiz", "see you", "tc"],
    reply: "Thanks for chatting! If you want an agent like me for your business, tap Get a free quote. Allah hafiz!",
    vonexr: true,
  },
  {
    keys: ["help", "what can you do", "what can i ask", "options", "menu", "topics", "kya kar sakte"],
    reply: "I can help with sizes and stock, price and discounts, delivery and tracking, payment, returns and exchange, fabric and care, and gifts. I can also tell you what VONEXR can build, what it costs and how long it takes.",
  },
  {
    keys: ["hi", "hello", "hey", "salam", "assalam", "aoa", "hola", "good morning", "good evening", "good afternoon"],
    reply: "Hello! Welcome to our store. I can help with sizes, prices, delivery, payment, returns and orders, or tell you what VONEXR can build for you. What are you looking for?",
  },
];

const FALLBACK = {
  reply: "I am a demo agent, so I stick to this store and VONEXR. Try asking about sizes, price, delivery, payment, returns or discounts, or ask what VONEXR can build. For anything else, message the VONEXR team on WhatsApp.",
  chips: ["Do you have discounts?", "What can VONEXR build for me?", "Can I return an item?"],
};

/* ---------- helpers ---------- */
const YES = new Set(["yes", "yeah", "yep", "yup", "sure", "ok", "okay", "haan", "han", "ji", "g", "please", "pls", "kardo", "kar", "do", "go", "ahead", "confirm", "theek", "thik", "hai"]);
const NO = new Set(["no", "nope", "nahi", "nahin", "nah", "not", "now", "later", "cancel"]);

const normalize = (s) =>
  s.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

const allIn = (tokens, set) => tokens.length > 0 && tokens.every((t) => set.has(t));

function score(rule, text, tokens) {
  let s = 0;
  for (const k of rule.keys) {
    if (k.includes(" ")) {
      if (text.includes(k)) s += 2;
    } else if (k.length <= 3) {
      if (tokens.includes(k)) s += 1;
    } else if (tokens.some((t) => t.startsWith(k))) {
      s += 1;
    }
  }
  return s;
}

function answer(raw, ctx) {
  const text = normalize(raw);
  const tokens = text.split(" ").filter(Boolean);
  const orderNum = text.match(/\b(10\d{2})\b/);

  // order number mila (tracking)
  if (orderNum && (ctx.awaiting === "track" || tokens.length <= 3)) {
    ctx.awaiting = null;
    return {
      reply: `Order #${orderNum[1]} is confirmed and packed. It leaves today and should reach you in 2 to 3 days. You will get a WhatsApp update when it ships.`,
      chips: ["Can I pay cash on delivery?", "Can I return an item?", "Do you have discounts?"],
    };
  }

  // haan / nahi, pichle sawal ke baad
  if (allIn(tokens, YES)) {
    if (ctx.awaiting === "order") {
      ctx.awaiting = null;
      const n = ctx.orderNo++;
      return {
        reply: `Done! Order #${n} is placed. You will get a WhatsApp update when it ships. Anything else I can help with?`,
        chips: ["Track my order", "Can I pay cash on delivery?", "Do you have discounts?"],
      };
    }
    return {
      reply: "Great! What would you like to know? You can ask about sizes, price, delivery, payment, or what VONEXR can build for you.",
      chips: START_CHIPS,
    };
  }
  if (allIn(tokens, NO)) {
    ctx.awaiting = null;
    return {
      reply: "No problem! Let me know if you need anything else.",
      chips: DEFAULT_CHIPS,
    };
  }

  // sab se zyada score wala rule
  let best = null;
  let top = 0;
  for (const rule of RULES) {
    const s = score(rule, text, tokens);
    if (s > top) {
      top = s;
      best = rule;
    }
  }

  if (!best) {
    ctx.awaiting = null;
    return FALLBACK;
  }

  ctx.awaiting = best.awaiting || null;
  const reply = typeof best.reply === "function" ? best.reply(ctx) : best.reply;
  return { reply, chips: best.chips || DEFAULT_CHIPS, vonexr: best.vonexr };
}

const now = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

/* ---------- component ---------- */
export default function ChatDemo() {
  const [msgs, setMsgs] = useState(START);
  const [chips, setChips] = useState(START_CHIPS);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef(null);
  const timer = useRef(null);
  const sent = useRef(0);
  const nextId = useRef(START.length + 1);
  const ctx = useRef({ awaiting: null, orderNo: 1043 });

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  useEffect(() => () => clearTimeout(timer.current), []);

  function send(raw) {
    const value = raw.trim();
    if (!value || typing) return;

    sent.current += 1;
    const count = sent.current;

    setMsgs((m) => [
      ...m,
      { id: nextId.current++, from: "them", text: value, time: now(), fresh: true },
    ]);
    setText("");
    setTyping(true);

    const result = answer(value, ctx.current);
    let reply = result.reply;
    if (!result.vonexr && (count === 3 || count === 8)) reply += CTA;

    const delay = 900 + Math.min(reply.length * 3, 600);
    timer.current = setTimeout(() => {
      setMsgs((m) => [
        ...m,
        { id: nextId.current++, from: "us", text: reply, time: `${now()} ✓✓`, fresh: true },
      ]);
      setChips(result.chips || DEFAULT_CHIPS);
      setTyping(false);
    }, delay);
  }

  return (
    <div className="chat" aria-label="Interactive demo of an AI agent conversation">
      <div className="chat-bar">
        <span className="avatar">V</span>
        <div>
          <strong>VONEXR AI Agent</strong>
          <small>Sample agent for a clothing store</small>
        </div>
      </div>

      <div className="chat-body" ref={bodyRef} aria-live="polite">
        {msgs.map((m) => (
          <Fragment key={m.id}>
            <p className={`msg ${m.from}${m.fresh ? " fresh" : ""}`}>
              {m.text}
              <time>{m.time}</time>
            </p>
            <span className={`who ${m.from}${m.fresh ? " fresh" : ""}`}>
              {m.from === "them" ? "Customer message" : "✓✓ AI agent replied in 1 second"}
            </span>
          </Fragment>
        ))}
        {typing && (
          <div className="msg us typing" aria-label="Agent is typing">
            <i /><i /><i />
          </div>
        )}
      </div>

      <div className="chips">
        {chips.map((c) => (
          <button key={c} type="button" disabled={typing} onClick={() => send(c)}>
            {c}
          </button>
        ))}
      </div>

      <form
        className="composer"
        onSubmit={(e) => {
          e.preventDefault();
          send(text);
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          aria-label="Type a message"
          maxLength={200}
          autoComplete="off"
        />
        <button type="submit" aria-label="Send message" disabled={!text.trim() || typing}>
          ➤
        </button>
      </form>
    </div>
  );
}