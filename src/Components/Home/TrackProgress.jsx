import React from "react";

const TrackProgress = () => {
  return (
    <section className="bg-offWhite dark:bg-darkGreen py-16 px-4 sm:px-6 lg:px-16">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
        {/* Text Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-darkGreen dark:text-offWhite mb-4">
            Track Your Progress & Build Streaks
          </h2>
          <p className="text-darkGreen/70 dark:text-offWhite/70 text-base sm:text-lg mb-6 leading-relaxed">
            See how far you’ve come — track your habits, visualize your streaks,
            and stay motivated every single day. Turning small wins into big
            achievements has never been easier.
          </p>

          <div className="flex justify-center lg:justify-start">
            <button className="bg-primary text-offWhite font-semibold px-6 py-3 rounded-full shadow hover:bg-darkGreen hover:text-offWhite transition">
              Start Tracking
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80"
            alt="Track Progress"
            className="rounded-2xl shadow-lg w-full max-w-md lg:max-w-lg object-cover border-4 border-paleGreen dark:border-successGreen"
          />
        </div>
      </div>
    </section>
  );
};

export default TrackProgress;
