import { useParams, Link } from 'react-router-dom';
import { useOEMServiceCenterDetail } from '@/hooks/oem/useOEMServiceCenterDetail';
import { motion } from 'framer-motion';
import { Loader2, ChevronLeft, MapPin, Building2, TrendingUp, Package } from 'lucide-react';

export const OEMServiceCenterDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useOEMServiceCenterDetail(id || '');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-tesla-blue-400 animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-400 text-lg">Error loading service center data</p>
          <p className="text-tesla-text-gray text-sm mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  const loadColor = (load: number) => {
    if (load > 85) return 'text-red-400';
    if (load > 70) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link to="/oem/service-centers">
        <motion.div
          className="inline-flex items-center gap-2 text-tesla-blue-400 hover:text-tesla-blue-300"
          whileHover={{ x: -4 }}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Service Centers</span>
        </motion.div>
      </Link>

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">{data.name}</h1>
        <div className="flex items-center gap-4 text-tesla-text-gray">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{data.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            <span>{data.region} Region</span>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-strong p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-tesla-blue-400" />
            <h3 className="text-lg font-semibold text-white">Current Load</h3>
          </div>
          <p className={`text-4xl font-bold ${loadColor(data.currentLoad)}`}>
            {data.currentLoad}%
          </p>
          <p className="text-sm text-tesla-text-gray mt-2">Current capacity utilization</p>
        </div>

        <div className="glass-strong p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-tesla-blue-400" />
            <h3 className="text-lg font-semibold text-white">Upcoming Load</h3>
          </div>
          <p className={`text-4xl font-bold ${loadColor(data.upcomingLoad)}`}>
            {data.upcomingLoad}%
          </p>
          <p className="text-sm text-tesla-text-gray mt-2">Forecasted for next 7 days</p>
        </div>
      </div>

      {/* Common Issues */}
      <div className="glass-strong rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Common Issues Handled</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.commonIssues.map((issue, idx) => (
            <div
              key={idx}
              className="bg-tesla-light-gray px-4 py-3 rounded-xl flex items-center gap-3"
            >
              <Package className="w-4 h-4 text-tesla-blue-400" />
              <span className="text-white">{issue}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Models Serviced */}
      <div className="glass-strong rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Models Serviced</h2>
          <p className="text-sm text-tesla-text-gray mt-1">
            Most frequently serviced vehicle models at this center
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">Model</th>
                <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">
                  Service Count
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              {data.modelsServiced.map((model, idx) => {
                const total = data.modelsServiced.reduce((sum, m) => sum + m.count, 0);
                const percentage = ((model.count / total) * 100).toFixed(1);

                return (
                  <tr
                    key={idx}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-white font-medium">{model.modelName}</span>
                    </td>
                    <td className="px-6 py-4 text-white">{model.count.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-tesla-light-gray rounded-full h-2 max-w-[200px]">
                          <div
                            className="bg-tesla-blue-600 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-white font-semibold min-w-[3rem]">
                          {percentage}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
