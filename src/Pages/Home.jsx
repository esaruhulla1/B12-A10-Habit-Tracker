import React from 'react';
import Banner from '../Components/Home/Banner';
import WhyBuildHabits from '../Components/Home/WhyBuildHabits';
import TrackProgress from '../Components/Home/TrackProgress';
import FeaturedTestimonials from '../Components/Home/FeaturedTestimonials';


const Home = () => {
    return (
        <div className='max-w-[1820px]  mx-auto'>
            <Banner></Banner>
            <WhyBuildHabits></WhyBuildHabits>
            <FeaturedTestimonials></FeaturedTestimonials>
            {/* <TrackProgress></TrackProgress> */}
            
        </div>
    );
};

export default Home;