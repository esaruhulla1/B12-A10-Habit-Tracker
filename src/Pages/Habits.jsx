
import React, { useEffect, useState } from "react";
import HabitCard from "../Components/HabitCard";

const Habits = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch("http://localhost:3000/habits")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading)
        return (
            <div className="text-center py-20 text-[#364436] text-lg font-semibold">
                Loading  Habits...
            </div>
        );

    if (error)
        return (
            <div className="text-center py-20 text-red-500 text-lg font-semibold">
                Error: {error}
            </div>
        );

    return (
        <section className="py-15 ">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-3xl font-extrabold text-[#096B68] relative inline-block">
                        All Habits
                        <span className="block w-28 h-1 bg-gradient-to-r from-[#096B68] to-[#129990] rounded-full mt-4 mx-auto"></span>
                    </h2>

                    <p className="text-[#096B68]/80 mt-4 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                        Explore all the habits created by our users. Build streaks, stay
                        consistent, and boost your productivity every day!
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {data.map((habit) => (
                        <HabitCard key={habit._id} habit={habit} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Habits;