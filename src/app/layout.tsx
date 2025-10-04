import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import I18nClientProvider from "./I18nClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://beverage.wiki/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "饮料百科 | BeverageWiki",
    template: "%s | BeverageWiki",
  },
  description: "饮料百科，使用 Next.js + Markdown + i18n 的内容站点。",
  openGraph: {
    type: "website",
    siteName: "BeverageWiki",
    title: "BeverageWiki",
    description: "饮料百科，使用 Next.js + Markdown + i18n 的内容站点。",
    url: "/",
    locale: "zh_CN",
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "BeverageWiki" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BeverageWiki",
    description: "饮料百科，使用 Next.js + Markdown + i18n 的内容站点。",
    images: ["/icon.png"],
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nClientProvider>{children}</I18nClientProvider>
        <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-12">
          <div className="max-w-4xl mx-auto px-6 py-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
            <span>Powered by </span>
             <a
              href="https://www.mutantcat.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Mutantcat
            </a>
            <span> • </span>
            <a
              href="https://github.com/Mutantcat-Working-Group/BeverageWiki"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Github
            </a>
            <span> • </span>
            <a
              href="https://www.netlify.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Netlify
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
