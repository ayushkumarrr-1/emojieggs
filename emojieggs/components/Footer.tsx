"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer style={{ background: "#1A1A2E", color: "white", padding: "60px 24px 32px" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-display text-3xl mb-1" style={{ color: "#FFB800" }}>{t.footer.brand}</div>
            <p className="text-sm font-semibold mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
              {t.footer.tagline}
            </p>
            <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
              {t.footer.desc}
            </p>
            <div className="flex gap-4 mt-6">
              {["📸", "📘", "🐦", "📱"].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4" style={{ color: "#FFB800" }}>{t.footer.quickLinks}</h4>
            {[
              { label: t.nav.home, href: "#home" },
              { label: t.nav.howItWorks, href: "#how-it-works" },
              { label: t.nav.occasions, href: "#occasions" },
              { label: t.nav.orderNow, href: "#order" },
              { label: "Smile Fund", href: "#smile-fund" }
            ].map((link) => (
              <a key={link.label} href={link.href} className="block text-sm font-semibold mb-2 hover:text-yellow-400 transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}>
                {link.label}
              </a>
            ))}
          </div>

          <div>
            <h4 className="font-display text-lg mb-4" style={{ color: "#FFB800" }}>{t.footer.contact}</h4>
            <p className="text-sm font-semibold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
              <a href="mailto:dinathayush@gmail.com" className="hover:text-yellow-400 transition-colors">{t.footer.email}</a>
            </p>
            <p className="text-sm font-semibold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
              <a href="tel:+919699556858" className="hover:text-yellow-400 transition-colors">{t.footer.phone}</a>
            </p>
            <p className="text-sm font-semibold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>{t.footer.time}</p>
            <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>{t.footer.delivery}</p>
          </div>
        </div>

        <div className="border-t flex flex-col sm:flex-row justify-between items-center gap-4 pt-8" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <p className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>
            {t.footer.rights}
          </p>
          <p className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>
            {t.footer.madeWith}
          </p>
        </div>
      </div>
    </footer>
  );
}

