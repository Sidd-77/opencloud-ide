'use client';

import { useState } from "react";
import { Button } from "../button";
import { Menu, X } from "lucide-react";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className=" p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          OpenCloud IDE
        </h1>
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? (
              <X className="w-8 h-8 text-white" />
            ) : (
              <Menu className="w-8 h-8 text-white" />
            )}
          </button>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <Button
            variant="ghost"
            className="text-gray-300 hover:bg-blue-500 hover:text-white font-medium text-lg"
          >
            Features
          </Button>
          <Button
            variant="ghost"
            className="text-gray-300 hover:bg-blue-500 hover:text-white font-medium text-lg"
          >
            Pricing
          </Button>
          <Button
            variant="ghost"
            className="text-gray-300 hover:bg-blue-500 hover:text-white font-medium text-lg"
          >
            Docs
          </Button>
          <Button
            variant="secondary"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium text-lg"
          >
            Sign Up
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden mt-4 space-y-2 flex flex-col items-start`}
      >
        <Button
          variant="ghost"
          className="text-gray-300 hover:bg-blue-500 hover:text-white font-medium text-lg w-full text-left"
        >
          Features
        </Button>
        <Button
          variant="ghost"
          className="text-gray-300 hover:bg-blue-500 hover:text-white font-medium text-lg w-full text-left"
        >
          Pricing
        </Button>
        <Button
          variant="ghost"
          className="text-gray-300 hover:bg-blue-500 hover:text-white font-medium text-lg w-full text-left"
        >
          Docs
        </Button>
        <Button
          variant="secondary"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium text-lg w-full"
        >
          Sign Up
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
