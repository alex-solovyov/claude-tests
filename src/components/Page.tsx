'use client'
import React, { useState, useCallback, useEffect } from 'react'
import axios from 'axios'

interface ModelInfo {
  value: string
  label: string
  input: number
  output: number
  context: number
}

const MODELS: ModelInfo[] = [
  // AllenAI
  {
    value: 'allenai/molmo-2-8b',
    label: 'AllenAI: Molmo2 8B',
    input: 0.2,
    output: 0.2,
    context: 36_864
  },

  // Amazon
  {
    value: 'amazon/nova-premier-v1',
    label: 'Amazon: Nova Premier 1.0',
    input: 2.5,
    output: 12.5,
    context: 1_000_000
  },
  {
    value: 'amazon/nova-2-lite-v1',
    label: 'Amazon: Nova 2 Lite',
    input: 0.3,
    output: 2.5,
    context: 1_000_000
  },

  // Anthropic
  {
    value: 'anthropic/claude-opus-4.6',
    label: 'Anthropic: Claude Opus 4.6',
    input: 5,
    output: 25,
    context: 1_000_000
  },
  {
    value: 'anthropic/claude-sonnet-4.5',
    label: 'Anthropic: Claude Sonnet 4.5',
    input: 3,
    output: 15,
    context: 1_000_000
  },
  {
    value: 'anthropic/claude-haiku-4.5',
    label: 'Anthropic: Claude Haiku 4.5',
    input: 1,
    output: 5,
    context: 200_000
  },

  // Arcee AI
  {
    value: 'arcee-ai/spotlight',
    label: 'Arcee AI: Spotlight',
    input: 0.18,
    output: 0.18,
    context: 131_072
  },

  // Baidu
  {
    value: 'baidu/ernie-4.5-vl-424b-a47b',
    label: 'Baidu: ERNIE 4.5 VL 424B A47B',
    input: 0.42,
    output: 1.25,
    context: 123_000
  },
  {
    value: 'baidu/ernie-4.5-vl-28b-a3b',
    label: 'Baidu: ERNIE 4.5 VL 28B A3B',
    input: 0.14,
    output: 0.56,
    context: 30_000
  },

  // Google
  {
    value: 'google/gemini-3-pro-preview',
    label: 'Google: Gemini 3 Pro Preview',
    input: 2,
    output: 12,
    context: 1_048_576
  },
  {
    value: 'google/gemini-3-pro-image-preview',
    label: 'Google: Nano Banana Pro (Gemini 3 Pro Image Preview)',
    input: 2,
    output: 12,
    context: 65_536
  },
  {
    value: 'google/gemini-3-flash-preview',
    label: 'Google: Gemini 3 Flash Preview',
    input: 0.5,
    output: 3,
    context: 1_048_576
  },
  {
    value: 'google/gemini-2.5-pro',
    label: 'Google: Gemini 2.5 Pro',
    input: 1.25,
    output: 10,
    context: 1_048_576
  },
  {
    value: 'google/gemini-2.5-flash',
    label: 'Google: Gemini 2.5 Flash',
    input: 0.3,
    output: 2.5,
    context: 1_048_576
  },
  {
    value: 'google/gemini-2.5-flash-image',
    label: 'Google: Gemini 2.5 Flash Image (Nano Banana)',
    input: 0.3,
    output: 2.5,
    context: 32_768
  },
  {
    value: 'google/gemini-2.5-flash-lite',
    label: 'Google: Gemini 2.5 Flash Lite',
    input: 0.1,
    output: 0.4,
    context: 1_048_576
  },
  {
    value: 'google/gemma-3-27b',
    label: 'Google: Gemma 3 27B',
    input: 0.04,
    output: 0.15,
    context: 128_000
  },
  {
    value: 'google/gemma-3-27b:free',
    label: 'Google: Gemma 3 27B (free)',
    input: 0,
    output: 0,
    context: 131_072
  },
  {
    value: 'google/gemma-3-12b',
    label: 'Google: Gemma 3 12B',
    input: 0.03,
    output: 0.1,
    context: 131_072
  },
  {
    value: 'google/gemma-3-12b:free',
    label: 'Google: Gemma 3 12B (free)',
    input: 0,
    output: 0,
    context: 32_768
  },
  {
    value: 'google/gemma-3-4b',
    label: 'Google: Gemma 3 4B',
    input: 0.01703,
    output: 0.06815,
    context: 96_000
  },
  {
    value: 'google/gemma-3-4b:free',
    label: 'Google: Gemma 3 4B (free)',
    input: 0,
    output: 0,
    context: 32_768
  },

  // Meta
  {
    value: 'meta-llama/llama-4-maverick',
    label: 'Meta: Llama 4 Maverick',
    input: 0.15,
    output: 0.6,
    context: 1_048_576
  },
  {
    value: 'meta-llama/llama-4-scout',
    label: 'Meta: Llama 4 Scout',
    input: 0.08,
    output: 0.3,
    context: 327_680
  },
  {
    value: 'meta-llama/llama-guard-4-12b',
    label: 'Meta: Llama Guard 4 12B',
    input: 0.18,
    output: 0.18,
    context: 163_840
  },

  // Mistral
  {
    value: 'mistralai/mistral-large-3-2512',
    label: 'Mistral: Mistral Large 3 2512',
    input: 0.5,
    output: 1.5,
    context: 262_144
  },
  {
    value: 'mistralai/mistral-medium-3.1',
    label: 'Mistral: Mistral Medium 3.1',
    input: 0.4,
    output: 2,
    context: 131_072
  },
  {
    value: 'mistralai/mistral-medium-3',
    label: 'Mistral: Mistral Medium 3',
    input: 0.4,
    output: 2,
    context: 131_072
  },
  {
    value: 'mistralai/mistral-small-3.2-24b',
    label: 'Mistral: Mistral Small 3.2 24B',
    input: 0.06,
    output: 0.18,
    context: 131_072
  },
  {
    value: 'mistralai/mistral-small-3.1-24b',
    label: 'Mistral: Mistral Small 3.1 24B',
    input: 0.03,
    output: 0.11,
    context: 131_072
  },
  {
    value: 'mistralai/mistral-small-3.1-24b:free',
    label: 'Mistral: Mistral Small 3.1 24B (free)',
    input: 0,
    output: 0,
    context: 128_000
  },
  {
    value: 'mistralai/ministral-3-14b-2512',
    label: 'Mistral: Ministral 3 14B 2512',
    input: 0.2,
    output: 0.2,
    context: 262_144
  },
  {
    value: 'mistralai/ministral-3-8b-2512',
    label: 'Mistral: Ministral 3 8B 2512',
    input: 0.15,
    output: 0.15,
    context: 262_144
  },
  {
    value: 'mistralai/ministral-3-3b-2512',
    label: 'Mistral: Ministral 3 3B 2512',
    input: 0.1,
    output: 0.1,
    context: 131_072
  },

  // MoonshotAI
  {
    value: 'moonshotai/kimi-k2.5',
    label: 'MoonshotAI: Kimi K2.5',
    input: 0.3,
    output: 1.5,
    context: 262_144
  },

  // NVIDIA
  {
    value: 'nvidia/nemotron-nano-12b-v2-vl',
    label: 'NVIDIA: Nemotron Nano 12B 2 VL',
    input: 0.2,
    output: 0.6,
    context: 131_072
  },
  {
    value: 'nvidia/nemotron-nano-12b-v2-vl:free',
    label: 'NVIDIA: Nemotron Nano 12B 2 VL (free)',
    input: 0,
    output: 0,
    context: 128_000
  },

  // OpenAI
  {
    value: 'openai/gpt-5.2',
    label: 'OpenAI: GPT-5.2',
    input: 1.75,
    output: 14,
    context: 400_000
  },
  {
    value: 'openai/gpt-5.2-chat',
    label: 'OpenAI: GPT-5.2 Chat',
    input: 1.75,
    output: 14,
    context: 128_000
  },
  {
    value: 'openai/gpt-5.2-codex',
    label: 'OpenAI: GPT-5.2-Codex',
    input: 1.75,
    output: 14,
    context: 400_000
  },
  {
    value: 'openai/gpt-5.1',
    label: 'OpenAI: GPT-5.1',
    input: 1.25,
    output: 10,
    context: 400_000
  },
  {
    value: 'openai/gpt-5.1-chat',
    label: 'OpenAI: GPT-5.1 Chat',
    input: 1.25,
    output: 10,
    context: 128_000
  },
  {
    value: 'openai/gpt-5.1-codex',
    label: 'OpenAI: GPT-5.1-Codex',
    input: 1.25,
    output: 10,
    context: 400_000
  },
  {
    value: 'openai/gpt-5.1-codex-max',
    label: 'OpenAI: GPT-5.1-Codex-Max',
    input: 1.25,
    output: 10,
    context: 400_000
  },
  {
    value: 'openai/gpt-5.1-codex-mini',
    label: 'OpenAI: GPT-5.1-Codex-Mini',
    input: 0.25,
    output: 2,
    context: 400_000
  },
  {
    value: 'openai/gpt-5-image',
    label: 'OpenAI: GPT-5 Image',
    input: 10,
    output: 10,
    context: 400_000
  },
  {
    value: 'openai/gpt-5-image-mini',
    label: 'OpenAI: GPT-5 Image Mini',
    input: 2.5,
    output: 2,
    context: 400_000
  },
  {
    value: 'openai/gpt-5-codex',
    label: 'OpenAI: GPT-5 Codex',
    input: 1.25,
    output: 10,
    context: 400_000
  },
  {
    value: 'openai/gpt-4.1',
    label: 'OpenAI: GPT-4.1',
    input: 2,
    output: 8,
    context: 1_047_576
  },
  {
    value: 'openai/gpt-4.1-mini',
    label: 'OpenAI: GPT-4.1 Mini',
    input: 0.4,
    output: 1.6,
    context: 1_047_576
  },
  {
    value: 'openai/gpt-4.1-nano',
    label: 'OpenAI: GPT-4.1 Nano',
    input: 0.1,
    output: 0.4,
    context: 1_047_576
  },
  {
    value: 'openai/o4-mini',
    label: 'OpenAI: o4 Mini',
    input: 1.1,
    output: 4.4,
    context: 200_000
  },
  {
    value: 'openai/o4-mini-high',
    label: 'OpenAI: o4 Mini High',
    input: 1.1,
    output: 4.4,
    context: 200_000
  },
  {
    value: 'openai/o4-mini-deep-research',
    label: 'OpenAI: o4 Mini Deep Research',
    input: 2,
    output: 8,
    context: 200_000
  },
  {
    value: 'openai/o3',
    label: 'OpenAI: o3',
    input: 2,
    output: 8,
    context: 200_000
  },

  // OpenGVLab
  {
    value: 'opengvlab/internvl3-78b',
    label: 'OpenGVLab: InternVL3 78B',
    input: 0.15,
    output: 0.6,
    context: 32_768
  },

  // Perplexity
  {
    value: 'perplexity/sonar-pro-search',
    label: 'Perplexity: Sonar Pro Search',
    input: 3,
    output: 15,
    context: 200_000
  },
  {
    value: 'perplexity/sonar-pro',
    label: 'Perplexity: Sonar Pro',
    input: 3,
    output: 15,
    context: 200_000
  },
  {
    value: 'perplexity/sonar-reasoning-pro',
    label: 'Perplexity: Sonar Reasoning Pro',
    input: 2,
    output: 8,
    context: 128_000
  },

  // Qwen
  {
    value: 'qwen/qwen3-vl-235b-a22b-thinking',
    label: 'Qwen: Qwen3 VL 235B A22B Thinking',
    input: 0.45,
    output: 3.5,
    context: 262_144
  },
  {
    value: 'qwen/qwen3-vl-235b-a22b-instruct',
    label: 'Qwen: Qwen3 VL 235B A22B Instruct',
    input: 0.2,
    output: 0.88,
    context: 262_144
  },
  {
    value: 'qwen/qwen3-vl-32b-instruct',
    label: 'Qwen: Qwen3 VL 32B Instruct',
    input: 0.5,
    output: 1.5,
    context: 262_144
  },
  {
    value: 'qwen/qwen3-vl-30b-a3b-thinking',
    label: 'Qwen: Qwen3 VL 30B A3B Thinking',
    input: 0.2,
    output: 1,
    context: 131_072
  },
  {
    value: 'qwen/qwen3-vl-30b-a3b-instruct',
    label: 'Qwen: Qwen3 VL 30B A3B Instruct',
    input: 0.15,
    output: 0.6,
    context: 262_144
  },
  {
    value: 'qwen/qwen3-vl-8b-thinking',
    label: 'Qwen: Qwen3 VL 8B Thinking',
    input: 0.18,
    output: 2.1,
    context: 256_000
  },
  {
    value: 'qwen/qwen3-vl-8b-instruct',
    label: 'Qwen: Qwen3 VL 8B Instruct',
    input: 0.08,
    output: 0.5,
    context: 131_072
  },
  {
    value: 'qwen/qwen2.5-vl-32b-instruct',
    label: 'Qwen: Qwen2.5 VL 32B Instruct',
    input: 0.05,
    output: 0.22,
    context: 16_384
  },

  // StepFun
  {
    value: 'stepfun/step3',
    label: 'StepFun: Step3',
    input: 0.57,
    output: 1.42,
    context: 65_536
  },

  // xAI
  {
    value: 'x-ai/grok-4.1-fast',
    label: 'xAI: Grok 4.1 Fast',
    input: 0.2,
    output: 0.5,
    context: 2_000_000
  },
  {
    value: 'x-ai/grok-4',
    label: 'xAI: Grok 4',
    input: 3,
    output: 15,
    context: 256_000
  }
]

