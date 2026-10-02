"use client";

import { useState } from "react";
import { profile } from "@/content/profile";
import { Reveal } from "./Reveal";

const input = "w-full min-h-11 rounded-[10px] border border-line bg-elevated px-4 py-3 text-[15px] text-ink placeholder:text-ink-3 focus-visible:border-accent";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries());

    setStatus("idle");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to send your message right now.");
      }

      setStatus("success");
      setMessage(data.message || "Thanks, your message is on the way.");
      form.reset();
    } catch (error) {
      const fallback = `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio enquiry from ${String(body.name || "a new contact")}`)}&body=${encodeURIComponent(String(body.message || ""))}`;
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
      window.location.href = fallback;
    }
  };

  return (
    <section id="contact" className="section">
      <div className="wrap">
        <Reveal>
          <div className="grid gap-12 rounded-3xl border border-line bg-surface/70 p-6 backdrop-blur-[3px] sm:p-12 lg:grid-cols-2">
            <div>
              <p className="label">Contact</p>
              <h2 className="display-l mt-3">Let&apos;s build something that <em>ships</em>.</h2>
              <p className="mt-4 text-ink-2">Typically replies within 24h.</p>
              <ul className="mt-8 border-t border-line text-[15px]">
                {[
                  ["Email", profile.email, `mailto:${profile.email}`],
                  ["WhatsApp", profile.phone, profile.whatsapp],
                  ["LinkedIn", "waleed-ilyas", profile.linkedin],
                  ["GitHub", "Waleed-Ilyas", profile.github],
                ].map(([k, v, h]) => (
                  <li key={k} className="flex items-center justify-between gap-4 border-b border-line py-3">
                    <span className="label">{k}</span>
                    <a href={h} className="text-ink hover:text-accent" target={h.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                      {v}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <form onSubmit={handleSubmit} className="grid content-start gap-3">
              <label className="sr-only" htmlFor="name">Name</label>
              <input id="name" name="name" required autoComplete="name" placeholder="Name" className={input} />
              <label className="sr-only" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email" placeholder="Email" className={input} />
              <label className="sr-only" htmlFor="company">Company</label>
              <input id="company" name="company" autoComplete="organization" placeholder="Company" className={input} />
              <label className="sr-only" htmlFor="type">Role type</label>
              <select id="type" name="type" className={input} defaultValue="Full-time">
                <option>Full-time</option>
                <option>Contract</option>
                <option>Freelance</option>
              </select>
              <label className="sr-only" htmlFor="message">Message</label>
              <textarea id="message" name="message" required rows={5} placeholder="What are you building?" className={input} />
              <button type="submit" className="btn btn-primary mt-2 w-full sm:w-auto sm:justify-self-start">
                Send message
              </button>
              {message && (
                <p className={`text-sm ${status === "success" ? "text-accent" : "text-ink-2"}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
