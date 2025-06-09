import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { auth } from '@clerk/nextjs'

export async function GET(
  request: Request,
  { params }: { params: { testimonialId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data: testimonial, error } = await supabase
      .from('testimonials')
      .select('*, widgets(name)')
      .eq('id', params.testimonialId)
      .eq('widgets.user_id', userId)
      .single()

    if (error) throw error

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error('Error fetching testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonial' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { testimonialId: string } }
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

    // Update the testimonial
    const { data, error } = await supabase
      .from('testimonials')
      .update({
        status: updates.status,
      })
      .eq('id', params.testimonialId)
      .eq('widgets.user_id', userId)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to update testimonial' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { testimonialId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Delete the testimonial
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', params.testimonialId)
      .eq('widgets.user_id', userId)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to delete testimonial' },
      { status: 500 }
    )
  }
} 