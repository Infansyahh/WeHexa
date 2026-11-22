"use client";

import { useState, type FormEvent } from "react";
import { useChat } from "@/components/providers/ChatProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";
import CtaPill from "@/components/ui/CtaPill";
import SafeImage from "@/components/ui/SafeImage";
import {
  budgetIds,
  defaultBudget,
  defaultService,
  images,
  serviceIds,
  type BudgetId,
  type ServiceId,
} from "@/data/content";

type FormState = {
  fullName: string;
  email: string;
  whatsapp: string;
  serviceType: ServiceId;
  projectBudget: BudgetId;
  projectDetails: string;
};

const initialForm: FormState = {
  fullName: "",
  email: "",
  whatsapp: "",
  serviceType: defaultService,
  projectBudget: defaultBudget,
  projectDetails: "",
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const fieldClass =
  "w-full rounded-xl border bg-field px-3.5 py-2.5 text-sm text-obsidian placeholder:text-gray-400 transition-colors focus:border-obsidian focus:bg-white";

export default function ContactSection() {
  const { t } = useLanguage();
  const { openChat } = useChat();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [summary, setSummary] = useState("");
  const [serverError, setServerError] = useState("");

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = () => {
    const next: FieldErrors = {};
    if (form.fullName.trim().length < 2) {
      next.fullName = t.contact.form.errorName;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = t.contact.form.errorEmail;
    }
    if (form.projectDetails.trim().length < 20) {
      next.projectDetails = t.contact.form.errorDetails;
    }
    return next;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("submitting");
    setServerError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;

      if (!response.ok || !data?.ok) {
        throw new Error(data?.message ?? "Request failed");
      }

      setSummary(
        t.contact.successBody
          .replace("{name}", form.fullName.trim())
          .replace(
            "{service}",
            t.contact.form.serviceOptions[form.serviceType],
          )
          .replace(
            "{budget}",
            t.contact.form.budgetOptions[form.projectBudget],
          )
          .replace("{email}", form.email.trim()),
      );
      setStatus("success");
    } catch {
      setStatus("error");
      setServerError(t.contact.form.errorGeneric);
    }
  };

  const reset = () => {
    setForm(initialForm);
    setErrors({});
    setServerError("");
    setStatus("idle");
  };

  return (
    <section
      id="contact"
      aria-label="Let's Talk"
      className="scenic-backdrop relative overflow-hidden rounded-[24px] px-4 py-12 shadow-card sm:rounded-[28px] sm:px-8 sm:py-16 lg:px-14 lg:py-20"
    >
      <div
        data-parallax="0.1"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <SafeImage
          src={images.contact.src}
          fallbackSrc={images.contact.fallback}
          alt={t.hero.imageAlt}
          fill
          sizes="100vw"
          className="scale-[1.12] select-none object-cover object-center"
        />
        <div className="absolute inset-0 bg-obsidian/30" />
        <div className="absolute inset-0 bg-gradient-to-br from-contact-top/65 via-contact-mid/45 to-contact-bottom/55" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1180px] grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
        <div
          data-reveal
          className="rounded-3xl border border-white/90 bg-white p-6 shadow-2xl sm:p-8 lg:col-span-6"
        >
          {status === "success" ? (
            <div className="space-y-4 py-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-pulse shadow-md">
                <svg
                  className="h-7 w-7 text-obsidian"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-obsidian">
                {t.contact.successTitle}
              </h3>
              <p className="mx-auto max-w-sm text-xs leading-relaxed text-gray-600 sm:text-sm">
                {summary}
              </p>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold text-obsidian transition-colors hover:bg-gray-100"
              >
                {t.contact.reset}
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-4">
              <div>
                <label
                  htmlFor="full-name"
                  className="mb-1.5 block text-xs font-semibold text-obsidian"
                >
                  {t.contact.form.fullName}
                </label>
                <input
                  id="full-name"
                  name="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.fullName}
                  onChange={(event) => update("fullName", event.target.value)}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? "full-name-error" : undefined}
                  placeholder={t.contact.form.fullNamePlaceholder}
                  className={`${fieldClass} ${
                    errors.fullName ? "border-rose-300" : "border-gray-500"
                  }`}
                />
                {errors.fullName && (
                  <p id="full-name-error" className="mt-1 text-[11px] text-rose-600">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-semibold text-obsidian"
                  >
                    {t.contact.form.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    placeholder={t.contact.form.emailPlaceholder}
                    className={`${fieldClass} ${
                      errors.email ? "border-rose-300" : "border-gray-500"
                    }`}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-[11px] text-rose-600">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="whatsapp"
                    className="mb-1.5 block text-xs font-semibold text-obsidian"
                  >
                    {t.contact.form.whatsapp}
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    autoComplete="tel"
                    value={form.whatsapp}
                    onChange={(event) => update("whatsapp", event.target.value)}
                    placeholder={t.contact.form.whatsappPlaceholder}
                    className={`${fieldClass} border-gray-500`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="service-type"
                    className="mb-1.5 block text-xs font-semibold text-obsidian"
                  >
                    {t.contact.form.serviceType}
                  </label>
                  <div className="relative">
                    <select
                      id="service-type"
                      name="serviceType"
                      value={form.serviceType}
                      onChange={(event) =>
                        update("serviceType", event.target.value as ServiceId)
                      }
                      className={`${fieldClass} appearance-none border-gray-500 pr-9`}
                    >
                      {serviceIds.map((id) => (
                        <option key={id} value={id}>
                          {t.contact.form.serviceOptions[id]}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="project-budget"
                    className="mb-1.5 block text-xs font-semibold text-obsidian"
                  >
                    {t.contact.form.budget}
                  </label>
                  <div className="relative">
                    <select
                      id="project-budget"
                      name="projectBudget"
                      value={form.projectBudget}
                      onChange={(event) =>
                        update("projectBudget", event.target.value as BudgetId)
                      }
                      className={`${fieldClass} appearance-none border-gray-500 pr-9`}
                    >
                      {budgetIds.map((id) => (
                        <option key={id} value={id}>
                          {t.contact.form.budgetOptions[id]}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="project-details"
                  className="mb-1.5 block text-xs font-semibold text-obsidian"
                >
                  {t.contact.form.details}
                </label>
                <textarea
                  id="project-details"
                  name="projectDetails"
                  rows={3}
                  required
                  value={form.projectDetails}
                  onChange={(event) =>
                    update("projectDetails", event.target.value)
                  }
                  aria-invalid={Boolean(errors.projectDetails)}
                  aria-describedby={
                    errors.projectDetails ? "project-details-error" : undefined
                  }
                  placeholder={t.contact.form.detailsPlaceholder}
                  className={`${fieldClass} resize-none ${
                    errors.projectDetails ? "border-rose-300" : "border-gray-500"
                  }`}
                />
                {errors.projectDetails && (
                  <p
                    id="project-details-error"
                    className="mt-1 text-[11px] text-rose-600"
                  >
                    {errors.projectDetails}
                  </p>
                )}
              </div>

              {serverError && (
                <div
                  role="alert"
                  className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700"
                >
                  {serverError}
                </div>
              )}

              <p className="text-xs leading-relaxed text-gray-500">
                {t.contact.form.privacyPrefix}{" "}
                <a
                  href="#footer"
                  className="text-gray-600 underline hover:text-obsidian"
                >
                  {t.contact.form.privacyLink}
                </a>
                .
              </p>

              <CtaPill
                type="submit"
                disabled={status === "submitting"}
                className="w-full justify-between pl-5"
              >
                {status === "submitting"
                  ? t.contact.form.submitting
                  : t.contact.form.submit}
              </CtaPill>

              <p role="status" aria-live="polite" className="sr-only">
                {status === "submitting" ? t.contact.form.submitting : ""}
              </p>
            </form>
          )}
        </div>

        <div
          data-reveal
          style={{ transitionDelay: "120ms" }}
          className="flex flex-col justify-between text-white lg:col-span-6 lg:min-h-[490px]"
        >
          <div>
            <h2 className="text-shadow-contact text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl lg:text-[2.75rem]">
              {t.contact.title}
            </h2>
            <p className="text-shadow-contact-soft mt-2.5 max-w-md text-sm leading-relaxed text-white sm:text-[15px]">
              {t.contact.subtitle}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {t.contact.features.map((feature, index) => (
                <div key={feature.title}>
                  <div className="mb-3.5 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/25">
                    {index === 0 ? (
                      <svg
                        className="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white drop-shadow-xs sm:text-[15px]">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-white">
                    {feature.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start gap-4 rounded-[22px] border border-white bg-white/95 p-4 text-obsidian shadow-2xl backdrop-blur-md sm:flex-row sm:items-center sm:p-5 lg:mt-14">
            <SafeImage
              src={images.founder.src}
              fallbackSrc={images.founder.fallback}
              alt={t.contact.founder.imageAlt}
              width={80}
              height={80}
              className="h-16 w-16 shrink-0 rounded-2xl border border-gray-200 object-cover object-top shadow-xs sm:h-20 sm:w-20"
            />

            <div className="flex-1">
              <h4 className="text-sm font-bold text-obsidian sm:text-[15px]">
                {t.contact.founder.title}
              </h4>
              <p className="mt-1 text-[11.5px] leading-relaxed text-gray-600 sm:text-xs">
                {t.contact.founder.body}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={openChat}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-obsidian transition-colors hover:bg-gray-50"
                >
                  <span
                    className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"
                    aria-hidden="true"
                  />
                  <span>{t.contact.founder.quickChat}</span>
                </button>
                <a
                  href="#full-name"
                  className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-[11px] font-semibold text-obsidian transition-colors hover:bg-gray-200"
                >
                  <span>{t.contact.founder.scheduleCall}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
