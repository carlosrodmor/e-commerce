const API_URL = 'http://localhost:5000/api'

export const api = {
  async fetch(endpoint: string, options: RequestInit = {}) {
    const defaultOptions: RequestInit = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultOptions.headers,
          ...options.headers,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}: ${response.statusText}`)
      }

      return data
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('Error en la petición')
    }
  },
}
