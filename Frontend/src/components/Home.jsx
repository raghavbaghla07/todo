import React from "react";
import Login from "./Login";
import Signup from "./Signup";
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-5xl md:text-7xl font-extrabold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Your task manager
      </h1>
      <p className="text-lg mb-10 max-w-lg opacity-80">Ready to commit?</p>

      {/* Buttons in the same line */}
      <div className="flex flex-row gap-4">
        <button onClick={<Login />} className="btn btn-primary px-8">
          Login
        </button>
        <button onClick={<Signup />} className="btn btn-outline px-8">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Home;
