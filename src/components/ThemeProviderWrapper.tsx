'use client';

import { ThemeProvider } from "next-themes";
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import ClientLayout from "@/app/ClientLayout";

export function ThemeProviderWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode='wait'>
      <div key={pathname}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </div>
    </AnimatePresence>
  );
} 