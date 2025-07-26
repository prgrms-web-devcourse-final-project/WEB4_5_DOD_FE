import { useEffect, useState } from "react";
import {
  useGroupMembers,
  useRemoveGroupMember,
  useUpdateMemberPermissions,
} from "@/lib/api/groupApi";
import { useUser } from "@/lib/api/userApi";

interface MemberDataType {
  userId: string;
  userName: string;
  groupRole: string;
}

type AlertAction = "kick" | "transfer" | "take";

export const useGroupMemberLogic = (groupId: string) => {
  const { data: groupData, isPending: groupLoading } = useGroupMembers(groupId);
  const groupMemberData = groupData?.data.groupUser;
  const { data: userData, refetch } = useUser();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const myId = userData?.data.id;
  const amILeader =
    groupMemberData?.filter((user: MemberDataType) => user.userId === myId)[0]
      ?.groupRole === "GROUP_LEADER";

  return {
    groupMemberData,
    myId,
    amILeader,
    groupLoading,
    groupData,
  };
};

export const useGroupMemberActions = (groupId: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertAction, setAlertAction] = useState<AlertAction>("kick");
  const updateMemberPermissions = useUpdateMemberPermissions();
  const removeMember = useRemoveGroupMember();

  const handleTopClick = (role: string) => {
    setAlertAction(role === "GROUP_LEADER" ? "take" : "transfer");
    setIsAlertOpen(true);
  };

  const handleBottomClick = () => {
    setAlertAction("kick");
    setIsAlertOpen(true);
  };

  const getAlertContent = (name: string) => {
    switch (alertAction) {
      case "kick":
        return `${name}님을 그룹에서 내보내시겠습니까?`;
      case "transfer":
        return `${name}님에게 방장 권한을 주시겠습니까?`;
      case "take":
        return `${name}님의 방장 권한을 뺏으시겠습니까?`;
    }
  };

  const handleAlertAction = (memberId: string) => {
    switch (alertAction) {
      case "kick":
        removeMember.mutate({
          groupId,
          userId: memberId,
        });
        break;
      case "transfer":
        updateMemberPermissions.mutate({
          groupId,
          userId: memberId,
          groupRole: "GROUP_LEADER",
        });
        break;
      case "take":
        updateMemberPermissions.mutate({
          groupId,
          userId: memberId,
          groupRole: "GROUP_MEMBER",
        });
        break;
    }
  };
  return {
    isOpen,
    setIsOpen,
    isAlertOpen,
    setIsAlertOpen,
    alertAction,
    handleTopClick,
    handleBottomClick,
    getAlertContent,
    handleAlertAction,
    updateMemberPermissions,
    removeMember,
  };
};
