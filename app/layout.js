import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "VONEXR Software Technologies | Web Development & AI Agents",
  description:
    "VONEXR builds fast websites, custom web apps and AI agents that answer customers, take orders and save your team hours.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={sora.className}>{children}</body>
    </html>
  );
}