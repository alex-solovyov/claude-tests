import { OpenRouter } from '@openrouter/sdk'
import { NextResponse } from 'next/server'

type ImagePayload = {
  data: string
  mediaType: string
}

export async function POST(req: Request) {
  if (!process.env.OPENROUTER_API_KEY) {
    return NextResponse.json(
      {
        error: 'Missing configuration',
        details: 'OPENROUTER_API_KEY environment variable is not set'
      },
      { status: 500 }
    )
  }

  try {
    const { model, max_tokens, temperature, systemPrompt, imageContents } =
      await req.json()

    if (!Array.isArray(imageContents) || imageContents.length === 0) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: 'At least one image is required'
        },
        { status: 400 }
      )
    }

    const imageParts = (imageContents as ImagePayload[]).map((img) => ({
      type: 'image_url' as const,
      imageUrl: {
        url: `data:${img.mediaType};base64,${img.data}`
      }
    }))

    const client = new OpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY
    })

    const response = await client.chat.send({
      chatGenerationParams: {
        model,
        maxTokens: Number(max_tokens),
        temperature: Number(temperature),
        messages: [
          ...(systemPrompt
            ? [{ role: 'system' as const, content: systemPrompt }]
            : []),
          {
            role: 'user' as const,
            content: [...imageParts]
          }
        ],
        stream: false
      }
    })

    const text = response.choices?.[0]?.message?.content ?? ''
    const usage = response.usage

    return NextResponse.json({
      text,
      usage: {
        prompt_tokens: usage?.promptTokens ?? 0,
        completion_tokens: usage?.completionTokens ?? 0,
        total_tokens: usage?.totalTokens ?? 0
      }
    })
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unexpected error while calling OpenRouter API'

    return NextResponse.json(
      { error: 'OpenRouter API error', details: message },
      { status: 500 }
    )
  }
}
