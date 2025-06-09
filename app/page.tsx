"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  Star,
  CheckCircle2,
  Rocket,
  Globe,
  Code,
  Bot,
  LayoutDashboard,
  Settings,
  BarChart,
  MessageCircle,
  Video,
  Star as StarIcon,
  Sliders,
  Zap as ZapIcon,
  Building2,
  Briefcase,
  Store,
  Building,
  Sparkles,
  Award,
  Clock,
  ShieldCheck,
  TrendingUp,
  Heart,
  MessageCircleMore,
  Calendar,
  User,
  Quote,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
} from "framer-motion";

type BackgroundElement = {
  type: "testimonial" | "quick" | "stat";
  content: {
    name?: string;
    role?: string;
    company?: string;
    content?: string;
    rating?: number;
    image?: string;
    author?: string;
    label?: string;
    value?: string;
    icon?: React.ReactNode;
  };
  delay: number;
};

const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
            x: [particle.x, particle.x + Math.random() * 20 - 10],
            y: [particle.y, particle.y + Math.random() * 20 - 10],
          }}
          transition={{
            duration: 3,
            delay: particle.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-blue-500/20 dark:bg-blue-400/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
        />
      ))}
    </div>
  );
};

interface FloatingCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const FloatingCard = ({
  children,
  delay = 0,
  className = "",
}: FloatingCardProps) => {
  // const x = useMotionValue(0);
  // const y = useMotionValue(0);
  const rotateX = useSpring(0);
  const rotateY = useSpring(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    rotateX.set(mouseY * 0.1);
    rotateY.set(mouseX * -0.1);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        perspective: 1000,
      }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.8]);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      content:
        "TrustScribe has transformed how we collect and display customer feedback. The widgets are beautiful and easy to customize.",
      rating: 5,
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Founder",
      company: "StartupX",
      content:
        "The analytics dashboard gives us valuable insights into how our testimonials perform. Highly recommended!",
      rating: 5,
      avatar: "MC",
    },
    {
      name: "Emily Davis",
      role: "E-commerce Manager",
      company: "EcomStore",
      content:
        "The chatbot integration makes collecting testimonials a breeze. Our conversion rates have improved significantly.",
      rating: 5,
      avatar: "ED",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const stats = [
    {
      label: "Total Reviews",
      value: "10,000+",
      icon: <MessageCircleMore className="h-6 w-6" />,
    },
    {
      label: "Average Rating",
      value: "4.9/5",
      icon: <Star className="h-6 w-6" />,
    },
    {
      label: "Response Time",
      value: "< 24h",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      label: "Customer Satisfaction",
      value: "98%",
      icon: <Heart className="h-6 w-6" />,
    },
  ];

  const quickTestimonials = [
    {
      content: "Amazing platform! Our conversion rates increased by 40%",
      author: "TechCorp",
      rating: 5,
    },
    {
      content: "The best testimonial collection tool we've used",
      author: "StartupX",
      rating: 5,
    },
    {
      content: "Simple to use and highly effective",
      author: "EcomStore",
      rating: 5,
    },
  ];

  const backgroundElements: BackgroundElement[] = [
    ...testimonials.map((testimonial, index) => ({
      type: "testimonial" as const,
      content: testimonial,
      delay: index * 0.2,
    })),
    ...quickTestimonials.map((testimonial, index) => ({
      type: "quick" as const,
      content: testimonial,
      delay: index * 0.3,
    })),
    ...stats.map((stat, index) => ({
      type: "stat" as const,
      content: stat,
      delay: index * 0.4,
    })),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20 dark:from-blue-900/20 dark:to-purple-900/20"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <FloatingParticles />
      </div>

      {/* Hero Section with Animated Background Elements */}
      <motion.div
        style={{ opacity, scale }}
        className="relative pt-32 pb-20 px-4 sm:px-6 lg:pt-40 lg:pb-28 lg:px-8 overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {backgroundElements.map((element, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{
                opacity: [0.1, 0.2, 0.1],
                scale: [0.8, 1, 0.8],
                y: [20, 0, 20],
              }}
              transition={{
                duration: 4,
                delay: element.delay,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              {element.type === "testimonial" && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-lg shadow-lg max-w-xs backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(element.content.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          delay: i * 0.1,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      >
                        <StarIcon className="h-4 w-4 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                    "{element.content.content}"
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    - {element.content.name}
                  </p>
                </motion.div>
              )}

              {element.type === "quick" && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-blue-50/80 dark:bg-blue-900/80 p-3 rounded-lg shadow-lg max-w-xs backdrop-blur-sm"
                >
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(element.content.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          delay: i * 0.1,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      >
                        <StarIcon className="h-3 w-3 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 italic">
                    "{element.content.content}"
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                    - {element.content.author}
                  </p>
                </motion.div>
              )}

              {element.type === "stat" && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-green-50/80 dark:bg-green-900/80 p-3 rounded-lg shadow-lg max-w-xs backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="text-green-600 dark:text-green-400"
                    >
                      {element.content.icon}
                    </motion.div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {element.content.value}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {element.content.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4" />
              </motion.div>
              <span>Trusted by 10,000+ businesses worldwide</span>
            </motion.div>

            <FloatingCard delay={0.2}>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
              >
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="block"
                >
                  Collect and Display
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="block text-blue-600 dark:text-blue-400"
                >
                  Customer Testimonials
                </motion.span>
              </motion.h1>
            </FloatingCard>

            <FloatingCard delay={0.4}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
              >
                TrustScribe helps you collect, manage, and display customer
                testimonials on your website. Build trust and increase
                conversions with social proof.
              </motion.p>
            </FloatingCard>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-5 max-w-md mx-auto flex flex-col items-center gap-3 md:mt-8 sm:flex-row sm:justify-center"
            >
              <FloatingCard delay={0.6} className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-md shadow w-full"
                >
                  <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
                    <Button
                      size="lg"
                      className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 justify-center"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Sparkles className="h-5 w-5" />
                      </motion.div>
                      Get Started
                    </Button>
                  </Link>
                </motion.div>
              </FloatingCard>

              <FloatingCard delay={0.8} className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-md shadow w-full"
                >
                  <Link href="/docs">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 flex items-center gap-2 justify-center"
                    >
                      <Code className="h-5 w-5" />
                      Documentation
                    </Button>
                  </Link>
                </motion.div>
              </FloatingCard>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Trusted By Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-12 bg-gray-50 dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
              Trusted By
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Leading Companies Worldwide
            </p>
          </motion.div>
          <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
            {[
              { name: "TechCorp", icon: <Building2 className="h-8 w-8" /> },
              { name: "StartupX", icon: <Rocket className="h-8 w-8" /> },
              { name: "EcomStore", icon: <Store className="h-8 w-8" /> },
              { name: "ConsultPro", icon: <Briefcase className="h-8 w-8" /> },
              {
                name: "Enterprise Inc",
                icon: <Building className="h-8 w-8" />,
              },
              { name: "Global Tech", icon: <Globe className="h-8 w-8" /> },
            ].map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                  className="text-blue-600 dark:text-blue-400 mb-2"
                >
                  {company.icon}
                </motion.div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {company.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Core Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-12 bg-white dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:text-center"
          >
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to showcase testimonials
            </p>
          </motion.div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  icon: <LayoutDashboard className="h-6 w-6" />,
                  title: "Dashboard",
                  description:
                    "Manage and create testimonial campaigns with our intuitive dashboard. Track analytics and manage submissions in one place.",
                },
                {
                  icon: <Code className="h-6 w-6" />,
                  title: "Embeddable Widgets",
                  description:
                    "Add beautiful testimonial widgets to your website with simple code snippets. Customize appearance and behavior.",
                },
                {
                  icon: <Bot className="h-6 w-6" />,
                  title: "Smart Chatbot",
                  description:
                    "Collect feedback, testimonials, and messages through an intelligent chatbot that integrates seamlessly with your site.",
                },
                {
                  icon: <BarChart className="h-6 w-6" />,
                  title: "Analytics",
                  description:
                    "Track impressions, interactions, and conversion rates with detailed analytics and insights.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white group-hover:bg-blue-600 transition-colors duration-200"
                  >
                    {feature.icon}
                  </motion.div>
                  <div className="ml-16">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* User Capabilities Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-12 bg-gray-50 dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
              Capabilities
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Powerful features for your testimonials
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <MessageCircle className="h-6 w-6" />,
                title: "Custom Forms",
                description:
                  "Create testimonial forms with custom fields including name, email, text, rating, and video uploads.",
              },
              {
                icon: <Settings className="h-6 w-6" />,
                title: "Moderation",
                description:
                  "Approve, reject, or edit testimonials before they are published on your site.",
              },
              {
                icon: <Sliders className="h-6 w-6" />,
                title: "Widget Customization",
                description:
                  "Customize widget appearance with theme colors, shapes, and animations to match your brand.",
              },
              {
                icon: <Video className="h-6 w-6" />,
                title: "Video Testimonials",
                description:
                  "Collect and display video testimonials to build even more trust with your audience.",
              },
              {
                icon: <StarIcon className="h-6 w-6" />,
                title: "Rating System",
                description:
                  "Implement a rating system to quantify customer satisfaction and showcase average ratings.",
              },
              {
                icon: <ZapIcon className="h-6 w-6" />,
                title: "Real-time Updates",
                description:
                  "View feedback and testimonials in real-time through your dashboard.",
              },
            ].map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                  {capability.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {capability.title}
                </h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  {capability.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-12 bg-white dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
              Benefits
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Why Choose TrustScribe
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <TrendingUp className="h-6 w-6" />,
                title: "Increased Conversions",
                description:
                  "Boost your conversion rates with authentic social proof from satisfied customers.",
              },
              {
                icon: <ShieldCheck className="h-6 w-6" />,
                title: "Enhanced Trust",
                description:
                  "Build credibility and trust with potential customers through verified testimonials.",
              },
              {
                icon: <Clock className="h-6 w-6" />,
                title: "Time-Saving",
                description:
                  "Automate testimonial collection and management to save valuable time.",
              },
              {
                icon: <Award className="h-6 w-6" />,
                title: "Professional Image",
                description:
                  "Present your business professionally with beautifully designed testimonial displays.",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Pricing Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-12 bg-gray-50 dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
              Pricing
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Simple, transparent pricing
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                name: "Free",
                price: "$0",
                features: [
                  "Up to 50 testimonials",
                  "Basic embed widget",
                  "Standard support",
                  "Basic analytics",
                ],
              },
              {
                name: "Pro",
                price: "$29",
                features: [
                  "Unlimited testimonials",
                  "Advanced widgets",
                  "Chatbot integration",
                  "Custom branding",
                  "Advanced analytics",
                  "Priority support",
                  "API access",
                ],
              },
              {
                name: "Enterprise",
                price: "Custom",
                features: [
                  "Everything in Pro",
                  "Dedicated support",
                  "Custom integrations",
                  "SLA guarantee",
                  "On-premise option",
                  "Custom limits",
                  "White-label solution",
                ],
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-lg shadow-lg p-6 ${
                  index === 1
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-900"
                }`}
              >
                <h3
                  className={`text-lg font-medium ${
                    index === 1 ? "text-white" : "text-gray-900 dark:text-white"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`mt-4 text-3xl font-bold ${
                    index === 1 ? "text-white" : "text-gray-900 dark:text-white"
                  }`}
                >
                  {plan.price}
                  <span className="text-base font-normal">/month</span>
                </p>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle2
                        className={`h-5 w-5 flex-shrink-0 ${
                          index === 1 ? "text-white" : "text-blue-500"
                        }`}
                      />
                      <span
                        className={`ml-3 ${
                          index === 1
                            ? "text-white"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button
                    className={`w-full ${
                      index === 1
                        ? "bg-white text-blue-600 hover:bg-gray-100"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    Get Started
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Analytics Preview Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-12 bg-white dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
              Analytics
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Track your success
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
              Monitor testimonial performance, chatbot interactions, and widget
              impressions with beautiful, interactive charts.
            </p>
          </div>
          <div className="mt-10">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    label: "Total Testimonials",
                    value: "1,234",
                    change: "+12%",
                    icon: <MessageCircleMore className="h-6 w-6" />,
                  },
                  {
                    label: "Chatbot Interactions",
                    value: "5,678",
                    change: "+8%",
                    icon: <Bot className="h-6 w-6" />,
                  },
                  {
                    label: "Widget Impressions",
                    value: "89,012",
                    change: "+15%",
                    icon: <Code className="h-6 w-6" />,
                  },
                  {
                    label: "Conversion Rate",
                    value: "3.2%",
                    change: "+0.5%",
                    icon: <TrendingUp className="h-6 w-6" />,
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                          {stat.icon}
                        </div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {stat.label}
                        </p>
                      </div>
                      <span className="text-sm text-green-600 dark:text-green-400">
                        {stat.change}
                      </span>
                    </div>
                    <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Widget Demo Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-12 bg-gray-50 dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
              Widget Demo
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              See it in action
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
              Experience how our widgets seamlessly integrate with your website
            </p>
          </div>
          <div className="mt-10">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Floating Widget Demo */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Floating Widget
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                      <Sparkles className="h-4 w-4" />
                      <span>Interactive</span>
                    </div>
                  </div>
                  <div className="relative bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-4 h-64">
                    <div className="absolute bottom-4 right-4">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-blue-600 text-white rounded-full p-3 shadow-lg cursor-pointer hover:bg-blue-700 transition-colors duration-200"
                      >
                        <MessageCircle className="h-6 w-6" />
                      </motion.div>
                    </div>
                    <div className="absolute bottom-20 right-4 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Testimonial Bot
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            How was your experience?
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
                            <p className="text-sm text-gray-900 dark:text-white">
                              ⭐️⭐️⭐️⭐️⭐️
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
                            <p className="text-sm text-gray-900 dark:text-white">
                              Amazing service!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inline Widget Demo */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Inline Widget
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                      <Code className="h-4 w-4" />
                      <span>Embeddable</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 rounded-full overflow-hidden bg-blue-500 flex items-center justify-center">
                          <span className="text-white text-xl font-medium">
                            {testimonials[currentTestimonial].avatar}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {testimonials[currentTestimonial].name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {testimonials[currentTestimonial].role},{" "}
                            {testimonials[currentTestimonial].company}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className="h-5 w-5 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        "{testimonials[currentTestimonial].content}"
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <Calendar className="h-3 w-3" />
                        <span>Posted 2 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Animated Testimonials Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-12 bg-white dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
              Testimonials
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              What our customers say
            </p>
          </motion.div>
          <div className="mt-10 relative h-96">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-2xl mx-auto">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden bg-blue-500 flex items-center justify-center">
                      <span className="text-white text-xl font-medium">
                        {testimonials[currentTestimonial].avatar}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonials[currentTestimonial].role},{" "}
                        {testimonials[currentTestimonial].company}
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <Quote className="absolute -top-4 -left-4 h-8 w-8 text-blue-500/20 dark:text-blue-400/20" />
                    <p className="text-lg text-gray-600 dark:text-gray-300 italic">
                      "{testimonials[currentTestimonial].content}"
                    </p>
                    <Quote className="absolute -bottom-4 -right-4 h-8 w-8 text-blue-500/20 dark:text-blue-400/20 transform rotate-180" />
                  </div>
                  <div className="mt-6 flex items-center justify-center gap-1">
                    {[...Array(testimonials[currentTestimonial].rating)].map(
                      (_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <StarIcon className="h-5 w-5 text-yellow-400" />
                        </motion.div>
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                    index === currentTestimonial
                      ? "bg-blue-600 dark:bg-blue-400"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-blue-600 dark:bg-blue-700"
      >
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            <span className="block">Ready to get started?</span>
            <span className="block text-blue-200">
              Start your free trial today.
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-8 flex lg:mt-0 lg:flex-shrink-0"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex rounded-md shadow"
            >
              <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 transition-colors duration-200 flex items-center gap-2"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles className="h-5 w-5" />
                  </motion.div>
                  Get started
                </Button>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-3 inline-flex rounded-md shadow"
            >
              <Link href="/docs">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-blue-500 transition-colors duration-200 flex items-center gap-2"
                >
                  <Code className="h-5 w-5" />
                  Learn more
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
