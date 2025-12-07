import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter temporarily, can switch to custom font
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Corax Dawai - Best Amsterdam Coffeeshop Reviews & Cannabis Guide 2026",
  description: "Discover Amsterdam's best coffeeshops with Corax Dawai. Honest reviews of weed strains, hash, and edibles. Find top-rated shops, current menus, and Cali import prices.",
  metadataBase: new URL("https://corax-amsterdam-explorer-main.pages.dev/"),
  openGraph: {
    type: "website",
    url: "https://corax-amsterdam-explorer-main.pages.dev/",
    title: "Corax Dawai - Best Amsterdam Coffeeshop Reviews & Cannabis Guide 2026",
    description: "Discover Amsterdam's best coffeeshops with Corax Dawai. Honest reviews of weed strains, hash, and edibles. Find top-rated shops, current menus, and Cali import prices.",
    images: ["/og-image.png"],
    siteName: "Corax Dawai",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Corax Dawai - Best Amsterdam Coffeeshop Reviews & Cannabis Guide 2025",
    description: "Discover Amsterdam's best coffeeshops with Corax Dawai. Honest reviews of weed strains, hash, and edibles. Find top-rated shops, current menus, and Cali import prices.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "kBV-auX9NyTxu-xyeJYlwQ4R2n_PbsENmQnSWye_Ui4",
    other: {
      "msvalidate.01": "35BE4B98F4D7158553A56853893E44A9",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Corax Dawai",
              alternateName: ["Corax Amsterdam Explorer", "Corax Amsterdam"],
              url: "https://corax-amsterdam-explorer-main.pages.dev/",
              description: "Comprehensive guide to Amsterdam's coffeeshops and cannabis culture.",
              author: {
                "@type": "Person",
                name: "Corax Dawai",
                url: "https://www.youtube.com/@CoraxDawai",
              },
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://corax-amsterdam-explorer-main.pages.dev/?search={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
