import { useState, useCallback } from 'react';
import { apiService, UserData, TransformationResult } from '../api';

export interface TransformationState {
  isProcessing: boolean;
  isComplete: boolean;
  error: string | null;
  result: any | null; // Changed to any to accommodate the API response structure
  progress: number;
  tokenStatus: {
    hasToken: boolean;
    isValid: boolean;
    expiresAt: Date | null;
    requestsUsed: number;
    requestsLeft: number;
    maxRequests: number;
  };
}

export const useTransformation = () => {
  const [state, setState] = useState<TransformationState>({
    isProcessing: false,
    isComplete: false,
    error: null,
    result: null,
    progress: 0,
    tokenStatus: {
      hasToken: false,
      isValid: false,
      expiresAt: null,
      requestsUsed: 0,
      requestsLeft: 5,
      maxRequests: 5,
    },
  });

  const acquireToken = useCallback(async () => {
    try {
      const tokenResult = await apiService.getAccessToken();
      if (tokenResult.success && tokenResult.data) {
        const tokenInfo = apiService.getTokenStatusInfo();
        setState(prev => ({
          ...prev,
          tokenStatus: {
            hasToken: tokenInfo.hasToken,
            isValid: tokenInfo.isValid,
            expiresAt: tokenInfo.expiresAt,
            requestsUsed: tokenInfo.requestsUsed,
            requestsLeft: tokenInfo.requestsLeft,
            maxRequests: tokenInfo.maxRequests,
          },
        }));
        return true;
      } else {
        setState(prev => ({
          ...prev,
          error: 'Failed to acquire authentication token',
        }));
        return false;
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to acquire token',
      }));
      return false;
    }
  }, []);

  const processTransformation = useCallback(async (userData: UserData) => {
    setState(prev => ({
      ...prev,
      isProcessing: true,
      error: null,
      progress: 0,
    }));

    try {
      // Check token status and acquire if needed
      const tokenStatus = apiService.getTokenStatusInfo();
      if (!tokenStatus.isValid) {
        setState(prev => ({ ...prev, progress: 10 }));
        const tokenAcquired = await acquireToken();
        if (!tokenAcquired) {
          setState(prev => ({
            ...prev,
            isProcessing: false,
            error: 'Authentication failed. Please try again.',
            progress: 0,
          }));
          return;
        }
      }

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setState(prev => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90),
        }));
      }, 500);

      // Use the legacy method that handles job polling internally
      const response = await apiService.processTransformation(userData);

      clearInterval(progressInterval);

      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          isProcessing: false,
          isComplete: true,
          result: response,
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

      // Update token status after request
      const tokenInfo = apiService.getTokenStatusInfo();
      setState(prev => ({
        ...prev,
        tokenStatus: {
          hasToken: tokenInfo.hasToken,
          isValid: tokenInfo.isValid,
          expiresAt: tokenInfo.expiresAt,
          requestsUsed: tokenInfo.requestsUsed,
          requestsLeft: tokenInfo.requestsLeft,
          maxRequests: tokenInfo.maxRequests,
        },
      }));

    } catch (error) {
      setState(prev => ({
        ...prev,
        isProcessing: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        progress: 0,
      }));
    }
  }, [acquireToken]);

  const resetTransformation = useCallback(() => {
    setState({
      isProcessing: false,
      isComplete: false,
      error: null,
      result: null,
      progress: 0,
      tokenStatus: {
        hasToken: false,
        isValid: false,
        expiresAt: null,
        requestsUsed: 0,
        requestsLeft: 5,
        maxRequests: 5,
      },
    });
  }, []);

  return {
    ...state,
    processTransformation,
    resetTransformation,
    acquireToken,
  };
};
