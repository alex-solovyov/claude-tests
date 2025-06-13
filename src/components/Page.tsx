/* eslint-disable */
// @ts-nocheck
'use client'
import React, { useState, useCallback } from 'react'
import axios from 'axios'

const MODELS = [
  { value: 'claude-sonnet-4-20250514', label: 'Claude Sonnet 4 (2025-05-14)' },
  {
    value: 'claude-3-7-sonnet-20250219',
    label: 'Claude 3.7 Sonnet (2025-02-19)'
  },
  {
    value: 'claude-3-5-sonnet-20241022',
    label: 'Claude 3.5 Sonnet (2024-10-22)'
  },
  { value: 'claude-3-5-haiku-20241022', label: 'Claude 3.5 Haiku (2024-10-22)' }
]

export default function Page() {
  // Состояния авторизации
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  // Основные состояния
  const [model, setModel] = useState(MODELS[0].value)
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
      setUsername('')
      setPassword('')
    } else {
      setLoginError('Неверный логин или пароль')
    }
  }

  // Функция выхода
  const handleLogout = () => {
    setIsAuthenticated(false)
    setUsername('')
    setPassword('')
    setImages([])
    setResult(null)
    setError(null)
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
      const imageContents = images.map((img) => ({
        type: 'image',
        source: {
          type: 'base64',
          media_type: img.file.type,
          data: img.base64
        }
      }))

      const { data } = await axios.post('/api/claude', {
        model,
        max_tokens: maxTokens,
        temperature,
        systemPrompt,
        imageContents
      })

      const { text, usage } = data
      const inputTokens = usage.input_tokens || 0
      const outputTokens = usage.output_tokens || 0

      const modelPricing = {
        'claude-sonnet-4-20250514': { input: 3, output: 15 },
        'claude-3-7-sonnet-20250219': { input: 3, output: 15 },
        'claude-3-5-sonnet-20241022': { input: 3, output: 15 },
        'claude-3-5-haiku-20241022': { input: 0.8, output: 4 }
      }

      const pricing = modelPricing[model] || { input: 3, output: 15 }
      const inputPrice = pricing.input / 1_000_000
      const outputPrice = pricing.output / 1_000_000
      const usd = inputTokens * inputPrice + outputTokens * outputPrice
      const rub = usd * 90

      setResult({
        text,
        usage: {
          inputTokens,
          outputTokens,
          totalTokens: inputTokens + outputTokens,
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
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1 className='title'>🧠 Анализатор Claude AI</h1>
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
            </div>

            <div className='form-group'>
              <label className='form-label'>Максимум токенов</label>
              <input
                className='form-input'
                value={maxTokens}
                onChange={(e) => setMaxTokens(e.target.value)}
              />
            </div>
          </div>

          <div className='form-group'>
            <label className='form-label'>Температура (0.0 - 1.0)</label>
            <input
              className='form-input'
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
            />
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
