"use client";

import { useId, useRef, useState } from "react";
import type { Content } from "@/content/types";
import { ExternalLink } from "./ExternalLink";

type Props = {
  labels: Content["cvDialog"];
  buttonLabel: string;
  available: boolean;
  linkedin: string;
  newTabLabel: string;
  variant?: "primary" | "outline";
};

type Status = "idle" | "checking" | "wrong" | "done" | "error" | "unavailable";

export function CvButton({ labels, buttonLabel, available, linkedin, newTabLabel, variant = "outline" }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const id = useId();
  const [status, setStatus] = useState<Status>(available ? "idle" : "unavailable");

  const open = () => {
    if (status !== "unavailable") setStatus("idle");
    dialogRef.current?.showModal();
    dialogRef.current?.querySelector<HTMLInputElement>("input[name=code]")?.focus();
  };
  const close = () => dialogRef.current?.close();

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const code = new FormData(form).get("code");
    setStatus("checking");
    try {
      const res = await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (res.status === 401) return setStatus("wrong");
      if (res.status === 503) return setStatus("unavailable");
      if (!res.ok) return setStatus("error");
      const url = URL.createObjectURL(await res.blob());
      const a = document.createElement("a");
      a.href = url;
      a.download = "Knut-Barka-CV.pdf";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
      form.reset();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const message =
    status === "wrong" ? labels.wrong : status === "done" ? labels.done : status === "error" ? labels.error : "";

  return (
    <>
      <button type="button" onClick={open} className={`pill ${variant === "primary" ? "pill-primary" : "pill-outline"}`} aria-haspopup="dialog">
        {buttonLabel}
      </button>

      <dialog ref={dialogRef} className="cv-dialog" aria-labelledby={`${id}-title`} onClick={(e) => e.target === e.currentTarget && close()}>
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
              <p id={`${id}-status`} role="status" className={`mt-2 min-h-6 text-[15px] ${status === "done" ? "text-muted" : "text-[#c62828] dark:text-[#ff6b6b]"}`}>
                {message}
              </p>
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
