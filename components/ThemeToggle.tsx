"use client";

import { useSyncExternalStore } from "react";

type Labels = { themeLight: string; themeDark: string };

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};
const isDarkNow = () => document.documentElement.dataset.theme === "dark";

export function ThemeToggle({ labels }: { labels: Labels }) {
  const dark = useSyncExternalStore(subscribe, isDarkNow, () => false);

  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked; the choice then lasts for this page only.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? labels.themeLight : labels.themeDark}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full text-text hover:bg-bg-alt"
    >
      {dark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

// Runs in <head> before the page paints, so the theme never flickers.
export const themeScript = `(function(){var d=document.documentElement;d.classList.add('js');var t=null;try{t=localStorage.getItem('theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t})();`;
