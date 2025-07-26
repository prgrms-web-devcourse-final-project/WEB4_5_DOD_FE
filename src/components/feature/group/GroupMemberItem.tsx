"use client";

import DropdownSmall from "@/components/ui/DropdownSmall";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import crownIcon from "@/assets/icon/crown_icon.svg";
import ControlledAlertBox from "@/components/ui/ControlledAlertBox";
import { profileImages } from "@/lib/profileImages";
import { useGroupMemberActions } from "./members/hooks/useGroupMemberLogic";

interface GroupMemberItemProps {
  profileNum: number;
  name: string;
  role: string;
  myId: string;
  memberId: string;
  isLeader: boolean;
  groupId: string;
}

const GroupMemberItem = ({
  profileNum,
  name,
  role,
  myId,
  memberId,
  isLeader,
  groupId,
}: GroupMemberItemProps) => {
  const {
    isOpen,
    setIsOpen,
    isAlertOpen,
    setIsAlertOpen,
    handleTopClick,
    handleBottomClick,
    getAlertContent,
    handleAlertAction,
  } = useGroupMemberActions(groupId);
  const profileImage = profileImages[profileNum];
  return (
    <div className="flex items-center justify-between w-full hover:bg-[color:var(--color-primary-100)] px-1 py-1 rounded-lg">
      <div className="flex gap-3 items-center">
        <div className="relative">
          <Image src={profileImage} alt="유저 캐릭터" className="w-6 h-7" />
          {role === "GROUP_LEADER" && (
            <Image
              src={crownIcon}
              alt="왕관 아이콘"
              className="absolute top-[2px] left-1/2 -translate-x-1/2 w-[9px] h-[7px]"
            />
          )}
        </div>
        <div className="text-sm font-medium text-[color:var(--color-black)]">
          {name}
        </div>
      </div>
      {isLeader && myId !== memberId && (
        <div className="relative flex items-center">
          <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
            <EllipsisVertical className="w-[18px] h-[18px] text-[color:var(--color-gray)]" />
          </button>
          {isOpen && (
            <div className="absolute right-0 top-6">
              <DropdownSmall
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onTopClick={() => handleTopClick(role)}
                onBottomClick={handleBottomClick}
              >
                {role === "GROUP_LEADER"
                  ? ["방장뺏기", "내보내기"]
                  : ["방장주기", "내보내기"]}
              </DropdownSmall>
            </div>
          )}
          <ControlledAlertBox
            content={getAlertContent(name)}
            cancel="취소"
            action="확인"
            isOpen={isAlertOpen}
            onClose={() => setIsAlertOpen(false)}
            actionHandler={() => handleAlertAction(memberId)}
          />
        </div>
      )}
    </div>
  );
};

export default GroupMemberItem;
