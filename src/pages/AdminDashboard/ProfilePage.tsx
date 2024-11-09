import DynamicForm from "@/components/common/Profile/EditProfile";
import ProfileView from "@/components/common/Profile/ProfileView"
import { AppContext } from "@/contexts/AppContext";
import { useContext } from "react";

const ProfilePage = () => {
  const { updateUserData, isEditing, setIsEditing, handleEdit } = useContext(AppContext);
  

  const handleCancelEdit = () => {
    setIsEditing(false);
  }

  const handleSubmit = async (updatedData: any) => {
    await updateUserData(updatedData);
    setIsEditing(false);
  }
  return (
    <div>
      { isEditing ? (
        <div className="bg-white shadow-2xl rounded-lg w-full max-w-6xl p-8 border border-gray-300
        ">
          <div className="edit form">
          <DynamicForm 
            onSubmit={handleSubmit} 
            onCancel={handleCancelEdit} 
          />
          </div>
        </div>
      ): (
        <ProfileView   onEdit={handleEdit}/>
      )}
    </div>
  )
}

export default ProfilePage