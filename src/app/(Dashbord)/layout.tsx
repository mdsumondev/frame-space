import React from "react";
import Header from "../Componets/Header";
import Footer from "../Componets/Footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default layout;
