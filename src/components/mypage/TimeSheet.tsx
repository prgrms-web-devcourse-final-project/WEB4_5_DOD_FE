import { X } from "lucide-react";
import BottomSheet from "../ui/BottomSheet";
import { Button } from "../ui/Button";
import Schedule from "../feature/Schedule";

type TimeSheetType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSave: () => void;
};

function TimeSheet({ isOpen, setIsOpen, onSave }: TimeSheetType) {
  return (
    <BottomSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      initialSnap={0}
      snapPoints={[0.9]}
      disableDrag={true}
    >
      {() => (
        <div className="w-full h-[90%] flex flex-col px-5 gap-8 pb-12">
          <div className="flex justify-between items-center px-5">
            <X className="invisible" />
            <span className="text-base font-medium mt-3">나의 가능한 시간</span>
            <X
              size={20}
              onClick={() => setIsOpen(false)}
              className="text-[var(--color-black)] cursor-pointer"
            />
          </div>
          <div className="w-full flex-1 flex justify-center overflow-y-auto ">
            <Schedule />
          </div>
          <div className="flex justify-center">
            <Button onClick={onSave}>저장하기</Button>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}
export default TimeSheet;
