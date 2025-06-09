'use client'

import { motion } from 'framer-motion'
import { Users, Target, Heart, Zap, Shield, Star } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            About TrustScribe
          </h1>
          <p className="mt-3 text-xl text-gray-500 dark:text-gray-400">
            Building trust through authentic customer testimonials
          </p>
        </motion.div>

        <div className="mt-12 space-y-12">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Heart className="h-6 w-6 text-red-500 dark:text-red-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Story</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              TrustScribe was born from a simple observation: in today's digital world, authentic customer testimonials are more valuable than ever. We noticed that businesses struggled to collect, manage, and showcase genuine customer feedback effectively. That's why we created a platform that makes it easy for businesses to build trust through real customer stories.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Target className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Our mission is to empower businesses of all sizes to build trust and credibility through authentic customer testimonials. We believe that every business deserves to showcase their success stories and that every customer's voice deserves to be heard.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Zap className="h-6 w-6 text-yellow-500 dark:text-yellow-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What Sets Us Apart</h2>
            </div>
            <div className="space-y-4">
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                <li>Easy-to-use testimonial collection tools</li>
                <li>Customizable widget designs</li>
                <li>Smart moderation features</li>
                <li>Real-time analytics and insights</li>
                <li>Seamless integration with your website</li>
              </ul>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Team</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              We're a diverse team of developers, designers, and customer success specialists passionate about helping businesses grow through authentic customer testimonials. Our team combines technical expertise with a deep understanding of customer trust and social proof.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Values</h2>
            </div>
            <div className="space-y-4">
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                <li>Authenticity: We believe in real, honest testimonials</li>
                <li>Innovation: We continuously improve our platform</li>
                <li>Trust: We build trust through transparency</li>
                <li>Customer Success: We're committed to your growth</li>
                <li>Community: We foster a community of trust</li>
              </ul>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Star className="h-6 w-6 text-yellow-500 dark:text-yellow-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Join Us</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Whether you're a small business owner or a large enterprise, we invite you to join our growing community of businesses that are building trust through authentic customer testimonials. Start your journey with TrustScribe today and let your customers tell your story.
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  )
} 