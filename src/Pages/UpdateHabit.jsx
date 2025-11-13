import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateHabit = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [habit, setHabit] = useState(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        fetch(`https://habit-tracker-server-g4ntwvrz4-esas-projects-36859535.vercel.app/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setHabit(data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, [id]);

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setHabit({ ...habit, [name]: value });
    };

    
    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(`https://habit-tracker-server-g4ntwvrz4-esas-projects-36859535.vercel.app/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                habitTitle: habit.habitTitle,
                description: habit.description,
                category: habit.category,
                reminderTime: habit.reminderTime,
                image: habit.image,
            }),
        })
            .then((res) => res.json())
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Habit Updated!",
                    text: "Your habit has been updated successfully.",
                });
                navigate("/my-habit"); 
            })
            .catch((err) => {
                console.error(err);
                Swal.fire({
                    icon: "error",
                    title: "Update Failed",
                    text: "Something went wrong while updating the habit.",
                });
            });
    };

    if (loading) return <p className="text-center mt-8 text-gray-500">Loading...</p>;
    if (!habit) return <p className="text-center mt-8 text-red-500">Habit not found!</p>;

    return (
        <div className="min-h-screen p-6 md:p-10 bg-gray-50">
            <h1 className="text-3xl md:text-4xl font-bold text-[#096B68] mb-6 text-center">
                Update Habit
            </h1>

            <form
                onSubmit={handleUpdate}
                className="max-w-3xl mx-auto border border-gray-200 bg-white p-6 md:p-10 rounded-2xl shadow-md"
            >
                {/* Habit Title */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Habit Title</label>
                    <input
                        type="text"
                        name="habitTitle"
                        value={habit.habitTitle}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#096B68]"
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea
                        name="description"
                        value={habit.description}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md p-2 h-24 focus:outline-none focus:ring-2 focus:ring-[#096B68]"
                    />
                </div>

                {/* Category */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Category</label>
                    <select
                        name="category"
                        value={habit.category}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#096B68]"
                    >
                        <option value="Morning">Morning</option>
                        <option value="Work">Work</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Evening">Evening</option>
                        <option value="Study">Study</option>
                    </select>
                </div>

                {/* Reminder Time */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Reminder Time</label>
                    <input
                        type="time"
                        name="reminderTime"
                        value={habit.reminderTime}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#096B68]"
                    />
                </div>

                {/* Image URL */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
                    <input
                        type="url"
                        name="image"
                        value={habit.image}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#096B68]"
                    />
                    {/* {habit.image && (
                        <img
                            src={habit.image}
                            alt="Habit"
                            className="mt-2 w-32 h-32 object-cover rounded-md border"
                        />
                    )} */}
                </div>

                {/* User Name & Email (Read-only) */}
                <div className="mb-4 grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">User Name</label>
                        <input
                            type="text"
                            value={habit.userName}
                            readOnly
                            className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            value={habit.userEmail}
                            readOnly
                            className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-[#096B68] hover:bg-[#129990] text-white font-bold py-3 rounded-xl transition"
                >
                    Update Habit
                </button>
            </form>
        </div>
    );
};

export default UpdateHabit;
