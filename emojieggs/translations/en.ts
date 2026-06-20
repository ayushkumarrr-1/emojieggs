export const en = {
  nav: {
    home: "Home",
    howItWorks: "How It Works",
    occasions: "Occasions",
    testimonials: "Testimonials",
    orderNow: "Order Now 🥚",
    moodGame: "🔮 Mood Game"
  },
  hero: {
    badge: "🥚 Fresh · Fun · Personalized",
    title1: "Eggs That Match",
    title2: "Your Every Mood",
    subtitle: "Pick your occasion, choose an expression, customise how many — we print it fresh on every egg shell. Eat with a smile, every single morning.",
    btnPrimary: "Customise Your Eggs 🎨",
    btnSecondary: "See How It Works",
    stats: {
      expr: "Face Expressions",
      occ: "Occasions",
      cust: "Happy Customers"
    },
    videoTitle: "What is EmojiEggs?"
  },
  howItWorks: {
    badge: "Simple Process",
    title: "4 Steps to a Happier Breakfast",
    steps: [
      { icon: "🎯", title: "Pick an Occasion", desc: "Birthday, Monday blues, anniversary, exam day — we have an occasion for every feeling." },
      { icon: "😄", title: "Choose Your Emoji", desc: "Browse 50+ emojis curated for that occasion. Mix and match across your dozen." },
      { icon: "🔢", title: "Set Your Quantity", desc: "Half dozen, full dozen, or a big party pack. We scale with you." },
      { icon: "🚀", title: "We Deliver Fresh", desc: "Printed and delivered same day. Every egg, a tiny mood booster." },
    ]
  },
  occasions: {
    badge: "Every Mood",
    title: "A Face for Every Occasion",
    items: {
      "star_eyes": "Birthdays",
      "kiss": "Romance",
      "nerd": "Exam Day",
      "flex": "Fitness",
      "rofl": "Just for Fun",
      "dead_inside": "Monday Mood",
      "exhausted": "Employees",
      "tongue_out": "Party Time"
    },
    btn: "Customise Mine Now 🎨"
  },
  customizer: {
    badge: "🎨 Customise",
    title: "Build Your Perfect Egg Box",
    subtitle: "Every selection updates the preview and price live",
    step1: "Step 1: Pick an Occasion",
    step2: "Step 2: Choose Your Face Expressions",
    step2Desc: "Black & white faces printed directly on each egg shell",
    selected: "Selected:",
    step3: "Step 3: How Many Eggs?",
    step4: "Step 4: Add-Ons (Optional)",
    previewTitle: "🥚 Your Box Preview",
    previewDesc: (qty: number, faces: number) => `${qty} eggs · ${faces} face${faces > 1 ? "s" : ""} rotating`,
    priceTitle: "💰 Your Order Total",
    totalLabel: "Total",
    yourFaces: "YOUR FACES",
    onEggs: (qty: number, occ: string) => `on ${qty} eggs · ${occ}`,
    addBtn: "Add to Cart 🛒",
    addedBtn: "✅ Added to Cart!",
    freeDelivery: "🚚 Free delivery on orders above ₹299",
    weValue: "\"We value your happiness\"",
    printedWithLove: "Every egg printed with love",
    modal: {
      summaryTitle: "Order Summary",
      thankYou: (name: string) => `Thank you, ${name}! Here are your order details.`,
      pack: "📦 Pack:",
      occ: "🎯 Occasion:",
      faces: "😄 Faces:",
      addons: "✨ Add-Ons:",
      total: "Total:",
      sendBtn: "Send Order",
      sendingBtn: "Sending...",
      closeBtn: "Close",
      enterDetails: "Enter Your Details",
      name: "Name",
      address: "Address",
      phone: "Phone Number",
      confirmBtn: "Confirm Order",
      successTitle: "Order Received",
      successDesc: "Your order has been placed successfully. We'll contact you soon."
    },
    occasions: {
      "birthday": "Birthday 🎂",
      "love": "Love & Romance 💕",
      "monday": "Monday Blues 😩",
      "exam": "Exam Day 📚",
      "party": "Party Time 🎊",
      "morning": "Good Morning ☀️",
      "health": "Fitness & Health 💪",
      "funny": "Funny Vibes 😂",
      "employees": "Employees 💼"
    },
    packs: {
      "Half Dozen": "Half Dozen",
      "Full Dozen": "Full Dozen",
      "Double Dozen": "Double Dozen",
      "Party Pack": "Party Pack"
    },
    extras: {
      "box": "🎁 Gift Box",
      "card": "💌 Message Card",
      "express": "⚡ Express Delivery"
    }
  },
  testimonials: {
    badge: "Real Stories",
    title: "Happy Customers, Happier Eggs 🥚",
    reviews: [
      { name: "Priya S.", city: "Patna", emoji: "🥰", review: "Ordered birthday eggs for my son — he refused to eat them because they were too cute! 10/10", stars: 5 },
      { name: "Rahul M.", city: "Ludhiana", emoji: "😂", review: "The Monday Blues pack with the coffee emoji hit different. My whole office wants to order now.", stars: 5 },
      { name: "Ananya K.", city: "Jalandhar", emoji: "❤️", review: "I ordered the 'Love & Romance' pack for my husband. He loved the rose emojis on the eggs so much, he framed one instead of eating it!", stars: 5 },
      { name: "Vikram J.", city: "Amritsar", emoji: "🎉", review: "Party pack for 48 people with different emojis — everyone was comparing eggs before eating. Genius idea!", stars: 5 },
    ]
  },
  footer: {
    brand: "EmojiEggs 🥚",
    tagline: "We Value Your Happiness",
    desc: "India's first emoji-printed egg delivery service. Fresh eggs, big smiles, delivered to your door.",
    quickLinks: "Quick Links",
    contact: "Contact",
    email: "📧 For any queries: dinathayush@gmail.com",
    phone: "📞 Phone number: +91 96995 56858",
    time: "⏰ 6 AM – 10 PM Daily",
    delivery: "🚚 Delivery across India",
    rights: "© 2026 EmojiEggs. All rights reserved. 🥚",
    madeWith: "Made with ❤️ & a lot of eggs"
  }
};
