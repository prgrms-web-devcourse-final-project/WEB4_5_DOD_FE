import { ChevronLeft, Ellipsis } from "lucide-react";
import DropdownSmall from "../ui/DropdownSmall";
import ControlledAlertBox from "../ui/ControlledAlertBox";
import { useGroupHeaderActions } from "./hooks/useGroupHeaderAction";

type GroupHeaderType = "schedule" | "group";
interface GroupHeaderTopProps {
  name: string;
  id: string;
  isLeader: boolean;
  type?: GroupHeaderType;
}

const GroupHeaderTop = ({ name, id, isLeader, type }: GroupHeaderTopProps) => {
  const {
    isOpen,
    setIsOpen,
    isAlertOpen,
    setIsAlertOpen,
    handleBack,
    clickEllipsisHandler,
    handleTopClick,
    handleBottomClick,
    handleAlertAction,
    getDropdownItems,
    getAlertContent,
    shouldShowEllipsis,
  } = useGroupHeaderActions({ id, isLeader, type: type as GroupHeaderType });

  return (
    <div className="w-full flex justify-between items-center">
      <span onClick={handleBack} className="cursor-pointer">
        <ChevronLeft color={"var(--color-white)"} size={20} />
      </span>

      <span className="text-lg text-[color:var(--color-white)]">{name}</span>

      <span
        onClick={clickEllipsisHandler}
        className={`cursor-pointer relative ${
          !shouldShowEllipsis() ? "invisible" : ""
        }`}
      >
        <Ellipsis color={"var(--color-white)"} size={16} />

        {isOpen && (
          <div className="absolute top-full right-0 z-50 min-w-27 w-auto">
            <DropdownSmall
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              onTopClick={handleTopClick}
              onBottomClick={handleBottomClick}
            >
              {getDropdownItems()}
            </DropdownSmall>
          </div>
        )}
      </span>

      <ControlledAlertBox
        content={getAlertContent()}
        cancel="취소"
        action="확인"
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        actionHandler={handleAlertAction}
      />
    </div>
  );
};

export default GroupHeaderTop;
