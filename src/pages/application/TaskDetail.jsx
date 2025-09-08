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
    <div className="flex min-h-screen bg-[url(../public/e6776ace47454664d5f711b83a7b111fd132edde.jpg)] bg-cover bg-top dark:bg-gray-900">
      <div className="inset-0 bg-black/50 flex flex-col items-center justify-between p-10 min-h-screen  min-w-screen">
        {/* Top Section */}
        <div className="w-full max-w-sm flex items-start mt-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-4 items-left w-full max-w-sm text-left">
          <div className="text-white text-sm bg-[#4263eb] size-fit px-2 py-1 rounded-sm">
            {healthAct.healthActId?.categoryId?.name ||
              healthAct.category ||
              'HEALTH ACT'}
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-white">
              {healthAct.healthActId?.name || healthAct.name}
            </h1>
            <div className="flex flex-row items-center">
              <span className="text-4xl mr-2">
                {healthAct.healthActId?.emoji || healthAct.emoji}
              </span>
              <span className="text-white">
                {healthAct.targetFrequency} times this week
              </span>
            </div>
          </div>
        </div>

        {/* Action card */}
        <section>
          <div className="flex gap-3">
            <div className="flex flex-col h-[100%] gap-8 justify-between w-[66%] p-4 mt-4 bg-gray-100 rounded-2xl">
              <h2 className="text-gray-700 text-lg mb-4">Balance out</h2>
              <div className="flex justify-between items-center bg-white p-3 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <span className="text-xs">🎯</span>
                  <span className="font-semibold text-gray-800 text-xs">
                    Weekly Goal
                  </span>
                </div>
                <span className="text-gray-600">
                  x{healthAct.targetFrequency}
                </span>
              </div>
            </div>
            <div className="w-[33%] p-4 mt-4 bg-gray-100 rounded-2xl">
              <h2 className="text-gray-700 text-lg mb-4">Progress</h2>
              <div className="text-right rounded-lg">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-gray-800 text-2xl font-bold">
                  {completedCount}/{healthAct.targetFrequency}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
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
          <div>
            <div className="w-full p-4 mt-3 bg-gray-100 rounded-2xl">
              <div className="flex flex-row gap-2 w-full">
                <span className="text-lg">💡</span>
                <h2 className="text-gray-700 text-lg mb-4">
                  What experts say:
                </h2>
              </div>
              <p className="text-gray-600">
                {healthAct.healthActId?.description ||
                  `Regular practice of ${(
                    healthAct.healthActId?.name || healthAct.name
                  ).toLowerCase()} can significantly improve your overall health and help balance out unhealthy habits.`}
              </p>
            </div>
          </div>
        </section>

        {/* Complete button */}
        <button
          onClick={handleComplete}
          disabled={checkingIn || isCompleted}
          className={`w-full mb-2 max-w-sm h-14 rounded-full flex items-center justify-center space-x-2 text-white font-semibold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isCompleted
              ? 'cursor-not-allowed'
              : checkingIn
              ? 'cursor-not-allowed'
              : 'focus:ring-green-500'
          }`}
          style={{
            backgroundColor: isCompleted
              ? '#9CA3AF'
              : checkingIn
              ? '#F59E0B'
              : 'var(--primary-color)',
            '--tw-bg-opacity': '1',
          }}
          onMouseEnter={(e) => {
            if (!isCompleted && !checkingIn) {
              e.target.style.backgroundColor = '#007A5E';
            }
          }}
          onMouseLeave={(e) => {
            if (!isCompleted && !checkingIn) {
              e.target.style.backgroundColor = 'var(--primary-color)';
            }
          }}
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
  );
};

export default TaskDetail;
