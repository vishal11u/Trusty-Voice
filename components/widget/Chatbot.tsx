import { useState, useEffect } from 'react'
import { MessageSquare, Send, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  type: 'bot' | 'user'
  content: string
}

interface ChatbotProps {
  widgetId: string
  theme?: 'light' | 'dark'
  onComplete?: (testimonial: {
    name: string
    role: string
    content: string
    rating: number
  }) => void
}

const questions = [
  {
    id: 'name',
    question: "What's your name?",
    type: 'text',
  },
  {
    id: 'role',
    question: 'What is your role?',
    type: 'text',
  },
  {
    id: 'rating',
    question: 'How would you rate your experience? (1-5)',
    type: 'rating',
  },
  {
    id: 'content',
    question: 'Please share your testimonial:',
    type: 'text',
  },
]

export function Chatbot({ widgetId, theme = 'light', onComplete }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [answers, setAnswers] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          type: 'bot',
          content: "Hi! I'm here to help you leave a testimonial. Let's get started!",
        },
        {
          type: 'bot',
          content: questions[0].question,
        },
      ])
    }
  }, [isOpen])

  const handleSubmit = () => {
    if (!inputValue.trim()) return

    const currentQ = questions[currentQuestion]
    const newAnswers = { ...answers, [currentQ.id]: inputValue }
    setAnswers(newAnswers)

    setMessages([
      ...messages,
      { type: 'user', content: inputValue },
    ])

    setInputValue('')

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setMessages((prev) => [
        ...prev,
        { type: 'bot', content: questions[currentQuestion + 1].question },
      ])
    } else {
      // Complete the testimonial
      const testimonial = {
        name: newAnswers.name,
        role: newAnswers.role,
        content: newAnswers.content,
        rating: parseInt(newAnswers.rating),
      }

      // Send testimonial to API
      fetch(`/api/widgets/${widgetId}/testimonials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testimonial),
      })
        .then((response) => response.json())
        .then(() => {
          setMessages((prev) => [
            ...prev,
            {
              type: 'bot',
              content: 'Thank you for your testimonial! It will be reviewed and published soon.',
            },
          ])
          onComplete?.(testimonial)
        })
        .catch((error) => {
          console.error('Error submitting testimonial:', error)
          setMessages((prev) => [
            ...prev,
            {
              type: 'bot',
              content: 'Sorry, there was an error submitting your testimonial. Please try again later.',
            },
          ])
        })
    }
  }

  const themeClasses = {
    light: 'bg-white text-gray-900',
    dark: 'bg-gray-900 text-white',
  }

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 transition-all duration-300',
        themeClasses[theme]
      )}
    >
      {isOpen ? (
        <div className="w-80 rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Leave a Testimonial</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="h-96 overflow-y-auto mb-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex',
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-lg p-3',
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800'
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          {currentQuestion < questions.length && (
            <div className="flex space-x-2">
              <input
                type={questions[currentQuestion].type === 'rating' ? 'number' : 'text'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder={
                  questions[currentQuestion].type === 'rating'
                    ? 'Enter a number between 1-5'
                    : 'Type your answer...'
                }
                min={questions[currentQuestion].type === 'rating' ? 1 : undefined}
                max={questions[currentQuestion].type === 'rating' ? 5 : undefined}
                className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSubmit}
                className={cn(
                  'p-2 rounded-md',
                  theme === 'light'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                )}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
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