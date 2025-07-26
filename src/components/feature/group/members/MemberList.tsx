import GroupMemberItem from "@/components/feature/group/GroupMemberItem";
import { motion } from "framer-motion";
import { itemVariants, listVariants } from "../../schedule/motion";

interface MemberDataType {
  userId: string;
  userName: string;
  groupRole: string;
  profileImageNumber: number;
}

interface MemberListProps {
  members: MemberDataType[];
  myId: string;
  isLeader: boolean;
  groupId: string;
}

const MemberList = ({ members, myId, isLeader, groupId }: MemberListProps) => {
  return (
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4 bg-[color:var(--color-white)] p-5 rounded-lg shadow-[var(--shadow-common)]"
    >
      {members.map((member: MemberDataType, index: number) => (
        <motion.div variants={itemVariants} key={`${member.userId}-${index}`}>
          <GroupMemberItem
            profileNum={member.profileImageNumber}
            name={member.userName}
            role={member.groupRole}
            myId={myId}
            memberId={member.userId}
            isLeader={isLeader}
            groupId={groupId}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MemberList;
