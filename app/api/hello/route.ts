/**
 * API Route: /api/hello
 * Server-side endpoint for Hello World functionality
 */

import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const message = {
      message: 'Hello, World!',
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(message, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      )
    }

    const response = {
      message: `Server received: ${message}`,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}



