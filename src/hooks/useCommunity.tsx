import { DELETE, GET, POST, PUT } from "@/API/axios";
import { useEffect, useState } from "react";

export interface Community {
  community_id: string;
  community_name: string;
  description: string;
  image_url: string;
  admins: string[];
  member_count: number;
  page_count: number;
  tags: string[];
  pages: any[];
  users: any[];
  createdAt: string;
  updatedAt: string;
}


const useCommunity = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [pendingPages, setPendingPages] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCommunities = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await GET('/community');
      setCommunities(response.communities);
    } catch (err: any) {
      setError('Failed to fetch communities');
      console.error(err);
    } finally {
      setLoading(false);
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
    setLoading(true);
    setError(null);
    try {
      const response = await POST('/community', data);
      setCommunities([...communities, response]);
    } catch (err: any) {
      setError('Failed to create community');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const updateCommunityById = async (community_id: string, updatedData: Partial<Community>) => {
    setLoading(true)
    setError(null)
    try {
      const response = await PUT(`/community/${community_id}`, updatedData)
      setCommunities(prevCommunities => 
        prevCommunities.map(community => (community.community_id === community_id ? response.data : community))
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
      setCommunities(prevCommunities => prevCommunities.filter(community => community.community_id !== community_id))
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

  const fetchAuthorByPageId = async (id:string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await GET(`/user/${id}`);
      return response.username;
    } catch (err: any) {
      setError('Failed to fetch author');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    getPendingPages()
    fetchCommunities();

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
  }
}

export default useCommunity;