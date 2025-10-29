import React from "react";
import { FiClock, FiSmile, FiShoppingBag } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="bg-[#fcfbf4] pt-28 pb-20 px-6 md:px-16 flex flex-col lg:flex-row items-center justify-between gap-10"
    >
      {/* Left content */}
      <div className="space-y-6 md:w-1/2 md:pl-20">
        <h1 className="text-4xl md:text-6xl font-bold text-[#cf6c50] leading-tight text-center md:text-left">
          Welcome to <br /> Taylor’s Kitchen
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed text-center md:text-left">
          Let’s make cooking easy tonight. <br />
          Type in what’s waiting in your fridge, and I’ll serve up recipes that
          match your{" "}
         
                   <span className="text-[#cf6c50] font-semibold">ingredients</span>,{" "}
          <span className="text-[#cf6c50] font-semibold">mood</span>, and{" "}
          <span className="text-[#cf6c50] font-semibold">time</span>. <br />
        
   
          From quick weekday meals to comfort classics, you’ll never wonder what
          to cook again.
        </p>

        {/*Icon Highlights*/}
        <div className="flex flex-wrap gap-4 text-[#cf6c50] text-xl mt-6 justify-center md:justify-start">
          <div className="flex items-center space-x-2 bg-[#feded4]/60 px-4 py-2 rounded-full shadow-sm">
            <FiShoppingBag />
            <span className="text-gray-700 text-sm font-medium">
              Ingredients
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-[#feded4]/60 px-4 py-2 rounded-full shadow-sm">
            <FiSmile />
            <span className="text-gray-700 text-sm font-medium">Mood</span>
          </div>
          <div className="flex items-center space-x-2 bg-[#feded4]/60 px-4 py-2 rounded-full shadow-sm">
            <FiClock />
            <span className="text-gray-700 text-sm font-medium">
              Quick Meals
            </span>
          </div>
        </div>

        {/*Buttons*/}
        <div className="flex flex-wrap gap-4 pt-6 justify-center md:justify-start">
          <a
            href="#search"
            className="bg-[#cf6c50] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#b85b42] transition"
          >
            Find Recipes
          </a>
          <a
            href="#discover"
            className="text-[#cf6c50] font-semibold border-2 border-[#feded4] bg-[#feded4]/50 px-6 py-3 rounded-xl hover:bg-[#feded4] hover:text-[#cf6c50] transition"
          >
            Explore Ideas
          </a>
        </div>
      </div>

      {/*Right Image*/}
      <div className="md:w-1/2 flex justify-center md:justify-end">
        <img
          src="n.jpg"
          alt="Cooking illustration"
          className="w-full max-w-lg md:max-w-3xl rounded-3xl  object-cover"
        />
      </div>
    </section>
  );
}
