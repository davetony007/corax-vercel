import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google"; // Using Inter temporarily, can switch to custom font
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Corax Dawai: Amsterdam Coffeeshop Reviews & Guide 2026",
  description: "Discover Amsterdam's best coffeeshops with Corax Dawai. Honest reviews of weed, hash, and edibles. Find top shops, menus, and prices.",
  metadataBase: new URL("https://budstuntman.pages.dev/"),
  openGraph: {
    type: "website",
    url: "https://budstuntman.pages.dev/",
    title: "Corax Dawai: Amsterdam Coffeeshop Reviews & Guide 2026",
    description: "Discover Amsterdam's best coffeeshops with Corax Dawai. Honest reviews of weed, hash, and edibles. Find top shops, menus, and prices.",
    images: ["/og-image.png"],
    siteName: "Corax Dawai",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Corax Dawai: Amsterdam Coffeeshop Reviews & Guide 2026",
    description: "Discover Amsterdam's best coffeeshops with Corax Dawai. Honest reviews of weed, hash, and edibles. Find top shops, menus, and prices.",
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
              name: "Bud Stuntman",
              alternateName: ["Corax Dawai", "Corax Amsterdam"],
              url: "https://budstuntman.pages.dev/",
              description: "Comprehensive guide to Amsterdam's coffeeshops and cannabis culture.",
              author: {
                "@type": "Person",
                name: "Corax Dawai",
                url: "https://www.youtube.com/@CoraxDawai",
              },
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://budstuntman.pages.dev/?search={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "uhyb9ekr2f");
          `}
        </Script>
      </body>
    </html>
  );
}
