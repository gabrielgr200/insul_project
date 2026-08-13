'use client';

import Spinner from "./Spinner";

const DynamicImg = ({ src }: { src?: string }) => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="PRODUCTS-IMAGE lg:w-[60%] mt-10 lg:mt-0 saturate-130 overflow-clip
        transition-all duration-700 ease-in-out rounded-2xl"
      >
        <div
          className={`w-full h-[450px] lg:h-[700px] flex items-center
          justify-center text-zinc-500 ${!src && "bg-zinc-200"}`}
        >
          {!src && (
            <span className="text-lg">Shop by room image placeholder</span>
          )}
        </div>
      </div>

      <Spinner />
    </>
  );
};

export default DynamicImg;
