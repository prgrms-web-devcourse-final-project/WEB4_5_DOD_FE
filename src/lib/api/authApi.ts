import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axiosInstance } from "./axiosInstance";
import { useRouter } from "next/navigation";
import { logout } from "./userApi";

const updateName = async (newName: string) => {
  const res = await axiosInstance.patch("/member/me", null, {
    params: { username: newName },
  });
  return res.data;
};

export const useUpdateName = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateName,
    onSuccess: (data) => {
      console.log("이름 변경 성공: ", data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast("이름 수정 완료! 🎉", {
        style: {
          borderRadius: "50px",
          background: "var(--color-white)",
          border: "1px solid var(--color-primary-400)",
          color: "var(--color-primary-400)",
        },
      });
    },
    onError: (err) => {
      console.error("이름 변경 실패: ", err);
    },
  });
};

export const useUpdateProfileImg = () => {
  return useMutation({
    mutationFn: () => axiosInstance.patch("/member/profile"),
    onSuccess: () => {
      toast("프로필 랜덤 수정 완료! 🎉", {
        style: {
          borderRadius: "50px",
          background: "var(--color-white)",
          border: "1px solid var(--color-primary-400)",
          color: "var(--color-primary-400)",
        },
      });
    },
  });
};

interface CreateFavoritePayload {
  stationName: string;
  latitude: number;
  longitude: number;
}

const addFavoriteLocation = async (payload: CreateFavoritePayload) => {
  const res = await axiosInstance.post("/favorite-location", payload);
  return res.data;
};

export const useAddFavoriteLocation = () => {
  return useMutation({
    mutationFn: addFavoriteLocation,
    onSuccess: () => {
      console.log("주변역 등록 완료");
      toast("내 주변역 등록 완료! 📍", {
        style: {
          borderRadius: "50px",
          background: "var(--color-white)",
          border: "1px solid var(--color-primary-400)",
          color: "var(--color-primary-400)",
        },
      });
    },
    onError: (error) => {
      console.error("주변역 등록 실패", error);
    },
  });
};

//즐겨찾기 장소 등록

interface FavoritePayload {
  favoritePlaceId: number;
  stationName: string;
  latitude: number;
  longitude: number;
}

const updateFavoriteLocation = async (payload: FavoritePayload) => {
  return await axiosInstance.patch("/favorite-location", payload);
};

export const useUpdateFavoriteLocation = () => {
  return useMutation({
    mutationFn: updateFavoriteLocation,
    onSuccess: () => {
      console.log("주변역 수정 완료");
      toast("내 주변역 등록 완료! 📍", {
        style: {
          borderRadius: "50px",
          background: "var(--color-white)",
          border: "1px solid var(--color-primary-400)",
          color: "var(--color-primary-400)",
        },
      });
    },
    onError: (err) => {
      console.error("주변역 등록 실패", err);
    },
  });
};

export const useLogoutMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast("로그아웃되었습니다. 🫥", {
        style: {
          borderRadius: "50px",
          background: "var(--color-white)",
          border: "1px solid var(--color-primary-400)",
          color: "var(--color-primary-400)",
        },
      });
      router.push("/");
    },
    onError: (err) => {
      console.error("로그아웃 실패", err);
    },
  });
};

export const useDeactiveMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: () => axiosInstance.delete("/member/withdraw"),
    onSuccess: () => {
      toast("탈퇴되었습니다. 🫥", {
        style: {
          borderRadius: "50px",
          background: "var(--color-white)",
          border: "1px solid var(--color-primary-400)",
          color: "var(--color-primary-400)",
        },
      });
      router.push("/");
    },
    onError: (err) => {
      console.error("탈퇴 실패", err);
    },
  });
};

export const useCalendarSync = () => {
  return useMutation({
    mutationFn: () => axiosInstance.post("/calendar/sync"),
    onSuccess: () => {
      toast("구글 캘린더 연동 완료! 🎉", {
        style: {
          borderRadius: "50px",
          background: "var(--color-white)",
          border: "1px solid var(--color-primary-400)",
          color: "var(--color-primary-400)",
        },
      });
    },
  });
};
