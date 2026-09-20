"use client";

import { useEffect } from "react";

// Honors prefers-reduced-motion for the autoplaying preview: paused on the poster frame.
export function MotionGuard() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      document.querySelectorAll<HTMLVideoElement>("video[autoplay]").forEach((v) => {
        if (mq.matches) v.pause();
        else v.play().catch(() => {});
      });
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return null;
}
