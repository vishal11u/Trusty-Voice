'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts'

const data = [
  { name: 'Jan', testimonials: 12, views: 400 },
  { name: 'Feb', testimonials: 19, views: 600 },
  { name: 'Mar', testimonials: 24, views: 800 },
  { name: 'Apr', testimonials: 15, views: 500 },
  { name: 'May', testimonials: 28, views: 900 },
  { name: 'Jun', testimonials: 32, views: 1000 },
]

const ratingData = [
  { rating: 1, count: 2 },
  { rating: 2, count: 3 },
  { rating: 3, count: 8 },
  { rating: 4, count: 15 },
  { rating: 5, count: 22 },
]

const topTestimonials = [
  {
    content: "TrustScribe has transformed how we collect and showcase customer feedback. The widget is beautiful and easy to use!",
    views: 1234,
    rating: 5,
    author: "Sarah Johnson",
    company: "TechCorp"
  },
  {
    content: "Our conversion rate increased by 30% after implementing TrustScribe's testimonial widget.",
    views: 987,
    rating: 5,
    author: "Michael Chen",
    company: "StartUpX"
  },
  {
    content: "The analytics dashboard gives us great insights into how our testimonials are performing.",
    views: 765,
    rating: 4,
    author: "Emily Rodriguez",
    company: "GrowthLabs"
  }
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Track your testimonial performance and engagement metrics
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Testimonials
          </h3>
          <p className="mt-2 text-3xl font-bold">50</p>
          <p className="mt-2 text-sm text-green-600">+12% from last month</p>
        </div>
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Average Rating
          </h3>
          <p className="mt-2 text-3xl font-bold">4.6</p>
          <p className="mt-2 text-sm text-green-600">+0.2 from last month</p>
        </div>
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Widget Views
          </h3>
          <p className="mt-2 text-3xl font-bold">4,200</p>
          <p className="mt-2 text-sm text-green-600">+25% from last month</p>
        </div>
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Conversion Rate
          </h3>
          <p className="mt-2 text-3xl font-bold">3.2%</p>
          <p className="mt-2 text-sm text-red-600">-0.5% from last month</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="mb-4 text-lg font-medium">Testimonials & Views</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="testimonials"
                  stroke="#8884d8"
                  name="Testimonials"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#82ca9d"
                  name="Views"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="mb-4 text-lg font-medium">Rating Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Testimonials */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="border-b p-6">
          <h3 className="text-lg font-medium">Top Performing Testimonials</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Testimonial
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {topTestimonials.map((testimonial, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">
                    <div className="max-w-md">
                      <p className="text-sm">{testimonial.content}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    {testimonial.author}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    {testimonial.views.toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
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