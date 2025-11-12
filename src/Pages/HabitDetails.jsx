import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";

const HabitDetails = () => {
    const { id } = useParams();
    const [habit, setHabit] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔹 Fetch habit details
    useEffect(() => {
        fetch(`http://localhost:3000/habit/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setHabit(data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, [id]);

    // 🔹 Calculate progress (last 30 days)
    const calculateProgress = () => {
        if (!habit?.completionHistory) return 0;
        const today = new Date();
        const last30Days = new Date();
        last30Days.setDate(today.getDate() - 30);

        const completedIn30 = habit.completionHistory.filter(
            (d) => new Date(d) >= last30Days
        ).length;

        return Math.min((completedIn30 / 30) * 100, 100);
    };

    // 🔹 Calculate streak
    const calculateStreak = () => {
        if (!habit?.completionHistory || habit.completionHistory.length === 0) return 0;

        const sortedDates = [...habit.completionHistory]
            .map((d) => new Date(d))
            .sort((a, b) => b - a);

        let streak = 1;
        for (let i = 1; i < sortedDates.length; i++) {
            const diffDays = Math.floor(
                (sortedDates[i - 1] - sortedDates[i]) / (1000 * 60 * 60 * 24)
            );
            if (diffDays === 1) streak++;
            else break;
        }
        return streak;
    };

    // 🔹 Handle "Mark Complete"
    const handleMarkComplete = async () => {
        const today = new Date().toISOString().split("T")[0];

        //  Prevent duplicate on UI side
        if (habit.completionHistory.includes(today)) {
            Swal.fire({
                icon: "info",
                title: "Already Completed!",
                text: "You’ve already marked this habit complete today.",
            });
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/habits/complete/${habit._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ date: today }),
            });

            if (res.ok) {
                // ✅ Fetch updated data from DB to ensure sync
                const updatedRes = await fetch(`http://localhost:3000/habit/${habit._id}`);
                const updatedHabit = await updatedRes.json();

                setHabit(updatedHabit); // ✅ UI now matches DB

                Swal.fire({
                    icon: "success",
                    title: "Marked Complete!",
                    text: "Great job! Keep it up!",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Could not update completion history.",
                });
            }
        } catch (error) {
            console.error(error);
        }
    };



    if (loading) return <p className="text-center text-gray-500 mt-10">Loading...</p>;
    if (!habit) return <p className="text-center text-red-500 mt-10">Habit not found!</p>;

    const progress = calculateProgress();
    const streak = calculateStreak();

    return (
        <div className="min-h-screen   py-10 px-5">
            <div className="max-w-3xl border border-gray-200 mx-auto bg-white rounded-2xl shadow-md p-6 md:p-10">
                {/* Image */}
                <img
                    src={habit.image}
                    alt={habit.habitTitle}
                    className="w-full h-64 object-cover rounded-xl mb-6"
                />

                {/* Title + Category */}
                <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                    <h1 className="text-3xl font-bold text-[#096B68]">{habit.habitTitle}</h1>
                    <span className="px-3 py-1 bg-[#90D1CA] text-[#096B68] rounded-full font-semibold">
                        {habit.category}
                    </span>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-6">{habit.description}</p>

                {/* Progress bar */}
                <div className="mb-6">
                    <p className="font-semibold text-gray-700 mb-2">
                        Progress (Last 30 Days): {progress.toFixed(0)}%
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                            className="bg-[#f47000] h-4 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Streak badge */}
                <div className="mb-6 flex items-center gap-2">
                    <span className="text-xl">🔥</span>
                    <span className="font-bold text-[#f47000] text-lg">
                        {streak} Day{streak > 1 ? "s" : ""} Streak
                    </span>
                </div>

                {/* Creator Info */}
                <div className="mb-6 text-sm text-gray-600">
                    <p>
                        <span className="font-semibold">Created by:</span> {habit.userName}
                    </p>
                    <p>
                        <span className="font-semibold">Email:</span> {habit.userEmail}
                    </p>
                </div>

                {/* Mark Complete Button */}
                <button
                    onClick={handleMarkComplete}
                    className="w-full bg-[#096B68] hover:bg-[#129990] text-white py-3 rounded-xl font-bold text-lg transition"
                >
                    Mark Complete ✅
                </button>
            </div>
        </div>
    );
};

export default HabitDetails;
