"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Content } from "@/content/types";
import type { Locale } from "@/lib/site";
import { ExternalLink } from "./ExternalLink";

// The CV comes in three languages. Names stay in their own language, like a language menu.
const cvLangs: { value: Locale; name: string; htmlLang: string }[] = [
  { value: "en", name: "English", htmlLang: "en" },
  { value: "da", name: "Dansk", htmlLang: "da" },
  { value: "no", name: "Norsk", htmlLang: "nb" },
];

type Props = {
  lang: Locale;
  labels: Content["cvDialog"];
  buttonLabel: string;
  available: boolean;
  linkedin: string;
  newTabLabel: string;
  variant?: "primary" | "outline";
};

// idle/checking/wrong/error: the code form. ready/downloading/done/failed: the download buttons.
type Status = "idle" | "checking" | "wrong" | "error" | "ready" | "downloading" | "done" | "failed" | "unavailable";

const post = (body: object) =>
  fetch("/api/cv", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

export function CvButton({ lang, labels, buttonLabel, available, linkedin, newTabLabel, variant = "outline" }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstDownloadRef = useRef<HTMLButtonElement>(null);
  // The code lives only here, in memory, while the dialog is open. No cookie, no storage.
  const codeRef = useRef("");
  const id = useId();
  const [status, setStatus] = useState<Status>(available ? "idle" : "unavailable");
  // Languages whose download has started in this dialog session. Shown as a check mark.
  const [downloaded, setDownloaded] = useState<Locale[]>([]);
  const unlocked = status === "ready" || status === "downloading" || status === "done" || status === "failed";
  // The current page's language first, then the other two.
  const ordered = [...cvLangs].sort((a, b) => Number(b.value === lang) - Number(a.value === lang));

  // Once the code is accepted, move focus from the vanished field to the first download button.
  const wasUnlocked = useRef(false);
  useEffect(() => {
    if (unlocked && !wasUnlocked.current) firstDownloadRef.current?.focus();
    wasUnlocked.current = unlocked;
  }, [unlocked]);

  const open = () => {
    codeRef.current = "";
    setDownloaded([]);
    if (status !== "unavailable") setStatus("idle");
    dialogRef.current?.showModal();
    dialogRef.current?.querySelector<HTMLInputElement>("input[name=code]")?.focus();
  };
  const close = () => dialogRef.current?.close();

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const code = new FormData(event.currentTarget).get("code");
    setStatus("checking");
    try {
      const res = await post({ code, check: true });
      if (res.status === 401) return setStatus("wrong");
      if (res.status === 503) return setStatus("unavailable");
      if (!res.ok) return setStatus("error");
      codeRef.current = String(code);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }

  async function download(cvLang: Locale) {
    setStatus("downloading");
    try {
      const res = await post({ code: codeRef.current, lang: cvLang });
      if (res.status === 401) {
        codeRef.current = "";
        return setStatus("wrong");
      }
      if (res.status === 503) return setStatus("unavailable");
      if (!res.ok) return setStatus("failed");
      const url = URL.createObjectURL(await res.blob());
      const a = document.createElement("a");
      a.href = url;
      // Use the server's file name: it says which language was actually sent.
      a.download = res.headers.get("content-disposition")?.match(/filename="(.+)"/)?.[1] ?? "Knut-Barka-CV.pdf";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
      setDownloaded((list) => (list.includes(cvLang) ? list : [...list, cvLang]));
      setStatus("done");
    } catch {
      setStatus("failed");
    }
  }

  const message =
    status === "wrong" ? labels.wrong : status === "done" ? labels.done : status === "error" || status === "failed" ? labels.error : "";
  const statusLine = (
    <p id={`${id}-status`} role="status" className={`mt-2 min-h-6 text-[15px] ${status === "done" ? "text-muted" : "text-[#c62828] dark:text-[#ff6b6b]"}`}>
      {message}
    </p>
  );

  return (
    <>
      <button type="button" onClick={open} className={`pill ${variant === "primary" ? "pill-primary" : "pill-outline"}`} aria-haspopup="dialog">
        {buttonLabel}
      </button>

      <dialog
        ref={dialogRef}
        className="cv-dialog"
        aria-labelledby={`${id}-title`}
        onClick={(e) => e.target === e.currentTarget && close()}
        onClose={() => {
          codeRef.current = "";
          setDownloaded([]);
          if (status !== "unavailable") setStatus("idle");
        }}
      >
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <h2 id={`${id}-title`} className="text-[24px] font-semibold">
              {labels.title}
            </h2>
            <button
              type="button"
              onClick={close}
              aria-label={labels.close}
              className="-mr-2 -mt-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-muted hover:bg-bg-alt hover:text-text"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {status === "unavailable" ? (
            <p className="mt-3 text-muted">
              {labels.unavailable}{" "}
              <ExternalLink href={linkedin} newTabLabel={newTabLabel} className="inline-flex items-center gap-1 text-link hover:underline">
                LinkedIn
              </ExternalLink>
            </p>
          ) : unlocked ? (
            <div className="mt-3">
              <p id={`${id}-choose`} className="text-muted">
                {labels.choose}
              </p>
              <div role="group" aria-labelledby={`${id}-choose`} className="mt-5 grid gap-2">
                {ordered.map((option, i) => (
                  <button
                    key={option.value}
                    ref={i === 0 ? firstDownloadRef : undefined}
                    type="button"
                    onClick={() => download(option.value)}
                    disabled={status === "downloading"}
                    aria-describedby={`${id}-status`}
                    className="pill pill-outline pill-choice w-full disabled:opacity-60"
                  >
                    <span lang={option.htmlLang}>{option.name}</span>
                    {downloaded.includes(option.value) && (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                          <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="sr-only">({labels.downloaded})</span>
                      </>
                    )}
                  </button>
                ))}
              </div>
              {statusLine}
            </div>
          ) : (
            <form onSubmit={submit} className="mt-3">
              <p className="text-muted">{labels.intro}</p>
              <label htmlFor={`${id}-code`} className="mt-5 block text-[14px] font-medium">
                {labels.label}
              </label>
              <input
                id={`${id}-code`}
                name="code"
                type="password"
                required
                maxLength={200}
                autoComplete="off"
                aria-describedby={`${id}-status`}
                className="mt-1.5 block h-12 w-full rounded-xl border border-line bg-bg px-4 text-[17px] text-text"
              />
              {statusLine}
              <button type="submit" disabled={status === "checking"} className="pill pill-primary mt-2 w-full disabled:opacity-60">
                {status === "checking" ? labels.checking : labels.submit}
              </button>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
