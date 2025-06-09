import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { auth } from '@clerk/nextjs'

export async function GET() {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data: widgets, error } = await supabase
      .from('widgets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(widgets)
  } catch (error) {
    console.error('Error fetching widgets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch widgets' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const widget = await request.json()

    // Validate the widget data
    if (!widget.name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Insert the widget
    const { data, error } = await supabase.from('widgets').insert([
      {
        user_id: userId,
        name: widget.name,
        theme: widget.theme || 'light',
        position: widget.position || 'bottom-right',
        auto_rotate: widget.autoRotate ?? true,
        rotation_interval: widget.rotationInterval || 5000,
        chatbot_enabled: widget.chatbotEnabled ?? false,
      },
    ])

    if (error) throw error

    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Error creating widget:', error)
    return NextResponse.json(
      { error: 'Failed to create widget' },
      { status: 500 }
    )
  }
} 