import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: Request,
  { params }: { params: { widgetId: string } }
) {
  try {
    const { data: testimonials, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('widget_id', params.widgetId)
      .eq('status', 'published')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: Request,
  { params }: { params: { widgetId: string } }
) {
  try {
    const testimonial = await request.json()

    // Validate the testimonial data
    if (
      !testimonial.name ||
      !testimonial.role ||
      !testimonial.content ||
      !testimonial.rating
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Insert the testimonial
    const { data, error } = await supabase.from('testimonials').insert([
      {
        widget_id: params.widgetId,
        name: testimonial.name,
        role: testimonial.role,
        content: testimonial.content,
        rating: testimonial.rating,
        status: 'pending',
      },
    ])

    if (error) throw error

    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
} 