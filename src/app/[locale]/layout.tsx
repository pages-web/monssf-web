import type { Metadata } from "next";
import { Inter } from "next/font/google";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Scrolled from "@/components/scrolled";
import { ApolloWrapper } from "@/lib/ApolloWrapper";

const inter = Inter({
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Монголын Оюутны Спортын Холбоо",
  description:
    "Хамтрагч байгууллагууд. Sport. Холбоо барих. Холбогдох дугаар: 311947; Факс: 324050; monssf@mongolnet.mn. Хаяг. Спортын төв ордон, 304 тоот өрөө, Бага тойруу - ...",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <head>
        <link rel="stylesheet" href="/template_static/css/full.css" />
        <link rel="stylesheet" href="/template_static/css/skin2.css" />
        <link rel="stylesheet" href="/template_static/css/mosaic.css" />
        <link rel="stylesheet" href="/template_static/css/styles.css" />
        {/* <link rel="stylesheet" href="/template_static/css/boxed.css" /> */}
        <link
          rel="stylesheet"
          href="/template_static/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          href="/template_static/css/jquery.sidr.light.css"
        />
        <link rel="stylesheet" href="/template_static/css/mega.css" />
        <link rel="stylesheet" href="/template_static/css/normalize.min.css" />
        <link rel="stylesheet" href="/template_static/css/responsive.css" />
        <link rel="stylesheet" href="/template_static/css/rs-plugin.css" />
        <link rel="stylesheet" href="/template_static/css/tooltipster.css" />
        <link rel="stylesheet" href="/css/styles.css" />
        <link rel="stylesheet" href="/css/gallery_styles.css" />
        <link rel="stylesheet" href="/css/reset.css" />
        <link rel="stylesheet" href="/css/table.css" />
        <link rel="stylesheet" href="/css/gerege/gallery_styles.css" />
        <link rel="stylesheet" href="/css/gerege/reset.css" />
        <link rel="stylesheet" href="/css/gerege/styles.css" />
        <link rel="stylesheet" href="/css/gerege/table.css" />
        <link rel="stylesheet" href="/css/gerege/gerege-codes.css" />
        <link rel="stylesheet" href="/css/gerege/gerege-embedded.css" />
        <link rel="stylesheet" href="/css/gerege/gerege-ie7-codes.css" />
        <link rel="stylesheet" href="/css/gerege/gerege-ie7.css" />
        <link rel="stylesheet" href="/css/gerege/gerege.css" />
      </head>
      <body className={inter.className}>
        <ApolloWrapper>
          <NextIntlClientProvider messages={messages}>
            <SiteHeader />
            {children}
            <SiteFooter />
            <Scrolled />
          </NextIntlClientProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}