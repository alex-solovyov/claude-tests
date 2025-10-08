import OpenAI from 'openai'
import { NextResponse } from 'next/server'

type OpenAIImagePayload = {
  data: string
  mediaType: string
}

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      {
        error: 'Missing configuration',
        details: 'OPENAI_API_KEY environment variable is not set'
      },
      { status: 500 }
    )
  }

  try {
    const {
      model,
      max_tokens: maxTokens,
      systemPrompt,
      imageContents
    } = await req.json()

    if (!Array.isArray(imageContents) || imageContents.length === 0) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: 'At least one image is required'
        },
        { status: 400 }
      )
    }

    const imageParts = (imageContents as OpenAIImagePayload[]).map((img) => ({
      type: 'input_image' as const,
      image_url: `data:${img.mediaType};base64,${img.data}`,
      detail: 'high' as const
    }))

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })

    const response = await client.responses.create({
      model,
      max_output_tokens: Number(maxTokens),
      instructions: systemPrompt,
      input: [
        {
          role: 'user',
          content: [...imageParts]
        }
      ]
    })

    return NextResponse.json({
      text: response.output_text ?? '',
      usage: {
        prompt_tokens: response.usage?.input_tokens ?? 0,
        completion_tokens: response.usage?.output_tokens ?? 0,
        total_tokens: response.usage?.total_tokens ?? 0
      }
    })
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unexpected error while calling OpenAI API'

    return NextResponse.json(
      { error: 'OpenAI API error', details: message },
      { status: 500 }
    )
  }
}
