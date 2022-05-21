import React from "react";

const Hero: () => JSX.Element = () => {
  return (
    <div className="bg-hero-image bg-cover bg-center w-screen h-2/3">
      <div className="w-full h-full backdrop-blur-sm bg-gradient-to-t from-black" />
    </div>
  );
};

export default Hero;
