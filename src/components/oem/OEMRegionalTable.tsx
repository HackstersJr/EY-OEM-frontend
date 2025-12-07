import { motion } from 'framer-motion';
import { MapPin, AlertCircle, Calendar } from 'lucide-react';
import type { OEMRegionalSummary } from '@/lib/types';

interface OEMRegionalTableProps {
  regions: OEMRegionalSummary[];
}

export const OEMRegionalTable = ({ regions }: OEMRegionalTableProps) => {
  return (
    <div className="glass-strong rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">Regional Overview</h2>
        <p className="text-sm text-tesla-text-gray mt-1">
          Geographic distribution of vehicles and service needs
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-left">
              <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">Region</th>
              <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">Vehicles</th>
              <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">
                Active Issues
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">
                Upcoming Appointments
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">
                Issue Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {regions.map((region) => {
              const issueRate = (region.activeIssues / region.vehicles) * 100;
              const issueRateColor =
                issueRate > 10
                  ? 'text-red-400'
                  : issueRate > 7
                  ? 'text-yellow-400'
                  : 'text-green-400';

              return (
                <motion.tr
                  key={region.region}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-tesla-blue-400" />
                      <span className="text-white font-semibold">{region.region}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white">{region.vehicles.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-400" />
                      <span className="text-white">{region.activeIssues.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-tesla-blue-400" />
                      <span className="text-white">
                        {region.upcomingAppointments.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${issueRateColor}`}>
                      {issueRate.toFixed(1)}%
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
