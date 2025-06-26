import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Have a question or want to work together? We'd love to hear from
            you.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
