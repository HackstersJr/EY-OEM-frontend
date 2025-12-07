import { useParams, Link } from 'react-router-dom';
import { useOEMModelPerformance } from '@/hooks/oem/useOEMModelPerformance';
import { motion } from 'framer-motion';
import { Loader2, ChevronLeft, AlertTriangle, MapPin } from 'lucide-react';

export const OEMModelDetailPage = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const { data, isLoading, error } = useOEMModelPerformance(modelId || '');

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
          <p className="text-red-400 text-lg">Error loading model data</p>
          <p className="text-tesla-text-gray text-sm mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  const failureRateColor =
    data.failureRate > 0.07
      ? 'text-red-400'
      : data.failureRate > 0.05
      ? 'text-yellow-400'
      : 'text-green-400';

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link to="/oem/models">
        <motion.div
          className="inline-flex items-center gap-2 text-tesla-blue-400 hover:text-tesla-blue-300"
          whileHover={{ x: -4 }}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Models</span>
        </motion.div>
      </Link>

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">{data.modelName} Performance</h1>
        <p className="text-tesla-text-gray">Detailed analytics and component breakdown</p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-strong p-6 rounded-2xl">
          <p className="text-tesla-text-gray text-sm mb-2">Total Vehicles</p>
          <p className="text-3xl font-bold text-white">{data.totalVehicles.toLocaleString()}</p>
        </div>
        <div className="glass-strong p-6 rounded-2xl">
          <p className="text-tesla-text-gray text-sm mb-2">Active Issues</p>
          <p className="text-3xl font-bold text-white">{data.activeIssues.toLocaleString()}</p>
        </div>
        <div className="glass-strong p-6 rounded-2xl">
          <p className="text-tesla-text-gray text-sm mb-2">Failure Rate</p>
          <p className={`text-3xl font-bold ${failureRateColor}`}>
            {(data.failureRate * 100).toFixed(1)}%
          </p>
        </div>
        <div className="glass-strong p-6 rounded-2xl">
          <p className="text-tesla-text-gray text-sm mb-2">High Severity</p>
          <p className="text-3xl font-bold text-red-400">{data.highSeverityCount}</p>
        </div>
      </div>

      {/* Component Breakdown */}
      <div className="glass-strong rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Component Breakdown</h2>
          <p className="text-sm text-tesla-text-gray mt-1">
            Most common failure points and severity distribution
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">Component</th>
                <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">Incidents</th>
                <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">
                  Failure %
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">Low</th>
                <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">Medium</th>
                <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">High</th>
              </tr>
            </thead>
            <tbody>
              {data.componentBreakdown.map((component) => (
                <tr
                  key={component.component}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      <span className="text-white font-medium">{component.component}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white">{component.incidents}</td>
                  <td className="px-6 py-4 text-white">
                    {component.failurePercentage.toFixed(1)}%
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-green-400">
                      {component.severityDistribution.LOW}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-yellow-400">
                      {component.severityDistribution.MEDIUM}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-red-400">{component.severityDistribution.HIGH}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Regional Breakdown */}
      <div className="glass-strong rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Regional Distribution</h2>
          <p className="text-sm text-tesla-text-gray mt-1">
            Geographic analysis of issues by region
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">Region</th>
                <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">Vehicles</th>
                <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">Issues</th>
                <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">
                  High Severity
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-tesla-text-gray">
                  Issue Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {data.regionalBreakdown.map((region) => {
                const issueRate = (region.issues / region.vehicles) * 100;
                const rateColor =
                  issueRate > 10
                    ? 'text-red-400'
                    : issueRate > 7
                    ? 'text-yellow-400'
                    : 'text-green-400';

                return (
                  <tr
                    key={region.region}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-tesla-blue-400" />
                        <span className="text-white font-medium">{region.region}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white">{region.vehicles.toLocaleString()}</td>
                    <td className="px-6 py-4 text-white">{region.issues.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="text-red-400">{region.highSeverity}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${rateColor}`}>{issueRate.toFixed(1)}%</span>
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
