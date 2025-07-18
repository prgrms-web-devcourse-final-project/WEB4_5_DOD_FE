import { Search, X } from "lucide-react";
import BottomSheet from "../ui/BottomSheet";
import Input from "../ui/Input";
import { Button } from "../ui/Button";
import SearchPlaceList from "./SearchPlaceList";
import React, { useState } from "react";
import { kakaoSearch } from "@/types/kakaoSearch";
import { searchSubwayStation } from "@/app/utils/searchSubwayStation";

const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY as string;


type StationSheetType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSave: (station: kakaoSearch) => void;
};

const StationSheet = ({isOpen, setIsOpen, onSave}: StationSheetType) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<kakaoSearch[]>([]);
  // const [loading, setLoading] = useState(false);
  const [selectedStation, setSelectedStation] = useState<kakaoSearch | null>(null);

  const searchHandler = async () => {
    if (!query.trim()) return;
    // setLoading(true);
    try {
      const data = await searchSubwayStation(query, REST_API_KEY);
      setResults(data.documents);
    } catch {
      console.error("검색 실패");
    }
    // setLoading(false);
  };

  const saveHandler = () => {
    if (selectedStation) onSave(selectedStation);
  };

  return (

    <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen} initialSnap={0} snapPoints={[0.7]}>
      {() => (
        <div className="w-full flex flex-col px-5 gap-8 pb-12">
          <div className="flex justify-between items-center">
            <X className="invisible" />
            <span className="text-base font-medium">역찾기</span>
            <X size={20} onClick={() => setIsOpen(false)} className="cursor-pointer" />
          </div>
          <div className="w-full flex flex-col flex-1 min-h-0 gap-4 max-w-[700px] mx-auto ">
            <div className="w-full h-12">
            <Input
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && searchHandler()}
              icon={<Search onClick={searchHandler} className="w-4 h-4" />}
              placeholder="가까운 지하철을 검색해주세요."
              fullWidth
              className="h-full flex items-center px-4"
              />
              </div>
            <div className="flex flex-col flex-1 min-h-0 overflow-y-auto gap-2 bg-white rounded-lg py-2.5 px-2 w-full">
              {results.map((station, idx) => (
                <SearchPlaceList
                  key={idx}
                  stationName={station.place_name}
                  stationAddress={station.road_address_name}
                  onClick={() => setSelectedStation(station)}
                />
              ))}
            </div>
              <div className="w-full h-12">
              <Button
                state={selectedStation ? "default" : "disabled"}
                className="h-full flex items-center justify-center"
                onClick={saveHandler}
              >저장하기
              </Button>
            </div>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}

export default StationSheet;
