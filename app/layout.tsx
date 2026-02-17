import type { Metadata } from "next";
import { Roboto, Noto_Sans_Malayalam } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n";
import { Toaster } from "sonner";
import { APP } from "@/lib/constants";

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"], variable: "--font-roboto" });
const notoSansMalayalam = Noto_Sans_Malayalam({
  weight: ["400", "500", "700"],
  subsets: ["latin", "malayalam"],
  variable: "--font-noto-malayalam",
});

export const metadata: Metadata = {
  title: APP.title,
  description: APP.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable} ${notoSansMalayalam.variable} ${roboto.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster position="top-right" />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
