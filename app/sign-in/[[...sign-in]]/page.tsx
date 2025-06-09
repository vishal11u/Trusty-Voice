import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/images/auth-bg.jpg"
          alt="Authentication background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Welcome to TrustScribe</h2>
          <p className="text-lg opacity-90">
            Transform your customer support with AI-powered voice transcription and analysis.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Sign in to TrustScribe</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <a href="/sign-up" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </p>
          </div>
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
                footerActionLink: 'text-blue-600 hover:text-blue-700',
              },
            }}
          />
        </div>
      </div>
    </div>
  )
} 