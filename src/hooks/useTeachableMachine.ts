import { useState, useCallback, useRef } from 'react';
import * as tmImage from '@teachablemachine/image';

export interface Prediction {
  className: string;
  probability: number;
}

interface UseTeachableMachineReturn {
  model: tmImage.CustomMobileNet | null;
  isLoading: boolean;
  isModelLoaded: boolean;
  error: string | null;
  loadModel: (modelUrl: string) => Promise<void>;
  predict: (imageElement: HTMLImageElement | HTMLCanvasElement) => Promise<Prediction[]>;
}

export function useTeachableMachine(): UseTeachableMachineReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const modelRef = useRef<tmImage.CustomMobileNet | null>(null);

  const loadModel = useCallback(async (modelUrl: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const modelURL = modelUrl + 'model.json';
      const metadataURL = modelUrl + 'metadata.json';
      
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      modelRef.current = loadedModel;
      setIsModelLoaded(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load model';
      setError(errorMessage);
      setIsModelLoaded(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const predict = useCallback(async (imageElement: HTMLImageElement | HTMLCanvasElement): Promise<Prediction[]> => {
    if (!modelRef.current) {
      throw new Error('Model not loaded');
    }

    const predictions = await modelRef.current.predict(imageElement);
    return predictions.map((p) => ({
      className: p.className,
      probability: p.probability,
    }));
  }, []);

  return {
    model: modelRef.current,
    isLoading,
    isModelLoaded,
    error,
    loadModel,
    predict,
  };
}
