import { useNavigate } from 'react-router-dom';
import { useOEMServiceCenters } from '@/hooks/oem/useOEMServiceCenters';
import { motion } from 'framer-motion';
import { Loader2, Building2, MapPin, AlertCircle, Calendar, ChevronRight } from 'lucide-react';
import type { Utilization } from '@/lib/types';

export const OEMServiceCentersPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useOEMServiceCenters();

  const getUtilizationColor = (utilization: Utilization) => {
    if (utilization === 'High') return 'text-red-400';
    if (utilization === 'Medium') return 'text-yellow-400';
    return 'text-green-400';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-tesla-blue-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-400 text-lg">Error loading service centers data</p>
          <p className="text-tesla-text-gray text-sm mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Service Centers</h1>
        <p className="text-tesla-text-gray">
          Monitor service center performance, utilization, and coverage
        </p>
      </div>

      {/* Service Centers Table */}
      <div className="glass-strong rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">All Service Centers</h2>
          <p className="text-sm text-tesla-text-gray mt-1">
            Overview of service center locations and workload
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">
                  Service Center
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">Region</th>
                <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">
                  Vehicles Covered
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">
                  Active Issues
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">
                  Upcoming Appointments
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">
                  Utilization
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((center) => (
                <motion.tr
                  key={center.id}
                  className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                  onClick={() => navigate(`/oem/service-center/${center.id}`)}
                  whileHover={{ x: 4 }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-tesla-blue-400" />
                      <span className="text-white font-semibold">{center.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-tesla-text-gray" />
                      <span className="text-white">{center.region}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white">
                    {center.vehiclesCovered.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-400" />
                      <span className="text-white">{center.activeIssues.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-tesla-blue-400" />
                      <span className="text-white">
                        {center.upcomingAppointments.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-semibold ${getUtilizationColor(center.utilization)}`}
                    >
                      {center.utilization}
                    </span>
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
    </div>
  );
};
