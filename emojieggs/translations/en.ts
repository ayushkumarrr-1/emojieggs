export const en = {
  nav: {
    home: "Home",
    howItWorks: "How It Works",
    occasions: "Occasions",
    testimonials: "Testimonials",
    orderNow: "Join the Waitlist 🥚",
    moodGame: "🔮 Mood Game"
  },
  hero: {
    badge: "🥚 100% Real Farm Fresh Eggs",
    title1: "Eggs That Match",
    title2: "Your Every Emotion",
    subtitle: "Pick your occasion, choose an expression, customise how many — we print it fresh on every egg shell. Eat with a smile, every single morning.",
    btnPrimary: "Customise Your Eggs 🎨",
    btnSecondary: "See How It Works",
    stats: {
      expr: "Face Expressions",
      occ: "Occasions",
      cust: "Happy Customers"
    }
  },
  whyChooseUs: {
    badge: "The True Gift",
    title: "Gift Memories, Not Just Products",
    cards: [
      {
        icon: "🌹",
        title: "A Rose Dries Up",
        desc: "Beautiful, but wilts in just 2 days."
      },
      {
        icon: "🍫",
        title: "Chocolate Melts",
        desc: "Sweet, but eaten and gone in 10 minutes."
      },
      {
        icon: "🎂",
        title: "Cake Disappears",
        desc: "Celebrated, but cut and finished instantly."
      }
    ],
    highlight: "What truly remains is lots of memories and emotions, not the product.",
    subtext: "Choose something unforgettable. Every emoji egg is a personalized moment that stays in the heart forever."
  },
  howItWorks: {
    badge: "Simple Process",
    title: "4 Steps to the World's Most Edible Greeting Card",
    steps: [
      { icon: "🎯", title: "Pick an Occasion", desc: "Birthday, Monday blues, anniversary, exam day — we have an occasion for every feeling." },
      { icon: "😂", title: "Choose Your Emoji", desc: "Browse 50+ emojis curated for that occasion. Mix and match across your dozen." },
      { icon: "🔢", title: "Set Your Quantity", desc: "Half dozen, full dozen, or a big party pack. We scale with you." },
      { icon: "🚀", title: "We Deliver Fresh", desc: "Printed and delivered same day. Every egg, a tiny mood booster." },
    ]
  },
  occasions: {
    badge: "Every Emotion",
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
    step2Desc: "Premium, iconic, emotionally expressive vector designs. Printed in bold monochrome directly on each egg shell.",
    selected: "Selected:",
    step3: "Step 3: How Many Eggs?",
    step4: "Step 4: Add-Ons (Optional)",
    previewTitle: "🥚 Your Box Preview",
    previewDesc: (qty: number, faces: number) => `${qty} eggs · ${faces} face${faces > 1 ? "s" : ""} rotating`,
    previewDisclaimer: "✨ Note: This is a computer-generated preview. The real product looks even more stunning! 🥚 Plus, lucky customers might find a mystery surprise inside their box! 🎁",
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
      faces: "😂 Faces:",
      addons: "✨ Add-Ons:",
      total: "Total:",
      sendBtn: "Join the Waitlist",
      sendingBtn: "Sending...",
      closeBtn: "Close",
      enterDetails: "Enter Your Details",
      name: "Name",
      address: "Address",
      phone: "Phone Number",
      message: "Message for the Card",
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
      "funny": "Funny Vibes 🤣",
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
    },
    modes: {
      custom: "🎨 Customise Your Own",
      predesigned: "🎁 Pre-Designed Packs"
    },
    preDesignedPacks: [
      {
        id: "sorry",
        name: "🥺 Sorry Pack",
        theme: "Apology & making up",
        emojis: ["pleading", "sad", "🙏", "❤️", "🤍", "cry", "🌹", "🫶", "💌", "blush", "🤝", "teary_smile"],
        tagline: "Because some apologies deserve more than words.",
        price: 139,
      },
      {
        id: "proposal",
        name: "💍 Proposal Pack",
        theme: "Propose your partner",
        emojis: ["🤵", "💍", "❤️", "🌹", "teary_smile", "✨", "🫶", "💖", "star_eyes", "💌", "🥂", "👰"],
        tagline: "The most unforgettable 'Will you marry me?'",
        price: 139,
      },
      {
        id: "love",
        name: "❤️ Love Pack",
        theme: "Romance & anniversaries",
        emojis: ["love_hearts", "kiss", "❤️", "star_eyes", "💖", "🫶", "💕", "🌹", "blush", "💋", "✨", "🤍"],
        tagline: "A dozen little ways to say 'I love you.'",
        price: 139,
      },
      {
        id: "missing",
        name: "🥲 Missing You Pack",
        theme: "Long-distance & nostalgia",
        emojis: ["teary_smile", "sad", "❤️", "🫂", "🌙", "💌", "kiss", "🤍", "✨", "pleading", "📱", "💖"],
        tagline: "Distance ends where emotions begin.",
        price: 139,
      },
      {
        id: "hi",
        name: "👋 Hi Pack",
        theme: "Breaking the ice & starting conversations",
        emojis: ["👋", "blush", "laugh", "🤝", "☕", "💬", "wink", "✨", "🌼", "happy", "💛", "🙌"],
        tagline: "The cutest way to say hello.",
        price: 139,
      },
      {
        id: "story_sorry",
        name: "🎭 Story Pack: I'm Sorry",
        theme: "Story 1: \"I'm Sorry\"",
        emojis: ["sad", "pleading", "🙏", "🌹", "❤️", "🫶", "blush", "🤍", "teary_smile", "💌", "🤝", "love_hearts"],
        tagline: "Instead of random emojis, every egg continues the story.",
        price: 159,
      },
      {
        id: "story_love",
        name: "🎭 Story Pack: I Love You",
        theme: "Story 2: \"I Love You\"",
        emojis: ["👀", "blush", "🌹", "❤️", "💖", "🫶", "kiss", "💍", "🥂", "teary_smile", "✨", "love_hearts"],
        tagline: "Instead of random emojis, every egg continues the story.",
        price: 159,
      },
      {
        id: "story_hi",
        name: "🎭 Story Pack: Say Hi",
        theme: "Story 3: \"Say Hi\"",
        emojis: ["👋", "blush", "💬", "laugh", "☕", "🤝", "rofl", "🌼", "✨", "💛", "🙌", "❤️"],
        tagline: "Instead of random emojis, every egg continues the story.",
        price: 159,
      },
      {
        id: "story_miss",
        name: "🎭 Story Pack: I Miss You",
        theme: "Story 4: \"I Miss You\"",
        emojis: ["🌙", "teary_smile", "💭", "❤️", "📱", "💌", "🫂", "🤍", "kiss", "✨", "blush", "love_hearts"],
        tagline: "Instead of random emojis, every egg continues the story.",
        price: 159,
      },
      {
        id: "fitness",
        name: "💪 Fitness Lineup",
        theme: "Gym & Workout Motivation",
        emojis: ["🏋️‍♂️", "🧱", "🦅", "🛶", "🦖", "🦘", "🏔️", "🏹", "🦀", "🦏", "🍫", "🌪️"],
        tagline: "Fuel your gains with the ultimate fitness 12-pack.",
        price: 129,
      }
    ]
  },
  testimonials: {
    badge: "Real Stories",
    title: "Happy Customers, Happier Eggs 🥚",
    reviews: [
      { name: "Priya S.", city: "Patna", emoji: "🥰", review: "Ordered birthday eggs for my son — he refused to eat them because they were too cute! 10/10", stars: 5 },
      { name: "Rahul M.", city: "Ludhiana", emoji: "🤣", review: "The Monday Blues pack with the coffee emoji hit different. My whole office wants to order now.", stars: 5 },
      { name: "Ananya K.", city: "Jalandhar", emoji: "❤️", review: "I ordered the 'Love & Romance' pack for my husband. He loved the rose emojis on the eggs so much, he framed one instead of eating it!", stars: 5 },
      { name: "Vikram J.", city: "Amritsar", emoji: "🎉", review: "Party pack for 48 people with different emojis — everyone was comparing eggs before eating. Genius idea!", stars: 5 },
    ]
  },
  footer: {
    brand: "FaciEggs 🥚",
    tagline: "We Value Your Happiness",
    desc: "India's first emoji-printed egg delivery service. Fresh eggs, big smiles, delivered to your door.",
    quickLinks: "Quick Links",
    contact: "Contact",
    email: "📧 For any queries: dinathayush@gmail.com",
    phone: "📞 Phone number: +91 96995 56858",
    time: "⏰ 6 AM – 10 PM Daily",
    delivery: "🚚 Delivery across India",
    rights: "© 2026 FaciEggs. All rights reserved. 🥚",
    madeWith: "Made with ❤️ & a lot of eggs"
  }
};
