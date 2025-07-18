import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import HeaderTop from "@/components/layout/HeaderTop";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "이때어때 - 마이페이지",
  description: "이때어때 - 마이페이지",
};


function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col bg-[var(--color-gray-background)]">
        <div className="hidden sm:flex">
          <Header />
        </div>
        <HeaderTop fontColor="black" backward={true}></HeaderTop>

        <div className="w-full px-5 pt-25 max-w-[740px] mx-auto">
          {children}
        </div>
      </div>
      <div className="sm:hidden">
        <Footer />
      </div>
    </>
  );
}
export default layout;
