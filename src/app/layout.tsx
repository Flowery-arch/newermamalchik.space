import { Montserrat } from "next/font/google";
import { metadata } from "./metadata";
import "../styles/globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProviderWrapper } from "@/components/ui/ThemeProviderWrapper";

const montserrat = Montserrat({ subsets: ["latin"] });

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        {metadata.other &&
          Object.entries(metadata.other).map(([name, content]) => (
            <meta key={name} name={name} content={String(content)} />
          ))}
      </head>
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