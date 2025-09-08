import { Link, useRouteLoaderData } from 'react-router-dom';

const UserProfile = () => {
  const dashData = useRouteLoaderData('dashboard');

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* BUTTON */}

      <section className="bg-linear-to-t from-[#e2ebfd] via-[#e9efff] to-[#f0f5ff] px-4 pt-4 pb-8 max-w-screen rounded-b-4xl">
        <div className="w-screen flex justify-start ml-2">
          <Link to="/dashboard">
            {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.0}
                stroke="currentColor"
                className="w-8 h-8 cursor-pointer text-black dark:text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            }
          </Link>
        </div>
        {/* Header */}
        <div className="w-full relative flex items-center justify-center px-4 pb-4">
          <h1 className="text-lg font-semibold text-black">Profile</h1>
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mt-2 b-4">
          <div className="relative rounded-full w-fit border-6 border-white">
            <div className="w-25 h-25 rounded-full bg-[url(../public/profilepicture.png)] bg-cover"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-[url(../public/editbuttonprofilepage.png)] bg-cover rounded-full"></div>
          </div>
          <p className="mt-4 font-semibold text-gray-800 text-md">name</p>
          <p className="text-sm text-gray-500 mt-2">email</p>
        </div>
      </section>

      {/* Balance Journey */}
      <div className="mt-14 w-full px-6">
        <h2 className="text-lg font-semibold text-center text-black">
          My balance journey
        </h2>
        <p className="text-center text-sm text-gray-500 mt-4">
          18 Aug – 24 Aug 2025
        </p>
        <div className="mt-8 relative flex flex-col items-center">
          <div className="bg-[url(../public/db22e50472f2979714b92c490ed1bcc90144f9ae.png)] min-h-[40vh] max-w-[80%] bg-cover bg-center text-white rounded-2xl p-6 shadow-md flex flex-col items-center">
            <h3 className="text-5xl font-bold">6</h3>
            <p className="mt-1 text-sm">Balance moves</p>

            {/* Tags */}
            <div className="flex gap-2 mt-3">
              <span className="px-3 py-1 text-xs rounded-full bg-white/20">
                Nutrition
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-white/20">
                Workout
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-white/20">
                Hydration
              </span>
            </div>

            {/* Efforts */}
            <p className="mt-6 text-sm">Need more efforts</p>
            <div className="flex justify-between w-full text-xs mt-2">
              <span>42% Balance moves</span>
              <span>58% Imbalances</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-1 mt-1">
              <div
                className="bg-white h-1 rounded-full"
                style={{ width: '42%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
