import Input from "@/components/ui/Input";
import { ChangeEvent } from "react";

interface ScheduleFormProps {
  scheduleName: string;
  scheduleDescription: string;
  scheduleTime: string;
  meetingType: string;
  onScheduleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onScheduleDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onTimeClick: () => void;
}

const ScheduleForm = ({
  scheduleName,
  scheduleDescription,
  meetingType,
  scheduleTime,
  onScheduleNameChange,
  onScheduleDescriptionChange,
  onTimeClick,
}: ScheduleFormProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Input
        label="모임 이름"
        error="10글자를 이내로 작성해주세요"
        maxLength={10}
        placeholder="모임 이름을 입력해주세요"
        value={scheduleName}
        onChange={onScheduleNameChange}
      />
      <Input
        label="모임 설명"
        error="50글자를 이내로 작성해주세요"
        maxLength={50}
        isTextarea={true}
        placeholder="모임 설명을 입력해주세요"
        value={scheduleDescription}
        onChange={onScheduleDescriptionChange}
      />
      <Input
        label="온/오프라인"
        value={meetingType === "ONLINE" ? "온라인" : "오프라인"}
        readOnly
        disabled
        className="text-[color:var(--color-gray-placeholder)]"
      />
      <Input
        label="모임 시간"
        value={scheduleTime}
        onClick={onTimeClick}
        icon={
          <button
            className="w-7 font-medium text-sm text-[color:var(--color-gray-placeholder)]] hover:text-[color:var(--color-primary-400)] cursor-pointer"
            onClick={onTimeClick}
          >
            수정
          </button>
        }
        readOnly
      />
    </div>
  );
};

export default ScheduleForm;
