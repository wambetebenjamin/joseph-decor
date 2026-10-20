"use client";

import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import SmoothScroll from "./SmoothScroll";
import Toaster from "./Toaster";
import { useCart, useWishlist } from "@/lib/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void useCart.persist.rehydrate();
    void useWishlist.persist.rehydrate();
  }, []);

  return (
    <SessionProvider>
      <SmoothScroll />
      {children}
      <Toaster />
    </SessionProvider>
  );
}
