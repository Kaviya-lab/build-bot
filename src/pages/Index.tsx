import { useState, useCallback } from 'react';
import { ImageUploader } from '@/components/ImageUploader';
import { ModelLoader } from '@/components/ModelLoader';
import { DetectionResults } from '@/components/DetectionResults';
import { ProjectSuggestions } from '@/components/ProjectSuggestions';
import { useTeachableMachine, Prediction } from '@/hooks/useTeachableMachine';
import { getProjectsForComponents, ProjectSuggestion } from '@/lib/projectSuggestions';
import { toast } from 'sonner';
import { Cpu, Zap, CircuitBoard, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Index() {
  const { isLoading, isModelLoaded, error, loadModel, predict } = useTeachableMachine();
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [projects, setProjects] = useState<ProjectSuggestion[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLoadModel = useCallback(async (modelUrl: string) => {
    await loadModel(modelUrl);
    if (!error) {
      toast.success('Model loaded successfully!', {
        description: 'Ready to analyze electronic components',
      });
    }
  }, [loadModel, error]);

  const handleImageSelect = useCallback(async (imageElement: HTMLImageElement) => {
    if (!isModelLoaded) {
      toast.error('Please load the AI model first', {
        description: 'Click "Load Model" to initialize the detector',
      });
      return;
    }

    setIsProcessing(true);
    setPredictions([]);
    setProjects([]);

    try {
      const results = await predict(imageElement);
      setPredictions(results);

      // Get components with confidence > 10%
      const detectedComponents = results
        .filter((p) => p.probability > 0.1)
        .map((p) => p.className);

      const suggestedProjects = getProjectsForComponents(detectedComponents);
      setProjects(suggestedProjects);

      if (detectedComponents.length > 0) {
        toast.success(`Detected: ${detectedComponents.join(', ')}`, {
          description: `Found ${suggestedProjects.length} project ideas`,
        });
      } else {
        toast.info('No components detected with high confidence', {
          description: 'Try a clearer image or different angle',
        });
      }
    } catch (err) {
      toast.error('Failed to analyze image', {
        description: err instanceof Error ? err.message : 'Unknown error',
      });
    } finally {
      setIsProcessing(false);
    }
  }, [isModelLoaded, predict]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20 animate-pulse-glow">
              <CircuitBoard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">Component Detector</h1>
              <p className="text-xs text-muted-foreground font-mono">AI-Powered Electronics Analyzer</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-sm font-mono text-primary">Browser-Based AI Detection</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Identify Electronic Components
            <br />
            <span className="text-gradient">Get Project Ideas Instantly</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload an image of electronic components and let AI identify them. 
            Get personalized project suggestions based on what's detected.
          </p>
        </section>

        {/* Model Not Loaded Alert */}
        {!isModelLoaded && !isLoading && (
          <Alert className="mb-6 border-accent/50 bg-accent/10">
            <AlertTriangle className="h-4 w-4 text-accent" />
            <AlertDescription className="text-accent">
              Load the AI model first to start detecting components.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Controls */}
          <div className="lg:col-span-1 space-y-6">
            <ModelLoader
              isLoading={isLoading}
              isModelLoaded={isModelLoaded}
              error={error}
              onLoadModel={handleLoadModel}
            />

            {/* Instructions */}
            <div className="p-4 rounded-lg bg-card/50 border border-border/50 space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Cpu className="h-4 w-4 text-primary" />
                How It Works
              </h3>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Load the AI model (pre-configured or your own)</li>
                <li>Upload or drag an image of components</li>
                <li>View detection results with confidence scores</li>
                <li>Explore suggested projects for detected parts</li>
              </ol>
            </div>
          </div>

          {/* Right Column - Image & Results */}
          <div className="lg:col-span-2 space-y-6">
            <ImageUploader
              onImageSelect={handleImageSelect}
              isProcessing={isProcessing}
            />

            <DetectionResults predictions={predictions} />
          </div>
        </div>

        {/* Project Suggestions - Full Width */}
        {projects.length > 0 && (
          <section className="mt-12">
            <ProjectSuggestions projects={projects} />
          </section>
        )}

        {/* Empty State */}
        {isModelLoaded && predictions.length === 0 && !isProcessing && (
          <section className="mt-12 text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Cpu className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Ready to Analyze</h3>
            <p className="text-muted-foreground">
              Upload an image of electronic components to get started
            </p>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="font-mono">
            Powered by TensorFlow.js & Teachable Machine
          </p>
          <p className="mt-1">
            All processing happens locally in your browser
          </p>
        </div>
      </footer>
    </div>
  );
}
