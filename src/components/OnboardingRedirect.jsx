import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isNewUser } from '../utils/onboardingUtils';

const OnboardingRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is new and redirect to intro screens
    if (isNewUser()) {
      navigate("/dashboard/intro", { replace: true });
    }
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default OnboardingRedirect;
