/* eslint-disable */
// @ts-nocheck
'use client'
import React, { useState, useCallback, useEffect } from 'react'
import axios from 'axios'

const PROVIDERS = [
  { value: 'claude', label: 'Claude API' },
  { value: 'grok', label: 'Grok API' },
  { value: 'openai', label: 'ChatGPT API' }
]

const CLAUDE_MODELS = [
  {
    value: 'claude-sonnet-4-5-20250929',
    label: 'Claude Sonnet 4.5 (2025-09-29)'
  },
  {
    value: 'claude-haiku-4-5-20251001',
    label: 'Claude Haiku 4.5 (2025-10-01)'
  },
  { value: 'claude-sonnet-4-20250514', label: 'Claude Sonnet 4 (2025-05-14)' }
]

const GROK_MODELS = [
  { value: 'grok-4-fast-reasoning', label: 'Grok 4 Fast (Reasoning)' },
  { value: 'grok-4-fast-non-reasoning', label: 'Grok 4 Fast (Non-Reasoning)' },
  { value: 'grok-4-0709', label: 'Grok 4 (0709)' }
]

const OPENAI_MODELS = [
  { value: 'gpt-5', label: 'GPT-5' },
  { value: 'gpt-5-mini', label: 'GPT-5 Mini' },
  { value: 'gpt-5-nano', label: 'GPT-5 Nano' },
  { value: 'gpt-5-chat-latest', label: 'GPT-5 Chat Latest' }
]

const CLAUDE_PRICING = {
  'claude-sonnet-4-5-20250929': { input: 3, output: 15 },
  'claude-haiku-4-5-20251001': { input: 1, output: 5 },
  'claude-sonnet-4-20250514': { input: 3, output: 15 }
}

const GROK_PRICING = {
  'grok-4-fast-reasoning': { input: 0.2, output: 0.5 },
  'grok-4-fast-non-reasoning': { input: 0.2, output: 0.5 },
  'grok-4-0709': { input: 3, output: 15 }
}

const OPENAI_PRICING = {
  'gpt-5': { input: 1.25, output: 10 },
  'gpt-5-mini': { input: 0.25, output: 2 },
  'gpt-5-nano': { input: 0.05, output: 0.4 },
  'gpt-5-chat-latest': { input: 1.25, output: 10 }
}

const USD_TO_RUB = 90

const AUTH_STORAGE_KEY = 'app-authenticated'

const getDefaultModel = (provider) => {
  if (provider === 'grok') return GROK_MODELS[0].value
  if (provider === 'openai') return OPENAI_MODELS[0].value
  return CLAUDE_MODELS[0].value
}

