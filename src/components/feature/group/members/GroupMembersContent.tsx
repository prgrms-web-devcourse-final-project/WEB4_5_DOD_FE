import HeaderTop from "@/components/layout/HeaderTop";
import MemberList from "./MemberList";
import ShareButton from "@/components/ui/ShareButton";
import { useKakaoShare } from "@/lib/api/useKakaoShare";
import KakaoScript from "../../KakaoScript";

interface MemberDataType {
  userId: string;
  userName: string;
  groupRole: string;
  profileImageNumber: number;
}

interface GroupMembersContentProps {
  members: MemberDataType[];
  myId: string;
  isLeader: boolean;
  groupId: string;
}

const GroupMembersContent = ({
  members,
  myId,
  isLeader,
  groupId,
}: GroupMembersContentProps) => {
  // const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  const baseUrl = `https://localhost:3000`;
  const url = `${baseUrl}${`/group/${groupId}`}?fromInvite=true`;

  const { shareWithTemplate } = useKakaoShare();
  const handleKakaoShare = () => {
    shareWithTemplate(
      "지금 바로 그룹에 들어와서 일정을 확인하고, 필요한 시간도 추가해보세요.",
      url
    );
  };
  return (
    <div className="pt-25 sm:pt-40 min-w-[375px] w-full max-w-185 flex flex-col justify-center bg-[color:var(--color-primary-100)] mx-auto px-5 gap-5">
      <HeaderTop>그룹원</HeaderTop>
      <ShareButton
        title="그룹 멤버 초대하기"
        description="함께할 그룹원에게 초대장을 보내볼까요?"
        mode="invite"
        onClick={handleKakaoShare}
      />
      <MemberList
        members={members}
        myId={myId}
        isLeader={isLeader}
        groupId={groupId}
      />
      <KakaoScript />
    </div>
  );
};

export default GroupMembersContent;
