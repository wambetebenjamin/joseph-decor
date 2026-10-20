"use client";

import { useState } from "react";
import { useToasts } from "@/lib/store";

export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const push = useToasts((state) => state.push);
  const [email, setEmail] = useState("");

  return (
    <form
      className={compact ? "mt-4" : "newsletter-form mx-auto"}
      onSubmit={(event) => {
        event.preventDefault();
        if (!email.includes("@")) return;
        push("You are on the list. Look out for new arrivals.");
        setEmail("");
      }}
    >
      <label className="visually-hidden" htmlFor={`newsletter-${compact ? "footer" : "main"}`}>
        Email address
      </label>
      <div className={compact ? "d-flex flex-column gap-2" : "d-flex gap-2 w-100"}>
        <input
          id={`newsletter-${compact ? "footer" : "main"}`}
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="form-control"
          placeholder="Your email address"
          style={
            compact
              ? {
                  background: "transparent",
                  borderColor: "rgba(255,255,255,0.22)",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                }
              : undefined
          }
        />
        <button type="submit" className={compact ? "btn btn-outline-light btn-sm" : "btn btn-primary"}>
          Subscribe
        </button>
      </div>
    </form>
  );
}
