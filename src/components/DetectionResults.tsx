import { Prediction } from '@/hooks/useTeachableMachine';
import { cn } from '@/lib/utils';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface DetectionResultsProps {
  predictions: Prediction[];
  threshold?: number;
}

export function DetectionResults({ predictions, threshold = 0.1 }: DetectionResultsProps) {
  if (predictions.length === 0) {
    return null;
  }

  const sortedPredictions = [...predictions].sort((a, b) => b.probability - a.probability);
  const topPrediction = sortedPredictions[0];

  return (
    <div className="w-full space-y-4 animate-fade-in">
      <div className="flex items-center gap-2">
        <CheckCircle className="h-5 w-5 text-success" />
        <h3 className="text-lg font-semibold text-foreground">Detection Results</h3>
      </div>

      <div className="p-4 rounded-lg bg-card border border-border">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔍</span>
          <div>
            <p className="text-sm text-muted-foreground">Primary Detection</p>
            <p className="text-xl font-bold text-primary">{topPrediction.className}</p>
          </div>
          <div className="ml-auto">
            <span className="text-2xl font-mono font-bold text-accent">
              {(topPrediction.probability * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {sortedPredictions.map((prediction, index) => {
            const percentage = prediction.probability * 100;
            const isAboveThreshold = prediction.probability >= threshold;

            return (
              <div
                key={prediction.className}
                className={cn(
                  "animate-slide-in",
                  !isAboveThreshold && "opacity-50"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    {isAboveThreshold ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium font-mono">
                      {prediction.className}
                    </span>
                  </div>
                  <span className="text-sm font-mono text-muted-foreground">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-700 ease-out",
                      percentage >= 80
                        ? "bg-success"
                        : percentage >= 50
                        ? "bg-primary"
                        : percentage >= 20
                        ? "bg-accent"
                        : "bg-muted-foreground/50"
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
