import type { Metadata } from 'next';
import { Bricolage_Grotesque, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';
import QueryClientComponentProvider from '@/hooks/QueryClientComponentProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LoadingScreen from '@/components/ui/LoadingScreen';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: '--font-bricolage-grotesque',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Discus Gallery',
    template: '%s | Discus Gallery',
  },
  description: 'Marketplace for discus fish breeders',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'h-full',
        'antialiased',
        spaceGrotesk.variable,
        bricolageGrotesque.variable,
        'font-grotesk',
      )}
    >
      <body className="min-h-full flex flex-col relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientComponentProvider>
            <TooltipProvider>
              {children}
              <Toaster />
              {/* <LoadingScreen /> */}
            </TooltipProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientComponentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
