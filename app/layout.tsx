import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "./globals.css";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { theme } from "@/lib/theme";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Mich — Desarrollador & Creador",
    template: "%s | Mich",
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Mich — Desarrollador & Creador",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary",
    title: "Mich — Desarrollador & Creador",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: absoluteUrl("/favicon.ico"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
