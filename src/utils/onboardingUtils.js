// Onboarding state management utilities

const ONBOARDING_KEY = 'balance_onboarding_completed';
const ONBOARDING_STEP_KEY = 'balance_onboarding_step';

/**
 * Check if user has completed onboarding
 * @returns {boolean} True if onboarding is completed
 */
export const isOnboardingCompleted = () => {
  try {
    return localStorage.getItem(ONBOARDING_KEY) === 'true';
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
};

/**
 * Mark onboarding as completed
 */
export const markOnboardingCompleted = () => {
  try {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    // Clear step tracking as onboarding is complete
    localStorage.removeItem(ONBOARDING_STEP_KEY);
  } catch (error) {
    console.error('Error marking onboarding as completed:', error);
  }
};

/**
 * Get current onboarding step
 * @returns {number} Current step (0-based index)
 */
export const getCurrentOnboardingStep = () => {
  try {
    const step = localStorage.getItem(ONBOARDING_STEP_KEY);
    return step ? parseInt(step, 10) : 0;
  } catch (error) {
    console.error('Error getting current onboarding step:', error);
    return 0;
  }
};

/**
 * Set current onboarding step
 * @param {number} step - Step index (0-based)
 */
export const setCurrentOnboardingStep = (step) => {
  try {
    localStorage.setItem(ONBOARDING_STEP_KEY, step.toString());
  } catch (error) {
    console.error('Error setting onboarding step:', error);
  }
};

/**
 * Reset onboarding status (for testing purposes)
 */
export const resetOnboarding = () => {
  try {
    localStorage.removeItem(ONBOARDING_KEY);
    localStorage.removeItem(ONBOARDING_STEP_KEY);
  } catch (error) {
    console.error('Error resetting onboarding:', error);
  }
};

/**
 * Check if user is a new user (no onboarding completed)
 * @returns {boolean} True if user is new
 */
export const isNewUser = () => {
  return !isOnboardingCompleted();
};
