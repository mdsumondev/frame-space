import React from "react";
import Header from "../Componets/Header";
import Footer from "../Componets/Footer";
import Navigation from "./_Components/Navigation";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="lg:flex">
        <Navigation />
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
};

export default layout;
