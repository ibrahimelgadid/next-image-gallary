import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="py-8 fixed w-full ">
      <div className="container flex items-center m-auto">
        <Link className="text-white basis-1/4 text-3xl font-bold" href="/">
          Gallery
        </Link>
        <ul className="flex gap-4 basis-3/4 ">
          <li>
            <Link
              className="text-white text-xl font-semibold border-b border-emerald-600 pb-1 hover:border-red-600 transition-colors duration-300 "
              href="/albums"
            >
              Albums
            </Link>
          </li>
          <li>
            <Link
              className="text-white text-xl font-semibold border-b border-emerald-600 pb-1 hover:border-red-600 transition-colors duration-300 "
              href="/albums/new-album"
            >
              New Album
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
