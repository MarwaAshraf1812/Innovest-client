import React from 'react';
import SidebarItem from './SidebarItems';
import { IconType } from 'react-icons';

interface SidebarSectionProps {
  title: string;
  items: Array<{
    icon: IconType;
    color: string;
    label: string;
    count?: number;
    date?: string;
  }>;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, items }) => (
  <div className="p-4 mb-4">
    <h6 className="font-semibold text-gray-700 mb-2 text-nowrap">{title}</h6>
    {items.map((item, index) => (
      <SidebarItem
        key={index}
        icon={item.icon}
        color={item.color}
        label={item.label}
        count={item.count}
        date={item.date}
      />
    ))}
  </div>
);

export default SidebarSection;
