import { FaBrain, FaClock, FaSmile, FaChartLine } from "react-icons/fa";

const WhyBuildHabits = () => {
  const benefits = [
    {
      icon: <FaBrain className="text-white text-3xl" />,
      title: "Better Focus",
      description: "Develop habits that enhance your concentration and productivity daily.",
      color: "from-[#f47000] to-[#ffa500]"
    },
    {
      icon: <FaSmile className="text-white text-3xl" />,
      title: "Reduced Stress",
      description: "Consistent habits help reduce anxiety and create a balanced lifestyle.",
      color: "from-[#10b981] to-[#34d399]"
    },
    {
      icon: <FaClock className="text-white text-3xl" />,
      title: "Time Management",
      description: "Build routines that help you manage your time efficiently every day.",
      color: "from-[#f47000] to-[#ffb347]"
    },
    {
      icon: <FaChartLine className="text-white text-3xl" />,
      title: "Personal Growth",
      description: "Track your progress and improve yourself steadily with each habit.",
      color: "from-[#10b981] to-[#6ee7b7]"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">
          Why Build Habits?
        </h2>
        <p className="mb-16 text-gray-700 max-w-2xl mx-auto">
          Consistent habits can transform your life by improving productivity, mental health, and overall well-being. Here are some key benefits:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
            >
              <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br ${benefit.color} flex items-center justify-center`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-700">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBuildHabits;
