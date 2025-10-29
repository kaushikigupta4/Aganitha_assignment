"use client";
import React from "react";
import { Heart, Coffee } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#feded4] text-gray-800 py-10 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-[#cf6c50] mb-3">
          Thanks for stopping by Taylor’s Kitchen 🍽️
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-6">
          Whether it’s a long day at work or a cozy weekend night, 
          I hope you find a recipe here that makes you smile, relax, 
          and enjoy the magic of cooking.
        </p>

        <div className="flex justify-center items-center gap-2 text-[#cf6c50] mb-6">
          <Heart className="w-5 h-5 fill-[#cf6c50]" />
          <span>Made with care and a dash of creativity</span>
          <Coffee className="w-5 h-5" />
        </div>

        <div className="text-sm text-gray-600 border-t border-[#cf6c50] pt-4">
          © {new Date().getFullYear()} Taylor’s Kitchen — Personal Project for Taylor
        </div>
      </div>
    </footer>
  );
}
