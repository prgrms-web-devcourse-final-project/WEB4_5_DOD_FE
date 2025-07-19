"use client";

import SubwaySearch from "@/components/feature/kakaoMap/SubwaySearch";
import { useEffect, useState } from "react";
import { kakaoSearch } from "@/types/kakaoSearch";
import Map from "@/components/feature/kakaoMap/Map";
import HeaderTop from "@/components/layout/HeaderTop";
import GroupHeader from "@/components/layout/GroupHeader";
import BottomSheet from "@/components/ui/BottomSheet";
//import Header from "@/components/layout/Header";
import useAuthStore from "@/sotres/authStores";
import { useParams } from "next/navigation";
import { useGroupSchedule } from "@/lib/api/scheduleApi";
import GlobalLoading from "@/app/loading";
import { useRouter } from "next/navigation";

const StartPoint = () => {
  const [selectedStation, setSelectedStation] = useState<kakaoSearch | null>(
    null
  );
  const [isSmOrLarger, setIsSmOrLarger] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(true);
  const [snapPoints, setSnapPoints] = useState([0.6, 0.33, 0.25]); //모바일 화면 비 값 : 서치결과, 서치, 선택
  const { user } = useAuthStore();
  const userId = user?.id;
  const params = useParams();
  const scheduleId = params.Id as string;
  const { data: scheduleData, isPending } = useGroupSchedule(scheduleId);
  //const route = useRouter();

  //console.log("scheduleId:", scheduleId);
  //console.log("Id:", userId);

  //스케줄 아이디가 없으면 메인으로
  // useEffect(() => {
  //   if (!userId || !scheduleData) {
  //     route.replace("/"); // 메인으로 리디렉트
  //   }
  // }, [userId, scheduleData, route]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmOrLarger(width >= 640);
      setSnapPoints(width >= 640 ? [0.4, 0.22, 0.16] : [0.6, 0.33, 0.25]);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const selectStationHandler = (station: kakaoSearch) => {
    setSelectedStation(station);
    console.log(station);
    //setIsSheetOpen(false);
    if (isPending) return <GlobalLoading />;
  };
  return (
    <main className="flex flex-col h-screen relative w-full mx-auto">
      <div className="hidden sm:block">{/* <Header type="blue" /> */}</div>
      {/* {isSmOrLarger ? (
        <GroupHeader
          name={scheduleData?.scheduleName}
          count={scheduleData?.members.length || 0}
          description={scheduleData?.description}
          isLeader={true}
          type="schedule"
        />
      ) : (
        <HeaderTop fontColor="black" backward={true} />
      )} */}
      <div className="flex-1 w-full ">
        <Map
          longitude={selectedStation ? Number(selectedStation.x) : 127.0106459}
          latitude={selectedStation ? Number(selectedStation.y) : 37.4849424}
        />
      </div>
      <BottomSheet
        isOpen={isSheetOpen}
        setIsOpen={setIsSheetOpen}
        snapPoints={snapPoints}
        initialSnap={1}
        className="px-4"
      >
        {(snapTo) => (
          <SubwaySearch
            onSelectStation={selectStationHandler}
            snapTo={snapTo}
            scheduleId={scheduleId}
            userId={userId!}
          />
        )}
      </BottomSheet>
    </main>
  );
};
export default StartPoint;
