import React from "react";
import { FaStar } from "react-icons/fa";

const FeaturedTestimonials = () => {
  return (
    //bg-[#f9f9f9]
    <section className="w-full  py-20 bg-white text-[#364436] relative overflow-hidden">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 gap-10">
        {/* LEFT SIDE */}
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-[#364436]">
            Trusted by thousands <br /> of habit builders worldwide.
          </h2>
          <p className="text-[#364436]/80 text-base sm:text-lg max-w-md">
            Hear what our users say about their daily growth journey. 
            Building small habits every day has transformed their focus, 
            confidence, and productivity.
          </p>

          {/* Stars */}
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-[#f47000] text-xl" />
            ))}
            <span className="text-[#364436]/70 font-medium">4.8 / 5 on Community</span>
          </div>

          {/* Button */}
          <button className="mt-4 bg-[#f47000] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#364436] transition-all duration-300">
            Join Habit Tracker Now
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:w-1/2 relative flex justify-center">
          {/* --- Card Stack Layer 3 (Bottom-most) --- */}
          <div className="absolute top-14 right-0 w-[90%] bg-[#e5e7e7] rounded-2xl h-[95%] rotate-2 translate-y-6 scale-90"></div>

          {/* --- Card Stack Layer 2 --- */}
          <div className="absolute top-8 right-0 w-[95%] bg-[#b2c6a5]/40 rounded-2xl h-[95%] -rotate-1 translate-y-3 scale-95"></div>

          {/* --- Main Card --- */}
          <div className="bg-white text-[#364436] rounded-2xl shadow-2xl p-8 max-w-md w-full relative z-10">
            <span className="text-5xl text-[#f47000] font-serif leading-none">“</span>
            <p className="text-lg italic mt-2 mb-6">
              Habit Tracker changed how I approach my goals. 
              Tracking small wins daily keeps me motivated 
              and consistent — it truly builds momentum!
            </p>

            <div className="flex items-center gap-4">
              <img
                // src="https://i.pravatar.cc/100?img=15"
                src="https://i.pravatar.cc/100?img=32"
                alt="User Avatar"
                className="w-12 h-12 rounded-full border-2 border-[#f47000]"
              />
              <div>
                <h4 className="font-semibold text-[#364436]">Mahmud Hasan</h4>
                <p className="text-sm text-[#364436]/70">
                  Software Engineer & Fitness Enthusiast
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTestimonials;
