export interface ModelInfo {
  value: string
  label: string
  input: number
  output: number
  context: number
}

// Snapshot of active OpenRouter image-to-text models fetched on 2026-08-20.
export const MODELS: ModelInfo[] = [
  {
    value: 'anthropic/claude-opus-5-fast',
    label: 'Claude Opus 5 (Fast)',
    input: 10,
    output: 50,
    context: 1000000
  },
  {
    value: 'anthropic/claude-opus-5',
    label: 'Claude Opus 5',
    input: 5,
    output: 25,
    context: 1000000
  },
  {
    value: 'anthropic/claude-sonnet-5',
    label: 'Anthropic: Claude Sonnet 5',
    input: 2,
    output: 10,
    context: 1000000
  },
  {
    value: '~anthropic/claude-fable-latest',
    label: 'Anthropic: Claude Fable Latest',
    input: 10,
    output: 50,
    context: 1000000
  },
  {
    value: 'anthropic/claude-fable-5',
    label: 'Anthropic: Claude Fable 5',
    input: 10,
    output: 50,
    context: 1000000
  },
  {
    value: 'anthropic/claude-opus-4.8-fast',
    label: 'Anthropic: Claude Opus 4.8 (Fast)',
    input: 10,
    output: 50,
    context: 1000000
  },
  {
    value: 'anthropic/claude-opus-4.8',
    label: 'Anthropic: Claude Opus 4.8',
    input: 5,
    output: 25,
    context: 1000000
  },
  {
    value: 'anthropic/claude-opus-4.7-fast',
    label: 'Anthropic: Claude Opus 4.7 (Fast)',
    input: 30,
    output: 150,
    context: 1000000
  },
  {
    value: '~anthropic/claude-haiku-latest',
    label: 'Anthropic Claude Haiku Latest',
    input: 1,
    output: 5,
    context: 200000
  },
  {
    value: '~anthropic/claude-sonnet-latest',
    label: 'Anthropic Claude Sonnet Latest',
    input: 2,
    output: 10,
    context: 1000000
  },
  {
    value: '~anthropic/claude-opus-latest',
    label: 'Anthropic: Claude Opus Latest',
    input: 5,
    output: 25,
    context: 1000000
  },
  {
    value: 'anthropic/claude-opus-4.7',
    label: 'Anthropic: Claude Opus 4.7',
    input: 5,
    output: 25,
    context: 1000000
  },
  {
    value: 'anthropic/claude-sonnet-4.6',
    label: 'Anthropic: Claude Sonnet 4.6',
    input: 3,
    output: 15,
    context: 1000000
  },
  {
    value: 'anthropic/claude-opus-4.6',
    label: 'Anthropic: Claude Opus 4.6',
    input: 5,
    output: 25,
    context: 1000000
  },
  {
    value: 'anthropic/claude-opus-4.5',
    label: 'Anthropic: Claude Opus 4.5',
    input: 5,
    output: 25,
    context: 200000
  },
  {
    value: 'anthropic/claude-haiku-4.5',
    label: 'Anthropic: Claude Haiku 4.5',
    input: 1,
    output: 5,
    context: 200000
  },
  {
    value: 'anthropic/claude-sonnet-4.5',
    label: 'Anthropic: Claude Sonnet 4.5',
    input: 3,
    output: 15,
    context: 1000000
  },
  {
    value: 'anthropic/claude-opus-4.1',
    label: 'Anthropic: Claude Opus 4.1',
    input: 15,
    output: 75,
    context: 200000
  },
  {
    value: 'anthropic/claude-opus-4',
    label: 'Anthropic: Claude Opus 4',
    input: 15,
    output: 75,
    context: 200000
  },
  {
    value: 'anthropic/claude-sonnet-4',
    label: 'Anthropic: Claude Sonnet 4',
    input: 3,
    output: 15,
    context: 1000000
  },
  {
    value: 'anthropic/claude-3-haiku',
    label: 'Anthropic: Claude 3 Haiku',
    input: 0.25,
    output: 1.25,
    context: 200000
  },
  {
    value: 'openai/gpt-5.6-luna-pro',
    label: 'OpenAI: GPT-5.6 Luna Pro',
    input: 0.2,
    output: 1.2,
    context: 1050000
  },
  {
    value: 'openai/gpt-5.6-luna',
    label: 'OpenAI: GPT-5.6 Luna',
    input: 0.2,
    output: 1.2,
    context: 1050000
  },
  {
    value: 'openai/gpt-5.6-terra-pro',
    label: 'OpenAI: GPT-5.6 Terra Pro',
    input: 2,
    output: 12,
    context: 1050000
  },
  {
    value: 'openai/gpt-5.6-terra',
    label: 'OpenAI: GPT-5.6 Terra',
    input: 2,
    output: 12,
    context: 1050000
  },
  {
    value: 'openai/gpt-5.6-sol-pro',
    label: 'OpenAI: GPT-5.6 Sol Pro',
    input: 2.5,
    output: 15,
    context: 1050000
  },
  {
    value: 'openai/gpt-5.6-sol',
    label: 'OpenAI: GPT-5.6 Sol',
    input: 2.5,
    output: 15,
    context: 1050000
  },
  {
    value: 'openai/gpt-chat-latest',
    label: 'OpenAI: GPT Chat Latest',
    input: 5,
    output: 30,
    context: 400000
  },
  {
    value: '~openai/gpt-mini-latest',
    label: 'OpenAI GPT Mini Latest',
    input: 0.75,
    output: 4.5,
    context: 400000
  },
  {
    value: '~openai/gpt-latest',
    label: 'OpenAI GPT Latest',
    input: 2.5,
    output: 15,
    context: 1050000
  },
  {
    value: 'openai/gpt-5.5-pro',
    label: 'OpenAI: GPT-5.5 Pro',
    input: 30,
    output: 180,
    context: 1050000
  },
  {
    value: 'openai/gpt-5.5',
    label: 'OpenAI: GPT-5.5',
    input: 5,
    output: 30,
    context: 1050000
  },
  {
    value: 'openai/gpt-5.4-nano',
    label: 'OpenAI: GPT-5.4 Nano',
    input: 0.2,
    output: 1.25,
    context: 400000
  },
  {
    value: 'openai/gpt-5.4-mini',
    label: 'OpenAI: GPT-5.4 Mini',
    input: 0.75,
    output: 4.5,
    context: 400000
  },
  {
    value: 'openai/gpt-5.4-pro',
    label: 'OpenAI: GPT-5.4 Pro',
    input: 30,
    output: 180,
    context: 1050000
  },
  {
    value: 'openai/gpt-5.4',
    label: 'OpenAI: GPT-5.4',
    input: 2.5,
    output: 15,
    context: 1050000
  },
  {
    value: 'openai/gpt-5.3-codex',
    label: 'OpenAI: GPT-5.3-Codex',
    input: 1.75,
    output: 14,
    context: 400000
  },
  {
    value: 'openai/gpt-5.2-codex',
    label: 'OpenAI: GPT-5.2-Codex',
    input: 1.75,
    output: 14,
    context: 400000
  },
  {
    value: 'openai/gpt-5.2-chat',
    label: 'OpenAI: GPT-5.2 Chat',
    input: 1.75,
    output: 14,
    context: 128000
  },
  {
    value: 'openai/gpt-5.2-pro',
    label: 'OpenAI: GPT-5.2 Pro',
    input: 21,
    output: 168,
    context: 400000
  },
  {
    value: 'openai/gpt-5.2',
    label: 'OpenAI: GPT-5.2',
    input: 1.75,
    output: 14,
    context: 400000
  },
  {
    value: 'openai/gpt-5.1-codex-max',
    label: 'OpenAI: GPT-5.1-Codex-Max',
    input: 1.25,
    output: 10,
    context: 400000
  },
  {
    value: 'openai/gpt-5.1',
    label: 'OpenAI: GPT-5.1',
    input: 1.25,
    output: 10,
    context: 400000
  },
  {
    value: 'openai/gpt-5.1-codex',
    label: 'OpenAI: GPT-5.1-Codex',
    input: 1.25,
    output: 10,
    context: 400000
  },
  {
    value: 'openai/gpt-5.1-codex-mini',
    label: 'OpenAI: GPT-5.1-Codex-Mini',
    input: 0.25,
    output: 2,
    context: 400000
  },
  {
    value: 'openai/gpt-5-pro',
    label: 'OpenAI: GPT-5 Pro',
    input: 15,
    output: 120,
    context: 400000
  },
  {
    value: 'openai/gpt-5',
    label: 'OpenAI: GPT-5',
    input: 1.25,
    output: 10,
    context: 400000
  },
  {
    value: 'openai/gpt-5-mini',
    label: 'OpenAI: GPT-5 Mini',
    input: 0.25,
    output: 2,
    context: 400000
  },
  {
    value: 'openai/gpt-5-nano',
    label: 'OpenAI: GPT-5 Nano',
    input: 0.05,
    output: 0.4,
    context: 400000
  },
  {
    value: 'openai/o3-pro',
    label: 'OpenAI: o3 Pro',
    input: 20,
    output: 80,
    context: 200000
  },
  {
    value: 'openai/o4-mini-high',
    label: 'OpenAI: o4 Mini High',
    input: 1.1,
    output: 4.4,
    context: 200000
  },
  {
    value: 'openai/o3',
    label: 'OpenAI: o3',
    input: 2,
    output: 8,
    context: 200000
  },
  {
    value: 'openai/o4-mini',
    label: 'OpenAI: o4 Mini',
    input: 1.1,
    output: 4.4,
    context: 200000
  },
  {
    value: 'openai/gpt-4.1',
    label: 'OpenAI: GPT-4.1',
    input: 2,
    output: 8,
    context: 1047576
  },
  {
    value: 'openai/gpt-4.1-mini',
    label: 'OpenAI: GPT-4.1 Mini',
    input: 0.4,
    output: 1.6,
    context: 1047576
  },
  {
    value: 'openai/gpt-4.1-nano',
    label: 'OpenAI: GPT-4.1 Nano',
    input: 0.1,
    output: 0.4,
    context: 1047576
  },
  {
    value: 'openai/o1-pro',
    label: 'OpenAI: o1-pro',
    input: 150,
    output: 600,
    context: 200000
  },
  {
    value: 'openai/o1',
    label: 'OpenAI: o1',
    input: 15,
    output: 60,
    context: 200000
  },
  {
    value: 'openai/gpt-4o-2024-11-20',
    label: 'OpenAI: GPT-4o (2024-11-20)',
    input: 2.5,
    output: 10,
    context: 128000
  },
  {
    value: 'openai/gpt-4o-2024-08-06',
    label: 'OpenAI: GPT-4o (2024-08-06)',
    input: 2.5,
    output: 10,
    context: 128000
  },
  {
    value: 'openai/gpt-4o-mini',
    label: 'OpenAI: GPT-4o-mini',
    input: 0.15,
    output: 0.6,
    context: 128000
  },
  {
    value: 'openai/gpt-4o-mini-2024-07-18',
    label: 'OpenAI: GPT-4o-mini (2024-07-18)',
    input: 0.15,
    output: 0.6,
    context: 128000
  },
  {
    value: 'openai/gpt-4o',
    label: 'OpenAI: GPT-4o',
    input: 2.5,
    output: 10,
    context: 128000
  },
  {
    value: 'openai/gpt-4o-2024-05-13',
    label: 'OpenAI: GPT-4o (2024-05-13)',
    input: 5,
    output: 15,
    context: 128000
  },
  {
    value: 'openai/gpt-4-turbo',
    label: 'OpenAI: GPT-4 Turbo',
    input: 10,
    output: 30,
    context: 128000
  },
  {
    value: 'x-ai/grok-4.6',
    label: 'SpaceXAI: Grok 4.6',
    input: 2,
    output: 6,
    context: 500000
  },
  {
    value: 'x-ai/grok-4.5',
    label: 'SpaceXAI: Grok 4.5',
    input: 2,
    output: 6,
    context: 500000
  },
  {
    value: '~x-ai/grok-latest',
    label: 'xAI: Grok Latest',
    input: 2,
    output: 6,
    context: 500000
  },
  {
    value: 'x-ai/grok-build-0.1',
    label: 'SpaceXAI: Grok Build 0.1',
    input: 1,
    output: 2,
    context: 256000
  },
  {
    value: 'x-ai/grok-4.3',
    label: 'SpaceXAI: Grok 4.3',
    input: 1.25,
    output: 2.5,
    context: 1000000
  },
  {
    value: 'x-ai/grok-4.20-multi-agent',
    label: 'SpaceXAI: Grok 4.20 Multi-Agent',
    input: 1.25,
    output: 2.5,
    context: 2000000
  },
  {
    value: 'x-ai/grok-4.20',
    label: 'SpaceXAI: Grok 4.20',
    input: 1.25,
    output: 2.5,
    context: 2000000
  },
  {
    value: 'google/gemini-3.7-flash',
    label: 'Google: Gemini 3.7 Flash',
    input: 0.375,
    output: 1.875,
    context: 1048576
  },
  {
    value: 'google/gemini-3.6-flash',
    label: 'Google: Gemini 3.6 Flash',
    input: 0.75,
    output: 3.75,
    context: 1048576
  },
  {
    value: 'google/gemini-3.5-flash-lite',
    label: 'Google: Gemini 3.5 Flash Lite',
    input: 0.3,
    output: 2.5,
    context: 1048576
  },
  {
    value: 'google/gemini-3.5-flash',
    label: 'Google: Gemini 3.5 Flash',
    input: 1.5,
    output: 9,
    context: 1048576
  },
  {
    value: 'google/gemini-3.1-flash-lite',
    label: 'Google: Gemini 3.1 Flash Lite',
    input: 0.25,
    output: 1.5,
    context: 1048576
  },
  {
    value: '~google/gemini-pro-latest',
    label: 'Google Gemini Pro Latest',
    input: 2,
    output: 12,
    context: 1048576
  },
  {
    value: '~google/gemini-flash-latest',
    label: 'Google Gemini Flash Latest',
    input: 0.375,
    output: 1.875,
    context: 1048576
  },
  {
    value: 'google/gemini-3.1-flash-lite-preview',
    label: 'Google: Gemini 3.1 Flash Lite Preview',
    input: 0.25,
    output: 1.5,
    context: 1048576
  },
  {
    value: 'google/gemini-3.1-pro-preview-customtools',
    label: 'Google: Gemini 3.1 Pro Preview Custom Tools',
    input: 2,
    output: 12,
    context: 1048576
  },
  {
    value: 'google/gemini-3.1-pro-preview',
    label: 'Google: Gemini 3.1 Pro Preview',
    input: 2,
    output: 12,
    context: 1048576
  },
  {
    value: 'google/gemini-3-flash-preview',
    label: 'Google: Gemini 3 Flash Preview',
    input: 0.5,
    output: 3,
    context: 1048576
  },
  {
    value: 'google/gemini-2.5-flash-lite',
    label: 'Google: Gemini 2.5 Flash Lite',
    input: 0.1,
    output: 0.4,
    context: 1048576
  },
  {
    value: 'google/gemini-2.5-flash',
    label: 'Google: Gemini 2.5 Flash',
    input: 0.3,
    output: 2.5,
    context: 1048576
  },
  {
    value: 'google/gemini-2.5-pro',
    label: 'Google: Gemini 2.5 Pro',
    input: 1.25,
    output: 10,
    context: 1048576
  },
  {
    value: 'google/gemini-2.5-pro-preview',
    label: 'Google: Gemini 2.5 Pro Preview 06-05',
    input: 1.25,
    output: 10,
    context: 1048576
  },
  {
    value: 'google/gemini-2.5-pro-preview-05-06',
    label: 'Google: Gemini 2.5 Pro Preview 05-06',
    input: 1.25,
    output: 10,
    context: 1048576
  },
  {
    value: 'amazon/nova-2-lite-v1',
    label: 'Amazon: Nova 2 Lite',
    input: 0.3,
    output: 2.5,
    context: 1000000
  },
  {
    value: 'amazon/nova-premier-v1',
    label: 'Amazon: Nova Premier 1.0',
    input: 2.5,
    output: 12.5,
    context: 1000000
  },
  {
    value: 'amazon/nova-lite-v1',
    label: 'Amazon: Nova Lite 1.0',
    input: 0.06,
    output: 0.24,
    context: 300000
  },
  {
    value: 'amazon/nova-pro-v1',
    label: 'Amazon: Nova Pro 1.0',
    input: 0.8,
    output: 3.2,
    context: 300000
  },
  {
    value: 'baidu/ernie-4.5-vl-424b-a47b',
    label: 'Baidu: ERNIE 4.5 VL 424B A47B ',
    input: 0.42,
    output: 1.25,
    context: 123000
  },
  {
    value: 'bytedance/ui-tars-1.5-7b',
    label: 'ByteDance: UI-TARS 7B ',
    input: 0.1,
    output: 0.2,
    context: 128000
  },
  {
    value: 'bytedance-seed/seed-2-1-turbo',
    label: 'ByteDance Seed: Seed 2.1 Turbo',
    input: 0.5,
    output: 2.5,
    context: 262144
  },
  {
    value: 'bytedance-seed/seed-2.0-code',
    label: 'ByteDance Seed: Seed-2.0-Code',
    input: 0.5,
    output: 3,
    context: 262144
  },
  {
    value: 'bytedance-seed/seed-2.0-lite',
    label: 'ByteDance Seed: Seed-2.0-Lite',
    input: 0.25,
    output: 2,
    context: 262144
  },
  {
    value: 'bytedance-seed/seed-2.0-mini',
    label: 'ByteDance Seed: Seed-2.0-Mini',
    input: 0.1,
    output: 0.4,
    context: 262144
  },
  {
    value: 'bytedance-seed/seed-1.6-flash',
    label: 'ByteDance Seed: Seed 1.6 Flash',
    input: 0.075,
    output: 0.3,
    context: 262144
  },
  {
    value: 'bytedance-seed/seed-1.6',
    label: 'ByteDance Seed: Seed 1.6',
    input: 0.25,
    output: 2,
    context: 262144
  },
  {
    value: 'dots-studio/dots-3-note-preview:free',
    label: 'Dots Studio: Dots3-Note Preview (free)',
    input: 0,
    output: 0,
    context: 512000
  },
  {
    value: 'google/gemma-4-26b-a4b-it',
    label: 'Google: Gemma 4 26B A4B ',
    input: 0.07,
    output: 0.34,
    context: 262144
  },
  {
    value: 'google/gemma-4-26b-a4b-it:free',
    label: 'Google: Gemma 4 26B A4B  (free)',
    input: 0,
    output: 0,
    context: 262144
  },
  {
    value: 'google/gemma-4-31b-it',
    label: 'Google: Gemma 4 31B',
    input: 0.09,
    output: 0.34,
    context: 262144
  },
  {
    value: 'google/gemma-4-31b-it:free',
    label: 'Google: Gemma 4 31B (free)',
    input: 0,
    output: 0,
    context: 262144
  },
  {
    value: 'google/gemma-3-4b-it',
    label: 'Google: Gemma 3 4B',
    input: 0.05,
    output: 0.1,
    context: 131072
  },
  {
    value: 'google/gemma-3-12b-it',
    label: 'Google: Gemma 3 12B',
    input: 0.05,
    output: 0.15,
    context: 131072
  },
  {
    value: 'google/gemma-3-27b-it',
    label: 'Google: Gemma 3 27B',
    input: 0.08,
    output: 0.45,
    context: 262144
  },
  {
    value: 'meta/muse-glimmer-30b',
    label: 'Meta: Muse Glimmer 30B',
    input: 0.35,
    output: 1.5,
    context: 131072
  },
  {
    value: 'meta/muse-spark-1.2',
    label: 'Meta: Muse Spark 1.2',
    input: 1.25,
    output: 4.25,
    context: 1048576
  },
  {
    value: 'meta/muse-spark-1.1',
    label: 'Meta: Muse Spark 1.1',
    input: 1.25,
    output: 4.25,
    context: 1048576
  },
  {
    value: 'meta-llama/llama-guard-4-12b',
    label: 'Meta: Llama Guard 4 12B',
    input: 0.18,
    output: 0.18,
    context: 1048576
  },
  {
    value: 'meta-llama/llama-4-maverick',
    label: 'Meta: Llama 4 Maverick',
    input: 0.2,
    output: 0.8,
    context: 1048576
  },
  {
    value: 'meta-llama/llama-4-scout',
    label: 'Meta: Llama 4 Scout',
    input: 0.1,
    output: 0.3,
    context: 1310720
  },
  {
    value: 'minimax/minimax-m3',
    label: 'MiniMax: MiniMax M3',
    input: 0.3,
    output: 1.2,
    context: 1048576
  },
  {
    value: 'minimax/minimax-01',
    label: 'MiniMax: MiniMax-01',
    input: 0.2,
    output: 1.1,
    context: 1000192
  },
  {
    value: 'mistralai/mistral-medium-3-5',
    label: 'Mistral: Mistral Medium 3.5',
    input: 1.5,
    output: 7.5,
    context: 262144
  },
  {
    value: 'mistralai/mistral-small-2603',
    label: 'Mistral: Mistral Small 4',
    input: 0.15,
    output: 0.6,
    context: 262144
  },
  {
    value: 'mistralai/ministral-14b-2512',
    label: 'Mistral: Ministral 3 14B 2512',
    input: 0.2,
    output: 0.2,
    context: 262144
  },
  {
    value: 'mistralai/ministral-8b-2512',
    label: 'Mistral: Ministral 3 8B 2512',
    input: 0.15,
    output: 0.15,
    context: 262144
  },
  {
    value: 'mistralai/ministral-3b-2512',
    label: 'Mistral: Ministral 3 3B 2512',
    input: 0.1,
    output: 0.1,
    context: 131072
  },
  {
    value: 'mistralai/mistral-large-2512',
    label: 'Mistral: Mistral Large 3 2512',
    input: 0.5,
    output: 1.5,
    context: 262144
  },
  {
    value: 'mistralai/mistral-medium-3.1',
    label: 'Mistral: Mistral Medium 3.1',
    input: 0.4,
    output: 2,
    context: 131072
  },
  {
    value: 'mistralai/mistral-small-3.2-24b-instruct',
    label: 'Mistral: Mistral Small 3.2 24B',
    input: 0.09375,
    output: 0.25,
    context: 256000
  },
  {
    value: 'mistralai/mistral-medium-3',
    label: 'Mistral: Mistral Medium 3',
    input: 0.4,
    output: 2,
    context: 131072
  },
  {
    value: 'mistralai/mistral-small-3.1-24b-instruct',
    label: 'Mistral: Mistral Small 3.1 24B',
    input: 0.351,
    output: 0.555,
    context: 128000
  },
  {
    value: '~moonshotai/kimi-latest',
    label: 'MoonshotAI Kimi Latest',
    input: 2.6,
    output: 13,
    context: 1048576
  },
  {
    value: 'moonshotai/kimi-k3',
    label: 'MoonshotAI: Kimi K3',
    input: 3,
    output: 15,
    context: 1048576
  },
  {
    value: 'moonshotai/kimi-k2.7-code',
    label: 'MoonshotAI: Kimi K2.7 Code',
    input: 0.71,
    output: 3.5,
    context: 262144
  },
  {
    value: 'moonshotai/kimi-k2.6',
    label: 'MoonshotAI: Kimi K2.6',
    input: 0.95,
    output: 4,
    context: 262144
  },
  {
    value: 'moonshotai/kimi-k2.5',
    label: 'MoonshotAI: Kimi K2.5',
    input: 0.45,
    output: 2.25,
    context: 262144
  },
  {
    value: 'nex-agi/nex-n2-mini',
    label: 'Nex AGI: Nex-N2-Mini',
    input: 0.025,
    output: 0.1,
    context: 262144
  },
  {
    value: 'nex-agi/nex-n2-pro',
    label: 'Nex AGI: Nex-N2-Pro',
    input: 0.25,
    output: 1,
    context: 262144
  },
  {
    value: 'nvidia/nemotron-3.5-content-safety:free',
    label: 'NVIDIA: Nemotron 3.5 Content Safety (free)',
    input: 0,
    output: 0,
    context: 128000
  },
  {
    value: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
    label: 'NVIDIA: Nemotron 3 Nano Omni (free)',
    input: 0,
    output: 0,
    context: 256000
  },
  {
    value: 'nvidia/nemotron-nano-12b-v2-vl:free',
    label: 'NVIDIA: Nemotron Nano 12B 2 VL (free)',
    input: 0,
    output: 0,
    context: 128000
  },
  {
    value: 'openrouter/free',
    label: 'Free Models Router',
    input: 0,
    output: 0,
    context: 200000
  },
  {
    value: 'perceptron/perceptron-mk1',
    label: 'Perceptron: Perceptron Mk1',
    input: 0.15,
    output: 1.5,
    context: 32768
  },
  {
    value: 'perplexity/sonar-pro-search',
    label: 'Perplexity: Sonar Pro Search',
    input: 3,
    output: 15,
    context: 200000
  },
  {
    value: 'perplexity/sonar-reasoning-pro',
    label: 'Perplexity: Sonar Reasoning Pro',
    input: 2,
    output: 8,
    context: 128000
  },
  {
    value: 'perplexity/sonar-pro',
    label: 'Perplexity: Sonar Pro',
    input: 3,
    output: 15,
    context: 200000
  },
  {
    value: 'perplexity/sonar',
    label: 'Perplexity: Sonar',
    input: 1,
    output: 1,
    context: 127072
  },
  {
    value: 'qwen/qwen3.8-27b',
    label: 'Qwen: Qwen3.8 27B',
    input: 0.45,
    output: 3.2,
    context: 1000000
  },
  {
    value: 'qwen/qwen3.8-max',
    label: 'Qwen: Qwen3.8 Max',
    input: 2,
    output: 6,
    context: 1000000
  },
  {
    value: 'qwen/qwen3.7-flash',
    label: 'Qwen: Qwen3.7 Flash',
    input: 0.03,
    output: 0.13,
    context: 1000000
  },
  {
    value: 'qwen/qwen3.7-plus',
    label: 'Qwen: Qwen3.7 Plus',
    input: 0.32,
    output: 1.28,
    context: 1000000
  },
  {
    value: 'qwen/qwen3.5-plus-20260420',
    label: 'Qwen: Qwen3.5 Plus 2026-04-20',
    input: 0.3,
    output: 1.8,
    context: 1000000
  },
  {
    value: 'qwen/qwen3.6-flash',
    label: 'Qwen: Qwen3.6 Flash',
    input: 0.1875,
    output: 1.125,
    context: 1000000
  },
  {
    value: 'qwen/qwen3.6-35b-a3b',
    label: 'Qwen: Qwen3.6 35B A3B',
    input: 0.14,
    output: 1,
    context: 262144
  },
  {
    value: 'qwen/qwen3.6-27b',
    label: 'Qwen: Qwen3.6 27B',
    input: 0.6,
    output: 3.6,
    context: 262144
  },
  {
    value: 'qwen/qwen3.6-plus',
    label: 'Qwen: Qwen3.6 Plus',
    input: 0.325,
    output: 1.95,
    context: 1000000
  },
  {
    value: 'qwen/qwen3.5-9b',
    label: 'Qwen: Qwen3.5-9B',
    input: 0.1,
    output: 0.15,
    context: 262144
  },
  {
    value: 'qwen/qwen3.5-35b-a3b',
    label: 'Qwen: Qwen3.5-35B-A3B',
    input: 0.25,
    output: 1.25,
    context: 262144
  },
  {
    value: 'qwen/qwen3.5-27b',
    label: 'Qwen: Qwen3.5-27B',
    input: 0.195,
    output: 1.56,
    context: 262144
  },
  {
    value: 'qwen/qwen3.5-122b-a10b',
    label: 'Qwen: Qwen3.5-122B-A10B',
    input: 0.26,
    output: 2.08,
    context: 262144
  },
  {
    value: 'qwen/qwen3.5-flash-02-23',
    label: 'Qwen: Qwen3.5-Flash',
    input: 0.065,
    output: 0.26,
    context: 1000000
  },
  {
    value: 'qwen/qwen3.5-plus-02-15',
    label: 'Qwen: Qwen3.5 Plus 2026-02-15',
    input: 0.26,
    output: 1.56,
    context: 1000000
  },
  {
    value: 'qwen/qwen3.5-397b-a17b',
    label: 'Qwen: Qwen3.5 397B A17B',
    input: 0.39,
    output: 2.34,
    context: 262144
  },
  {
    value: 'qwen/qwen3-vl-32b-instruct',
    label: 'Qwen: Qwen3 VL 32B Instruct',
    input: 0.104,
    output: 0.416,
    context: 131072
  },
  {
    value: 'qwen/qwen3-vl-8b-thinking',
    label: 'Qwen: Qwen3 VL 8B Thinking',
    input: 0.18,
    output: 2.1,
    context: 131072
  },
  {
    value: 'qwen/qwen3-vl-8b-instruct',
    label: 'Qwen: Qwen3 VL 8B Instruct',
    input: 0.117,
    output: 0.455,
    context: 262144
  },
  {
    value: 'qwen/qwen3-vl-30b-a3b-thinking',
    label: 'Qwen: Qwen3 VL 30B A3B Thinking',
    input: 0.2,
    output: 2.4,
    context: 262144
  },
  {
    value: 'qwen/qwen3-vl-30b-a3b-instruct',
    label: 'Qwen: Qwen3 VL 30B A3B Instruct',
    input: 0.13,
    output: 0.52,
    context: 262144
  },
  {
    value: 'qwen/qwen3-vl-235b-a22b-thinking',
    label: 'Qwen: Qwen3 VL 235B A22B Thinking',
    input: 0.4,
    output: 4,
    context: 131072
  },
  {
    value: 'qwen/qwen3-vl-235b-a22b-instruct',
    label: 'Qwen: Qwen3 VL 235B A22B Instruct',
    input: 0.21,
    output: 1.9,
    context: 262144
  },
  {
    value: 'qwen/qwen2.5-vl-72b-instruct',
    label: 'Qwen: Qwen2.5 VL 72B Instruct',
    input: 0.8,
    output: 1,
    context: 128000
  },
  {
    value: 'rekaai/reka-edge',
    label: 'Reka Edge',
    input: 0.1,
    output: 0.1,
    context: 16384
  },
  {
    value: 'sakana/sakana-namazu',
    label: 'Sakana: Sakana Namazu',
    input: 0.95,
    output: 4,
    context: 262144
  },
  {
    value: 'sakana/fugu-ultra',
    label: 'Sakana: Fugu Ultra',
    input: 5,
    output: 30,
    context: 1000000
  },
  {
    value: 'stepfun/step-3.7-flash',
    label: 'StepFun: Step 3.7 Flash',
    input: 0.2,
    output: 1.15,
    context: 262144
  },
  {
    value: 'thinkingmachines/inkling-small',
    label: 'Thinking Machines: Inkling Small',
    input: 0.45,
    output: 1.2,
    context: 524288
  },
  {
    value: 'thinkingmachines/inkling',
    label: 'Thinking Machines: Inkling',
    input: 0.95,
    output: 4.05,
    context: 1048576
  },
  {
    value: 'xiaomi/mimo-v2.5',
    label: 'Xiaomi: MiMo-V2.5',
    input: 0.14,
    output: 0.28,
    context: 1050000
  },
  {
    value: 'z-ai/glm-5v-turbo',
    label: 'Z.ai: GLM 5V Turbo',
    input: 1.2,
    output: 4,
    context: 202752
  },
  {
    value: 'z-ai/glm-4.6v',
    label: 'Z.ai: GLM 4.6V',
    input: 0.3,
    output: 0.9,
    context: 131072
  },
  {
    value: 'z-ai/glm-4.5v',
    label: 'Z.ai: GLM 4.5V',
    input: 0.6,
    output: 1.8,
    context: 65536
  }
]
