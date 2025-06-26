import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET() {
  try {
    // Read the widget component
    const widgetPath = join(process.cwd(), 'components/widget/Widget.tsx')
    const widgetCode = readFileSync(widgetPath, 'utf-8')

    // Read the chatbot component
    const chatbotPath = join(process.cwd(), 'components/widget/Chatbot.tsx')
    const chatbotCode = readFileSync(chatbotPath, 'utf-8')

    // Create the widget bundle
    const bundle = `
      const TrustScribe = {
        Widget: ${widgetCode},
        Chatbot: ${chatbotCode}
      }
    `

    return new NextResponse(bundle, {
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error serving widget bundle:', error)
    return NextResponse.json(
      { error: 'Failed to serve widget bundle' },
      { status: 500 }
    )
  }
} 