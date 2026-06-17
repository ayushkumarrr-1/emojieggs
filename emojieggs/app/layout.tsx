import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EmojiEggs – We Value Your Happiness 🥚",
  description: "Customise your eggs with emojis for every mood and occasion. Fresh eggs, happy vibes!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
