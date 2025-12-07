import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, ChevronRight } from 'lucide-react';
import type { OEMModelSummary } from '@/lib/types';

interface OEMModelTableProps {
  models: OEMModelSummary[];
}

export const OEMModelTable = ({ models }: OEMModelTableProps) => {
  const navigate = useNavigate();

  const getTrendIcon = (trend: string) => {
    if (trend === 'INCREASING') return <TrendingUp className="w-4 h-4 text-red-400" />;
    if (trend === 'DECREASING') return <TrendingDown className="w-4 h-4 text-green-400" />;
    return <Minus className="w-4 h-4 text-tesla-text-gray" />;
  };

  const getFailureRateColor = (rate: number) => {
    if (rate > 0.07) return 'text-red-400';
    if (rate > 0.05) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="glass-strong rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">Model Performance</h2>
        <p className="text-sm text-tesla-text-gray mt-1">
          Overview of all vehicle models and their issue rates
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-left">
              <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">Model</th>
              <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">
                Total Vehicles
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">
                Active Issues
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">
                Failure Rate
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">Trend</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {models.map((model) => (
              <motion.tr
                key={model.modelId}
                className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                onClick={() => navigate(`/oem/model/${model.modelId}`)}
                whileHover={{ x: 4 }}
              >
                <td className="px-6 py-4">
                  <span className="text-white font-semibold">{model.modelName}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-white">{model.vehicles.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-white">{model.activeIssues.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`font-semibold ${getFailureRateColor(model.failureRate)}`}>
                    {(model.failureRate * 100).toFixed(1)}%
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">{getTrendIcon(model.trend)}</div>
                </td>
                <td className="px-6 py-4">
                  <ChevronRight className="w-5 h-5 text-tesla-text-gray" />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
