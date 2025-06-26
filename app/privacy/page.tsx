'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Database, Eye, Server, Key } from 'lucide-react'

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-3 text-xl text-gray-500 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
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
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Introduction</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              At TrustScribe, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Database className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Information We Collect</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                <li>Account information (name, email, password)</li>
                <li>Testimonial content and related data</li>
                <li>Payment information for premium services</li>
                <li>Communication preferences</li>
              </ul>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Eye className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How We Use Your Information</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                We use the collected information to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                <li>Provide and maintain our services</li>
                <li>Process your transactions</li>
                <li>Send you technical notices and support messages</li>
                <li>Improve our services and develop new features</li>
                <li>Communicate with you about products, services, and events</li>
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
              <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Security</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Server className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Retention</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Key className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Rights</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Request data portability</li>
              </ul>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@trustscribe.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                privacy@trustscribe.com
              </a>
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  )
} 