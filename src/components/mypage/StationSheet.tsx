import { Search, X } from "lucide-react";
import BottomSheet from "../ui/BottomSheet";
import Input from "../ui/Input";
import { Button } from "../ui/Button";
import SearchPlaceList from "./SearchPlaceList";
import { ChangeEvent } from "react";

type StationSheetType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  text: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
};

function StationSheet({
  isOpen,
  setIsOpen,
  text,
  onChange,
  onSave,
}: StationSheetType) {
  return (
    <BottomSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      initialSnap={0}
      snapPoints={[0.6]}
    >
      {() => (
        <div className="w-full h-full flex flex-col px-5 gap-8 pb-12">
          <div className="flex justify-between items-center px-5">
            <X className="invisible" />
            <span className="text-base font-medium mt-3">역찾기</span>
            <X
              size={20}
              onClick={() => setIsOpen(false)}
              className="text-[var(--color-black)] cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-4 w-full max-w-[700px] mx-auto">
            <Input
              value={text}
              icon={<Search className="w-4 h-4" />}
              onChange={onChange}
              placeholder="가까운 지하철을 검색해주세요."
            />
            {/* SearchPlaceList */}
            <div className="w-full flex flex-1 flex-col gap-2 rounded-lg bg-[var(--color-white)] py-2.5 overflow-y-auto ">
              <SearchPlaceList
                stationName="서울역"
                stationAddress="서울역 중구 퇴게로"
              />
              <SearchPlaceList
                stationName="서울역"
                stationAddress="서울역 중구 퇴게로"
              />
              <SearchPlaceList
                stationName="서울역"
                stationAddress="서울역 중구 퇴게로"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button onClick={onSave}>저장하기</Button>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}
export default StationSheet;
