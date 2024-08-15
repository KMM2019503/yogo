import React from "react";

import Image from "next/image";

const Header = () => {
  return (
    <header className="w-full  py-4 px-[3%]">
      <div className="w-full flex justify-between bg-dark-200 py-4 px-[2%] rounded-3xl items-center">
        <div className="flex justify-center items-center gap-4">
          <Image
            src={"/yogo-logo.jpeg"}
            alt="logo"
            width={1000}
            height={1000}
            className="h-8 w-fit rounded-full cursor-pointer"
          />
          <h2 className="font-mono text-2xl font-bold hidden md:block text-dark-700">
            YoGo
          </h2>
        </div>

        <p className="text-dark-700 font-mono text-lg">Admin Dashboard</p>
      </div>
    </header>
  );
};

export default Header;
