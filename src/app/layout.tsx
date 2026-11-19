import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ConnectivityBanner } from "@/components/ConnectivityBanner";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "宁夏文旅指南 | 景区·美食·路线·方言",
    template: "%s | 宁夏文旅指南",
  },
  description:
    "宁夏景区介绍、美食推荐、旅游路线定制、宁夏方言翻译与站内资料问答。内容基于公开资料整理，票务与开放时间以官方为准。",
  keywords: ["宁夏旅游", "沙坡头", "沙湖", "西夏王陵", "宁夏美食", "宁夏方言", "银川话", "旅游路线"],
  openGraph: {
    title: "宁夏文旅指南",
    description: "景区、美食、路线、方言与站内问答，一站式看宁夏。",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{document.documentElement.classList.add('js');var t=localStorage.getItem('nx-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.dataset.theme='dark'}}catch(e){}})()",
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:border focus:border-line focus:bg-paper focus:px-4 focus:py-2"
        >
          跳到主要内容
        </a>
        <SiteHeader />
        <ConnectivityBanner />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
