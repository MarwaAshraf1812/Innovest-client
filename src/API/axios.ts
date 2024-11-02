import axios from 'axios';

export async function GET(url: string, params?: {}) {
  const respone = await axios.get(url, { params, withCredentials: true });
  return respone.data;
}


export async function POST(url: string, data: {}) {
  const  response = await axios.post(url, data, { withCredentials: true });
  return response.data;
}

export async function PUT(url: string, data: {}) {
  const response = await axios.put(url, data, { withCredentials: true });
  return response.data;
}

export async function DELETE(url: string) {
  const response = await axios.delete(url, { withCredentials: true });
  return response.data;
}
