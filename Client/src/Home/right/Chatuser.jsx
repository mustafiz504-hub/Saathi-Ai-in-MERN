import React from "react";

const Chatuser = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md border-b hover:bg-gray-100 cursor-pointer">
      
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <div className="avatar avatar-online">
          <div className="w-10 rounded-full">
            <img
              src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"
              alt="User"
            />
          </div>
        </div>

        <div>
          <h1 className="text-sm font-semibold text-gray-800">
            Mustafiz Ansari
          </h1>
          <p className="text-xs text-green-500">Online</p>
        </div>
      </div>

    </div>
  );
};

export default Chatuser;
