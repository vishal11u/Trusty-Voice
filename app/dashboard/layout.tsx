import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  BarChart,
  HelpCircle,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Testimonials",
    href: "/dashboard/testimonials",
    icon: MessageSquare,
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    name: "Help",
    href: "/dashboard/help",
    icon: HelpCircle,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 dark:border-gray-800">
          <div className="flex flex-1 flex-col  pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <Link href="/" className="text-xl font-bold">
                TrustScribe
              </Link>
            </div>
            <nav className="mt-5 flex-1 space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  <item.icon
                    className="mr-3 h-5 w-5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center flex-1 justify-between px-4">
            <div className="flex flex-1">
              <form
                className="flex md:ml-0 border border-gray-200 overflow-hidden w-[50%] rounded-md"
                action="#"
                method="GET"
              >
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <input
                    id="search-field"
                    className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 dark:bg-gray-900 dark:text-white sm:text-sm"
                    placeholder="Search"
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div>

            <div className="flex items-center">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
