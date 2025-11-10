import { FaBrain, FaClock, FaSmile, FaChartLine } from "react-icons/fa";

const WhyBuildHabits = () => {
  const benefits = [
    {
      icon: <FaBrain className="text-primary text-4xl mb-3" />,
      title: "Better Focus",
      description: "Develop habits that enhance your concentration and productivity daily."
    },
    {
      icon: <FaSmile className="text-successGreen text-4xl mb-3" />,
      title: "Reduced Stress",
      description: "Consistent habits help reduce anxiety and create a balanced lifestyle."
    },
    {
      icon: <FaClock className="text-primary text-4xl mb-3" />,
      title: "Time Management",
      description: "Build routines that help you manage your time efficiently every day."
    },
    {
      icon: <FaChartLine className="text-successGreen text-4xl mb-3" />,
      title: "Personal Growth",
      description: "Track your progress and improve yourself steadily with each habit."
    }
  ];

  return (
    <section className="py-16 bg-offWhite dark:bg-darkGreen">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-darkGreen dark:text-offWhite">
          Why Build Habits?
        </h2>
        <p className="mb-12 text-darkGreen/70 dark:text-offWhite/70 max-w-2xl mx-auto">
          Consistent habits can transform your life by improving productivity, mental health, and overall well-being. Here are some key benefits:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-lightGray dark:bg-paleGreen rounded-lg p-6 shadow hover:shadow-lg transition"
            >
              <div className="flex justify-center">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-darkGreen dark:text-offWhite">{benefit.title}</h3>
              <p className="text-darkGreen/70 dark:text-offWhite/70">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBuildHabits;
