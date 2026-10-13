import type { Metadata } from "next";
import { Geist, Geist_Mono, Anton } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import WorldTheme from "@/components/world-theme";
import WorldTransitionProvider from "@/components/site/world-transition";
import CommandLayer from "@/components/site/command-layer";
import BlobTransition from "@/components/site/blob-transition";
import { PERSONAL_INFO } from "@/content/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL("https://pramodkrishna.com"),
  title: {
    default: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.tagline}`,
    template: `%s — ${PERSONAL_INFO.shortName}`,
  },
  description: PERSONAL_INFO.subTagline,
  openGraph: {
    title: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.tagline}`,
    description: PERSONAL_INFO.subTagline,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-world="tech"
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable}`}
    >
      <body className="min-h-[100dvh]">
        <WorldTheme />
        <WorldTransitionProvider>
          <SmoothScroll>{children}</SmoothScroll>
          <CommandLayer />
          <BlobTransition />
        </WorldTransitionProvider>
      </body>
    </html>
  );
}
