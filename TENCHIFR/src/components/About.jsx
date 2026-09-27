import { useState } from "react";
import { Mail, ExternalLink, Copy, Check, ShieldCheck, Zap, Globe, Sparkles } from "lucide-react";
import logo from "../assets/logo.png";

function LinkedInIcon({ className = "w-5 h-5" }) {
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

function About({ darkMode, aboutRef }) {
  const [copied, setCopied] = useState(false);
  const email = "dakshsalvi59@gmail.com";
  const linkedinUrl = "https://www.linkedin.com/in/daksh-salvi";
  const currentYear = new Date().getFullYear();

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <footer
      ref={aboutRef}
      id="about-section"
      className="relative w-full max-w-[92vw] sm:max-w-4xl mx-auto mt-16 sm:mt-24 mb-16 scroll-mt-24 sm:scroll-mt-28"
    >
      {/* Outer Card with Glassmorphic styling */}
      <div
        className={`relative overflow-hidden rounded-3xl border p-6 sm:p-8 md:p-10 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 ${
          darkMode
            ? "border-white/15 bg-black/60 shadow-[0_8px_32px_rgba(0,0,0,0.8)]"
            : "border-black/15 bg-white/75 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
        }`}
      >
        {/* Subtle decorative background glow */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl transition-opacity duration-700 ${
            darkMode
              ? "bg-gradient-to-br from-[#00D2FF]/20 to-[#737FF2]/20 opacity-70"
              : "bg-gradient-to-br from-[#737FF2]/15 to-[#A78BFA]/20 opacity-60"
          }`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full blur-3xl transition-opacity duration-700 ${
            darkMode
              ? "bg-gradient-to-tr from-[#A78BFA]/15 to-[#00D2FF]/15 opacity-60"
              : "bg-gradient-to-tr from-[#00D2FF]/10 to-[#737FF2]/15 opacity-50"
          }`}
        />

        {/* Section Header */}
        <div className="relative z-10 flex flex-col items-center text-center mb-8 sm:mb-10">
          <div
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-md transition-colors ${
              darkMode
                ? "border-white/20 bg-white/10 text-[#00D2FF]"
                : "border-black/15 bg-white/80 text-[#454C91]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>About The Platform & Creator</span>
          </div>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Designed for Instant, Frictionless Sharing
          </h2>
          <p
            className={`mt-2.5 max-w-xl text-sm sm:text-base leading-relaxed ${
              darkMode ? "text-white/70" : "text-black/70"
            }`}
          >
            ＴΞNCHI-DATA empowers users to seamlessly transfer text, code snippets,
            and files across devices in seconds without the burden of permanent footprints.
          </p>
        </div>

        {/* Two-Column Grid: Platform Highlights & Creator Profile */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Column 1: About the Platform */}
          <div
            className={`flex flex-col justify-between rounded-2xl border p-5 sm:p-6 transition-all duration-300 ${
              darkMode
                ? "border-white/10 bg-white/5 hover:border-white/20"
                : "border-black/10 bg-white/50 hover:border-black/20"
            }`}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={logo}
                  alt="ＴΞNCHI-DATA Logo"
                  className="h-8 w-8 object-contain drop-shadow-sm"
                />
                <div>
                  <h3
                    className={`text-lg font-bold tracking-wide ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    ＴΞNCHI-DATA
                  </h3>
                  <span
                    className={`text-xs ${
                      darkMode ? "text-white/50" : "text-black/50"
                    }`}
                  >
                    Online Clipboard & Vault
                  </span>
                </div>
              </div>

              <p
                className={`text-xs sm:text-sm leading-relaxed mb-5 ${
                  darkMode ? "text-white/70" : "text-black/70"
                }`}
              >
                Built to solve the hassle of emailing yourself files or pasting credentials
                across chat apps. Generate a short numeric code, retrieve your content on any
                screen, and let automatic background purges take care of the rest.
              </p>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${
                      darkMode ? "bg-[#00D2FF]/15 text-[#00D2FF]" : "bg-[#454C91]/10 text-[#454C91]"
                    }`}
                  >
                    <Zap className="h-3.5 w-3.5" />
                  </div>
                  <span className={darkMode ? "text-white/80" : "text-black/80"}>
                    Universal instant clips: Text, images, videos & batch files
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${
                      darkMode ? "bg-[#A78BFA]/15 text-[#A78BFA]" : "bg-[#737FF2]/15 text-[#737FF2]"
                    }`}
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </div>
                  <span className={darkMode ? "text-white/80" : "text-black/80"}>
                    Ephemeral security: Automatic scheduled cleanups & expiry
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${
                      darkMode ? "bg-[#00D2FF]/15 text-[#00D2FF]" : "bg-[#454C91]/10 text-[#454C91]"
                    }`}
                  >
                    <Globe className="h-3.5 w-3.5" />
                  </div>
                  <span className={darkMode ? "text-white/80" : "text-black/80"}>
                    Device-agnostic access with zero installation required
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`mt-6 pt-4 border-t flex items-center justify-between text-[11px] ${
                darkMode ? "border-white/10 text-white/50" : "border-black/10 text-black/50"
              }`}
            >
              <span>Powered by Spring Boot & React</span>
              <span className="font-mono">v1.0.0</span>
            </div>
          </div>

          {/* Column 2: Creator & Contact Info */}
          <div
            className={`flex flex-col justify-between rounded-2xl border p-5 sm:p-6 transition-all duration-300 ${
              darkMode
                ? "border-white/10 bg-white/5 hover:border-white/20"
                : "border-black/10 bg-white/50 hover:border-black/20"
            }`}
          >
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                {/* Avatar with gradient border */}
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#00D2FF] via-[#737FF2] to-[#A78BFA] p-0.5 shadow-md">
                  <div
                    className={`flex h-full w-full items-center justify-center rounded-[14px] font-bold text-sm tracking-wider ${
                      darkMode ? "bg-black text-white" : "bg-white text-gray-900"
                    }`}
                  >
                    DS
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3
                      className={`text-lg font-bold tracking-wide ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Daksh Salvi
                    </h3>
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                        darkMode
                          ? "bg-white/10 text-white/70"
                          : "bg-black/5 text-black/70"
                      }`}
                    >
                      Creator
                    </span>
                  </div>
                  <span
                    className={`text-xs ${
                      darkMode ? "text-white/60" : "text-black/60"
                    }`}
                  >
                    Full-Stack Software Engineer
                  </span>
                </div>
              </div>

              <p
                className={`text-xs sm:text-sm leading-relaxed mb-5 ${
                  darkMode ? "text-white/70" : "text-black/70"
                }`}
              >
                Hi there! I created ＴΞNCHI-DATA to craft a fast, elegant, and reliable data
                transfer utility. Feel free to connect, collaborate, or reach out directly
                through any of the channels below.
              </p>

              {/* Direct Links: LinkedIn & Email */}
              <div className="space-y-3">
                {/* LinkedIn Link Card */}
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center justify-between rounded-xl border p-3 transition-all duration-200 cursor-pointer ${
                    darkMode
                      ? "border-white/15 bg-white/5 hover:border-[#00D2FF]/60 hover:bg-[#00D2FF]/10 text-white"
                      : "border-black/15 bg-white/70 hover:border-[#0077B5]/60 hover:bg-[#0077B5]/10 text-black shadow-xs"
                  }`}
                  aria-label="Connect on LinkedIn"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-105 ${
                        darkMode
                          ? "bg-[#0077B5]/20 text-[#00D2FF]"
                          : "bg-[#0077B5] text-white shadow-sm"
                      }`}
                    >
                      <LinkedInIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 text-left">
                      <div className="text-xs font-semibold uppercase tracking-wider opacity-75">
                        LinkedIn Profile
                      </div>
                      <div className="text-xs sm:text-sm font-medium truncate">
                        linkedin.com/in/daksh-salvi
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </a>

                {/* Email Contact Card */}
                <div
                  className={`flex items-center justify-between rounded-xl border p-3 transition-all duration-200 ${
                    darkMode
                      ? "border-white/15 bg-white/5 text-white"
                      : "border-black/15 bg-white/70 text-black shadow-xs"
                  }`}
                >
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 min-w-0 flex-1 group"
                    aria-label={`Send email to ${email}`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-105 ${
                        darkMode
                          ? "bg-purple-500/20 text-[#A78BFA]"
                          : "bg-[#737FF2] text-white shadow-sm"
                      }`}
                    >
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 text-left">
                      <div className="text-xs font-semibold uppercase tracking-wider opacity-75">
                        Direct Email
                      </div>
                      <div className="text-xs sm:text-sm font-medium truncate group-hover:underline">
                        {email}
                      </div>
                    </div>
                  </a>

                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={`ml-2 flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition cursor-pointer shrink-0 ${
                      copied
                        ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300"
                        : darkMode
                        ? "border-white/20 bg-white/10 hover:bg-white/20 text-white"
                        : "border-black/20 bg-black/5 hover:bg-black/10 text-black"
                    }`}
                    title="Copy email to clipboard"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="hidden sm:inline">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`mt-6 pt-4 border-t flex items-center justify-between text-[11px] ${
                darkMode ? "border-white/10 text-white/50" : "border-black/10 text-black/50"
              }`}
            >
              <span>Available for discussions & questions</span>
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Trademark & Legal Footer */}
        <div
          className={`relative z-10 mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs ${
            darkMode ? "border-white/10 text-white/60" : "border-black/10 text-black/70"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
            <span className="font-semibold tracking-wide">
              © {currentYear} ＴΞNCHI-DATA™ · Daksh Salvi.
            </span>
            <span className="font-medium text-xs tracking-wider uppercase opacity-90">
              All Rights Reserved.™
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] opacity-75">
            <span>Fast • Ephemeral • Secure</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default About;
