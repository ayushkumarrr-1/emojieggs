"use client";

const reviews = [
  { name: "Priya S.", city: "Delhi", emoji: "🥰", review: "Ordered birthday eggs for my son — he refused to eat them because they were too cute! 10/10", stars: 5 },
  { name: "Rahul M.", city: "Mumbai", emoji: "😂", review: "The Monday Blues pack with the coffee emoji hit different. My whole office wants to order now.", stars: 5 },
  { name: "Ananya K.", city: "Bangalore", emoji: "❤️", review: "Valentine's Day surprise with rose emojis on every egg. My girlfriend was literally in tears (happy ones).", stars: 5 },
  { name: "Vikram J.", city: "Pune", emoji: "🎉", review: "Party pack for 48 people with different emojis — everyone was comparing eggs before eating. Genius idea!", stars: 5 },
];

export default function Testimonials() {
  return (
    <section className="py-24" style={{ background: "#FFF8E7" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="badge" style={{ background: "#FFB800", color: "#1A1A2E" }}>Real Stories</span>
          <h2 className="font-display mt-3" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#1A1A2E" }}>
            Happy Customers, Happier Eggs 🥚
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-7 relative"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}
            >
              <div className="text-4xl mb-1">{'"'}</div>
              <p className="font-semibold mb-5 leading-relaxed" style={{ color: "#444" }}>{r.review}</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{ background: "#FFF0C8" }}
                >
                  {r.emoji}
                </div>
                <div>
                  <div className="font-bold" style={{ color: "#1A1A2E" }}>{r.name}</div>
                  <div className="text-sm font-semibold" style={{ color: "#888" }}>{r.city}</div>
                </div>
                <div className="ml-auto text-yellow-400 text-lg">
                  {"⭐".repeat(r.stars)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
