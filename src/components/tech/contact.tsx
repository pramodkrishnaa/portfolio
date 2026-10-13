"use client";

import { useState } from "react";
import { TbArrowRight, TbLoader2, TbCheck } from "react-icons/tb";
import Section from "@/components/site/section";
import { PERSONAL_INFO as P } from "@/content/site";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please email me directly.");
      }
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <Section id="contact" className="py-28">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s build something that ships.
          </h2>
          <p className="mt-5 max-w-sm leading-relaxed text-muted">
            Senior FDE and Agentic AI roles, consulting, or a specific problem you want
            solved. The fastest way to reach me is right here.
          </p>
          <a
            href={`mailto:${P.email}`}
            className="mt-6 inline-block font-mono text-sm text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
          >
            {P.email}
          </a>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field id="name" label="Name">
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={set("name")}
                required
                autoComplete="name"
                className="field"
                placeholder="Your name"
              />
            </Field>
            <Field id="email" label="Email">
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={set("email")}
                required
                autoComplete="email"
                className="field"
                placeholder="you@company.com"
              />
            </Field>
          </div>
          <Field id="message" label="Message">
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={set("message")}
              required
              rows={5}
              className="field resize-none"
              placeholder="What are you building?"
            />
          </Field>

          <div className="flex items-center gap-4" aria-live="polite">
            <button
              type="submit"
              disabled={status === "sending" || status === "success"}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-transform active:translate-y-px disabled:opacity-60"
            >
              {status === "sending" && <TbLoader2 className="animate-spin" aria-hidden />}
              {status === "success" && <TbCheck aria-hidden />}
              {status === "success" ? "Sent" : status === "sending" ? "Sending" : "Send message"}
              {status === "idle" && <TbArrowRight aria-hidden />}
            </button>
            {status === "success" && (
              <span className="text-sm text-muted">Thanks. I&apos;ll get back to you.</span>
            )}
            {status === "error" && <span className="text-sm text-accent">{error}</span>}
          </div>
        </form>
      </div>
    </Section>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-xs uppercase tracking-wider text-dim">
        {label}
      </label>
      {children}
    </div>
  );
}
