import { BarChart3 } from 'lucide-react';

export const StatsChart = () => {
  return (
    <div className="h-64 flex items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-lg">
      <div className="text-center">
        <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p className="text-sm">Performance chart coming soon</p>
        <p className="text-xs mt-1">Integration with chart library pending</p>
      </div>
    </div>
  );
};