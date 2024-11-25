import LanguageSelector from "@/components/platformSettings/LanguageSelector"
import NotificationPreferences from "@/components/platformSettings/NotificationPreferences"
import ThemeSwitcher from "@/components/platformSettings/ThemeSwitcher"
import TimeZoneSelector from "@/components/platformSettings/TimeZoneSelector"

const PlatformSettings = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-main_blue">Platform Settings</h1>
      <div className="flex flex-col space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-2">General</h2>
          <div className="bg-white p-4 rounded-md shadow-md">
            <LanguageSelector />
            <ThemeSwitcher />
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-2">Notification</h2>
          <div className="bg-white p-4 rounded-md shadow-md">
            <NotificationPreferences />
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-2">Time Zone</h2>
          <div className="bg-white p-4 rounded-md shadow-md">
            <TimeZoneSelector />
          </div>
        </section>

      </div>
    </div>
  )
}

export default PlatformSettings