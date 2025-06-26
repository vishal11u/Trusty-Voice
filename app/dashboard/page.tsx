import { Button } from '@/components/ui/button'
import { MessageSquare, Users, BarChart2, Settings } from 'lucide-react'

const stats = [
  {
    name: 'Total Testimonials',
    value: '24',
    icon: MessageSquare,
    change: '+12%',
    changeType: 'positive',
  },
  {
    name: 'Active Widgets',
    value: '3',
    icon: Settings,
    change: '+1',
    changeType: 'positive',
  },
  {
    name: 'Total Visitors',
    value: '1,234',
    icon: Users,
    change: '+23%',
    changeType: 'positive',
  },
  {
    name: 'Conversion Rate',
    value: '3.2%',
    icon: BarChart2,
    change: '-0.5%',
    changeType: 'negative',
  },
]

const recentTestimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO at TechCorp',
    content:
      'TrustScribe has transformed how we collect and showcase customer feedback. The widgets are beautiful and easy to customize.',
    rating: 5,
    date: '2024-03-15',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Marketing Director',
    content:
      'The chatbot integration makes it so easy to collect testimonials. Our response rate has increased significantly.',
    rating: 5,
    date: '2024-03-14',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Product Manager',
    content:
      'The analytics dashboard provides great insights into our customer feedback. Highly recommended!',
    rating: 4,
    date: '2024-03-13',
  },
]

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening with your testimonials.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
              <div
                className={`text-sm font-medium ${
                  stat.changeType === 'positive'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Testimonials */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Testimonials</h2>
          <Button variant="outline">View All</Button>
        </div>

        <div className="mt-4 space-y-4">
          {recentTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
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
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {testimonial.content}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {new Date(testimonial.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 