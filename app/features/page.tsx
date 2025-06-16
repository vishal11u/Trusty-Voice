"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Bot, 
  MessageCircle, 
  Video, 
  Star, 
  Sliders, 
  BarChart, 
  Shield, 
  Zap, 
  Code, 
  Settings, 
  Users 
} from 'lucide-react'

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Features
          </h1>
          <p className="mt-3 text-xl text-gray-500 dark:text-gray-400">
            Everything you need to collect and showcase authentic customer testimonials
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <LayoutDashboard className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Manage all your testimonials from a single, intuitive dashboard. Track performance, moderate submissions, and customize your settings with ease.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Bot className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Smart Chatbot</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Collect testimonials automatically through our AI-powered chatbot. Engage customers at the right moment and gather authentic feedback effortlessly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Custom Forms</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Create custom testimonial forms with your branding. Add custom fields, set up conditional logic, and collect exactly the information you need.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Video className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Video Testimonials</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Collect and showcase video testimonials. Our platform makes it easy for customers to record and submit video feedback directly from their devices.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Star className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Rating System</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Implement a comprehensive rating system. Collect star ratings, numerical scores, and detailed feedback to showcase your service quality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Sliders className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Widget Customization</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Customize your testimonial widgets to match your brand. Choose from multiple layouts, colors, and display options to create the perfect look.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <BarChart className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Track the performance of your testimonials with detailed analytics. Monitor views, engagement, and conversion rates to optimize your strategy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Moderation Tools</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Maintain quality with smart moderation tools. Set up automatic filters, review submissions, and ensure only authentic testimonials are displayed.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Code className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Easy Integration</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Integrate testimonials seamlessly with your website. Use our simple embed code or API to display testimonials anywhere on your site.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Settings className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Advanced Settings</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Fine-tune your testimonial collection with advanced settings. Configure notifications, set up approval workflows, and customize your collection process.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Team Collaboration</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Collaborate with your team on testimonial management. Assign roles, share access, and work together to showcase your best customer stories.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Real-time Updates</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Get instant notifications for new testimonials. Stay on top of your customer feedback with real-time updates and alerts.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 