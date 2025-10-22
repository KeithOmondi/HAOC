import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navData } from "../../static/data";

const Navbar = ({ active }) => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  return (
    <nav className="w-full flex flex-col lg:flex-row items-center justify-between p-4">
      {/* Mobile Navbar */}
      <div className="lg:hidden w-full">
        <div className="flex flex-col items-center gap-4">
          {navData.map((item, index) => (
            <div key={index} className="w-full text-center">
              <Link
                to={item.url || "#"}
                onClick={() =>
                  item.children ? setOpenDropdownIndex(index) : setOpenDropdownIndex(null)
                }
                className={`block px-6 py-3 font-light text-black transition 
                  ${active === index + 1
                    ? "text-blue-900 underline underline-offset-4"
                    : "hover:text-blue-900 hover:underline hover:underline-offset-4"}`}
              >
                {item.title}
              </Link>
              {item.children && openDropdownIndex === index && (
                <div className="flex flex-col mt-1">
                  {item.children.map((child, idx) => (
                    <Link
                      to={child.url}
                      key={idx}
                      className="text-gray-700 hover:text-blue-600 py-1"
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden lg:flex w-full justify-center gap-6">
        {navData.map((item, index) => (
          <div key={index} className="relative group">
            <Link
              to={item.url || "#"}
              className={`px-2 py-2 font-light capitalize text-black transition 
                ${active === index + 1
                  ? "text-blue-900 underline underline-offset-4"
                  : "hover:text-blue-900 hover:underline hover:underline-offset-4"}`}
            >
              {item.title}
            </Link>

            {item.children && (
              <div
  className="absolute left-0 top-full mt-2 w-[200px] bg-white shadow-md rounded z-50 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200"
>
  {item.children.map((child, idx) => (
    <Link
      to={child.url}
      key={idx}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      {child.title}
    </Link>
  ))}
</div>

            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
