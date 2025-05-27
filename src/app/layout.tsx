import { Montserrat } from "next/font/google";
import { metadata } from "./metadata";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProviderWrapper } from "../components/ThemeProviderWrapper";

const montserrat = Montserrat({ subsets: ["latin"] });

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>
        <ThemeProviderWrapper>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
} 