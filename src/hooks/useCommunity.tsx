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

  const updateCommunityById = async (id: string, updatedData: Partial<Community>) => {
    setLoading(true)
    setError(null)
    try {
      const response = await PUT(`/community/${id}`, updatedData)
      setCommunities(prevCommunities => 
        prevCommunities.map(community => (community.community_id === id ? response.data : community))
      )
    } catch (err: any) {
      setError('Failed to update community')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const deleteCommunityById = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await DELETE(`/community/${id}`)
      setCommunities(prevCommunities => prevCommunities.filter(community => community.community_id !== id))
    } catch (err: any) {
      setError('Failed to delete community')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCommunities();
  }, []);

return {
  communities,
  loading,
  error,
  fetchCommunities,
  createCommunity,
  updateCommunityById,
  deleteCommunityById
  }
}

export default useCommunity;