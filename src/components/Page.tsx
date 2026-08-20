'use client'
import React, { useState, useCallback, useEffect } from 'react'
import axios from 'axios'

import { MODELS } from '../data/models'

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
