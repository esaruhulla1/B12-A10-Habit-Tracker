
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { Pencil, Trash2, CheckCircle2, Flame } from "lucide-react";
import Loading from "../Components/Loading";

const MyHabits = () => {
    const { user } = useContext(AuthContext);
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔹 Fetch user's own habits
    useEffect(() => {
        if (!user?.email) return;
        fetch(`https://habit-tracker-server-g4ntwvrz4-esas-projects-36859535.vercel.app/${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                setHabits(data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, [user?.email]);

    // 🔹 Helper: calculate current streak (based on consecutive days)
    //   const calculateStreak = (history) => {
    //     if (!history || history.length === 0) return 0;

    //     // Convert to Date objects & sort (latest first)
    //     const sorted = history
    //       .map((d) => new Date(d.split("-").reverse().join("-")))
    //       .sort((a, b) => b - a);

    //     let streak = 1;
    //     for (let i = 1; i < sorted.length; i++) {
    //       const diff = (sorted[i - 1] - sorted[i]) / (1000 * 60 * 60 * 24);
    //       if (diff === 1) streak++;
    //       else break; // break streak if a day is missed
    //     }
    //     return streak;
    //   };

    // 🔹 Helper: calculate current streak (only last consecutive days)
    const calculateStreak = (history) => {
        if (!history || history.length === 0) return 0;

        
        const sorted = history
            .map((d) => new Date(d.split("-").reverse().join("-")))
            .sort((a, b) => a - b);

        let streak = 1;
        let currentStreak = 1;

        for (let i = 1; i < sorted.length; i++) {
            const diff =
                (sorted[i] - sorted[i - 1]) / (1000 * 60 * 60 * 24); // difference in days

            if (diff === 1) {
                currentStreak++;
                streak = Math.max(streak, currentStreak);
            } else {
                
                currentStreak = 1;
            }
        }


        const reversed = sorted.reverse();
        let latestStreak = 1;
        for (let i = 1; i < reversed.length; i++) {
            const diff =
                (reversed[i - 1] - reversed[i]) / (1000 * 60 * 60 * 24);
            if (diff === 1) latestStreak++;
            else break; 
        }

        return latestStreak;
    };


    // 🔹 Delete habit
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This habit will be deleted permanently.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#129990",
            cancelButtonColor: "#f47000",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://habit-tracker-server-g4ntwvrz4-esas-projects-36859535.vercel.app/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            setHabits(habits.filter((h) => h._id !== id));
                            Swal.fire("Deleted!", "Your habit has been deleted.", "success");
                        }
                    });
            }
        });
    };

    // 🔹 Mark as Complete
    const handleMarkComplete = async (habit) => {
        const today = new Date();
        const formattedDate = today
            .toLocaleDateString("en-GB")
            .split("/")
            .join("-"); // dd-mm-yyyy

        if (habit.completionHistory.includes(formattedDate)) {
            Swal.fire("Already Completed!", "You already marked this today.", "info");
            return;
        }

        const res = await fetch(
            `https://habit-tracker-server-g4ntwvrz4-esas-projects-36859535.vercel.app/${habit._id}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ date: formattedDate }),
            }
        );

        const data = await res.json();

        if (data.success) {
            setHabits((prev) =>
                prev.map((h) =>
                    h._id === habit._id
                        ? { ...h, completionHistory: [...h.completionHistory, formattedDate] }
                        : h
                )
            );
            Swal.fire("Great!", "Marked as completed for today!", "success");
        } else {
            Swal.fire("Already Completed!", "You already marked this today.", "info");
        }
    };

    if (loading)
        return <Loading></Loading>

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#096B68] mb-6 text-center">
                My Habits
            </h2>

            {habits.length === 0 ? (
                <p className="text-center text-gray-600">No habits found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 text-sm md:text-base">
                        <thead className="bg-[#14a8a3] text-white">
                            <tr>
                                <th className="p-3 text-left">Title</th>
                                <th className="p-3 text-left">Category</th>
                                <th className="p-3 text-center">Current Streak</th>
                                <th className="p-3 text-center">Created Date</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {habits.map((habit) => (
                                <tr
                                    key={habit._id}
                                    className="border-b hover:bg-[#90D1CA]/20 transition"
                                >
                                    <td className="p-3 font-medium text-gray-700">
                                        {habit.habitTitle}
                                    </td>
                                    <td className="p-3">{habit.category}</td>
                                    <td className="p-3 text-center font-semibold text-[#f47000]">
                                        {calculateStreak(habit.completionHistory)} <Flame size={16} className="inline" />
                                    </td>
                                    <td className="p-3 text-center text-gray-600">
                                        {habit.createdDate}
                                    </td>
                                    <td className="p-3 flex flex-col md:flex-row gap-2 justify-center items-center">
                                        <Link
                                            to={`/update/${habit._id}`}
                                            className="flex items-center gap-1 bg-[#bfe7e3] text-black px-3 py-1 rounded-lg hover:bg-[#129990] hover:text-white transition"
                                        >
                                            <Pencil size={16} /> Update
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(habit._id)}
                                            className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-500 hover:text-white transition"
                                        >
                                            <Trash2 size={16} /> Delete
                                        </button>
                                        <button
                                            onClick={() => handleMarkComplete(habit)}
                                            className="flex items-center gap-1 bg-[#FFFBDE] text-[#f47000] px-3 py-1 rounded-lg hover:bg-[#f47000] hover:text-white transition"
                                        >
                                            <CheckCircle2 size={16} /> Complete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyHabits;
