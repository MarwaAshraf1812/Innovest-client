import axios from 'axios'
// export const DOMAIN = "https://server-production-82fc.up.railway.app/api"
export const DOMAIN = 'http://localhost:5000/api'

export async function GET(url: string, params?: {}) {
  try {
    const respone = await axios.get(DOMAIN + url, { params, withCredentials: true })
    return respone.data
  } catch (error) {
    console.log(error)
  }
}

export async function POST(url: string, data?: {}) {
  try {
    const response = await axios.post(DOMAIN + url, data, { withCredentials: true })
    return response.data || response
  } catch (error) {
    console.log(error)
  }
}

export async function PUT(url: string, data?: {}) {
  try {
    const response = await axios.put(DOMAIN + url, data, { withCredentials: true })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export async function DELETE(url: string) {
  try {
    const response = await axios.delete(DOMAIN + url, { withCredentials: true })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
