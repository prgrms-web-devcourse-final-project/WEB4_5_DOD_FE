import Header from "@/components/layout/Header";
import GroupHeader from "@/components/layout/GroupHeader";
import Footer from "@/components/layout/Footer";
import { useEffect, useState } from "react";
import useAuthStore from "@/stores/authStores";
import useMediaQuery from "../hooks/useMediaQuery";

interface ScheduleDetailLayoutProps {
  children: React.ReactNode;
  data: ScheduleDetailType;
  scheduleId: string;
}

const ScheduleDetailLayout = ({
  children,
  data,
  scheduleId,
}: ScheduleDetailLayoutProps) => {
  const { user } = useAuthStore();
  const [isLeader, setIsLeader] = useState(false);
  const isSE = useMediaQuery("(min-height: 667px)");

  useEffect(() => {
    if (user && data?.members) {
      const isMaster = data.members.some(
        (member) =>
          member.name === user.name && member.scheduleRole === "ROLE_MASTER"
      );
      setIsLeader(isMaster);
    }
  }, [user, data]);

  return (
    <div
      className={`w-full bg-[color:var(--color-gray-background)] min-h-screen ${
        isSE && "pb-30"
      }`}
    >
      <div className="hidden sm:block">
        <Header type="blue" />
      </div>
      <GroupHeader
        name={data?.scheduleName}
        description={data?.description}
        count={data?.members.length}
        isLeader={isLeader}
        type="schedule"
        id={scheduleId}
      />
      <div className="min-w-[375px] w-full max-w-185 mx-auto pt-6 sm:pt-10">
        <div className="flex flex-col px-5 gap-4">{children}</div>
      </div>
      <div className="sm:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default ScheduleDetailLayout;
