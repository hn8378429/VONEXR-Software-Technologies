"use client";

import { useState } from "react";

const SERVICES = [
  "A website or web app",
  "An AI agent or chatbot",
  "Automation",
  "UI and UX design",
  "Something else",
];

export default function ContactForm({ whatsapp }) {
  const [name, setName] = useState("");
  const [service, setService] = useState(SERVICES[0]);
  const [msg, setMsg] = useState("");

  function submit(e) {
    e.preventDefault();
    const text = `Hi VONEXR, my name is ${name.trim()}.\nI need: ${service}.\n\n${msg.trim()}`;
    window.open(
      `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener"
    );
  }

  return (
    <form className="cform" onSubmit={submit}>
      <div className="row">
        <label>
          Your name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Ali Khan"
            required
            maxLength={60}
            autoComplete="name"
          />
        </label>
        <label>
          I need
          <select value={service} onChange={(e) => setService(e.target.value)}>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Tell us about your project
        <textarea
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="What should it do? Any deadline or budget?"
          required
          maxLength={600}
        />
      </label>
      <button type="submit" className="btn">
        Send on WhatsApp
      </button>
      <small>This opens WhatsApp with your message ready to send.</small>
    </form>
  );
}