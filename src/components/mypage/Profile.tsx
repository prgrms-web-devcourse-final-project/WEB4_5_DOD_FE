"use client";
import Image from "next/image";

import { Pen, Shuffle } from "lucide-react";
import { profileImages } from "@/lib/profileImages";

type ProfileProps = {
  name: string;
  email: string;
  profile: number; // 이미지 인덱스
  editHandler: () => void;
  onChangeProfile: () => void;
};

const Profile = ({
  name,
  email,
  profile,
  editHandler,
  onChangeProfile,
}: ProfileProps) => {
  const profileImage = profileImages[profile];

  return (
    <div className="w-full flex flex-col justify-between items-center gap-4">
      {/* 프로필 이미지 영역 */}
      <div className="flex relative w-[76px] h-[84px]">
        <Image
          src={profileImage}
          alt="사용자 프로필 이미지"
          fill
          sizes="76px, 84px"
          className="rounded-full object-cover"
        />
        <button
          onClick={onChangeProfile}
          className="absolute bottom-0 right-0 z-10 cursor-pointer">
          <div className="flex justify-center items-center rounded-full w-[22px] h-[22px] p-1 bg-[color:var(--color-primary-400)]">
            <Shuffle className="text-[color:var(--color-white)]" size={14} />
          </div>
        </button>
      </div>

      {/* 이름 + 이메일 */}
      <div className="w-full flex flex-col justify-between items-center">
        <div className="flex justify-between items-center gap-1.5">
          <span className="text-sm font-medium text-[color:var(--color-black)] min-h-[20px]">
            {name}
          </span>
          <Pen
            size={12}
            className="text-[var(--color-gray)] hover:text-[var(--color-primary-400)] cursor-pointer"
            onClick={editHandler}
          />
        </div>
        <div className="text-xs font-normal text-[color:var(--color-gray-placeholder)]">
          {email}
        </div>
      </div>
    </div>
  );
};

export default Profile;
