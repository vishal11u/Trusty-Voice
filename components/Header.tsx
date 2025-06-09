"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const { theme, setTheme } = useTheme();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2"
            >
              <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              TrustScribe
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                href="/features"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Pricing
              </Link>
              <Link
                href="/docs"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Documentation
              </Link>
              {isSignedIn ? (
                <div className="flex items-center space-x-4">
                  <Link href="/dashboard">
                    <Button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white duration-200 flex items-center gap-2">
                      Dashboard
                    </Button>
                  </Link>
                </div>
              ) : (
                <Link href="/sign-in">
                  <Button className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Get Started
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:gap-5">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none transition-colors duration-200"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <UserButton afterSignOutUrl="/" />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center md:hidden justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/features"
                className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                Pricing
              </Link>
              <Link
                href="/docs"
                className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                Documentation
              </Link>
              {isSignedIn ? (
                <div className="flex items-center space-x-4 px-3 py-2">
                  <Link href="/dashboard" className="block w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 flex items-center gap-2">
                      Dashboard
                    </Button>
                  </Link>
                  {/* <UserButton afterSignOutUrl="/" /> */}
                </div>
              ) : (
                <Link href="/sign-in" className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Get Started
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
