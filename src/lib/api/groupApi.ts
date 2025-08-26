import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";
import { useRouter } from "next/navigation";
import Toast from "@/components/ui/Toast";
import ToastWell from "@/components/ui/ToastWell";
import { AxiosError } from "axios";

export interface UpdateMemberPermissionsReqeust {
  groupId: string;
  userId: string;
  groupRole: string;
}

export interface RemoveGroupMemberRequest {
  groupId: string;
  userId: string;
}

export interface GroupInfoType {
  groupName: string;
  description: string;
}

// 전체 그룹 조회
const getGroups = async () => {
  const res = await axiosInstance.get("/groups");
  return res.data;
};

/**
 * 그룹 정보 조회
 * @param groupId 그룹 이름
 * @returns
 */
export const getGroup = async (groupId: string) => {
  const res = await axiosInstance.get(`/groups/schedule-groups/${groupId}`);
  return res.data;
};

/**
 * 그룹 생성
 * @param groupName 그룹 이름
 * @param description 그룹 설명
 * @returns
 */
export const createGroup = async (groupInfo: GroupInfoType) => {
  const response = await axiosInstance.post("/groups/create", groupInfo);
  return response.data;
};

/**
 * 그룹 정보 수정
 * @param groupId 그룹 ID
 * @param groupName 그룹 이름
 * @param description 그룹 설명
 * @returns
 */
export const updateGroup = async (groupId: string, data: GroupInfoType) => {
  const response = await axiosInstance.patch(`/groups/${groupId}`, data);
  return response.data;
};

/**
 * 그룹 삭제
 * @param groupId 그룹 ID
 * @returns
 */
export const deleteGroup = async (groupId: string) => {
  const res = await axiosInstance.delete(`/groups/${groupId}`, { data: {} });
  return res.data;
};

/**
 * 일회성 일정으로 그룹 일정으로 편입
 * @param scheduleId 스케줄 ID
 * @param groupId 그룹 ID
 * @returns
 */
export const moveSchedule = async (scheduleId: number, groupId: number) => {
  const response = await axiosInstance.patch(`/groups/move-schedule`, {
    groupId,
    scheduleId,
  });
  return response.data;
};

const getGroupSchedules = async (groupId: string) => {
  const res = await axiosInstance.get(`/groups/schedule-groups/${groupId}`);
  return res.data;
};

export const getGroupStatistics = async (groupId: string) => {
  const res = await axiosInstance.get(`/groups/${groupId}/statistics`);
  return res.data;
};

export const getGroupMembers = async (groupId: string) => {
  const res = await axiosInstance.get(`/groups/${groupId}/member`);
  return res.data;
};

const leaveGroup = async (groupId: string) => {
  const res = await axiosInstance.patch(`/groups/${groupId}/leave`);
  return res.data;
};

const removeGroupMember = async (data: RemoveGroupMemberRequest) => {
  const res = await axiosInstance.patch(
    `/groups/${data.groupId}/members/${data.userId}`
  );
  return res.data;
};

const updateMemberPermissions = async (
  data: UpdateMemberPermissionsReqeust
) => {
  const res = await axiosInstance.patch(
    `/groups/${data.groupId}/members`,
    data
  );
  return res.data;
};

export const addGroupMember = async (groupId: string) => {
  const res = await axiosInstance.post(`/groups/${groupId}/member`);
  return res.data;
};

export const useAddGroupMember = (setIsMember: (bool: boolean) => void) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (groupId: string) => addGroupMember(groupId),
    onSuccess: (_, groupId) => {
      ToastWell("🎉", "그룹에 참여했습니다");
      setIsMember(true);
      router.push(`/group/${groupId}`);
      queryClient.invalidateQueries({ queryKey: ["group", groupId] });
      queryClient.invalidateQueries({ queryKey: ["groupMembers", groupId] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "groups"] });
    },
    onError: (err: Error, groupId) => {
      setIsMember(true);
      router.push(`/group/${groupId}`);
      console.log(err);
    },
  });
};

