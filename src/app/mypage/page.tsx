"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/lib/api/userApi";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/api/axiosInstance";

import { kakaoSearch } from "@/types/kakaoSearch";

import Profile from "@/components/mypage/Profile";
import ListBox from "@/components/mypage/ListBox";
import NameSheet from "@/components/mypage/NameSheet";
import TimeSheet from "@/components/mypage/TimeSheet";
import StationSheet from "@/components/mypage/StationSheet";
import AlertBox from "@/components/ui/AlertBox";

import {
  useAddFavoriteLocation,
  useCalendarSync,
  useDeactiveMutation,
  useLogoutMutation,
  useUpdateFavoriteLocation,
  useUpdateName,
  useUpdateProfileImg,
} from "@/lib/api/authApi";
// import { profileImages } from "@/lib/profileImages";

type SheetType = "name" | "time" | "station";

function MyPage() {
  const { data: user, refetch } = useUser();
  // console.log(user.data);
  const [name, setName] = useState(user?.data.name);
  const [newName, setNewName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [sheetType, setSheetType] = useState<SheetType | null>(null);
  const [calendarSynced, setCalendarSynced] = useState(false);

  // 즐겨찾기 조회
  const favoriteQuery = useQuery({
    queryKey: ["favoriteLocation"],
    queryFn: async () => {
      const res = await axiosInstance.get("/favorite-location");
      const list = res.data.data;
      return list.length > 0 ? list[0] : { stationName: "미등록" };
    },
  });

  const [myStation, setMyStation] = useState<string>(
    () => favoriteQuery.data?.stationName
  );

  useEffect(() => {
    refetch(); // 마운트 시 user 데이터 패치
  }, [refetch]);

  // useEffect(() => {
  //   if (favoriteQuery.data) {
  //     setMyStation(favoriteQuery.data.stationName);
  //   }
  // }, [favoriteQuery.data]);

  const openSheet = (type: SheetType) => {
    setSheetType(type);
    setIsOpen(true);
  };

  const updateName = useUpdateName();
  const handleNameSave = () => {
    updateName.mutate(newName, {
      onSuccess: () => {
        setName(newName);
        refetch();
        setIsOpen(false);
      },
    });
  };

  const updateProfileImg = useUpdateProfileImg();
  const handleRandomProfile = () => {
    updateProfileImg.mutate(undefined, {
      onSuccess: () => {
        refetch(); // 새로운 프로필 반영
        // setProfile();
      },
    });
  };

  const addFavoriteLocation = useAddFavoriteLocation();
  const updateFavoriteLocation = useUpdateFavoriteLocation();

  const handleStationSave = (station: kakaoSearch) => {
    const stationName = station.place_name;
    const longitude = Number(station.x);
    const latitude = Number(station.y);
    const favoritePlaceId = Number(favoriteQuery.data?.favoriteLocationId);

    if (favoritePlaceId) {
      updateFavoriteLocation.mutate(
        { favoritePlaceId, stationName, latitude, longitude },
        {
          onSuccess: (res) => {
            const updated = res.data?.stationName || stationName;
            setMyStation(updated);
          },
        }
      );
    } else {
      addFavoriteLocation.mutate(
        { stationName, latitude, longitude },
        {
          onSuccess: (res) => {
            const createdName = res.data?.stationName || stationName;
            setMyStation(createdName);
          },
        }
      );
    }
    setIsOpen(false);
  };

  const calendarMutation = useCalendarSync();
  const handleGoogleCalendar = () => {
    calendarMutation.mutate();
    setCalendarSynced((prev) => !prev);
  };

  const logoutMutation = useLogoutMutation();
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const deactivateMutation = useDeactiveMutation();
  const handleLeave = () => {
    deactivateMutation.mutate();
  };

  return (
    <div className="w-full flex flex-col py-8">
      <div className="flex flex-1 flex-col justify-between gap-[4vh]">
        <div className="flex flex-col gap-8">
          {user?.data && (
            <Profile
              name={name}
              email={user.data.email}
              profile={user.data.profileImageNumber}
              editHandler={() => openSheet("name")}
              onChangeProfile={handleRandomProfile}
            />
          )}

          <div className="flex flex-col gap-4">
            <ListBox buttonText="수정" clickHandler={() => openSheet("time")}>
              가능한 시간
            </ListBox>
            <ListBox
              buttonText="등록"
              station={myStation || "미등록"}
              clickHandler={() => openSheet("station")}>
              내 주변역
            </ListBox>
            <ListBox
              onConnect={handleGoogleCalendar}
              isConnected={calendarSynced}>
              캘린더 연동
            </ListBox>
          </div>
        </div>

        <div className="flex justify-center items-center text-xs gap-24">
          <AlertBox
            actionHandler={handleLeave}
            content="탈퇴하시겠습니까?"
            cancel="취소"
            action="탈퇴">
            <span className="font-light text-[var(--color-gray-placeholder)] hover:text-[var(--color-primary-400)] cursor-pointer">
              계정탈퇴
            </span>
          </AlertBox>
          <AlertBox
            actionHandler={handleLogout}
            content="로그아웃하시겠습니까?"
            cancel="취소"
            action="로그아웃">
            <span className="font-light text-[var(--color-gray-placeholder)] hover:text-[var(--color-primary-400)] cursor-pointer">
              로그아웃
            </span>
          </AlertBox>
        </div>
      </div>

      {/* 이름 수정 */}
      {sheetType === "name" && (
        <NameSheet
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          text={newName}
          onChange={(e) => setNewName(e.target.value)}
          onSave={handleNameSave}
        />
      )}

      {/* 시간 설정 */}
      {sheetType === "time" && (
        <TimeSheet
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onSave={() => {
            // 시간 저장 로직
            setIsOpen(false);
          }}
        />
      )}

      {/* 주변역 등록 */}
      {sheetType === "station" && (
        <StationSheet
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onSave={handleStationSave}
        />
      )}
    </div>
  );
}

export default MyPage;
