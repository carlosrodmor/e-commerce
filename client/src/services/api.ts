const API_URL = 'http://localhost:5000/api'

export const api = {
  async get(endpoint: string) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Error en la petición')
    }

    return response.json()
  },
}
