import { Montserrat } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { LanguageProvider } from "@/contexts/LanguageContext";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Портфолио · @newermamalchik</title>
        <link rel="icon" type="image/gif" href="/popa.png" />
      </head>
      <body className={montserrat.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <ClientLayout>{children}</ClientLayout>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 