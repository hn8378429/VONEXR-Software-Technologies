"use client";

import { useEffect, useRef, useState } from "react";

export default function Effects() {
  const bar = useRef(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- scroll progress bar + back to top ----
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const p = max > 0 ? h.scrollTop / max : 0;
        if (bar.current) bar.current.style.transform = `scaleX(${p})`;
        setShowTop(h.scrollTop > 600);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // ---- cards par cursor ke saath chalti roshni ----
    const onMove = (e) => {
      const card = e.target.closest ? e.target.closest(".spot") : null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("mousemove", onMove, { passive: true });

    // ---- numbers ginti se bharte hain ----
    const runCounters = (root) => {
      root.querySelectorAll("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        if (reduce || !Number.isFinite(target)) return;
        const t0 = performance.now();
        const dur = 1100;
        const tick = (t) => {
          const k = Math.min((t - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - k, 3);
          el.textContent = `${Math.round(target * eased)}${suffix}`;
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    };

    // ---- sections scroll karne par upar aate hain ----
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add("in");
          runCounters(en.target);
          io.unobserve(en.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousemove", onMove);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <div className="progress" ref={bar} aria-hidden="true" />
      <button
        type="button"
        className={`to-top${showTop ? " show" : ""}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>
    </>
  );
}