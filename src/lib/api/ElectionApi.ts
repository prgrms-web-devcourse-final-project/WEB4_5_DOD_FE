import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";

export interface CreateDepartLocationRequest {
  memberId: string;
  departLocationName: string;
  latitude: number;
  longitude: number;
}

/*
 * 중간 장소 후보 조회
 * @param scheduleId 스케줄 ID, data(유저id, 출발지역 이름, 위도, 경도)
 * @returns
 */
export const getSuggestedLocations = async (scheduleId: string) => {
  const res = await axiosInstance.get(
    `/schedules/show-suggested-locations/${scheduleId}`
  );
  return res.data;
};

/**
 * 출발 장소 등록
 * @param scheduleId 스케줄 ID, data(유저id, 출발지역 이름, 위도, 경도)
 * @returns
 */
export const createDepartLocation = async (
  scheduleId: string,
  data: CreateDepartLocationRequest
) => {
  const res = await axiosInstance.post(
    `/schedules/create-depart-location/${scheduleId}`,
    data,
    {
      params: {
        scheduleId,
      },
    }
  );
  return res.data;
};

/**
 * 중간 장소 투표
 * @param scheduleMemberId 투표한 멤버 ID, 위치정보(위도, 경도)
 * @returns
 */
export const voteMiddleLocation = async (
  scheduleMemberId: string,
  location: {
    latitude: number;
    longitude: number;
  }
) => {
  const res = await axiosInstance.post(
    `/api/v1/schedules/suggested-locations/vote/${scheduleMemberId}`,
    location
  );
  return res.data;
};

//React Query 훅
//중간 장소 후보 조회
export const useSuggestedLocations = (scheduleId: string) => {
  return useQuery({
    queryKey: ["suggestedLocations", scheduleId],
    queryFn: () => getSuggestedLocations(scheduleId),
    enabled: !!scheduleId,
  });
};

//출발 장소 틍록
export const useCreateDepartLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      scheduleId,
      location,
    }: {
      scheduleId: string;
      location: CreateDepartLocationRequest;
    }) => createDepartLocation(scheduleId, location),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduleDetail"] });
    },
    onError: (error) => {
      console.error("출발 장소 등록 실패", error);
    },
  });
};

//중간 장소 투표
export const useVoteDepartLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      scheduleMemberId,
      location,
    }: {
      scheduleMemberId: string;
      location: {
        latitude: number;
        longitude: number;
      };
    }) => voteMiddleLocation(scheduleMemberId, location),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suggestedLocations"] });
    },
    onError: (error) => {
      console.error("투표 실패", error);
    },
  });
};

//테스트용 세부 일정 api 연결
export const getSchedule = async (scheduleId: string) => {
  const res = await axiosInstance.get(`/schedules/show/${scheduleId}`);
  return res.data.data;
};

export const useSchedule = (scheduleId: string) => {
  return useQuery<ScheduleDetailType>({
    queryKey: ["groupSchedule", scheduleId],
    queryFn: () => getSchedule(scheduleId),
    enabled: !!scheduleId, // scheduleId가 있어야 실행
    retry: false,
    refetchOnWindowFocus: false,
  });
};
