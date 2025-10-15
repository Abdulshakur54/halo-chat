import assets from "../assets/asset";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-15 h-15 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin">
           <img src={assets.logoIcon} className="w-7 h-7 m-auto"/>
        </div>
        {/* Text */}
        <p className="text-gray-600 text-lg font-medium">
          Loading...
          </p>
      </div>
    </div>
  );
};

export default Loading;
