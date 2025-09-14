import React from "react";

const UserProfile = () => {
  // Dummy data
  const user = {
    name: "John Doe",
    username: "@johndoe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    location: "Coimbatore, India",
    bio: "Full Stack Developer | Tech Enthusiast | Coffee Lover",
    avatar: "https://i.pravatar.cc/150?img=3",
    joined: "January 2023",
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full overflow-hidden">
        {/* Header / Cover */}
        <div className="h-32 bg-gradient-to-r from-cyan-500 to-blue-500"></div>

        {/* Avatar */}
        <div className="relative flex justify-center">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-800 absolute -top-14"
          />
        </div>

        {/* Content */}
        <div className="mt-16 px-6 pb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{user.name}</h2>
          <p className="text-gray-500 dark:text-gray-400">{user.username}</p>
          <p className="mt-3 text-gray-600 dark:text-gray-300">{user.bio}</p>

          {/* Info Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <p className="font-semibold">Email</p>
              <p className="truncate">{user.email}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <p className="font-semibold">Phone</p>
              <p>{user.phone}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <p className="font-semibold">Location</p>
              <p>{user.location}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <p className="font-semibold">Joined</p>
              <p>{user.joined}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-5 cursor-pointer py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg shadow">
              Edit Profile
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
