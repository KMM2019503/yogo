import Image from "next/image";
import React from "react";
Image;

const Loader = () => {
  return (
    <div className="flex h-screen max-h-screen justify-center items-center">
      {/* Loading svg insert */}
      <Image
        src={"/loading.svg"}
        alt="loader photo"
        width={1000}
        height={1000}
        className="size-10"
      />
    </div>
  );
};

export default Loader;
