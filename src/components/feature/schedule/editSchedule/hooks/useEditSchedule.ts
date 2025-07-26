"use client";
import {
  formatSchedule,
  isValidTimeRange,
  toISOStringWithTime,
} from "@/app/utils/dateFormat";
import {
  useDeleteSchedule,
  useGroupSchedule,
  useUpdateScheduleInfo,
} from "@/lib/api/scheduleApi";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export const useEditSchedule = (id: string) => {
  const router = useRouter();
  const { data: scheduleData, isPending: schedulePending } =
    useGroupSchedule(id);
  const [scheduleName, setScheduleName] = useState("");
  const [isError, setIsError] = useState(false);
  const [scheduleDescription, setScheduleDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const meetingType = scheduleData ? scheduleData.data.meetingType : "";
  const scheduleTime = scheduleData
    ? formatSchedule(scheduleData.data.startTime, scheduleData.data.endTime)
    : "";
  const deleteSchedule = useDeleteSchedule();
  const updateSchedule = useUpdateScheduleInfo();

  useEffect(() => {
    if (scheduleData) {
      setScheduleName(scheduleData.data.scheduleName);
      setScheduleDescription(scheduleData.data.description);
    }
  }, [scheduleData]);

  const handleScheduleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setScheduleName(e.target.value);
  };

  const handleScheduleDescriptionChange = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setScheduleDescription(e.target.value);
  };

  const handleTimeClick = () => {
    setIsOpen(!isOpen);
  };

  const handleEditTime = () => {
    if (selectedDate && startTime && endTime) {
      const isValid = isValidTimeRange(startTime, endTime);
      if (!isValid) {
        setIsError(true);
        return;
      }

      const startISOTime = toISOStringWithTime(selectedDate, startTime);
      const endISOTime = toISOStringWithTime(selectedDate, endTime);

      updateSchedule.mutate({
        scheduleId: id,
        data: {
          scheduleName,
          description: scheduleDescription,
          startTime: startISOTime!,
          endTime: endISOTime!,
        },
      });
      setIsError(false);
      setIsOpen(false);
    }
  };

  const handleEditInfo = () => {
    updateSchedule.mutate({
      scheduleId: id,
      data: {
        scheduleName,
        description: scheduleDescription,
      },
    });
    router.push(`/schedule/${id}`);
  };

  const handleDelete = () => {
    deleteSchedule.mutate(id);
    router.push("/");
  };

  return {
    scheduleName,
    scheduleDescription,
    meetingType,
    isOpen,
    selectedDate,
    scheduleTime,
    setIsOpen,
    setSelectedDate,
    handleScheduleNameChange,
    handleScheduleDescriptionChange,
    handleTimeClick,
    handleEditTime,
    handleDelete,
    startTime,
    endTime,
    setStartTime,
    setEndTime,
    handleEditInfo,
    schedulePending,
    isError,
    setIsError,
  };
};
