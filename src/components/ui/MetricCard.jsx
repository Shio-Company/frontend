import { AdminPanel, Icon } from './ShioDesign';

const MetricCard = ({ label, value, change, icon, negative }) => (
  <AdminPanel className="p-5 md:p-6">
    <div className="flex items-start justify-between">
      <div className="flex h-7 w-7 items-center justify-center bg-[#f0f0f0] text-lg font-bold text-black">
        {icon === '$' ? '$' : <Icon name={icon} className="h-5 w-5" />}
      </div>
      {change && (
        <span className={`text-[14px] font-semibold md:text-[20px] ${negative ? 'text-[#ff3333]' : 'text-[#14b85a]'}`}>
          {change}
        </span>
      )}
    </div>
    <p className="mt-3 text-[14px] text-black/80 md:text-[20px]">{label}</p>
    <p className="mt-1 text-[22px] font-bold text-black md:mt-2 md:text-[26px]">{value}</p>
  </AdminPanel>
);

export default MetricCard;