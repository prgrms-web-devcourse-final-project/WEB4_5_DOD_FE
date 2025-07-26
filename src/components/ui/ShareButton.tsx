import { IoPaperPlaneOutline } from "react-icons/io5";
import { MdHowToVote, MdKeyboardArrowRight } from "react-icons/md";
import { FiCalendar } from "react-icons/fi";
import { Frown, Plus } from "lucide-react";

/**
 * @param title - 버튼 타이틀
 * @param description - 버튼 설명
 * @param mode - 버튼 모드 (share: 공유, vote: 투표)
 * @param color - 버튼 색상
 * @param borderColor - 버튼 테두리 색상
 * @param onClick - 버튼 클릭 시 실행할 함수
 *
 * @returns 공유 버튼 컴포넌트
 */
const ShareButton = ({
  title,
  description,
  mode = "share",
  color = "white",
  borderColor,
  onClick,
}: {
  title: string;
  description: string;
  mode?: "share" | "vote" | "group" | "help" | "invite";
  color?: string;
  borderColor?: string;
  onClick?: () => void;
}) => {
  const icon = () => {
    if (mode === "share") return <IoPaperPlaneOutline />;
    if (mode === "vote") return <MdHowToVote />;
    if (mode === "group") return <FiCalendar />;
    if (mode === "help") return <Frown className="w-4 h-4 " />;
    if (mode === "invite")
      return (
        <Plus className="w-5 h-5 rounded-full text-[color:var(--color-primary-400)] bg-[color:var(--color-primary-100)] p-1" />
      );
  };

  return (
    <>
      <div
        className={`w-full flex flex-row rounded-md px-5 py-4 justify-between cursor-pointer shadow-md transition-all duration-300 hover:scale-101 ${
          borderColor ? "border" : ""
        }`}
        style={{
          backgroundColor: color,
          ...(borderColor ? { borderColor } : {}),
        }}
        onClick={onClick}
      >
        <div className="flex flex-row gap-4">
          <div className="font-bold flex items-center justify-center">
            {icon()}
          </div>
          <div className="flex flex-col justify-start gap-2">
            <div className="text-sm">{title}</div>
            <div
              className={`${
                mode === "invite"
                  ? "text-[color:var(--color-gray-placeholder)]"
                  : "text-[color:var(--color-primary-300)]"
              } text-xs`}
            >
              {description}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <MdKeyboardArrowRight />
        </div>
      </div>
    </>
  );
};
export default ShareButton;
