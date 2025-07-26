import { AtSign, ChevronRight, Pen } from "lucide-react";
import Image from "next/image";
import OnlineMeetingEditBottomSheet from "./schedule/editSchedule/OnlineMeetingEditBottomSheet";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { itemVariants } from "./schedule/motion";
import {
  ONLINE_MEETING_PLATFORM,
  ONLINE_MEETING_PLATFORM_NAME,
} from "./schedule/constants/platform";

interface OnlineMeetingRoomProps {
  scheduleId: string;
  platform?: string;
  url?: string;
}

const OnlineMeetingRoom = ({
  scheduleId,
  platform,
  url,
}: OnlineMeetingRoomProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className="bg-[color:var(--color-white)] px-5 py-4 gap-4 rounded-lg flex flex-col shadow-[var(--shadow-common)]"
    >
      <div className="flex w-full justify-between items-center">
        <div className="flex gap-4 items-center">
          <div>
            <AtSign className="w-3 h-3 text-[color:var(--color-black)]" />
          </div>
          <div className="text-[color:var(--color-primary-300)] text-xs">
            온라인 회의장
          </div>
        </div>
        <div onClick={() => setIsOpen(true)}>
          <Pen className="w-3 h-3 text-[color:var(--color-gray)] cursor-pointer" />
        </div>
      </div>
      {!url && (
        <div className="flex w-full justify-center items-center py-4 text-xs text-[color:var(--color-gray)]">
          연동된 온라인 회의장이 없습니다.
        </div>
      )}
      {url && (
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-4 items-center">
            <div>
              <Image
                src={
                  ONLINE_MEETING_PLATFORM[platform as OnlineMeetingPlatformType]
                }
                alt={`${platform} 아이콘`}
                className="w-4 h-4"
              />
            </div>
            <div className="text-[color:var(--color-black)] text-sm">
              {
                ONLINE_MEETING_PLATFORM_NAME[
                  platform as OnlineMeetingPlatformType
                ]
              }
            </div>
          </div>
          <Link
            href={url.startsWith("http") ? url : `https://${url}`}
            target="blank"
          >
            <ChevronRight className="w-[14px] h-[14px] text-[color:var(--color-gray)]" />
          </Link>
        </div>
      )}
      <OnlineMeetingEditBottomSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        scheduleId={scheduleId}
        platform={platform}
        url={url!}
      />
    </motion.div>
  );
};

export default OnlineMeetingRoom;
