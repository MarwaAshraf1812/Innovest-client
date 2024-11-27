import { DELETE, GET, POST, PUT } from '@/API/axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export interface Community {
  community_id: string
  community_name: string
  description: string
  image_url: string
  admins: string[]
  member_count: number
  page_count: number
  tags: string[]
  pages: string[]
  users: string[]
  createdAt: string
  updatedAt: string
}
export interface PendingUser {
  user_id?: string | undefined;
  community_id?: string | undefined;
  member_status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  role?: 'MEMBER' | 'ADMIN';
  is_active?: boolean;
  joined_at?: string;
  createdAt?: string;
  updatedAt?: string;
  community_name?: string
  username?: string
}

import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

const useCommunity = () => {
  const [communities, setCommunities] = useState<Community[]>([])
  const [pendingPages, setPendingPages] = useState<Community[]>([])
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]); 
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCommunities = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await GET('/community')
      setCommunities(response.communities)
    } catch (err: any) {
      setError('Failed to fetch communities')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getCommunityById = async (community_id: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await GET(`/community/${community_id}`)
      return response
    } catch (err: any) {
      setError('Failed to fetch community')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const createCommunity = async (data: any) => {
    setLoading(true)
    setError(null)
    try {
      const response = await POST('/community', data)
      setCommunities([...communities, response])
    } catch (err: any) {
      setError('Failed to create community')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const updateCommunityById = async (community_id: string, updatedData: Partial<Community>) => {
    setLoading(true)
    setError(null)
    try {
      const response = await PUT(`/community/${community_id}`, updatedData)
      setCommunities((prevCommunities) =>
        prevCommunities.map((community) =>
          community.community_id === community_id ? response.community : community
        )
      )
    } catch (err: any) {
      setError('Failed to update community')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const deleteCommunityById = async (community_id: string) => {
    setLoading(true)
    setError(null)
    try {
      await DELETE(`/community/${community_id}`)
      setCommunities((prevCommunities) =>
        prevCommunities.filter((community) => community.community_id !== community_id)
      )
    } catch (err: any) {
      setError('Failed to delete community')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getPendingPages = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await GET('/community/community-pages/pending-pages')
      setPendingPages(response.data)
    } catch (err: any) {
      setError('Failed to fetch pending pages')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const createPage = async (community_id: string, data: any) => {
    setLoading(true)
    setError(null)
    try {
      const response = await POST(`community/${community_id}`, data)
      return response
    } catch (error) {
      setError('Failed to create page')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getAllCommunityPages = async (community_id: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await GET(`community/${community_id}/pages`,)
      return response
    } catch (error) {
      setError('Failed to create page')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getPageById = async (community_id: string, page_id: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await GET(`/community/${community_id}/${page_id}`)
      return response
    } catch (err: any) {
      setError('Failed to fetch page')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchAuthorByPageId = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await GET(`/user/${id}`)
      return response.username
    } catch (err: any) {
      setError('Failed to fetch author')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchPendingUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await GET('/community/users/pending-users')
      setPendingUsers(response || [])
      return response
    } catch (err: any) {
      setError('Failed to fetch pending users')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  const approveUser= async (community_id: string, user_id: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await GET(`/community/${community_id}/approve-user/${user_id}`)
      setPendingUsers((prevPendingUsers) =>
        prevPendingUsers.filter((pendingUser) => pendingUser.user_id !== user_id)
      )
      return response
    } catch (err: any) {
      setError(err.message || 'Failed to approve user')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  
  const rejectUser= async (community_id: string, user_id: string) => {
    console.log('community_id', community_id)
    console.log('user_id', user_id)
    setLoading(true)
    setError(null)
    try {
      const response = await DELETE(`/community/${community_id}/reject-user/${user_id}`)
      setPendingUsers((prevPendingUsers) =>
        prevPendingUsers.filter((pendingUser) => pendingUser.user_id !== user_id)
      )
      return response
    } catch (err: any) {
      setError(err.message || 'Failed to reject user')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchCommunityPages = async (community_id: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await GET(`/community/${community_id}/pages`)
      return response
    } catch (err: any) {
      setError('Failed to fetch community pages')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPendingPages()
    fetchCommunities()
    fetchPendingUsers()
    socket.on("newJoinRequest", (request) => {
      setPendingUsers((prev = []) => [...prev, request]);
      toast.info("New join request received!");
    });

    return () => {
      socket.off("newJoinRequest");
    };
  }, [])

  return {
    communities,
    loading,
    error,
    fetchCommunities,
    createCommunity,
    updateCommunityById,
    deleteCommunityById,
    pendingPages,
    getPendingPages,
    getCommunityById,
    getPageById,
    fetchAuthorByPageId,
    createPage,
    getAllCommunityPages,
    fetchPendingUsers,
    pendingUsers,
    approveUser,
    rejectUser,
    fetchCommunityPages
  }
}

export default useCommunity
