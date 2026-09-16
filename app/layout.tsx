import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://zhiku-learning.wll20010108.chatgpt.site"),
  title: "知库｜每天20分钟的个人知识补给",
  description: "为人力职业成长、生活常识与心理认知设计的轻量离线学习工具。",
  manifest: "/manifest.webmanifest",
  applicationName: "知库",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "知库",
  },
  openGraph: {
    title: "知库｜每天20分钟，慢慢变厉害",
    description: "职业成长与生活常识，每天各学一张卡。",
    type: "website",
    locale: "zh_CN",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "知库个人知识学习应用" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "知库｜每天20分钟，慢慢变厉害",
    description: "职业成长与生活常识，每天各学一张卡。",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f5f1e8",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
