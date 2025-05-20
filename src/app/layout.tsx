import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider';
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Продукты",
  description: "Каталог продуктов с корзиной и оформлением заказа",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ReactQueryProvider>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
            <Toaster />
            
          </main>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
