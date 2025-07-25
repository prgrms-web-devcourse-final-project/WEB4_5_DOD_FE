"use client";
import takka from "@/assets/images/rabbit_vote2.png";
import Image from "next/image";
import { Station } from "@/types/station";
import { useEffect, useState } from "react";
import SubwayCard from "@/components/ui/SubwayCard";
import PopupMessage from "@/components/ui/PopupMessage";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import HeaderTop from "@/components/layout/HeaderTop";
import { useRouter } from "next/navigation";
import getTotalTravelTime from "@/app/utils/getTotalTravelTime";

const dummyUserData = [
  { latitude: 37.50578860265, longitude: 126.753192450274 },
];

const cache: { [key: string]: number } = {};

const dummyData = [
  {
    locationName: "기흥역",
    latitude: 37.2754972009506,
    longitude: 127.115955078051,
    suggestedMemberId: 1,
    voteCount: 5,
    metroLines: ["2", "4", "5"],
    stationColors: ["#00A84D", "#0052A4", "#996CAC"],
    travelTime: 47,
    noVoteCount: 0,
  },
  {
    locationName: "강남역",
    latitude: 37.49808633653005,
    longitude: 127.02800140627488,
    suggestedMemberId: 2,
    voteCount: 2,
    metroLines: ["2", "8"],
    stationColors: ["#00A84D", "#E6186C"],
    travelTime: 47,
    noVoteCount: 0,
  },
  {
    locationName: "홍대입구역",
    latitude: 37.5568707448873,
    longitude: 126.923778562273,
    suggestedMemberId: 3,
    voteCount: 8,
    metroLines: ["2", "5", "경의중앙", "수인분당"],
    stationColors: ["#00A84D", "#996CAC", "#77C4A3", "#FABE00"],
    travelTime: 47,
    noVoteCount: 0,
  },
];

const listVariants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
  hidden: {},
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const ElectionSpot = () => {
  const userPosition = dummyUserData[0];
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [staionList, setStationList] = useState(dummyData);
  // const [loading, setLoading] = useState(true);

  const isActive = selectedId !== null;

  const router = useRouter();

  useEffect(() => {
    const fetchTravelTimes = async () => {
      //setLoading(true);
      const updateStations = await Promise.all(
        dummyData.map(async (station) => {
          const cacheKey = `${userPosition.longitude},${userPosition.latitude}-${station.longitude},${station.latitude}`;

          if (cache[cacheKey]) {
            return { ...station, travelTime: cache[cacheKey] };
          }

          try {
            const time = await getTotalTravelTime(
              {
                x: userPosition.longitude,
                y: userPosition.latitude,
              },
              {
                x: station.longitude,
                y: station.latitude,
              }
            );
            cache[cacheKey] = time;
            return { ...station, travelTime: time };
          } catch (err) {
            console.error("계산 실패", err);
            return { ...station, travelTime: -1 };
          }
        })
      );
      setStationList(updateStations);
      //setLoading(false);
    };
  }, [userPosition.longitude, userPosition.latitude]);

  return (
    <main className="flex flex-col h-screen w-full mx-auto">
      <div className="hidden sm:block">
        <Header />
      </div>
      <HeaderTop fontColor="black" backward={true}>
        카츠오모이 가는 날
      </HeaderTop>

      <div className="pt-[112px] px-5 flex-1 flex flex-col justify-between">
        {/* 상단 설명/이미지 */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col gap-2 text-left pt-12 justify-center">
            <h1 className="font-semibold text-xl text-[var(--color-gray)] sm:text-2xl">
              카츠오모이 가는 날
            </h1>
            <h1 className="font-semibold text-xl text-[var(--color-black)] sm:text-2xl">
              <span className="text-[var(--color-primary-400)]">모임 지역</span>{" "}
              투표하기
            </h1>
            <h2 className="font-semibold text-base sm:text-xl text-[var(--color-gray-placeholder)]">
              <span className="text-[var(--color-primary-400)]">3개</span>의
              역이 선정되었습니다.
            </h2>
          </div>
          <Image src={takka} alt="vote" width={144} height={216} />
        </div>

        <div className="flex-1 flex flex-col justify-center w-full">
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-3"
          >
            {staionList.map((station, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                onClick={() => setSelectedId(station.suggestedMemberId)}
              >
                <SubwayCard
                  station={station as Station}
                  isSelected={selectedId === station.suggestedMemberId}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-7 mb-8">
          <PopupMessage>
            출발지 선택이{" "}
            <span className="text-[var(--color-primary-400)]">완료</span>
            되었어요!
          </PopupMessage>
          <Button
            state={isActive ? "default" : "disabled"}
            onClick={() => {
              if (isActive) {
                router.push("election/result");
              }
            }}
          >
            투표완료
          </Button>
        </div>
      </div>
    </main>
  );
};
export default ElectionSpot;
