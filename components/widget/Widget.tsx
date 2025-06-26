'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WidgetProps {
  widgetId: string
  theme?: 'light' | 'dark'
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  autoRotate?: boolean
  rotationInterval?: number
  chatbot?: boolean
}

interface Testimonial {
  rating: number
  content: string
  name: string
  role: string
}

export function Widget({
  widgetId,
  theme = 'light',
  position = 'bottom-right',
  autoRotate = true,
  rotationInterval = 5000,
  chatbot = false,
}: WidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    // Fetch testimonials for this widget
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`/api/widgets/${widgetId}/testimonials`)
        const data = await response.json()
        setTestimonials(data)
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      }
    }

    fetchTestimonials()
  }, [widgetId])

  useEffect(() => {
    if (autoRotate && testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      }, rotationInterval)

      return () => clearInterval(interval)
    }
  }, [autoRotate, rotationInterval, testimonials.length])

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  }

  const themeClasses = {
    light: 'bg-white text-gray-900',
    dark: 'bg-gray-900 text-white',
  }

  return (
    <div
      className={cn(
        'fixed z-50 transition-all duration-300',
        positionClasses[position]
      )}
    >
      {isOpen ? (
        <div
          className={cn(
            'w-80 rounded-lg shadow-lg p-4',
            themeClasses[theme]
          )}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Customer Testimonials</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {testimonials.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={cn(
                      'h-4 w-4',
                      i < testimonials[currentTestimonial].rating
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    )}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-sm">{testimonials[currentTestimonial].content}</p>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div>
                  <p className="text-sm font-medium">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No testimonials available.
            </p>
          )}

          {chatbot && (
            <button
              className={cn(
                'mt-4 w-full py-2 px-4 rounded-md text-sm font-medium',
                theme === 'light'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              )}
              onClick={() => {
                // Open chatbot
              }}
            >
              Leave a Review
            </button>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            'p-3 rounded-full shadow-lg',
            theme === 'light'
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          )}
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}
    </div>
  )
} 