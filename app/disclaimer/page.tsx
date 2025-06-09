'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, FileText, Shield, Info } from 'lucide-react'

export default function DisclaimerPage() {
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
            Legal Disclaimer
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
              <AlertTriangle className="h-6 w-6 text-yellow-500 dark:text-yellow-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">General Disclaimer</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              The information provided on TrustScribe is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Testimonial Disclaimer</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                The testimonials on our site are submitted by actual users of our service. They reflect the real-life experiences and opinions of such users. However, the experiences are personal to those particular users, and may not necessarily be representative of all users of our service. We do not claim, and you should not assume, that all users will have the same experiences.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Your individual results may vary. The testimonials on the site are not necessarily representative of all of those who will use our service.
              </p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Limitation of Liability</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Info className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">External Links Disclaimer</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              The site may contain links to external websites that are not provided or maintained by or in any way affiliated with us. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <AlertTriangle className="h-6 w-6 text-yellow-500 dark:text-yellow-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Professional Disclaimer</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              The site cannot and does not contain legal advice. The legal information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              If you have any questions about this Disclaimer, please contact us at:
              <br />
              <a href="mailto:legal@trustscribe.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                legal@trustscribe.com
              </a>
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  )
} 