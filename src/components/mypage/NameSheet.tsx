import { X } from "lucide-react";
import BottomSheet from "../ui/BottomSheet";
import { Button } from "../ui/Button";
import Input from "../ui/Input";
import { ChangeEvent } from "react";

type NameSheetType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  text: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
};

function NameSheet({
  isOpen,
  setIsOpen,
  text,
  onChange,
  onSave,
}: NameSheetType) {
  return (
    <BottomSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      initialSnap={0}
      snapPoints={[0.45]}>
      {() => (
        <div className="w-full flex flex-col relative  px-5 gap-8 pb-12 h-[calc(100vh-68%)]">
          <div className="flex justify-between items-center px-5">
            <X className="invisible" />
            <span className="text-base font-medium mt-3">이름 수정</span>
            <X
              size={20}
              onClick={() => setIsOpen(false)}
              className="text-[var(--color-black)] cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-4 w-full max-w-[700px] mx-auto">
            <Input
              label="이름"
              value={text}
              maxLength={10}
              onChange={onChange}
              placeholder="이름을 입력해주세요."
            />
          </div>
          <div
            className="flex absolute justify-center items-center min-w-[375px] left-1/2
-translate-x-1/2 w-full bottom-9 px-5">
            <Button
              onClick={() => {
                onSave();
                setIsOpen(false);
              }}>
              저장하기
            </Button>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}
export default NameSheet;
