import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle, Activity } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}

const KPICard = ({ title, value, change, trend, icon }: KPICardProps) => {
  const getTrendColor = () => {
    if (!trend) return 'text-tesla-text-gray';
    if (trend === 'up') return 'text-green-400';
    if (trend === 'down') return 'text-red-400';
    return 'text-tesla-text-gray';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4" />;
    return null;
  };

  return (
    <motion.div
      className="glass-strong p-6 rounded-2xl"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-tesla-text-gray">{icon}</div>
        {change && (
          <div className={`flex items-center gap-1 text-sm ${getTrendColor()}`}>
            {getTrendIcon()}
            <span>{change}</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-3xl font-bold text-white">{value.toLocaleString()}</h3>
        <p className="text-sm text-tesla-text-gray">{title}</p>
      </div>
    </motion.div>
  );
};

interface OEMKPISectionProps {
  totalVehicles: number;
  vehiclesWithActiveIssues: number;
  highSeverityCases: number;
  forecastedServiceDemand: number;
}

export const OEMKPISection = ({
  totalVehicles,
  vehiclesWithActiveIssues,
  highSeverityCases,
  forecastedServiceDemand,
}: OEMKPISectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <KPICard
        title="Total Vehicles Monitored"
        value={totalVehicles}
        icon={<Activity className="w-6 h-6" />}
      />
      <KPICard
        title="Vehicles with Active Issues"
        value={vehiclesWithActiveIssues}
        change="+3.2%"
        trend="up"
        icon={<AlertTriangle className="w-6 h-6" />}
      />
      <KPICard
        title="High Severity Cases"
        value={highSeverityCases}
        change="-1.8%"
        trend="down"
        icon={<AlertTriangle className="w-6 h-6 text-red-400" />}
      />
      <KPICard
        title="Forecasted Demand (7 Days)"
        value={forecastedServiceDemand}
        change="+5.4%"
        trend="up"
        icon={<TrendingUp className="w-6 h-6" />}
      />
    </div>
  );
};
