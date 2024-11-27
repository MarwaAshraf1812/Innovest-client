import Table from '@/components/common/Table/Table'
import { AppContext } from '@/contexts/AppContext'
import useCommunity, { PendingUser } from '@/hooks/useCommunity'
import { useUsers } from '@/hooks/useUsers'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'


const PendingUsers = () => {
  const { pendingUsers, loading, error, getCommunityById, fetchPendingUsers, approveUser, rejectUser } = useCommunity()
  const { getUserById } = useUsers()
  const { setIsPendingMode } = useContext(AppContext)
  const [usersWithDetails, setUsersWithDetails] = useState<PendingUser[]>([])

  const handleApproveUser = async (tableRow: PendingUser) => {
    const memberStatus = tableRow.member_status;
    const pendingUser = pendingUsers.find((user) => user.member_status === memberStatus);
  
    if (!pendingUser || pendingUser.member_status !== 'PENDING') {
      toast('This user is no longer in the pending state.');
      return;
    }
  
    try {
      const response = await approveUser(pendingUser?.community_id || '', pendingUser.user_id || '');
      console.log('Response:', response);
      if (response && response.message === 'User has successfully joined the community.') {
        toast.success('User approved successfully.');
      } else {
        toast.error('Failed to approve user.');
      }
      await fetchPendingUsers();
    } catch (err) {
      toast.error('Failed to approve user.');
      console.error('Error approving user:', err);
    }
  };

  const handleRejectUser = async (tableRow: PendingUser) => {
    const memberStatus = tableRow.member_status;
    const pendingUser = pendingUsers.find((user) => user.member_status === memberStatus);
  
    if (!pendingUser || pendingUser.member_status !== 'PENDING') {
      toast('This user is no longer in the pending state.');
      return;
    }
  
    try {
      await rejectUser(pendingUser?.community_id || '', pendingUser.user_id || '');
      toast.success('User rejected successfully.');
      await fetchPendingUsers();
    } catch (err) {
      toast.error('Failed to reject user.');
      console.error('Error rejecting user:', err);
    }
  }

  const handlePendingUsers = async () => {
    try {
      const usersDetails = await Promise.all(
        pendingUsers.map(async (user) => {
          const communityName = user.community_id ? await getCommunityById(user.community_id) : { community: { community_name: 'Unknown Community' } }
          const username = user.user_id ? await getUserById(user.user_id) : { username: 'Unknown User' }

          return {
            ...user,
            communityName: communityName?.community.community_name,
            username: username?.username,
          }
        })
      )

      setUsersWithDetails(usersDetails)
      setIsPendingMode(true)
    } catch (err) {
      console.error('Error fetching user details:', err)
    }
  }


  useEffect(() => {
    if (pendingUsers.length > 0) {
      handlePendingUsers()
    }
  }, [pendingUsers])

  const usersToDisplay = usersWithDetails.length > 0 ? usersWithDetails : pendingUsers || []

  return (
    <div className="mt-4">
      <div className="flex justify-center items-center mb-4 py-5">
        <h1 className="text-2xl font-bold">Pending Users</h1>
      </div>
      {error && (
        <div className="text-red-500 text-center mb-4">
          <p>Error: {error}</p>
        </div>
      )}
      {usersToDisplay.length === 0 ? (
        <div className="text-center">No pending users found.</div>
      ) : (
        <Table
          columns={[
            { label: 'Username', field: 'username' },
            { label: 'Community', field: 'communityName' },
            { label: 'Status', field: 'member_status' },
          ]}
          data={usersToDisplay}
          loading={loading}
          updateData={handleApproveUser}
          deleteData={handleRejectUser}
          rowKey="user_id"
        />
      )}
    </div>
  )
}

export default PendingUsers
