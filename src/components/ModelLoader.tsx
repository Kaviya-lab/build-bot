import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Loader2, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModelLoaderProps {
  isLoading: boolean;
  isModelLoaded: boolean;
  error: string | null;
  onLoadModel: (modelUrl: string) => void;
}

// Demo model URL - users can replace with their own Teachable Machine model
const DEFAULT_MODEL_URL = 'https://teachablemachine.withgoogle.com/models/bN8AfPvwC/';

export function ModelLoader({ isLoading, isModelLoaded, error, onLoadModel }: ModelLoaderProps) {
  const [modelUrl, setModelUrl] = useState(DEFAULT_MODEL_URL);

  const handleLoad = () => {
    const url = modelUrl.endsWith('/') ? modelUrl : modelUrl + '/';
    onLoadModel(url);
  };

  return (
    <Card className={cn(
      "gradient-card border-border/50 transition-all duration-300",
      isModelLoaded && "border-success/50"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-lg transition-colors",
            isModelLoaded ? "bg-success/20" : "bg-primary/20"
          )}>
            <Brain className={cn(
              "h-6 w-6",
              isModelLoaded ? "text-success" : "text-primary"
            )} />
          </div>
          <div>
            <CardTitle className="text-base">AI Model</CardTitle>
            <CardDescription className="text-sm">
              {isModelLoaded 
                ? 'Model loaded and ready' 
                : 'Load a Teachable Machine model'}
            </CardDescription>
          </div>
          {isModelLoaded && (
            <CheckCircle className="h-5 w-5 text-success ml-auto" />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Input
            value={modelUrl}
            onChange={(e) => setModelUrl(e.target.value)}
            placeholder="Teachable Machine model URL..."
            disabled={isLoading || isModelLoaded}
            className="font-mono text-sm"
          />
          <Button
            onClick={handleLoad}
            disabled={isLoading || isModelLoaded || !modelUrl}
            className={cn(
              "min-w-[120px]",
              isModelLoaded && "bg-success hover:bg-success/90"
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading
              </>
            ) : isModelLoaded ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Loaded
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Load Model
              </>
            )}
          </Button>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
            <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ExternalLink className="h-3 w-3" />
          <a
            href="https://teachablemachine.withgoogle.com/train/image"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Create your own model at Teachable Machine
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
