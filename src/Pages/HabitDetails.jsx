import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import Loading from "../Components/Loading";

// Badge system
const badges = [
  { streak: 1, label: "🥇 Start Badge" },
  { streak: 10, label: "🥇 On 10 Badge" },
  { streak: 20, label: "🏅 On 20 Badge" },
  { streak: 30, label: "⏰ Time Master Badge" },
];

const HabitDetails = () => {
  const { id } = useParams();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch habit details
  const fetchHabit = async () => {
    try {
      const res = await fetch(`https://habit-tracker-server-g4ntwvrz4-esas-projects-36859535.vercel.app/habit/${id}`);
      const data = await res.json();
      setHabit(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabit();
  }, [id]);

  // Format date as DD-MM-YYYY
  const getFormattedDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Calculate streak
  const calculateStreak = () => {
    if (!habit || !habit.completionHistory.length) return 0;
    const dates = habit.completionHistory
      .map(d => new Date(d.split("-").reverse().join("-")))
      .sort((a, b) => b - a);

    let streak = 0;
    let currentDate = new Date();
    for (let date of dates) {
      const diff = (currentDate - date) / (1000 * 60 * 60 * 24);
      if (diff <= 1) {
        streak++;
        currentDate = new Date(date);
        currentDate.setDate(currentDate.getDate() - 1);
      } else break;
    }
    return streak;
  };

  // Get latest badge
  const getBadge = (streak) => {
    let badge = badges[0].label;
    for (let b of badges) {
      if (streak >= b.streak) badge = b.label;
    }
    return badge;
  };

  // Calculate progress (% of last 30 days)
  const calculateProgress = () => {
    if (!habit) return 0;
    const today = new Date();
    const last30 = Array.from({ length: 30 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      return d.toISOString().split("T")[0];
    });

    const completedDates = habit.completionHistory.map(d => {
      const [dd, mm, yyyy] = d.split("-");
      return new Date(`${yyyy}-${mm}-${dd}`).toISOString().split("T")[0];
    });

    const completedCount = last30.filter(d => completedDates.includes(d)).length;
    return Math.round((completedCount / 30) * 100);
  };

  // Mark habit complete
  const handleMarkComplete = async () => {
    const today = getFormattedDate();

    if (habit.completionHistory.includes(today)) {
      Swal.fire({
        icon: "info",
        title: "Already Completed!",
        text: "You’ve already marked this habit complete today.",
      });
      return;
    }

    setUpdating(true);
    try {
      const res = await fetch(`https://habit-tracker-server-g4ntwvrz4-esas-projects-36859535.vercel.app/habits/complete/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: today }),
      });
      const data = await res.json();
      if (data.success) {
        setHabit(prev => ({
          ...prev,
          completionHistory: [...prev.completionHistory, today],
        }));
        Swal.fire("Success!", "Marked as complete for today.", "success");
      } else {
        Swal.fire("Info", data.message, "info");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to mark complete.", "error");
    }
    setUpdating(false);
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={habit.image}
          alt={habit.habitTitle}
          className="w-full md:w-1/3 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{habit.habitTitle}</h1>
          <p className="text-gray-700 mb-4">{habit.description}</p>
          <p className="mb-2">
            <span className="font-semibold">Category:</span> {habit.category}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Creator:</span>  {habit.userName} 
          </p>
          <p className="mb-2">
            <span  className="font-semibold">Email:</span>  {habit.userEmail}
          </p>

          <div className="my-4">
            <p className="font-semibold mb-1">Progress ({calculateProgress()}%)</p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
          </div>

          <p className="mb-2">
            <span className="font-semibold"> Current Streak:</span> {calculateStreak()}  day(s) 
          </p>
          <p className="mb-4">
            <span className="font-semibold ">Badge:</span> <span className="bg-[#89e223] p-2 rounded-lg">{getBadge(calculateStreak())}</span>
          </p>

          <button
            onClick={handleMarkComplete}
            disabled={updating}
            className="bg-[#14a8a3] text-white px-6 py-2 rounded-lg hover:bg-[#59d4d0] transition disabled:opacity-50"
          >
            {updating ? "Updating..." : "Mark Complete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitDetails;
