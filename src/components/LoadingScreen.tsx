"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SEEN_KEY = "joseph_decor_loader_seen";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [skippable, setSkippable] = useState(false);
  const [reduced, setReduced] = useState(false);
  const timers = useRef<number[]>([]);

  const finish = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    setProgress(100);
    timers.current.push(window.setTimeout(() => setVisible(false), 160));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(SEEN_KEY)) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(prefersReduced);
    setVisible(true);
    window.sessionStorage.setItem(SEEN_KEY, "1");

    const started = Date.now();
    const tick = window.setInterval(() => {
      const elapsed = Date.now() - started;
      const next = Math.min(96, Math.round((elapsed / 2400) * 96));
      setProgress(next);
    }, 60);

    const skipTimer = window.setTimeout(() => setSkippable(true), 1000);
    const doneTimer = window.setTimeout(() => {
      window.clearInterval(tick);
      setProgress(100);
      window.setTimeout(() => setVisible(false), 200);
    }, prefersReduced ? 900 : 2600);

    timers.current.push(skipTimer, doneTimer);

    return () => {
      window.clearInterval(tick);
      timers.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    document.body.classList.add("jd-locked");
    return () => document.body.classList.remove("jd-locked");
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="loader-screen" role="status" aria-live="polite" aria-label="Loading Joseph Decor">
      {reduced ? null : (
        <svg className="loader-mark" viewBox="0 0 168 150" aria-hidden="true">
          <path
            pathLength={1}
            d="M34 58V44c0-8 6-14 14-14h72c8 0 14 6 14 14v14"
            className="draw-1"
          />
          <path pathLength={1} d="M26 58h116v38H26z" className="draw-1" />
          <path pathLength={1} d="M26 96h116v12H26z" className="draw-2" />
          <path pathLength={1} d="M36 108v18M128 108v18" className="draw-2" />
          <path pathLength={1} d="M46 58v38M122 58v38" className="draw-3" />
        </svg>
      )}
      <p className="loader-percent mono mb-0">{progress}%</p>
      {skippable ? (
        <button type="button" className="loader-skip" onClick={finish}>
          Skip
        </button>
      ) : null}
    </div>
  );
}
