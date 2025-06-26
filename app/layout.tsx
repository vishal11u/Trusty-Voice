import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ProgressBar from "@/components/ProgressBar";
import { ClerkProvider } from "@clerk/nextjs";
import MainLayout from "@/components/layouts/MainLayout";
import Chatbot from "@/components/chatbot/Chatbot";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrustScribe - Customer Testimonials Platform",
  description: "Collect, manage, and display customer testimonials with ease.",
  keywords:
    "testimonials, customer feedback, social proof, reviews, trust, conversion, marketing, business growth",
  metadataBase: new URL("https://trusty-voice.vercel.app"),
  alternates: {
    canonical: "https://trusty-voice.vercel.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ProgressBar />
            <Toaster richColors position="top-right" duration={2000} />
            <MainLayout>{children}</MainLayout>
            <Chatbot />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
