"use client";

import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

const sections = [
  {
    title: "Getting Started",
    content: [
      {
        title: "Installation",
        content: `To get started with TrustScribe, you'll need to add our widget script to your website. Copy and paste the following code into the <head> section of your website:`,
        code: `<script src="https://widget.trustscribe.com/v1/script.js" data-widget-id="YOUR_WIDGET_ID"></script>`,
      },
      {
        title: "Configuration",
        content: `You can customize your widget's appearance and behavior by adding data attributes to the script tag. Here are the available options:`,
        code: `<script 
  src="https://widget.trustscribe.com/v1/script.js"
  data-widget-id="YOUR_WIDGET_ID"
  data-theme="light"
  data-position="bottom-right"
  data-auto-rotate="true"
  data-rotation-interval="5000"
></script>`,
      },
    ],
  },
  {
    title: "Widget Customization",
    content: [
      {
        title: "Colors",
        content: `You can customize the widget's colors using CSS variables. Add the following styles to your website:`,
        code: `:root {
  --trustscribe-primary: #0ea5e9;
  --trustscribe-background: #ffffff;
  --trustscribe-text: #1f2937;
}`,
      },
      {
        title: "Position",
        content: `The widget can be positioned in different corners of your website. Available positions are:`,
        code: `data-position="bottom-right" // or "bottom-left", "top-right", "top-left"`,
      },
    ],
  },
  {
    title: "Chatbot Integration",
    content: [
      {
        title: "Basic Setup",
        content: `To enable the chatbot feature, add the following attribute to your widget script:`,
        code: `data-chatbot="true"`,
      },
      {
        title: "Custom Flows",
        content: `You can create custom conversation flows in your dashboard. The chatbot will guide users through these flows to collect feedback.`,
      },
    ],
  },
];

export default function DocsPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold">Documentation</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
          Learn how to integrate and customize TrustScribe on your website
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        {sections.map((section) => (
          <div key={section.title} className="mb-12">
            <h2 className="mb-6 text-2xl font-bold">{section.title}</h2>
            {section.content.map((item, index) => (
              <div key={item.title} className="mb-8">
                <h3 className="mb-4 text-xl font-semibold">{item.title}</h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  {item.content}
                </p>
                {item.code && (
                  <div className="relative">
                    <pre
                      className={`rounded-lg bg-gray-100 p-4 dark:bg-gray-800 overflow-x-auto ${
                        index === 0 ? "pr-12" : "pr-0"
                      }`}
                    >
                      <code>{item.code}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 transition-all bg-gray-800 duration-200"
                      onClick={() => handleCopy(item.code, index)}
                    >
                      {copiedIndex === index ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
