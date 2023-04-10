import Link from "next/link";
import React from "react";

const Button = ({ name, link }) => {
  return (
    <div className="flex justify-center py-6">
      <Link
        href={link}
        className="text-2xl py-1 px-2  text-green-500 border rounded-md"
      >
        Add {name} +
      </Link>
    </div>
  );
};

export default Button;
