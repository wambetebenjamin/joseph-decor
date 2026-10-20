"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const SCRIPT =
  "Hey, welcome to Joseph Decor. We sell quality furniture and home decor for Nairobi homes, delivered and assembled at your door. From sofas and beds to lighting and rugs, browse by room or product type, add to cart, and pay with M-Pesa. Free delivery on orders above fifteen thousand shillings. Your space, your style. Start shopping today.";

type TourState = "idle" | "speaking" | "muted" | "ended" | "unsupported";

export default function VoiceTour() {
  const [state, setState] = useState<TourState>("idle");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const cancelledRef = useRef(false);

  const start = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    cancelledRef.current = false;

    const utterance = new SpeechSynthesisUtterance(SCRIPT);
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    utterance.lang = "en-KE";

    const voices = synth.getVoices();
    const kenyan = voices.find((voice) => voice.lang === "en-KE");
    const english = voices.find((voice) => voice.lang.startsWith("en"));
    if (kenyan || english) utterance.voice = kenyan ?? english ?? null;

    utterance.onend = () => {
      if (cancelledRef.current) return;
      setState("ended");
    };
    utterance.onerror = () => {
      if (cancelledRef.current) return;
      setState("ended");
    };

    utteranceRef.current = utterance;
    setState("speaking");
    synth.speak(utterance);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) {
      setState("unsupported");
      return;
    }

    const onFirstInteraction = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest(".voice-float")) return;
      start();
      window.removeEventListener("scroll", onFirstInteraction);
      window.removeEventListener("click", onFirstInteraction);
    };

    window.addEventListener("scroll", onFirstInteraction, { passive: true });
    window.addEventListener("click", onFirstInteraction);

    return () => {
      window.removeEventListener("scroll", onFirstInteraction);
      window.removeEventListener("click", onFirstInteraction);
      window.speechSynthesis.cancel();
    };
  }, [start]);

  if (state === "unsupported") return null;

  const speaking = state === "speaking";
  const label = speaking
    ? "Site voice tour, click to mute"
    : state === "ended"
      ? "Replay tour"
      : state === "muted"
        ? "Site voice tour, click to play"
        : "Site voice tour, click to play";

  return (
    <button
      type="button"
      className={`floating-action voice-float${speaking ? " is-speaking" : ""}`}
      aria-label={label}
      onClick={() => {
        if (speaking) {
          cancelledRef.current = true;
          window.speechSynthesis.cancel();
          setState("muted");
          return;
        }
        start();
      }}
    >
      {speaking ? (
        <Volume2 size={24} aria-hidden="true" />
      ) : state === "muted" ? (
        <VolumeX size={24} aria-hidden="true" />
      ) : (
        <Volume2 size={24} aria-hidden="true" />
      )}
      <span className="voice-tooltip" aria-hidden="true">
        {state === "ended" ? "Replay tour" : "Hear what this site is about"}
      </span>
    </button>
  );
}
