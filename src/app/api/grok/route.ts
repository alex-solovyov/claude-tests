import OpenAI from 'openai'
import type { ChatCompletionContentPart } from 'openai/resources/chat/completions'
import { NextResponse } from 'next/server'

const XAI_BASE_URL = 'https://api.x.ai/v1'

type GrokImagePayload = {
  data: string
  mediaType: string
}

export async function POST(req: Request) {
  if (!process.env.XAI_API_KEY) {
    return NextResponse.json(
      {
        error: 'Missing configuration',
        details: 'XAI_API_KEY environment variable is not set'
      },
      { status: 500 }
    )
  }

  try {
    const {
      model,
      max_tokens: maxTokens,
      temperature,
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

    const imageParts: ChatCompletionContentPart[] = (
      imageContents as GrokImagePayload[]
    ).map((img) => ({
      type: 'image_url',
      image_url: {
        url: `data:${img.mediaType};base64,${img.data}`,
        detail: 'high'
      }
    }))

    const userContent: ChatCompletionContentPart[] = [...imageParts]

    const client = new OpenAI({
      apiKey: process.env.XAI_API_KEY,
      baseURL: XAI_BASE_URL
    })

    const response = await client.chat.completions.create({
      model,
      max_tokens: Number(maxTokens),
      temperature: Number(temperature),
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userContent
        }
      ]
    })

    return NextResponse.json({
      text: response.choices[0].message.content,
      usage: {
        prompt_tokens: response.usage?.prompt_tokens ?? 0,
        completion_tokens: response.usage?.completion_tokens ?? 0,
        total_tokens: response.usage?.total_tokens ?? 0
      }
    })
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unexpected error while calling Grok API'

    return NextResponse.json(
      { error: 'Grok API error', details: message },
      { status: 500 }
    )
  }
}
