import BottomSheet from "@/components/ui/BottomSheet";
import TimeSelector from "./TimeSelector";
import { Dispatch, SetStateAction } from "react";
import BottomSheetHeader from "@/components/layout/BottomSheetHeader";

interface TimeEditBottomSheetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedDate: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
  onComplete: () => void;
  setStartTime: (str: string) => void;
  setEndTime: (str: string) => void;
  startTime: string;
  endTime: string;
  isError: boolean;
  setIsError: (bool: boolean) => void;
}

const TimeEditBottomSheet = ({
  isOpen,
  setIsOpen,
  selectedDate,
  setSelectedDate,
  onComplete,
  setStartTime,
  setEndTime,
  startTime,
  endTime,
  isError,
  setIsError,
}: TimeEditBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen} snapPoints={[0.9]}>
      {() => (
        <div className="w-[375px] flex flex-col items-center px-5 mx-auto pt-3 gap-8 h-[calc(100vh-18vh)] relative">
          <BottomSheetHeader setIsOpen={setIsOpen} title="모임 시간 수정" />
          <TimeSelector
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            onComplete={onComplete}
            startTime={startTime}
            endTime={endTime}
            isError={isError}
            setIsError={setIsError}
          />
        </div>
      )}
    </BottomSheet>
  );
};

export default TimeEditBottomSheet;
