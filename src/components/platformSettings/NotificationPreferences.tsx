import { Switch } from "@/components/ui/switch"

const NotificationPreferences = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span>Email Notifications</span>
        <Switch/>
      </div>
      <div className="flex justify-between items-center">
        <span>SMS Notifications</span>
        <Switch/>
      </div>
      <div className="flex justify-between items-center">
        <span>Push Notifications</span>
        <Switch/>
      </div>
    </div>
  )
}

export default NotificationPreferences
