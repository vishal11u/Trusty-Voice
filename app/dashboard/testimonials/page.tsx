import { Button } from '@/components/ui/button'
import { Plus, Search, Filter } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO at TechCorp',
    content:
      'TrustScribe has transformed how we collect and showcase customer feedback. The widgets are beautiful and easy to customize.',
    rating: 5,
    status: 'published',
    date: '2024-03-15',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Marketing Director',
    content:
      'The chatbot integration makes it so easy to collect testimonials. Our response rate has increased significantly.',
    rating: 5,
    status: 'published',
    date: '2024-03-14',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Product Manager',
    content:
      'The analytics dashboard provides great insights into our customer feedback. Highly recommended!',
    rating: 4,
    status: 'pending',
    date: '2024-03-13',
  },
]

export default function TestimonialsPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Testimonials</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and review your customer testimonials
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Testimonial
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search testimonials..."
            className="w-full rounded-md border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Testimonials Table */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {testimonials.map((testimonial) => (
                <tr key={testimonial.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-md truncate text-sm">
                      {testimonial.content}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        testimonial.status === 'published'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}
                    >
                      {testimonial.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(testimonial.date).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 