const AIThinking = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <h4 className="text-gray-900 mb-8">{`Hey, I’m Balancia. Customizing Balance plan for you...`}</h4>
      <div className="w-50 h-50 bg-gray-50 rounded-full overflow-hidden object-cover items-center justify-center flex">
        <video
          src="https://framerusercontent.com/assets/MNzawPFqWliRq8SHkLceiOFSY8.mp4"
          autoPlay
          loop
          muted
          className="rotate-360 w-[200%] h-[200%] object-cover"
        />
      </div>
    </div>
  );
};

export default AIThinking;
