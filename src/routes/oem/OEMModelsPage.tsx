import { useOEMModels } from '@/hooks/oem/useOEMModels';
import { OEMModelTable } from '@/components/oem/OEMModelTable';
import { Loader2 } from 'lucide-react';

export const OEMModelsPage = () => {
  const { data, isLoading, error } = useOEMModels();

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
          <p className="text-red-400 text-lg">Error loading models data</p>
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
        <h1 className="text-3xl font-bold text-white mb-2">Vehicle Models</h1>
        <p className="text-tesla-text-gray">
          Detailed performance metrics and issue tracking for all vehicle models
        </p>
      </div>

      {/* Models Table */}
      <OEMModelTable models={data} />
    </div>
  );
};
