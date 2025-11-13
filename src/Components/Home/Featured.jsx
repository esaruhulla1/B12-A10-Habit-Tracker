import React, { useEffect, useState } from "react";
import HabitCard from "../HabitCard";
import Loading from "../Loading";
import ErrorPage from "../ErrorPage";

const Featured = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/habits/featured")
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
            <Loading></Loading>
        );

    if (error)
        return (
            <p className="text-center text-red-500">Somthigs is wrong</p>
        );

    return (
        <section className="py-20 ">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#096b68]">
                     Featured Habits
                </h2>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {data.slice(0, 6).map((habit) => (
                        <HabitCard key={habit._id} habit={habit} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Featured;



// import React, { useEffect, useState } from 'react';
// import HabitCard from '../HabitCard';

// const Featured = () => {

//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetch("http://localhost:3000/habits/featured")
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error("Network response was not ok");
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 setData(data);
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 setError(err.message);
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div>
//             <h2>Featured Habits</h2>
//             <ul>
//                 {data.map((habit) => <HabitCard habit={habit} key={habit._id}></HabitCard>)}
//             </ul>
//         </div>
//     );
// };

// export default Featured;