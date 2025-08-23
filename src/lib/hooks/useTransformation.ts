import { useState, useCallback } from 'react';
import { apiService, UserData, TransformationResult } from '../api';

export interface TransformationState {
  isProcessing: boolean;
  isComplete: boolean;
  error: string | null;
  result: TransformationResult | null;
  progress: number;
}

export const useTransformation = () => {
  const [state, setState] = useState<TransformationState>({
    isProcessing: false,
    isComplete: false,
    error: null,
    result: null,
    progress: 0,
  });

  const processTransformation = useCallback(async (userData: UserData) => {
    setState(prev => ({
      ...prev,
      isProcessing: true,
      error: null,
      progress: 0,
    }));

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setState(prev => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90),
        }));
      }, 500);

      const response = await apiService.processTransformation(userData);

      clearInterval(progressInterval);

      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          isProcessing: false,
          isComplete: true,
          result: response.data || null,
          progress: 100,
        }));
      } else {
        setState(prev => ({
          ...prev,
          isProcessing: false,
          error: response.error || 'Transformation failed',
          progress: 0,
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isProcessing: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        progress: 0,
      }));
    }
  }, []);

  const resetTransformation = useCallback(() => {
    setState({
      isProcessing: false,
      isComplete: false,
      error: null,
      result: null,
      progress: 0,
    });
  }, []);

  return {
    ...state,
    processTransformation,
    resetTransformation,
  };
};
