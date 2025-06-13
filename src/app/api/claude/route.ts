/* eslint-disable */
// @ts-nocheck
import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const anthropic = new Anthropic({
  apiKey: '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'
})

export async function POST(req: Request) {
  try {
    const { model, max_tokens, temperature, systemPrompt, imageContents } = await req.json()

    const response = await anthropic.messages.create({
      model,
      max_tokens: Number(max_tokens),
      temperature: Number(temperature),
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: [
            ...imageContents
          ]
        }
      ]
    })

    return NextResponse.json({
      text: response.content[0]?.text || '',
      usage: response.usage || {}
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Claude API error', details: err.message || err.toString() },
      { status: 500 }
    )
  }
}