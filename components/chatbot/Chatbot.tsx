'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageSquare, Send, X, Bot } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateResponse } from '@/lib/gemini'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFirstOpen, setIsFirstOpen] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && isFirstOpen) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "Hello! I'm your AI assistant. How can I help you today?",
          isUser: false
        }])
        setIsFirstOpen(false)
      }, 500)
    }
  }, [isOpen, isFirstOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Add user message
    setMessages(prev => [...prev, { text: input, isUser: true }])
    setInput('')
    setIsLoading(true)

    try {
      // Get AI response
      const response = await generateResponse(input)
      
      // Add AI response
      setMessages(prev => [...prev, { 
        text: response, 
        isUser: false 
      }])
    } catch (error) {
      console.error('Error getting AI response:', error)
      setMessages(prev => [...prev, { 
        text: "Sorry, I encountered an error while processing your request. Please try again.", 
        isUser: false 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
      >
        <MessageSquare size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100%-3rem)] sm:w-96 h-[calc(100vh-12rem)] sm:h-[500px] bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">AI Assistant</h3>
              </div>
              <button
                onClick={toggleChat}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg p-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading}>
                  <Send size={20} />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 