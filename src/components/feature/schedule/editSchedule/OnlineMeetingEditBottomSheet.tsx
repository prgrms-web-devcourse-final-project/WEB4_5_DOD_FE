import BottomSheet from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ShareButton from "@/components/ui/ShareButton";
import Image from "next/image";
import { ChangeEvent, useEffect } from "react";
import BottomSheetHeader from "@/components/layout/BottomSheetHeader";
import { useOnlineMeetingForm } from "./hooks/useOnlineMeetingForm";
import {
  ONLINE_MEETING_PLATFORM,
  ONLINE_MEETING_PLATFORM_NAME,
} from "../constants/platform";

interface OnlineMeetingEditBottomSheetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  scheduleId: string;
  platform: string | undefined;
  url: string | undefined;
}

const OnlineMeetingEditBottomSheet = ({
  isOpen,
  setIsOpen,
  scheduleId,
  platform,
  url,
}: OnlineMeetingEditBottomSheetProps) => {
  const {
    selectedPlatform,
    inputValue,
    handleChangePlatform,
    handleCreateMeetingRoom,
    handleUpdateMeetingRoom,
    handleDeleteMeetingRoom,
    setInputValue,
    isError,
  } = useOnlineMeetingForm(scheduleId, () => setIsOpen(false));

  useEffect(() => {
    if (isOpen) {
      if (url) setInputValue(url);
      if (platform) handleChangePlatform(platform as OnlineMeetingPlatformType);
    }
  }, [isOpen, handleChangePlatform, platform, setInputValue, url]);
  return (
    <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen} snapPoints={[0.8]}>
      {() => (
        <div className="min-w-[375px] w-full max-w-185 flex flex-col items-center px-5 mx-auto pt-3 gap-8 h-[calc(100vh-28vh)] relative">
          <BottomSheetHeader
            setIsOpen={setIsOpen}
            title="온라인 회의장 정하기"
          />
          <ShareButton
            title="회의장이 없나요?"
            description="Zoom 회의장을 만들어드려요"
            mode="help"
            color="var(--color-primary-100)"
            borderColor="var(--color-primary-400)"
            onClick={handleCreateMeetingRoom}
          />
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-5">
              <p className="font-medium text-[color:var(--color-black)] text-sm">
                온라인 회의장 종류
              </p>
              <div className="flex gap-6">
                {(
                  Object.keys(
                    ONLINE_MEETING_PLATFORM
                  ) as OnlineMeetingPlatformType[]
                ).map((p) => (
                  <div
                    key={p}
                    className={`flex justify-center items-center w-10 h-10 rounded-lg cursor-pointer
                      ${
                        selectedPlatform === p
                          ? "bg-[color:var(--color-muted)]"
                          : ""
                      }
                      hover:bg-[color:var(--color-muted)]`}
                    onClick={() => handleChangePlatform(p)}
                  >
                    <Image
                      src={ONLINE_MEETING_PLATFORM[p]}
                      alt={`${p} 아이콘`}
                      className="w-6 h-6"
                    />
                  </div>
                ))}
              </div>
            </div>
            <Input
              fullWidth
              placeholder="온라인 회의장 링크를 입력해주세요"
              value={inputValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)
              }
            />
            {isError && (
              <p className="text-[color:var(--color-red)] text-sm ml-2">
                유효한 {ONLINE_MEETING_PLATFORM_NAME[selectedPlatform!]} 회의
                링크를 입력해주세요.
              </p>
            )}
          </div>
          <div className="absolute bottom-9 w-full px-5 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center gap-4">
            <button
              className="cursor-pointer text-[color:var(--color-red)] text-xs font-semibold text-center"
              onClick={handleDeleteMeetingRoom}
            >
              삭제하기
            </button>
            <Button
              onClick={handleUpdateMeetingRoom}
              state={`${
                !inputValue || !selectedPlatform ? "disabled" : "default"
              }`}
            >
              저장하기
            </Button>
          </div>
        </div>
      )}
    </BottomSheet>
  );
};

export default OnlineMeetingEditBottomSheet;
