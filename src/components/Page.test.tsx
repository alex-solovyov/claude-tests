// @vitest-environment jsdom

import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import Page from './Page'

const priorityGroup = (modelId: string) => {
  if (/^~?anthropic\//.test(modelId)) return 'claude'
  if (/^~?openai\//.test(modelId)) return 'openai'
  if (/^~?x-ai\//.test(modelId)) return 'grok'
  if (/^~?google\/gemini/.test(modelId)) return 'gemini'
  return 'other'
}

describe('model selector', () => {
  afterEach(() => {
    cleanup()
  })

  beforeEach(() => {
    localStorage.setItem('app-authenticated', 'true')
  })

  test('shows the complete current OpenRouter image-to-text catalog', async () => {
    render(React.createElement(Page))

    const options = await screen.findAllByRole('option')
    const modelIds = options.map((option) => option.getAttribute('value'))

    expect(options).toHaveLength(176)
    expect(new Set(modelIds).size).toBe(176)
    expect(modelIds).toEqual(
      expect.arrayContaining([
        'anthropic/claude-opus-5',
        'openai/gpt-5.6-sol',
        'x-ai/grok-4.6',
        'google/gemini-3.7-flash',
        'qwen/qwen3.8-27b'
      ])
    )
  })

  test('puts Claude, OpenAI, Grok, and Gemini groups first in that order', async () => {
    render(React.createElement(Page))

    const modelIds = (await screen.findAllByRole('option')).map(
      (option) => option.getAttribute('value') ?? ''
    )
    const groups = modelIds.map(priorityGroup)
    const groupTransitions = groups.filter(
      (group, index) => index === 0 || group !== groups[index - 1]
    )

    expect(groups.filter((group) => group === 'claude')).toHaveLength(21)
    expect(groups.filter((group) => group === 'openai')).toHaveLength(44)
    expect(groups.filter((group) => group === 'grok')).toHaveLength(7)
    expect(groups.filter((group) => group === 'gemini')).toHaveLength(16)
    expect(groupTransitions.slice(0, 5)).toEqual([
      'claude',
      'openai',
      'grok',
      'gemini',
      'other'
    ])
  })
})