export const useUpdateMemberPermissions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateMemberPermissionsReqeust) =>
      updateMemberPermissions(data),
    onSuccess: (_, variables) => {
      ToastWell("✅", "권한 변경에 성공했습니다");
      queryClient.invalidateQueries({
        queryKey: ["groupMembers", variables.groupId],
      });
    },
    onError: (err) => {
      Toast("권한 변경에 실패했습니다");
      console.error("권한 변경 실패: ", err);
    },
  });
};

export const useRemoveGroupMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RemoveGroupMemberRequest) => removeGroupMember(data),
    onSuccess: (_, variables) => {
      ToastWell("✅", "그룹 멤버를 내보냈습니다");
      queryClient.invalidateQueries({
        queryKey: ["groupMembers", variables.groupId],
      });
    },
    onError: (err) => {
      Toast("그룹짱은 내보낼 수가 없습니다");
      console.error("그룹 멤버 내보내기 실패: ", err);
    },
  });
};

export const useLeaveGroup = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: leaveGroup,
    onSuccess: () => {
      ToastWell("✅", "그룹에서 나갔습니다");
      queryClient.invalidateQueries({ queryKey: ["user", "groupSchedule"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "groups"] });
      router.push(`/`);
    },
    onError: (err: AxiosError<{ message: string }>) => {
      const errMessage =
        err?.response?.data?.message || "그룹 나가기에 실패했습니다";
      Toast(errMessage);
    },
  });
};

export const useGroupSchedules = (groupId: string, isMember: boolean) => {
  return useQuery({
    queryKey: ["groupSchedule", groupId],
    queryFn: () => getGroupSchedules(groupId),
    enabled: !!groupId && isMember,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

export const useGroupStatistics = (groupId: string) => {
  return useQuery({
    queryKey: ["groupStatics", groupId],
    queryFn: () => getGroupStatistics(groupId),
    enabled: !!groupId,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

export const useGroupMembers = (groupId: string) => {
  return useQuery({
    queryKey: ["groupMembers", groupId],
    queryFn: () => getGroupMembers(groupId),
    enabled: !!groupId,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

export const useGroups = () => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (data: GroupInfoType) => createGroup(data),
    onSuccess: (response) => {
      if (response.code === "200" && response.data.groupId) {
        queryClient.invalidateQueries({ queryKey: ["dashboard", "groups"] });
        queryClient.invalidateQueries({ queryKey: ["groups"] });
        router.push(`/group/${response.data.groupId}/complete`);
      }
    },
    onError: () => {
      Toast("그룹 생성에 실패했습니다");
    },
  });
};

export const useUpdateGroupInfo = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ groupId, data }: { groupId: string; data: GroupInfoType }) =>
      updateGroup(groupId, data),
    onSuccess: (_, variables) => {
      ToastWell("✅", "정보 수정 완료!");
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "groups"],
      });
      queryClient.invalidateQueries({
        queryKey: ["groupSchedule", variables.groupId],
      });
      router.push(`/group/${variables.groupId}`);
    },
    onError: () => {
      Toast("앗, 정보 수정에 실패했어요");
    },
  });
};

export const useLoadPersonalSchedule = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      scheduleId,
      groupId,
    }: {
      scheduleId: number;
      groupId: number;
    }) => moveSchedule(scheduleId, groupId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["dashboard", "schedules"] });
      queryClient.invalidateQueries({
        queryKey: ["groupSchedule", String(variables.groupId)],
      });
      router.push(`/group/${variables.groupId}`);
      ToastWell("✅", "성공적으로 일정을 불러왔습니다!");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;

        if (status === 404) {
          Toast("이미 그룹에 속한 일정입니다");
        } else if (status === 403) {
          Toast("그룹에 속하지 않은 멤버가 존재합니다");
        } else {
          Toast(error.message || "오류가 발생했습니다");
        }
      } else {
        Toast("예상치 못한 오류가 발생했습니다");
      }
    },
  });
};
