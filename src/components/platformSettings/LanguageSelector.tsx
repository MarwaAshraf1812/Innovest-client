import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

const LanguageSelector = () => {
  const [language, setLanguage] = useState("")

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">Language</label>
      <Select onValueChange={(value) => setLanguage(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="fr">French</SelectItem>
          <SelectItem value="es">Spanish</SelectItem>
        </SelectContent>
      </Select>
      <p className="mt-2 mb-3 text-sm font-medium">Selected Language: {language}</p>
    </div>
  )
}

export default LanguageSelector
