import { IconType } from 'react-icons';

interface MetricsCardProps {
  title: string;
  value: string;
  icon: IconType;
  color: string; // Add a color prop for dynamic color
}

const MetricsCard: React.FC<MetricsCardProps> = ({ title, value, icon: Icon, color }) => {
  return (
    <div 
      className="flex justify-start flex-col mx-1 p-4 bg-white rounded-md" 
      style={{ borderColor: color, borderWidth: '1px', borderStyle: 'solid' }} // Use color for border
    >
      <div 
        className="mb-3 flex items-center justify-center" 
        style={{
          backgroundColor: color, // Use color for background
          width: '40px', 
          height: '40px', 
          borderRadius: '50%' 
        }}
      >
        <Icon size={24} style={{ color: 'white' }} />
      </div>
      <span className="text-lg font-semibold text-stone-600">{title}</span>
      <span className="text-xl font-bold">{value}</span>
    </div>
  );
};

export default MetricsCard;
