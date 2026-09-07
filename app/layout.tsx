import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Paint Mate — A Jiwan Group Venture",
  description:
    "Paint Mate. Paint made in Ludhiana, delivered in Ludhiana. A Jiwan Group venture.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cream font-sans text-ink">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
