import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'

const TimeZoneSelector = () => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">Time Zone</label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a Time Zone" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="UTC">UTC</SelectItem>
          <SelectItem value="PST">Pacific Standard Time (PST)</SelectItem>
          <SelectItem value="EST">Eastern Standard Time (EST)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default TimeZoneSelector
