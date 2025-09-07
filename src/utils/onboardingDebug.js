// Debug utilities for onboarding system
// These functions can be called from browser console for testing

import { 
  isOnboardingCompleted, 
  markOnboardingCompleted, 
  getCurrentOnboardingStep, 
  setCurrentOnboardingStep, 
  resetOnboarding,
  isNewUser 
} from './onboardingUtils';

// Make functions available globally for debugging
if (typeof window !== 'undefined') {
  window.onboardingDebug = {
    // Check current status
    isCompleted: isOnboardingCompleted,
    isNewUser: isNewUser,
    getCurrentStep: getCurrentOnboardingStep,
    
    // Modify status
    markCompleted: markOnboardingCompleted,
    setStep: setCurrentOnboardingStep,
    reset: resetOnboarding,
    
    // Helper functions
    checkStatus: () => {
      console.log('=== Onboarding Status ===');
      console.log('Is completed:', isOnboardingCompleted());
      console.log('Is new user:', isNewUser());
      console.log('Current step:', getCurrentOnboardingStep());
      console.log('========================');
    },
    
    // Test scenarios
    testNewUser: () => {
      resetOnboarding();
      console.log('Reset to new user state');
    },
    
    testCompleted: () => {
      markOnboardingCompleted();
      console.log('Marked onboarding as completed');
    },
    
    testStep: (step) => {
      setCurrentOnboardingStep(step);
      console.log(`Set current step to ${step}`);
    }
  };
  
  console.log('Onboarding debug utilities loaded. Use window.onboardingDebug to access them.');
}
