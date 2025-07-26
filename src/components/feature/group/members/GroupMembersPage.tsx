"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GlobalLoading from "@/app/loading";
import { useParams } from "next/navigation";
import GroupMembersContent from "./GroupMembersContent";
import { useGroupMemberLogic } from "./hooks/useGroupMemberLogic";

const GroupMembersPage = () => {
  const params = useParams();
  const groupId = params.groupId as string;

  const { groupMemberData, myId, amILeader, groupLoading } =
    useGroupMemberLogic(groupId);

  if (groupLoading) return <GlobalLoading />;

  return (
    <div className="w-full bg-[color:var(--color-primary-100)] min-h-screen">
      <div className="hidden sm:block">
        <Header />
      </div>

      <GroupMembersContent
        members={groupMemberData}
        myId={myId}
        isLeader={amILeader}
        groupId={groupId}
      />

      <div className="sm:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default GroupMembersPage;
