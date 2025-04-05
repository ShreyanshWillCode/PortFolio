import React from "react";

const Card = ({ children }) => (
  <div className="p-4 bg-white shadow-md rounded-lg">{children}</div>
);

const CardContent = ({ children }) => <div>{children}</div>;

export { Card, CardContent };
