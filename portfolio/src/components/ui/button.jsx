import React from "react";

const Button = ({ children, variant }) => (
  <button
    className={`px-4 py-2 text-white rounded-lg ${
      variant === "outline" ? "bg-gray-700" : "bg-blue-600"
    }`}
  >
    {children}
  </button>
);

export { Button };
