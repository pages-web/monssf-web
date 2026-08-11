"use client";

import React, { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    // id="scrollUp" matches the template CSS selector — do not rename
    <button
      id="scrollUp"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Дээш буцах"
    >
      <i className="fa fa-angle-up" />
    </button>
  );
}
