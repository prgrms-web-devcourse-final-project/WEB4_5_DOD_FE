"use client";

import Link from "next/link";
import ShareButton from "@/components/ui/ShareButton";
import ScheduleCard from "@/components/ui/ScheduleCard";
import { formatSchedule, splitByDate } from "@/app/utils/dateFormat";
import { itemVariants, listVariants } from "../../schedule/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import noScheduleImg from "@/assets/images/no_schedule_calendar.png";

interface Schedule {
  scheduleName: string;
  meetingType: "ONLINE" | "OFFLINE";
  time: string;
  startTime: string;
  endTime: string;
  memberNames: string[];
  scheduleId: string;
}

interface GroupContentProps {
  groupId: string;
  schedules: Schedule[];
  groupRole: boolean;
}

const GroupContent = ({ groupId, schedules, groupRole }: GroupContentProps) => {
  const { past, future } = splitByDate(schedules);
  const hasNoData = past.length === 0 && future.length === 0;

  return (
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="min-w-[375px] w-full max-w-185 flex flex-col min-h-screen mx-auto"
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col p-5 pt-4 w-full gap-4 flex-1"
      >
        <Link href={`/group/${groupId}/schedule/create/select`}>
          <ShareButton
            title="그룹 일정 생성하기"
            description="그룹 내 멤버들과 새로운 일정 생성하기"
            mode="group"
          />
        </Link>
        <div className="flex flex-col gap-4">
          {hasNoData && (
            <motion.div
              variants={itemVariants}
              className="w-full flex justify-center items-end text-center text-sm text-[color:var(--color-gray-placeholder)] h-25 leading-6 gap-1"
            >
              그룹 일정이 없어요 <br />
              새로운 일정을 만들어 봐요!
              <Image
                src={noScheduleImg}
                alt="일정이 없어요 이미지"
                width={20}
                height={20}
              />
            </motion.div>
          )}
          {!hasNoData &&
            future.map((schedule, index) => (
              <motion.div
                variants={itemVariants}
                key={`${schedule.scheduleId}-${index}`}
              >
                <ScheduleCard
                  variant="event"
                  title={schedule.scheduleName}
                  meetingType={schedule.meetingType}
                  time={formatSchedule(schedule.startTime, schedule.endTime)}
                  members={schedule.memberNames}
                  scheduleId={schedule.scheduleId}
                  groupRole={groupRole}
                />
              </motion.div>
            ))}
          {!hasNoData &&
            past.map((schedule, index) => (
              <motion.div
                variants={itemVariants}
                key={`${schedule.scheduleId}-${index}`}
              >
                <ScheduleCard
                  variant="event"
                  title={schedule.scheduleName}
                  meetingType={schedule.meetingType}
                  time={formatSchedule(schedule.startTime, schedule.endTime)}
                  members={schedule.memberNames}
                  scheduleId={schedule.scheduleId}
                  groupRole={groupRole}
                />
              </motion.div>
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GroupContent;
