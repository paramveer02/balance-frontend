import Button from "./ui/Button";
const CallToAction = () => {
  return (
    <section className="px-6 py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
          Ready to Level Up?
        </h2>
        <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed">
          Join thousands of players transforming their lives one ritual at a
          time. Your next level awaits.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button
            size="lg"
            className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
          >
            🚀 Start Your Journey
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-purple-700 px-8 py-4 text-lg font-semibold bg-transparent"
          >
            📱 Download App
          </Button>
        </div>

        <p className="text-purple-200 text-sm">
          Free to start • Premium features available • No ads, ever
        </p>
      </div>
    </section>
  );
};

export default CallToAction;