export default function Page() {
  // Состояния авторизации
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

  // Основные состояния
  const [provider, setProvider] = useState('claude')
  const [model, setModel] = useState(getDefaultModel('claude'))
  const [maxTokens, setMaxTokens] = useState('2000')
  const [temperature, setTemperature] = useState('0.7')
  const [systemPrompt, setSystemPrompt] = useState('')
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  // Функция авторизации
  const handleLogin = (e) => {
    e.preventDefault()
    setLoginError('')

    // Простая проверка логина и пароля (в реальном проекте - API запрос)
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

  // Функция выхода
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

  const currentModels =
    provider === 'claude'
      ? CLAUDE_MODELS
      : provider === 'grok'
      ? GROK_MODELS
      : OPENAI_MODELS

  const handleProviderChange = (value) => {
    setProvider(value)
    setModel(getDefaultModel(value))
  }

  const handleFileUpload = useCallback((event) => {
    const files = Array.from(event.target.files)
    processFiles(files)
  }, [])

  const handleDrop = useCallback((event) => {
    event.preventDefault()
    const files = Array.from(event.dataTransfer.files)
    processFiles(files)
  }, [])

  const processFiles = (files) => {
    const imageFiles = files.filter(
      (file) =>
        file.type.startsWith('image/') &&
        (file.type === 'image/jpeg' ||
          file.type === 'image/png' ||
          file.type === 'image/jpg')
    )

    imageFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newImage = {
          id: Date.now() + Math.random(),
          file,
          url: e.target.result,
          base64: e.target.result.split(',')[1]
        }
        setImages((prev) => [...prev, newImage])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  const handleSubmit = async (event) => {
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
      const claudeImageContents = images.map((img) => ({
        type: 'image',
        source: {
          type: 'base64',
          media_type: img.file.type,
          data: img.base64
        }
      }))

      const grokImageContents = images.map((img) => ({
        data: img.base64,
        mediaType: img.file.type
      }))

      const openaiImageContents = images.map((img) => ({
        data: img.base64,
        mediaType: img.file.type
      }))

      const endpoint =
        provider === 'claude'
          ? '/api/claude'
          : provider === 'grok'
          ? '/api/grok'
          : '/api/openai'

      const payload =
        provider === 'claude'
          ? {
              model,
              max_tokens: maxTokens,
              temperature,
              systemPrompt,
              imageContents: claudeImageContents
            }
          : provider === 'grok'
          ? {
              model,
              max_tokens: maxTokens,
              temperature,
              systemPrompt,
              imageContents: grokImageContents
            }
          : {
              model,
              max_tokens: maxTokens,
              temperature,
              systemPrompt,
              imageContents: openaiImageContents
            }

      const { data } = await axios.post(endpoint, payload)
      const { text, usage = {} } = data

      const inputTokens =
        usage.input_tokens ?? usage.prompt_tokens ?? usage.inputTokens ?? 0
      const outputTokens =
        usage.output_tokens ??
        usage.completion_tokens ??
        usage.outputTokens ??
        0
      const totalTokens =
        usage.total_tokens ?? usage.totalTokens ?? inputTokens + outputTokens

      const pricingMap =
        provider === 'claude'
          ? CLAUDE_PRICING
          : provider === 'grok'
          ? GROK_PRICING
          : OPENAI_PRICING
      const pricing = pricingMap[model] || { input: 3, output: 15 }
      const inputPrice = pricing.input / 1_000_000
      const outputPrice = pricing.output / 1_000_000
      const usd = inputTokens * inputPrice + outputTokens * outputPrice
      const rub = usd * USD_TO_RUB

      setResult({
        text,
        usage: {
          inputTokens,
          outputTokens,
          totalTokens,
          costUsd: usd,
          costRub: rub
        }
      })
    } catch (err: any) {
      setError(err.response?.data?.details || err.message || 'Ошибка запроса')
    } finally {
      setIsLoading(false)
    }
  }

  // Форма авторизации
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
        <h1 className='title'>🔐 Авторизация</h1>

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
                ❌ {loginError}
              </div>
            )}

            <button type='submit' className='btn btn-primary'>
              🚀 Войти
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
        <h1 className='title'>
          🧠 Анализатор{' '}
          {provider === 'claude'
            ? 'Claude'
            : provider === 'grok'
            ? 'Grok'
            : 'ChatGPT'}{' '}
          API
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
          🚪 Выйти
        </button>
      </div>

      <div className='card'>
        <form onSubmit={handleSubmit}>
          <div className='grid-2'>
            <div className='form-group'>
              <label className='form-label'>Провайдер</label>
              <select
                className='form-select'
                value={provider}
                onChange={(e) => handleProviderChange(e.target.value)}
              >
                {PROVIDERS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div className='form-group'>
              <label className='form-label'>Модель</label>
              <select
                className='form-select'
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                {currentModels.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
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
              rows='10'
            />
          </div>

          <div className='form-group'>
            <label className='form-label'>Загрузка изображений</label>
            <div
              className='file-upload'
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onClick={() => document.getElementById('fileInput').click()}
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
              ❌ {error}
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
              <>🚀 Запустить анализ</>
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
            🎯 Результат анализа
          </h2>

          <div className='result'>
            <div className='result-text'>{result.text}</div>

            <div className='result-stats'>
              <h3 style={{ marginBottom: '16px', color: '#374151' }}>
                📊 Статистика использования
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
