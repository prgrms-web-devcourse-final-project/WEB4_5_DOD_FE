"use client";

import Image from "next/image";
import googleLogo from "@/assets/icon/google_login_icon.svg";
import { FaToggleOff } from "react-icons/fa6";
import { FaToggleOn } from "react-icons/fa6";
import React, { useState } from "react";

type ListBoxProps = {
  children: React.ReactNode;
  buttonText?: string;
  station?: string;
  clickHandler: () => void;
};

const ListBox = ({
  children,
  station,
  buttonText = "",
  clickHandler,
}: ListBoxProps) => {
  const [isConnected, setIsConnected] = useState(false);

  const handleToggle = () => {
    setIsConnected((prev) => !prev);
  };

  //TODO
  // 1. 캘린더 연동 토글 (등록 버튼으로만 등록이 가능한지, 연결되어 있지 않은 토글을 눌렀을때도 ?)

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-col justify-between p-5 bg-[color:var(--color-white)] text-[color:var(--color-black)] rounded-lg gap-4">
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center gap-3">
            <span className="text-sm font-medium text-[color:var(--color-black)]">
              {children}
            </span>
            {station && (
              <span className="text-xs font-normal text-[color:var(--color-gray-placeholder)]">
                {station}
              </span>
            )}
          </div>
          <span
            onClick={clickHandler}
            className="text-xs font-medium cursor-pointer text-[var(--color-black)] hover:text-[var(--color-primary-400)]">
            {buttonText}
          </span>
        </div>
        {children === "캘린더 연동" && (
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center gap-2 ">
              <div className="relative flex justify-center items-center w-[24px] h-[24px] p-1 rounded-full bg-[var(--color-white)] shadow-[var(--shadow-42)]">
                <Image
                  src={googleLogo}
                  alt="구글로그인로고"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
              <span className="text-xs font-normal">구글 로그인</span>
            </div>
            <button onClick={handleToggle} className="relative cursor-pointer">
              <FaToggleOff
                size={24}
                color="var(--color-gray-100)"
                className={isConnected ? "hidden" : "block"}
              />
              <FaToggleOn
                size={24}
                color="var(--color-primary-400)"
                className={isConnected ? "block" : "hidden"}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ListBox;
