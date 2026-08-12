import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paint Mate — Your one-stop paint shop",
  description:
    "Plan, price and order everything for your paint job — paints, primers, putty, tools and painter support. Featuring Jiwan Paints, Ludhiana.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
