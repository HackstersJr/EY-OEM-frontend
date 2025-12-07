import { useOEMOverview } from '@/hooks/oem/useOEMOverview';
import { OEMKPISection } from '@/components/oem/OEMKPISection';
import { OEMModelTable } from '@/components/oem/OEMModelTable';
import { OEMRegionalTable } from '@/components/oem/OEMRegionalTable';
import { Loader2 } from 'lucide-react';

export const OEMDashboardPage = () => {
  const { data, isLoading, error } = useOEMOverview();

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
          <p className="text-red-400 text-lg">Error loading dashboard data</p>
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
        <h1 className="text-3xl font-bold text-white mb-2">OEM Dashboard</h1>
        <p className="text-tesla-text-gray">
          Monitor fleet performance, regional trends, and predictive maintenance insights
        </p>
      </div>

      {/* KPI Section */}
      <OEMKPISection
        totalVehicles={data.totalVehicles}
        vehiclesWithActiveIssues={data.vehiclesWithActiveIssues}
        highSeverityCases={data.highSeverityCases}
        forecastedServiceDemand={data.forecastedServiceDemand7Days}
      />

      {/* Model Performance Table */}
      <OEMModelTable models={data.modelSummary} />

      {/* Regional Overview Table */}
      <OEMRegionalTable regions={data.regionalSummary} />
    </div>
  );
};
