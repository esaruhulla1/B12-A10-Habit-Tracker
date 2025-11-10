import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "Build Better Habits Every Day",
      desc: "Stay consistent, stay confident — make every day count.",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: 2,
      title: "Focus. Track. Transform.",
      desc: "Visualize your growth and build powerful daily routines.",
      img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: 3,
      title: "Turn Small Steps Into Big Wins",
      desc: "Consistency creates change — start your habit journey today.",
      img: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=1600&q=80",
    },
  ];

  return (
    <div className="w-full relative">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500 }}
        loop={true}
        className="h-[50vh] md:h-[60vh] lg:h-[65vh]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative flex flex-col justify-center items-center h-full text-center text-white px-4 sm:px-6 md:px-10 lg:px-16 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/30"></div>

              {/* Text Section */}
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold drop-shadow-lg mb-3 leading-tight">
                  {slide.title}
                </h2>
                <p className="text-base sm:text-lg md:text-xl font-medium opacity-90 drop-shadow-md">
                  {slide.desc}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;


// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const Banner = () => {
//   const slides = [
//     {
//       id: 1,
//       title: "Build Better Habits Every Day",
//       desc: "Stay consistent, stay confident — make every day count.",
//       img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
//     },
//     {
//       id: 2,
//       title: "Focus. Track. Transform.",
//       desc: "Visualize your growth and build powerful daily routines.",
//       img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1600&q=80",
//     },
//     {
//       id: 3,
//       title: "Turn Small Steps Into Big Wins",
//       desc: "Consistency creates change — start your habit journey today.",
//       img: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=1600&q=80",
//     },
//   ];

//   return (
//     <div className="w-full h-[60vh] relative">
//       <Swiper
//         modules={[Navigation, Autoplay, Pagination]}
//         navigation={true}
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 3500 }}
//         loop={true}
//         className="h-full"
//       >
//         {slides.map((slide) => (
//           <SwiperSlide key={slide.id}>
//             <div
//               className="h-full bg-cover bg-center flex flex-col justify-center items-center text-center text-white px-4 md:px-8"
//               style={{ backgroundImage: `url(${slide.img})` }}
//             >
//               {/* Gradient Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/20"></div>

//               {/* Text Section */}
//               <div className="relative z-10 max-w-2xl">
//                 <h2 className="text-4xl md:text-5xl font-bold drop-shadow-lg mb-3 leading-tight">
//                   {slide.title}
//                 </h2>
//                 <p className=" text-lg md:text-xl font-medium opacity-90 drop-shadow-md">
//                   {slide.desc}
//                 </p>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}

//       </Swiper>
//     </div>
//   );
// };

// export default Banner;