const USD_TO_RUB = 77

const AUTH_STORAGE_KEY = 'app-authenticated'

interface UploadedImage {
  id: number
  file: File
  url: string
  base64: string
}

interface ResultData {
  text: string
  responseTimeMs: number
  usage: {
    inputTokens: number
    outputTokens: number
    totalTokens: number
    costUsd: number
    costRub: number
  }
}

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY)
    if (storedAuth === 'true') {
      setIsAuthenticated(true)
    }
    setAuthChecked(true)
  }, [])

  const [model, setModel] = useState(MODELS[0].value)
  const [maxTokens, setMaxTokens] = useState('2048')
  const [temperature, setTemperature] = useState('0.7')
  const [systemPrompt, setSystemPrompt] = useState('')
  const [images, setImages] = useState<UploadedImage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ResultData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const selectedModel = MODELS.find((m) => m.value === model) ?? MODELS[0]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    if (username === 'admin' && password === 'checkMe1902') {
      setIsAuthenticated(true)
      if (typeof window !== 'undefined') {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true')
      }
      setUsername('')
      setPassword('')
    } else {
      setLoginError('Неверный логин или пароль')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
    setUsername('')
    setPassword('')
    setImages([])
    setResult(null)
    setError(null)
  }

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files ?? [])
      processFiles(files)
    },
    []
  )

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    const files = Array.from(event.dataTransfer.files)
    processFiles(files)
  }, [])

  const processFiles = (files: File[]) => {
    const imageFiles = files.filter(
      (file) =>
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg'
    )

    imageFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string
        const newImage: UploadedImage = {
          id: Date.now() + Math.random(),
          file,
          url: dataUrl,
          base64: dataUrl.split(',')[1]
        }
        setImages((prev) => [...prev, newImage])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  const formatContext = (ctx: number): string => {
    if (ctx >= 1_000_000) return `${(ctx / 1_000_000).toFixed(1)}M`
    if (ctx >= 1_000) return `${(ctx / 1_000).toFixed(0)}K`
    return String(ctx)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!systemPrompt.trim()) {
      setError('Введите системный промпт')
      return
    }

    if (images.length === 0) {
      setError('Загрузите хотя бы одно изображение')
      return
    }

    if (!maxTokens.trim()) {
      setError('Введите максимум токенов')
      return
    }

    if (!temperature.trim()) {
      setError('Введите температуру')
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const imageContents = images.map((img) => ({
        data: img.base64,
        mediaType: img.file.type
      }))

      const startTime = performance.now()

      const { data } = await axios.post('/api/openrouter', {
        model,
        max_tokens: maxTokens,
        temperature,
        systemPrompt,
        imageContents
      })

      const elapsed = performance.now() - startTime

      const { text, usage = {} } = data

      const inputTokens = usage.prompt_tokens ?? 0
      const outputTokens = usage.completion_tokens ?? 0
      const totalTokens = usage.total_tokens ?? inputTokens + outputTokens

      const inputPrice = selectedModel.input / 1_000_000
      const outputPrice = selectedModel.output / 1_000_000
      const usd = inputTokens * inputPrice + outputTokens * outputPrice
      const rub = usd * USD_TO_RUB

      setResult({
        text,
        responseTimeMs: elapsed,
        usage: {
          inputTokens,
          outputTokens,
          totalTokens,
          costUsd: usd,
          costRub: rub
        }
      })
    } catch (err: unknown) {
      const axiosErr = err as {
        response?: { data?: { details?: string } }
        message?: string
      }
      setError(
        axiosErr.response?.data?.details || axiosErr.message || 'Ошибка запроса'
      )
    } finally {
      setIsLoading(false)
    }
  }

  if (!authChecked) {
    return (
      <div className='container'>
        <div className='card' style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div className='loader'>
            <div className='spinner'></div>
            <div>Проверяем авторизацию...</div>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className='container'>
        <h1 className='title'>Авторизация</h1>

        <div className='card' style={{ maxWidth: '400px', margin: '0 auto' }}>
          <form onSubmit={handleLogin}>
            <div className='form-group'>
              <label className='form-label'>Логин</label>
              <input
                type='text'
                className='form-input'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Введите логин'
                required
              />
            </div>

            <div className='form-group'>
              <label className='form-label'>Пароль</label>
              <input
                type='password'
                className='form-input'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Введите пароль'
                required
              />
            </div>

            {loginError && (
              <div
                style={{
                  background: '#fee2e2',
                  color: '#dc2626',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  marginBottom: '20px'
                }}
              >
                {loginError}
              </div>
            )}

            <button type='submit' className='btn btn-primary'>
              Войти
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className='container'>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <h1 className='title' style={{ marginBottom: 0 }}>
          AI Tests
        </h1>
        <button
          onClick={handleLogout}
          className='btn'
          style={{
            background: '#ef4444',
            color: 'white',
            border: 'none'
          }}
        >
          Выйти
        </button>
      </div>

      <div className='card'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label className='form-label'>Модель</label>
            <select
              className='form-select'
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              {MODELS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            <div
              style={{
                marginTop: '8px',
                fontSize: '13px',
                color: '#6b7280',
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap'
              }}
            >
              <span>Контекст: {formatContext(selectedModel.context)}</span>
              <span>Input: ${selectedModel.input}/1M</span>
              <span>Output: ${selectedModel.output}/1M</span>
            </div>
          </div>

          <div className='grid-2'>
            <div className='form-group'>
              <label className='form-label'>Максимум токенов</label>
              <input
                className='form-input'
                value={maxTokens}
                onChange={(e) => setMaxTokens(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label className='form-label'>Температура (0.0 - 1.0)</label>
              <input
                className='form-input'
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
              />
            </div>
          </div>

          <div className='form-group'>
            <label className='form-label'>System Prompt</label>
            <textarea
              className='form-textarea'
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={10}
            />
          </div>

          <div className='form-group'>
            <label className='form-label'>Загрузка изображений</label>
            <div
              className='file-upload'
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              <div>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📸</div>
                <div style={{ fontSize: '18px', marginBottom: '8px' }}>
                  Перетащите изображения сюда или нажмите для выбора
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Поддерживаются JPG, JPEG, PNG до 5Мб
                </div>
              </div>
              <input
                id='fileInput'
                type='file'
                multiple
                accept='image/jpeg,image/jpg,image/png'
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </div>

            {images.length > 0 && (
              <div className='file-list'>
                {images.map((img) => (
                  <div key={img.id} className='file-item'>
                    <img src={img.url} alt='Uploaded' />
                    <button
                      type='button'
                      className='file-item-remove'
                      onClick={() => removeImage(img.id)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && (
            <div
              style={{
                background: '#fee2e2',
                color: '#dc2626',
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '20px'
              }}
            >
              {error}
            </div>
          )}

          <button
            type='submit'
            className='btn btn-primary'
            disabled={
              isLoading ||
              images.length === 0 ||
              !systemPrompt.trim() ||
              !maxTokens.trim() ||
              !temperature.trim()
            }
          >
            {isLoading ? (
              <>
                <div
                  className='spinner'
                  style={{ width: '16px', height: '16px' }}
                ></div>
                Анализируем...
              </>
            ) : (
              'Запустить анализ'
            )}
          </button>
        </form>
      </div>

      {isLoading && (
        <div className='card'>
          <div className='loader'>
            <div className='spinner'></div>
            <div>Анализируем изображения...</div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              Это может занять несколько минут
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className='card'>
          <h2 style={{ marginBottom: '20px', color: '#374151' }}>
            Результат анализа
          </h2>

          <div className='result'>
            <div className='result-text'>{result.text}</div>

            <div className='result-stats'>
              <h3 style={{ marginBottom: '16px', color: '#374151' }}>
                Статистика использования
              </h3>
              <div className='stats-grid'>
                <div className='stat-item'>
                  <div className='stat-value'>
                    {result.usage.inputTokens.toLocaleString()}
                  </div>
                  <div className='stat-label'>Входные токены</div>
                </div>
                <div className='stat-item'>
                  <div className='stat-value'>
                    {result.usage.outputTokens.toLocaleString()}
                  </div>
                  <div className='stat-label'>Выходные токены</div>
                </div>
                <div className='stat-item'>
                  <div className='stat-value'>
                    {result.usage.totalTokens.toLocaleString()}
                  </div>
                  <div className='stat-label'>Всего токенов</div>
                </div>
                <div className='stat-item'>
                  <div className='stat-value'>
                    ${result.usage.costUsd.toFixed(4)}
                  </div>
                  <div className='stat-label'>Стоимость USD</div>
                </div>
                <div className='stat-item'>
                  <div className='stat-value'>
                    {result.usage.costRub.toFixed(2)} ₽
                  </div>
                  <div className='stat-label'>Стоимость в рублях</div>
                </div>
                <div className='stat-item'>
                  <div className='stat-value'>
                    {result.responseTimeMs >= 1000
                      ? `${(result.responseTimeMs / 1000).toFixed(1)} с`
                      : `${Math.round(result.responseTimeMs)} мс`}
                  </div>
                  <div className='stat-label'>Время ответа</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
