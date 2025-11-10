import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoModelS } from "react-icons/io"; // temporary logo icon (I have replace with my own logo)
import { Link } from "react-router";
import Header_logo_2 from '../assets/Header-logo-2.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-16 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* 1️⃣ Logo and Website Name */}
        <div className="flex flex-col  items-center md:items-start space-y-3">
          <div className="flex items-center space-x-2">
            {/* <IoLogoModelS className="text-3xl text-blue-500" />
            <h2 className="text-xl font-bold text-white">Habit Tracker</h2> */}
            <a className="btn btn-ghost text-xl font-bold">
              <img className='max-w-[60px]  -ml-8 -mr-4' src={Header_logo_2} alt="" />
              Habit Tracker</a>
          </div>
          <p className="text-sm text-gray-400">
            Build better habits, stay productive, and track your daily progress easily.
          </p>
        </div>

        {/* 2️⃣ Contact Details */}
        <div className="text-center mx-auto  md:text-left space-y-2">
          <h3 className="text-lg font-semibold text-white">Contact</h3>
          <p>Email: <a href="mailto:contact@habittracker.com" className="hover:text-blue-400">contact@habittracker.com</a></p>
          <p>Phone: <a href="tel:+8801XXXXXXXXX" className="hover:text-blue-400">+880 1XXXXXXXXX</a></p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>

        {/* 3️⃣ Terms & Social Links */}
        <div className="text-center md:text-right  space-y-3">
          <div>
            <Link to="/" className="hover:text-blue-400 transition">Terms &amp; Conditions</Link>
          </div>

          <div className="flex justify-center md:justify-end space-x-4 text-xl mt-2">
            <a href="https://facebook.com" target="_blank" className="hover:text-blue-500 transition">
              <FaFacebookF />
            </a>
            <a href="https://x.com" target="_blank" className="hover:text-gray-200 transition">
              <FaXTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" className="hover:text-pink-500 transition">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" className="hover:text-blue-400 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Habit Tracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
