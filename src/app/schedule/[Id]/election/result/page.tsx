"use client";

import SubwayCard from "@/components/ui/SubwayCard";
import tikky from "@/assets/images/rabbit_pin_sit.png";
import Image from "next/image";
import Map from "@/components/feature/kakaoMap/Map";
import { Button } from "@/components/ui/Button";
import PopupMessage from "@/components/ui/PopupMessage";
import HeaderTop from "@/components/layout/HeaderTop";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";

const dummyData = {
  locationName: "상동역",
  latitude: 37.5572,
  longitude: 126.9245,
  voteCount: 8,
  metroLines: ["2", "7"],
  stationColors: ["#33A23D", "#E9546B"],
  travelTime: 47,
};

const ElectionResult = () => {
  const router = useRouter();

  const goToSchedule = () => {
    router.push("/schedule/123");
  };
  return (
    <>
      <main className="flex flex-col h-screen w-full mx-auto">
        <div className="hidden sm:block">
          <Header />
        </div>
        <HeaderTop>카츠오모이 가는 날</HeaderTop>
        <div className="pt-[154px] px-5 flex flex-col justify-between gap-2 m-0">
          <h2 className="font-semibold sm:text-2xl text-xl text-[var(--color-gray)]">
            카츠오모이 가는 날
          </h2>

          <h1 className="font-semibold text-xl sm:text-2xl text-[var(--color-black)]">
            <span className="text-[var(--color-primary-400)]">중간 지점</span>{" "}
            투표 결과
          </h1>
        </div>
        <div className="flex flex-col px-5 w-full my-auto items-center gap-6 sm:gap-10 ">
          <div className="relative my-6 flex w-full ">
            <Image
              src={tikky}
              alt="img"
              width={104}
              height={110}
              className="absolute right-8 bottom-23.5 z-10"
            />
            <SubwayCard
              station={dummyData}
              isSelected={true}
              isPointer={false}
            />
          </div>
          <div className="w-[316px] sm:w-[500px] mx-auto aspect-square rounded-lg overflow-hidden shadow-[var(--shadow-common)]">
            <Map latitude={37.5058098} longitude={126.7531869} />
          </div>
        </div>
        <div className="w-full px-5 pb-8.5 flex flex-col items-center justify-center gap-4">
          <div className="sm:pt-0 pt-5">
            <PopupMessage>
              <span className="text-[var(--color-primary-400)]">2명</span>의
              친구들이
              <span className="text-[var(--color-primary-400)]"> 상동역</span>을
              택했습니다.
            </PopupMessage>
          </div>
          <Button onClick={goToSchedule}>세부 장소 정하러 가기</Button>
        </div>
      </main>
    </>
  );
};

export default ElectionResult;
