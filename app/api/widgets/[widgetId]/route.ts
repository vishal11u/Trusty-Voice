import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { auth } from '@clerk/nextjs'

export async function GET(
  request: Request,
  { params }: { params: { widgetId: string } }
) {
  try {
    const { data: widget, error } = await supabase
      .from('widgets')
      .select('*')
      .eq('id', params.widgetId)
      .single()

    if (error) throw error

    return NextResponse.json(widget)
  } catch (error) {
    console.error('Error fetching widget:', error)
    return NextResponse.json(
      { error: 'Failed to fetch widget' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { widgetId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const updates = await request.json()

    // Update the widget
    const { data, error } = await supabase
      .from('widgets')
      .update({
        name: updates.name,
        theme: updates.theme,
        position: updates.position,
        auto_rotate: updates.autoRotate,
        rotation_interval: updates.rotationInterval,
        chatbot_enabled: updates.chatbotEnabled,
      })
      .eq('id', params.widgetId)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating widget:', error)
    return NextResponse.json(
      { error: 'Failed to update widget' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { widgetId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Delete the widget
    const { error } = await supabase
      .from('widgets')
      .delete()
      .eq('id', params.widgetId)
      .eq('user_id', userId)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting widget:', error)
    return NextResponse.json(
      { error: 'Failed to delete widget' },
      { status: 500 }
    )
  }
} 