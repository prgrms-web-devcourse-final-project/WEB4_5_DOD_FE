import { Calendar } from "@/components/feature/calendar/Calender";
import { Button } from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import { Dispatch, SetStateAction } from "react";
import { getHourlyTimeOptions } from "@/app/utils/dateFormat";

interface TimeSelectorProps {
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

const TimeSelector = ({
  selectedDate,
  setSelectedDate,
  onComplete,
  setStartTime,
  setEndTime,
  startTime,
  endTime,
  isError,
  setIsError,
}: TimeSelectorProps) => {
  const timeOptions = getHourlyTimeOptions();
  return (
    <div className="flex flex-col w-full gap-4 items-center">
      <div className="flex justify-center items-center gap-4">
        <div className="w-30" onClick={() => setIsError(false)}>
          <Dropdown
            options={timeOptions}
            defaultIndex={0}
            onSelect={setStartTime}
          />
        </div>
        <div>-</div>
        <div className="w-30" onClick={() => setIsError(false)}>
          <Dropdown
            options={timeOptions}
            defaultIndex={24}
            onSelect={setEndTime}
          />
        </div>
      </div>
      {isError && (
        <p className="text-[color:var(--color-red)] text-xs ml-2 text-center w-full">
          시작 시간은 끝나는 시간보다 빨라야 해요!
        </p>
      )}
      <Calendar
        isCompact={false}
        selectionMode="single"
        selected={selectedDate}
        setSelected={setSelectedDate}
      />
      <div
        className={`absolute w-full px-5 bottom-9 left-1/2 -translate-x-1/2`}
      >
        <Button
          onClick={onComplete}
          state={`${
            !startTime || !endTime || !selectedDate ? "disabled" : "default"
          }`}
        >
          수정 완료
        </Button>
      </div>
    </div>
  );
};

export default TimeSelector;
