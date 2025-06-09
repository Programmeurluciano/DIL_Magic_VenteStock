export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function getData<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`)
    if (!response.ok) {
      throw new Error(`Erreur GET: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("GET error:", error)
    throw error
  }
}

export async function postData<T>(endpoint: string, data: any): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`Erreur POST: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("POST error:", error)
    throw error
  }
}

export async function putData<T>(endpoint: string, data: any): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`Erreur PUT: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("PUT error:", error)
    throw error
  }
}

export async function deleteData<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error(`Erreur DELETE: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("DELETE error:", error)
    throw error
  }
}

