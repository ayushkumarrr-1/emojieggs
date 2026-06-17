export default function Footer() {
  return (
    <footer style={{ background: "#1A1A2E", color: "white", padding: "60px 24px 32px" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-display text-3xl mb-1" style={{ color: "#FFB800" }}>EmojiEggs 🥚</div>
            <p className="text-sm font-semibold mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
              We Value Your Happiness
            </p>
            <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
              India's first emoji-printed egg delivery service. Fresh eggs, big smiles, delivered to your door.
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
            <h4 className="font-display text-lg mb-4" style={{ color: "#FFB800" }}>Quick Links</h4>
            {["Home", "How It Works", "Occasions", "Order Now", "About Us"].map((l) => (
              <a key={l} href="#" className="block text-sm font-semibold mb-2 hover:text-yellow-400 transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}>
                {l}
              </a>
            ))}
          </div>

          <div>
            <h4 className="font-display text-lg mb-4" style={{ color: "#FFB800" }}>Contact</h4>
            <p className="text-sm font-semibold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>📧 hello@emojieggs.in</p>
            <p className="text-sm font-semibold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>📞 +91 98765 43210</p>
            <p className="text-sm font-semibold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>⏰ 6 AM – 10 PM Daily</p>
            <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>🚚 Delivery across India</p>
          </div>
        </div>

        <div className="border-t flex flex-col sm:flex-row justify-between items-center gap-4 pt-8" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <p className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>
            © 2025 EmojiEggs. All rights reserved. 🥚
          </p>
          <p className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>
            Made with ❤️ & a lot of eggs
          </p>
        </div>
      </div>
    </footer>
  );
}
