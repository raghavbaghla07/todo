import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      alert(err.message || "Logout failed");
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Your task manager</a>
      </div>

      <div className="navbar-end gap-4">
        <button
          onClick={handleLogout}
          className="btn btn-ghost font-bold text-sm"
        >
          Logout
        </button>
        <div className="dropdown dropdown-end pr-10">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://imgs.search.brave.com/2uet1aDeBaOm_uphZ2Wy54mExV7bg67YCjg5nWp4KaA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDYv/NTU1LzM5Ny9zbWFs/bC91c2VyLWljb24t/cHJvZmlsZS1pY29u/LWZyZWUtdmVjdG9y/LmpwZw"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
