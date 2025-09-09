// TaskDetail

import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../../utils/customFetch';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const loaderUrl = '/lottie/loader.lottie';

const TaskDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [healthAct, setHealthAct] = useState(null);
  const [checkingIn, setCheckingIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const planId = searchParams.get('planId');
  const healthActId = searchParams.get('healthActId');

  useEffect(() => {
    if (planId && healthActId) {
      fetchHealthActProgress();
    } else {
      setLoading(false);
    }
  }, [planId, healthActId]);

  const fetchHealthActProgress = async () => {
    try {
      const { data } = await customFetch.get(
        `/plan/${planId}/health-act/${healthActId}/progress`
      );
      if (data.success) {
        setHealthAct(data.healthAct);
      } else {
        console.error('API returned success: false', data);
      }
    } catch (error) {
      console.error('Error fetching health act progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    if (!planId || !healthActId) return;

    setCheckingIn(true);
    setLoading(true);
    try {
      const { data } = await customFetch.post(
        `/plan/${planId}/health-act/${healthActId}/checkin`,
        {
          date: new Date().toISOString(),
        }
      );

      if (data.success) {
        // Update local state
        setHealthAct((prev) => ({
          ...prev,
          checkIns: [...prev.checkIns, { date: new Date(), completed: true }],
          isCompleted: data.healthAct.isCompleted,
        }));

        // Show success message and navigate back to dashboard
        toast.success('Great job! Check-in recorded successfully!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (error) {
      console.error('Error recording check-in:', error);
      toast.error('Failed to record check-in. Please try again.');
    } finally {
      setCheckingIn(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 backdrop-blur-sm">
        <div className="flex flex-col items-center">
          <DotLottieReact
            src={loaderUrl}
            autoplay
            loop
            style={{ width: 160, height: 160 }}
          />
          <p className="mt-3 text-slate-100">Checkin successful...</p>
        </div>
      </div>
    );
  }

  if (!planId || !healthActId) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Invalid Task Link
          </h1>
          <p className="text-gray-600 mb-4">
            Missing plan or task information.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-white px-6 py-3 rounded-full transition-colors"
            style={{
              backgroundColor: 'var(--primary-color)',
              '--tw-bg-opacity': '1',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#007A5E';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--primary-color)';
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!healthAct) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Health Act Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The requested health act could not be found.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-white px-6 py-3 rounded-full transition-colors"
            style={{
              backgroundColor: 'var(--primary-color)',
              '--tw-bg-opacity': '1',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#007A5E';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--primary-color)';
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const completedCount = healthAct.checkIns.length;
  const progressPercentage = Math.round(
    (completedCount / healthAct.targetFrequency) * 100
  );
  const isCompleted = healthAct.isCompleted;

  return (
    <div className="min-h-screen bg-[url(../public/e6776ace47454664d5f711b83a7b111fd132edde.jpg)] bg-cover bg-center">
      <div className="min-h-screen bg-black/50 flex flex-col">
        {/* Header */}
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-white hover:text-gray-300 transition-colors p-2 -ml-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 sm:w-8 sm:h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Left Column - Task Info */}
              <div className="space-y-6">
                {/* Task Header */}
                <div className="space-y-4">
                  <div className="inline-block">
                    <span className="text-white text-sm bg-[#4263eb] px-3 py-1.5 rounded-full font-medium">
                      {healthAct.healthActId?.categoryId?.name ||
                        healthAct.category ||
                        'HEALTH ACT'}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                      {healthAct.healthActId?.name || healthAct.name}
                    </h1>
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl sm:text-4xl">
                        {healthAct.healthActId?.emoji || healthAct.emoji}
                      </span>
                      <span className="text-white text-lg sm:text-xl">
                        {healthAct.targetFrequency} times this week
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expert Advice Card */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">💡</span>
                    <h2 className="text-gray-800 text-lg font-semibold">
                      What experts say:
                    </h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {healthAct.healthActId?.description ||
                      `Regular practice of ${(
                        healthAct.healthActId?.name || healthAct.name
                      ).toLowerCase()} can significantly improve your overall health and help balance out unhealthy habits.`}
                  </p>
                </div>
              </div>

              {/* Right Column - Progress & Actions */}
              <div className="space-y-6">
                {/* Progress Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Balance Out Card */}
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                    <h2 className="text-gray-800 text-lg font-semibold mb-4">Balance out</h2>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">🎯</span>
                          <span className="font-medium text-gray-800 text-sm">
                            Weekly Goal
                          </span>
                        </div>
                        <span className="text-gray-600 font-semibold">
                          x{healthAct.targetFrequency}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Card */}
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                    <h2 className="text-gray-800 text-lg font-semibold mb-4">Progress</h2>
                    <div className="space-y-3">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">Completed</p>
                        <p className="text-gray-800 text-2xl font-bold">
                          {completedCount}/{healthAct.targetFrequency}
                        </p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-500 ease-out"
                          style={{
                            width: `${Math.min(progressPercentage, 100)}%`,
                            backgroundColor: isCompleted
                              ? '#10B981'
                              : 'var(--primary-color)',
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Complete Button */}
                <div className="w-full">
                  <button
                    onClick={handleComplete}
                    disabled={checkingIn || isCompleted}
                    className={`w-full h-14 rounded-2xl flex items-center justify-center space-x-3 text-white font-semibold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      isCompleted
                        ? 'cursor-not-allowed bg-gray-400'
                        : checkingIn
                        ? 'cursor-not-allowed bg-amber-500'
                        : 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-500'
                    }`}
                  >
                    {checkingIn ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Recording...</span>
                      </>
                    ) : isCompleted ? (
                      <span>✓ Completed!</span>
                    ) : (
                      <span>Checkin this balance move</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
