"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { sports } from "@/content/sports";
import { buildMailto, enquiryLabels, submitContact, type ContactPayload } from "@/lib/contact";
import { cn } from "@/lib/cn";

type Enquiry = ContactPayload["enquiry"];
type Errors = Partial<Record<"name" | "email" | "phone" | "venueName" | "city" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const isEnquiry = (v: string | null): v is Enquiry => !!v && v in enquiryLabels;

export function ContactForm({ defaultEnquiry = "player", venueOnly = false }: { defaultEnquiry?: Enquiry; venueOnly?: boolean }) {
  const params = useSearchParams();
  const fromQuery = params.get("enquiry");
  const [enquiry, setEnquiry] = useState<Enquiry>(venueOnly ? "venue" : isEnquiry(fromQuery) ? fromQuery : defaultEnquiry);
  const [values, setValues] = useState({ name: "", email: "", phone: "", venueName: "", city: "", message: "" });
  const [chosenSports, setChosenSports] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "not-configured" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const isVenue = enquiry === "venue";
  const to = isVenue ? site.partnershipsEmail : site.contactEmail;

  const payload = (): ContactPayload => ({
    enquiry,
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim() || undefined,
    venueName: isVenue ? values.venueName.trim() : undefined,
    city: values.city.trim() || undefined,
    sports: chosenSports.length ? chosenSports : undefined,
    message: values.message.trim(),
  });

  function validate(): Errors {
    const e: Errors = {};
    if (values.name.trim().length < 2) e.name = "Please enter your name.";
    if (!EMAIL_RE.test(values.email.trim())) e.email = "Please enter a valid email address.";
    if (values.phone && !/^[+\d][\d\s()-]{6,}$/.test(values.phone.trim())) e.phone = "Please enter a valid phone number.";
    if (isVenue && values.venueName.trim().length < 2) e.venueName = "Please tell us your venue's name.";
    if (isVenue && values.city.trim().length < 2) e.city = "Please tell us where your venue is.";
    if (values.message.trim().length < 10) e.message = "Please write a few words (at least 10 characters).";
    return e;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }
    setState("sending");
    const res = await submitContact(payload());
    if (res.status === "error") setServerError(res.message);
    setState(res.status);
  }

  const set = (k: keyof typeof values) => (ev: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: ev.target.value }));
    if (errors[k as keyof Errors]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  if (state === "sent") {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[22px] border border-line bg-white p-10 text-center" role="status">
        <CheckCircle2 className="mx-auto size-12 text-brand" />
        <h3 className="h-card mt-6 text-ink">Message sent.</h3>
        <p className="mt-3 text-muted">Thanks, {values.name.split(" ")[0]}. The Axono team will get back to you at {values.email}.</p>
      </motion.div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-[22px] border border-line bg-white p-6 sm:p-10">
      {!venueOnly && (
        <fieldset>
          <legend className="text-sm font-semibold text-ink">What can we help with?</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {(Object.keys(enquiryLabels) as Enquiry[]).map((k) => (
              <label
                key={k}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2.5 text-sm font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-flare",
                  enquiry === k ? "border-brand bg-brand text-white" : "border-line text-ink-soft hover:border-ink/30",
                )}
              >
                <input type="radio" name="enquiry" value={k} checked={enquiry === k} onChange={() => setEnquiry(k)} className="sr-only" />
                {enquiryLabels[k]}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className={cn("grid gap-5 sm:grid-cols-2", !venueOnly && "mt-8")}>
        <Field id="name" label="Your name" error={errors.name}>
          <input id="cf-name" autoComplete="name" value={values.name} onChange={set("name")} {...aria("name", errors)} className={input(errors.name)} />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input id="cf-email" type="email" autoComplete="email" value={values.email} onChange={set("email")} {...aria("email", errors)} className={input(errors.email)} />
        </Field>
        <Field id="phone" label="Phone (optional)" error={errors.phone}>
          <input id="cf-phone" type="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} {...aria("phone", errors)} className={input(errors.phone)} />
        </Field>
        <Field id="city" label={isVenue ? "City / location" : "City (optional)"} error={errors.city}>
          <input id="cf-city" autoComplete="address-level2" value={values.city} onChange={set("city")} {...aria("city", errors)} className={input(errors.city)} />
        </Field>

        <AnimatePresence initial={false}>
          {isVenue && (
            <motion.div
              key="venue"
              className="overflow-hidden sm:col-span-2"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid gap-5 pt-1">
                <Field id="venueName" label="Venue name" error={errors.venueName}>
                  <input id="cf-venueName" autoComplete="organization" value={values.venueName} onChange={set("venueName")} {...aria("venueName", errors)} className={input(errors.venueName)} />
                </Field>
                <fieldset>
                  <legend className="text-sm font-medium text-ink">Sports at your venue</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {sports.map((s) => {
                      const on = chosenSports.includes(s.name);
                      return (
                        <label
                          key={s.slug}
                          className={cn(
                            "cursor-pointer rounded-full border px-3.5 py-2 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-flare",
                            on ? "border-flare bg-flare-tint text-ink" : "border-line text-ink-soft",
                          )}
                        >
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={on}
                            onChange={() => setChosenSports((c) => (on ? c.filter((x) => x !== s.name) : [...c, s.name]))}
                          />
                          {s.name}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Field id="message" label="Message" error={errors.message} className="sm:col-span-2">
          <textarea
            id="cf-message"
            rows={5}
            value={values.message}
            onChange={set("message")}
            {...aria("message", errors)}
            className={cn(input(errors.message), "resize-y")}
            placeholder={isVenue ? "Tell us about your venue — number of courts, opening hours, anything useful." : "How can we help?"}
          />
        </Field>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" variant="primary" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : isVenue ? "Send partnership enquiry" : "Send message"}
        </Button>
        <a href={`mailto:${to}`} className="text-sm text-muted hover:text-brand">
          or email <span className="font-medium text-ink">{to}</span>
        </a>
      </div>

      <AnimatePresence>
        {(state === "not-configured" || state === "error") && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex gap-3 rounded-2xl border border-flare/30 bg-flare-tint p-5 text-sm text-ink"
          >
            <AlertCircle className="size-5 shrink-0 text-flare" />
            <div>
              <p className="font-semibold">
                {state === "not-configured" ? "Your message has not been sent." : "Your message could not be sent."}
              </p>
              <p className="mt-1 text-ink-soft">
                {state === "not-configured"
                  ? "Online messaging isn't connected yet. Your details are ready to go — send them by email instead:"
                  : `${serverError} You can send your details by email instead:`}
              </p>
              <a
                href={buildMailto(to, payload())}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 font-semibold text-white hover:bg-brand"
              >
                <Mail className="size-4" /> Open email to {to}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

function aria(k: keyof Errors, errors: Errors) {
  return {
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `cf-${k}-error` : undefined,
    required: k !== "phone" || undefined,
  };
}

const input = (err?: string) =>
  cn(
    "mt-2 block w-full rounded-xl border bg-mist px-4 py-3.5 text-base text-ink outline-none transition-colors placeholder:text-muted/70 focus:bg-white",
    err ? "border-red-500 focus:border-red-500" : "border-transparent focus:border-brand",
  );

function Field({ id, label, error, children, className }: { id: string; label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={`cf-${id}`} className="text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`cf-${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
