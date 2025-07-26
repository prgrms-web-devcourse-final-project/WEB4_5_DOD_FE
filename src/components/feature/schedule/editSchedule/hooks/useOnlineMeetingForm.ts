import { useCallback, useState } from "react";
import {
  useCreateMeetingRoom,
  useUpdateScheduleInfo,
} from "@/lib/api/scheduleApi";
import { isValidUrl } from "@/app/utils/validateUrl";

export const useOnlineMeetingForm = (scheduleId: string, close: () => void) => {
  const [selectedPlatform, setSelectedPlatform] =
    useState<OnlineMeetingPlatformType | null>(null);
  const [inputValue, setInputValue] = useState("");
  const createMeetingRoom = useCreateMeetingRoom();
  const updateScheduleInfo = useUpdateScheduleInfo();
  const [isError, setIsError] = useState(false);

  const handleChangePlatform = useCallback(
    (p: OnlineMeetingPlatformType | null) => {
      setSelectedPlatform(p);
      setIsError(false);
    },
    []
  );

  const handleCreateMeetingRoom = () => {
    createMeetingRoom.mutate(scheduleId);
    close();
  };

  const handleUpdateMeetingRoom = () => {
    if (selectedPlatform && inputValue) {
      if (!isValidUrl(selectedPlatform, inputValue)) {
        setIsError(true);
        return;
      }
      updateScheduleInfo.mutate({
        scheduleId,
        data: {
          meetingPlatform: selectedPlatform as OnlineMeetingPlatformType,
          platformURL: inputValue,
        },
      });
      setIsError(false);
      close();
    }
  };

  const handleDeleteMeetingRoom = () => {
    updateScheduleInfo.mutate({
      scheduleId,
      data: {
        meetingPlatform: "NONE",
        platformURL: null,
      },
    });
    setInputValue("");
    handleChangePlatform(null);
    close();
  };

  return {
    selectedPlatform,
    inputValue,
    handleChangePlatform,
    handleCreateMeetingRoom,
    handleUpdateMeetingRoom,
    handleDeleteMeetingRoom,
    setInputValue,
    isError,
  };
};
