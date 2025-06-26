# TrustScribe - Testimonial Collection Platform

TrustScribe is a modern SaaS platform that helps businesses collect and display customer testimonials through customizable widgets and chatbot integration.

## Features

- 🎨 Customizable testimonial widgets
- 🤖 AI-powered feedback collection chatbot
- 📊 Analytics dashboard
- 💳 Subscription-based pricing
- 🔒 Secure authentication with Clerk
- 🎯 Easy embedding on any website
- 🌙 Dark mode support

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Database**: Supabase
- **Authentication**: Clerk
- **Payments**: Stripe
- **Styling**: TailwindCSS
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Clerk account
- Stripe account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/trustscribe.git
   cd trustscribe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add the following variables:
   ```
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-publishable-key
   CLERK_SECRET_KEY=your-secret-key

   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-publishable-key
   STRIPE_SECRET_KEY=your-secret-key
   STRIPE_WEBHOOK_SECRET=your-webhook-secret

   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses Supabase with the following main tables:

- `users` - User profiles
- `testimonials` - Customer testimonials
- `widgets` - Widget configurations
- `chatbot_flows` - Chatbot conversation flows
- `subscriptions` - User subscription data

## Deployment

The application is designed to be deployed on Vercel. Follow these steps:

1. Push your code to a GitHub repository
2. Create a new project on Vercel
3. Connect your GitHub repository
4. Add all environment variables
5. Deploy!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
