"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import CtaPill from "@/components/ui/CtaPill";
import { footerPages, site, socialLinks } from "@/data/content";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      id="footer"
      className="mb-4 mt-20 rounded-[24px] bg-obsidian-card px-6 pb-8 pt-12 text-white sm:mb-6 sm:mt-32 sm:rounded-[28px] sm:px-10 sm:pt-16 lg:px-14"
    >
      <div className="mx-auto max-w-[1220px]">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <a
              href="#top"
              className="text-2xl font-extrabold tracking-[-0.04em] text-white"
            >
              WeHexa
            </a>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-gray-400 sm:text-[13px]">
              {t.footer.tagline}
            </p>
            <CtaPill href="#contact" className="mt-6">
              {t.footer.cta}
            </CtaPill>
          </div>

          <nav aria-label={t.footer.pagesTitle} className="md:col-span-2">
            <h3 className="mb-4 text-xs font-semibold text-gray-400">
              {t.footer.pagesTitle}
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-300 sm:text-[13px]">
              {footerPages.map((href, index) => (
                <li key={href}>
                  <a
                    href={href}
                    className="transition-colors hover:text-lime-pulse"
                  >
                    {t.footer.pages[index]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.footer.socialTitle} className="md:col-span-2">
            <h3 className="mb-4 text-xs font-semibold text-gray-400">
              {t.footer.socialTitle}
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-300 sm:text-[13px]">
              {socialLinks.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    className="transition-colors hover:text-lime-pulse"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h3 className="mb-4 text-xs font-semibold text-gray-400">
              {t.footer.contactTitle}
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-300 sm:text-[13px]">
              <li className="leading-relaxed text-gray-400">
                {site.addressLines[0]}
                <br />
                {site.addressLines[1]}
              </li>
              <li>
                <a
                  href={site.phoneHref}
                  className="transition-colors hover:text-lime-pulse"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-lime-pulse hover:underline"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-[11px] text-gray-400 sm:flex-row">
          <div className="flex items-center gap-5">
            <a href="#footer" className="transition-colors hover:text-gray-300">
              {t.footer.cookie}
            </a>
            <a href="#footer" className="transition-colors hover:text-gray-300">
              {t.footer.privacy}
            </a>
          </div>
          <p>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
