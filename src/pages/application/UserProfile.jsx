import { Link, useRouteLoaderData } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import customFetch from '../../utils/customFetch';
import ProfileSuccesses from '@/components/ProfileSuccesses';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const dashData = useRouteLoaderData('dashboard');
  const user = dashData?.user;
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Sync profileImage with user data
  useEffect(() => {
    if (user?.profileImage) {
      setProfileImage(user.profileImage);
    }
  }, [user]);

  // Fetch plan data from backend
  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        setLoading(true);
        const { data } = await customFetch.get('/plan', {
          params: { status: 'completed', limit: 50 },
        });
        return setPlanData(data);
      } catch (err) {
        console.error('Error fetching plan data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanData();
  }, []);

  // Handle profile image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('profileImage', file);

      const { data } = await customFetch.patch('/users/profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success) {
        setProfileImage(data.user.profileImage);
        toast.success('Profile image updated successfully!');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      toast.error(err?.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  // Trigger file input click
  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  // Get profile image URL or default
  const getProfileImageUrl = () => {
    if (profileImage) {
      // If it's a full URL, return as is
      if (profileImage.startsWith('http')) return profileImage;
      // Otherwise, construct URL from backend
      const API_ORIGIN = import.meta.env.VITE_API_URL || 'http://localhost:3100';
      return `${API_ORIGIN}${profileImage}`;
    }
    // Default avatar image
    return '/profilepicture.png';
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center overflow-x-hidden">
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
            <div className="relative rounded-full w-fit border-2 border-white">
              <div
                className="w-24 h-24 rounded-full bg-cover bg-center relative overflow-hidden"
                role="img"
                aria-label="User profile picture"
              >
                <img
                  src={getProfileImageUrl()}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/profilepicture.png';
                  }}
                />
                {uploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
              <button
                onClick={handleEditClick}
                disabled={uploading}
                className="absolute bottom-0 right-0 w-6 h-6 bg-[url(/editbuttonprofilepage.png)] bg-cover bg-center rounded-full hover:scale-110 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
            className="text-center text-black"
          >
            My balance journey
          </h2>
        {/*  <p className="text-center text-sm text-gray-500 mt-4">
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
          </p> */}

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
              <div className="carousel carousel-center bg-white rounded-box max-w-md relative space-x-4 p-4 pl-4 overflow-x-auto">
                {planData.plans.map((plan, index) => (
                  <ProfileSuccesses key={plan._id || index} planData={plan} />
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
