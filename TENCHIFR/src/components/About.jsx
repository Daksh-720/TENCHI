import { useState } from "react";
import { Mail, ExternalLink, Copy, Check, Sparkles } from "lucide-react";
import logo from "../assets/logo.png";

function LinkedInIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.27a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28" />
    </svg>
  );
}

function Footer({ darkMode, aboutRef }) {
  const [copied, setCopied] = useState(false);
  const email = "dakshsalvi59@gmail.com";
  const linkedinUrl = "https://www.linkedin.com/in/daksh-salvi";
  const currentYear = new Date().getFullYear();

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer
      ref={aboutRef}
      id="about-section"
      className={`relative z-10 w-full border-t backdrop-blur-md transition-colors duration-500 mt-16 sm:mt-24 ${
        darkMode
          ? "border-white/10 bg-black/60 text-white"
          : "border-black/10 bg-white/60 text-black shadow-xs"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 sm:gap-8">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-md">
            <div className="flex items-center gap-2.5 mb-2">
              <img
                src={logo}
                alt="ＴΞNCHI-DATA Logo"
                className="h-6 w-6 object-contain"
              />
              <span className="text-base font-bold tracking-[0.2em]">
                ＴΞNCHI-DATA
              </span>
            </div>
            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                darkMode ? "text-white/65" : "text-black/65"
              }`}
            >
              An ultra-fast online clipboard and file-sharing platform designed for seamless,
              ephemeral data transfer across devices.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Ephemeral & Secure
              </span>
              <span className={darkMode ? "text-white/20" : "text-black/20"}>•</span>
              <span className={darkMode ? "text-white/50" : "text-black/50"}>
                Auto-Purge Storage
              </span>
            </div>
          </div>

          {/* Creator & Contact Info */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#00D2FF]" />
              <span className="text-xs uppercase tracking-wider font-semibold opacity-75">
                Created & Developed by
              </span>
              <span className="text-sm font-bold">Daksh Salvi</span>
            </div>

            {/* Social & Contact Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5 mt-1">
              {/* LinkedIn Link */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                  darkMode
                    ? "border-white/15 bg-white/5 hover:border-[#00D2FF]/60 hover:bg-[#00D2FF]/10 text-white"
                    : "border-black/15 bg-white/80 hover:border-[#0077B5]/60 hover:bg-[#0077B5]/10 text-black shadow-xs"
                }`}
                aria-label="Daksh Salvi LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4 text-[#0077B5]" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              {/* Email with Copy Button */}
              <div
                className={`inline-flex items-center gap-1.5 rounded-xl border pl-3 pr-1.5 py-1 text-xs font-medium ${
                  darkMode
                    ? "border-white/15 bg-white/5 text-white"
                    : "border-black/15 bg-white/80 text-black shadow-xs"
                }`}
              >
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-1.5 hover:underline"
                  aria-label={`Send email to ${email}`}
                >
                  <Mail className="w-3.5 h-3.5 opacity-70" />
                  <span>{email}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`ml-1 flex items-center gap-1 rounded-lg border px-2 py-0.5 text-[11px] font-medium transition cursor-pointer ${
                    copied
                      ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300"
                      : darkMode
                      ? "border-white/15 bg-white/10 hover:bg-white/20 text-white/90"
                      : "border-black/15 bg-black/5 hover:bg-black/10 text-black/90"
                  }`}
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Trademark Bar */}
        <div
          className={`mt-6 pt-5 border-t flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left text-xs ${
            darkMode ? "border-white/10 text-white/50" : "border-black/10 text-black/50"
          }`}
        >
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 sm:gap-2">
            <span>© {currentYear} ＴΞNCHI-DATA™ · Daksh Salvi.</span>
            <span className="font-semibold tracking-wider uppercase text-[11px]">
              All Rights Reserved.™
            </span>
          </div>

          <div className="text-[11px] opacity-75">
            Designed for Speed & Simplicity
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
