// const RootLayout = ({ children }: { children: React.ReactNode }) => {
//   return children;
// };

import "./[locale]/globals.css";
// Legacy template CSS — still needed by inner CMS pages that haven't been
// migrated to the new design yet. Remove once every page is migrated.
import "@/styles/global-styles.css";
// New design system — imported LAST so its rules win over the legacy
// template for the redesigned shell and pages.
import "@/styles/site.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "mongolia",
  description:
    "Хамтрагч байгууллагууд. Sport. Холбоо барих. Холбогдох дугаар: 311947; Факс: 324050; monssf@mongolnet.mn. Хаяг. Спортын төв ордон, 304 тоот өрөө, Бага тойруу – ...",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children as any;
}
