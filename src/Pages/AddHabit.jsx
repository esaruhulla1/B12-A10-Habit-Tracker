import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const AddHabit = () => {
    const [formData, setFormData] = useState({
        habitTitle: "",
        description: "",
        category: "",
        reminderTime: "",
        image: "",
        userEmail: "",
        userName: "",
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newHabit = {
            ...formData,
            createdDate: new Date().toISOString().split("T")[0],
            completionHistory: [],
        };

        try {
            const response = await fetch("https://habit-tracker-server-g4ntwvrz4-esas-projects-36859535.vercel.app/habits/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newHabit),
            });

            if (response.ok) {
                Swal.fire({
                    title: "Success!",
                    text: "Habit added successfully!",
                    icon: "success",
                    confirmButtonColor: "#096B68",
                });
                setFormData({
                    habitTitle: "",
                    description: "",
                    category: "",
                    reminderTime: "",
                    image: "",
                    userEmail: "",
                    userName: "",
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to add habit. Try again.",
                    icon: "error",
                    confirmButtonColor: "#f47000",
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error!",
                text: "Something went wrong.",
                icon: "error",
                confirmButtonColor: "#f47000",
            });
        }
    };

    return (
        <section className="min-h-screen flex justify-center items-center px-4 py-10">

            <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-2xl border border-[#90D1CA]/60">
                <h2 className="text-2xl md:text-3xl font-extrabold text-center text-[#096B68] mb-8">
                    Add New Habit
                    <span className="block w-24 h-1 bg-gradient-to-r from-[#096B68] to-[#129990] rounded-full mt-3 mx-auto"></span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Habit Title */}
                    <div>
                        <label className="block text-[#096B68] font-semibold mb-1">Habit Title</label>
                        <input
                            type="text"
                            name="habitTitle"
                            value={formData.habitTitle}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-[#90D1CA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#129990]"
                            placeholder="Enter habit title"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-[#096B68] font-semibold mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-1 border border-[#90D1CA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#129990]"
                            rows="2"
                            placeholder="Enter habit description"
                        ></textarea>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-[#096B68] font-semibold mb-1">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-[#90D1CA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#129990]"
                        >
                            <option value="">Select a category</option>
                            <option value="Morning">Morning</option>
                            <option value="Work">Work</option>
                            <option value="Fitness">Fitness</option>
                            <option value="Evening">Evening</option>
                            <option value="Study">Study</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    {/* Reminder Time */}
                    <div>
                        <label className="block text-[#096B68] font-semibold mb-1">Reminder Time</label>
                        <input
                            type="time"
                            name="reminderTime"
                            value={formData.reminderTime}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-[#90D1CA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#129990]"
                        />
                    </div>

                    {/* Image Link */}
                    <div>
                        <label className="block text-[#096B68] font-semibold mb-1">Image Link</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-[#90D1CA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#129990]"
                            placeholder="https://i.ibb.co/..."
                        />
                    </div>

                    {/* User Email */}
                    <div>
                        <label className="block text-[#096B68] font-semibold mb-1">User Email</label>
                        <input
                            type="email"
                            name="userEmail"
                            value={formData.userEmail}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-[#90D1CA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#129990]"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* User Name */}
                    <div>
                        <label className="block text-[#096B68] font-semibold mb-1">User Name</label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-[#90D1CA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#129990]"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full mt-5 py-3 bg-gradient-to-r from-[#096B68] to-[#129990] text-white font-semibold text-lg rounded-lg hover:shadow-md transition-all duration-300"
                    >
                        Add Habit
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddHabit;


// now please create add habits page
//  Add Habit Page:
// Users can add a habit with:
// ● Habit Title

// ● Description
// ● Category (dropdown: Morning, Work, Fitness, Evening, Study, other's)
// ● Reminder Time (You can use time picker)
// ● Upload Image link
// ● User Email
// ● User Name
// user এর দেয়া এই input  এছাড়াও createdDate": "",
// completionHistory: [empty array] ডাটাবেজ এ যুক্ত হবে

// Add Habit button → Save to DB → Success toast


//  When you fill in the data and submit the Add button, this
// data will be stored in your database and you will show a success message through toast  alert.


// database এ ডাটা এরকম যাবে
// {

// "habitTitle": "Read 20 Pages",
// "description": "Read at least 20 pages of a self-improvement or fiction book.",
// "category": "Study",
// "reminderTime": "08:00 PM",
// "image": "https://i.ibb.co/rYbgdDm/image.png",
// "userEmail": "oliver.smith@gmail.com",
// "userName": "Oliver Smith",
// "createdDate": "2025-11-09",
// "completionHistory": []
// },


// Server side post apis:
//     //  CREATE one
//     app.post('/habits/add', async (req, res) => {
//       try {
//         const newHabit = req.body;
//         const result = await usersCollection.insertOne(newHabit);
//         res.status(201).json(result);
//       } catch (err) {
//         res.status(500).json({ message: 'Failed to create user', error: err });
//       }
//     });