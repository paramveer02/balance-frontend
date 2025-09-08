import { useState, useEffect } from 'react';
import { 
  isOnboardingCompleted, 
  isNewUser, 
  getCurrentOnboardingStep,
  resetOnboarding,
  markOnboardingCompleted 
} from '../../utils/onboardingUtils';

const OnboardingDebug = () => {
  const [status, setStatus] = useState({});

  const updateStatus = () => {
    setStatus({
      isCompleted: isOnboardingCompleted(),
      isNewUser: isNewUser(),
      currentStep: getCurrentOnboardingStep(),
      localStorage: {
        completed: localStorage.getItem('balance_onboarding_completed'),
        step: localStorage.getItem('balance_onboarding_step')
      }
    });
  };

  useEffect(() => {
    updateStatus();
  }, []);

  const handleReset = () => {
    resetOnboarding();
    updateStatus();
  };

  const handleComplete = () => {
    markOnboardingCompleted();
    updateStatus();
  };

  const testRedirect = () => {
    if (isNewUser()) {
      window.location.href = '/dashboard/intro';
    } else {
      alert('User is not new - onboarding already completed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Onboarding Debug</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Status</h2>
          <div className="space-y-2">
            <p><strong>Is Completed:</strong> {status.isCompleted ? 'Yes' : 'No'}</p>
            <p><strong>Is New User:</strong> {status.isNewUser ? 'Yes' : 'No'}</p>
            <p><strong>Current Step:</strong> {status.currentStep}</p>
            <p><strong>localStorage completed:</strong> {status.localStorage?.completed || 'null'}</p>
            <p><strong>localStorage step:</strong> {status.localStorage?.step || 'null'}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="space-x-4">
            <button
              onClick={handleReset}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Reset Onboarding
            </button>
            <button
              onClick={handleComplete}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Mark Completed
            </button>
            <button
              onClick={updateStatus}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Refresh Status
            </button>
            <button
              onClick={testRedirect}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Test Redirect to Intro
            </button>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-1 text-yellow-700">
            <li>Click "Reset Onboarding" to simulate a new user</li>
            <li>Go to login page and login</li>
            <li>You should be redirected to intro screens</li>
            <li>Complete the intro screens</li>
            <li>You should be redirected to dashboard</li>
            <li>Login again - you should go directly to dashboard</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default OnboardingDebug;
