import React from 'react';
import { IconType } from 'react-icons';

interface OverviewCardProps {
  color: string;
  title: string;
  icon: IconType;
  percentage?: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ color, title, icon: Icon, percentage }) => {
  return (
    <div className="flex justify-start flex-col mx-1 p-4 bg-white rounded-md" style={{ borderColor: '#BFBFBF', borderWidth: '1px', borderStyle: 'solid' }}>
      
      <div 
        className="mb-3 flex items-center justify-center" 
        style={{ 
          backgroundColor: color, 
          width: '40px', 
          height: '40px', 
          borderRadius: '50%' 
        }}
      >
        <Icon size={24} style={{ color: 'white' }} />
      </div>
      <span className="text-lg font-semibold text-stone-600">{title}</span>
      <span className="text-xl font-bold" style={{ color: color }}>{percentage}</span>
    </div>
  );
};

export default OverviewCard;
