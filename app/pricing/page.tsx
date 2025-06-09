"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
// import { Toast } from "@/components/ui/toast"; // Assuming you have a toast component

// Move this outside the component to prevent recreating on each render
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

// Define type for the pricing tier
type PricingTier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
  priceId?: string;
};

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for small teams getting started",
    features: [
      "Up to 5 team members",
      "100 hours of transcription per month",
      "Basic analytics",
      "Email support",
      "Standard accuracy",
    ],
    cta: "Get Started",
    popular: false,
    priceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID,
  },
  {
    name: "Professional",
    price: "$99",
    description: "For growing businesses",
    features: [
      "Up to 20 team members",
      "500 hours of transcription per month",
      "Advanced analytics",
      "Priority support",
      "High accuracy",
      "API access",
      "Custom branding",
    ],
    cta: "Start Free Trial",
    popular: true,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_PRICE_ID,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Unlimited team members",
      "Unlimited transcription",
      "Custom analytics",
      "24/7 support",
      "Highest accuracy",
      "Dedicated account manager",
      "SLA guarantee",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to create checkout session"
        );
      }

      const { sessionId } = await response.json();
      const stripe = await stripePromise;

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          throw new Error(error.message || "Stripe checkout error");
        }
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlanSelect = (tier: PricingTier) => {
    if (tier.name === "Enterprise") {
      handleContactSales();
    } else if (isSignedIn) {
      if (tier.priceId) {
        handleCheckout(tier.priceId);
      } else {
        setError("Price ID is missing. Please contact support.");
      }
    } else {
      // Redirect to sign-up and save selected plan info for after auth
      localStorage.setItem("selectedPlan", tier.name);
      router.push("/sign-up");
    }
  };

  const handleContactSales = () => {
    window.location.href =
      "mailto:sales@trustscribe.com?subject=Enterprise Plan Inquiry";
  };

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl"
          >
            Simple, transparent pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl text-gray-600 dark:text-gray-400"
          >
            Choose the plan that's right for your team
          </motion.p>
        </div>

        {error && (
          <div className="mt-6 max-w-md mx-auto">
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 rounded-lg p-4">
              {error}
            </div>
          </div>
        )}

        <motion.div
          className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={itemVariants}
              className={`relative rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-xl transition-transform hover:scale-105 ${
                tier.popular ? "ring-2 ring-blue-600" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
                    Most popular
                  </span>
                </div>
              )}

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {tier.name}
              </h3>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                {tier.description}
              </p>
              <p className="mt-4">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {tier.price}
                </span>
                {tier.price !== "Custom" && (
                  <span className="text-base font-medium text-gray-600 dark:text-gray-400">
                    /month
                  </span>
                )}
              </p>

              <ul className="mt-8 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="ml-3 text-gray-600 dark:text-gray-400">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  className={`w-full ${
                    tier.popular
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100"
                  }`}
                  onClick={() => handlePlanSelect(tier)}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : tier.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Need a custom solution?
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Contact our sales team to discuss your specific requirements and
              get a tailored plan.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={handleContactSales}
            >
              Contact Sales
            </Button>
          </div>
        </motion.div>

        <div className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            All plans include a 14-day money-back guarantee. No questions asked.
          </p>
          <p className="mt-2">
            Have questions?{" "}
            <a
              href="/faq"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Check our FAQ
            </a>{" "}
            or{" "}
            <a
              href="/contact"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              contact support
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
