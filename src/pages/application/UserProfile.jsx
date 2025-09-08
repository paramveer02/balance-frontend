import { data, Link, useRouteLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import customFetch from '../../utils/customFetch';
import ProfileSuccesses from '@/components/ProfileSuccesses';

const UserProfile = () => {
  const dashData = useRouteLoaderData('dashboard');
  const user = dashData?.user;
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch plan data from backend
  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        setLoading(true);
        const { data } = await customFetch.get('/plan', {
          params: { status: 'completed', limit: 50 },
        });
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        console.log(data.plans);
        // return data;
        return setPlanData(data);
      } catch (err) {
        console.error('Error fetching plan data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanData();
  }, []); // Empty dependency array means this runs once on mount
  // console.log('Dashboard data:', dashData);

  // console.log('Loading state:', loading);
  // console.log('Error state:', error);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* BUTTON */}

      <section className="bg-gradient-to-t from-[#e2ebfd] via-[#e9efff] to-[#f0f5ff] pt-4 pb-8 w-full rounded-b-4xl">
        <div className="max-w-4xl mx-auto px-6">
          <div className="w-full flex justify-start">
            <Link
              to="/dashboard"
              className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
              aria-label="Back to Dashboard"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </Link>
          </div>
          {/* Header */}
          <div className="w-full relative flex items-center justify-center pb-4">
            <h1 className="text-lg font-semibold text-black">My Profile</h1>
          </div>

          {/* Profile Picture */}
          <div className="flex flex-col items-center mt-2 mb-4">
            <div className="relative rounded-full w-fit border-[6px] border-white shadow-lg">
              <div
                className="w-24 h-24 rounded-full bg-[url(/profilepicture.png)] bg-cover bg-center"
                role="img"
                aria-label="User profile picture"
              ></div>
              <button
                className="absolute bottom-0 right-0 w-6 h-6 bg-[url(/editbuttonprofilepage.png)] bg-cover bg-center rounded-full hover:scale-110 transition-transform duration-200"
                aria-label="Edit profile picture"
              ></button>
            </div>
            <h2 className="mt-4 font-semibold text-gray-800 text-lg">
              {user?.name || 'User'}
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              {user?.email || 'user@example.com'}
            </p>
          </div>
        </div>
      </section>

      {/* Balance Journey */}
      <section className="mt-14 w-full mb-14" aria-labelledby="balance-journey">
        <div className="max-w-4xl mx-auto px-6">
          <h2
            id="balance-journey"
            className="text-xl font-semibold text-center text-black"
          >
            My balance journey
          </h2>
          <p className="text-center text-sm text-gray-500 mt-4">
            {new Date().toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
            –
            {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(
              'en-GB',
              {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              }
            )}
          </p>

          <div className="mt-8 relative flex flex-col items-center">
            {loading ? (
              <div className="bg-gray-100 min-h-[300px] sm:min-h-[400px] lg:min-h-[40vh] w-full max-w-md rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
                <p className="mt-4 text-gray-600">Loading plan data...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 min-h-[300px] sm:min-h-[400px] lg:min-h-[40vh] w-full max-w-md rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center">
                <p className="text-red-600 text-center">
                  Error loading data: {error}
                </p>
              </div>
            ) : (
              <div className="carousel carousel-center bg-white rounded-box max-w-sm relative left-9 space-x-4 p-4">
                {planData.plans.map((plan) => (
                  <ProfileSuccesses planData={plan} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
