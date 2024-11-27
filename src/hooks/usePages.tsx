import { GET } from '@/API/axios'
import { useEffect, useState } from 'react'

export interface PageInterface {
  page_id?: string
  title?: string
  content?: string
  location?: string
  images_url?: string[]
  page_url?: string
  start_time?: Date
  end_time?: Date
  page_type?: 'EVENT' | 'ARTICLE' | 'POST' | 'PROJECT_INFO'
  likes?: number
  comments?: number
  tags?: string[]
  author?: string
  createdAt?: Date
  updatedAt?: Date
}



const usePages = () => {
  const [pages, setPages] = useState<String[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPages = async (community_id: string) => {
    setLoading(true)
    setError(null)
    try {
    const response = await GET(`/community/${community_id}/pages`)
      setPages(response)
      return response
    } catch (err: any) {
      console.error(err)
    }
  }

  const getPageById = async (communityId: string, pageId: string) => {
    try {
      const response = await GET(`/community/${communityId}/${pageId}`);
      return response;
    } catch (error) {
      console.error('Error fetching page by ID:', error);
      return null;
    }
  };

  return { 
    pages,
    fetchPages,
    loading,
    error,
    getPageById
  }
}

export default usePages
