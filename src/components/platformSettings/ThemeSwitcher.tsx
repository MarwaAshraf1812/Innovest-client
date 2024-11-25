import { Switch } from "@/components/ui/switch"

const ThemeSwitcher = () => {
  return (
    <div className="flex items-center justify-between">
      <span>Dark Mode</span>
      <Switch/>
    </div>
  )
}

export default ThemeSwitcher