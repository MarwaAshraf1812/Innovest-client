import React from 'react'
import { IconType } from 'react-icons'

interface SidebarItemProps {
  icon: IconType
  color: string
  label: string
  count?: number
  date?: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, color, label, count, date }) => (
  <div className="flex items-center justify-between  px-2 py-4 flex-wrap border-b border-gray-200">
    <div className="flex items-center">
      <div
        className="flex items-center justify-center"
        style={{
          backgroundColor: '#EEF2FF',
          width: '30px',
          height: '30px',
          borderRadius: '50%',
        }}
      >
        <Icon
          style={{ color: color}}
          className="text-lg"
        />
      </div>
      <span className="whitespace-nowrap">{label}</span>
    </div>
    <div className="text-gray-600 flex gap-2 items-center">
      {count !== undefined && <span>{count}</span>}
      {date && <span className="text-sm">{date}</span>}
    </div>
  </div>
)

export default SidebarItem
