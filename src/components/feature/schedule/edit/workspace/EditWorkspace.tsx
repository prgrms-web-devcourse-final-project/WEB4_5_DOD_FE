"use client";

import { useGroupSchedule } from "@/lib/api/scheduleApi";
import WorkspaceItem from "./WorkspaceItem";
import { useParams } from "next/navigation";
import WorkspaceSkeletonItem from "./WorkspaceSkeletonItem";
import { motion } from "framer-motion";
import WorkspaceBottomSheet from "./WorkspaceBottomSheet";
import { useWorkspaceModal } from "./hooks/useWorkspaceModal";
import { itemVariants, listVariants } from "../../motion";
import Image from "next/image";
import noWorkspaceImg from "@/assets/images/no_workspace.png";

interface WorkspaceType {
  type: WorkspacePlatformType;
  name: string;
  url: string;
  workspaceId: string;
}

const EditWorkspace = () => {
  const params = useParams();
  const id = params.id as string;
  const { data, isPending } = useGroupSchedule(id);
  const workspaces = data?.data?.workspaces;

  const { isOpen, selectedWorkspace, openModal, closeModal } =
    useWorkspaceModal();

  return (
    <>
      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {isPending &&
          Array.from({ length: 4 }).map((_, i) => (
            <WorkspaceSkeletonItem key={i} />
          ))}
        {workspaces?.length === 0 && !isPending && (
          <div className="flex flex-col items-center gap-4 pt-25">
            <motion.div variants={itemVariants}>
              <Image
                src={noWorkspaceImg}
                alt="워크스페이스가 없어요 이미지"
                width={100}
                height={100}
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="w-full flex justify-center items-end text-center text-sm text-[color:var(--color-gray-placeholder)] leading-6 gap-1"
            >
              <p>
                워크스페이스가 없어요 <br />
                새로운 워크스페이스를 등록해 봐요!{" "}
              </p>
            </motion.div>
          </div>
        )}

        {workspaces?.map((workspace: WorkspaceType) => (
          <motion.div variants={itemVariants} key={workspace.workspaceId}>
            <WorkspaceItem
              type={workspace.type}
              name={workspace.name}
              url={workspace.url}
              onClick={() => openModal(workspace)}
            />
          </motion.div>
        ))}
      </motion.div>

      {isOpen && selectedWorkspace && (
        <WorkspaceBottomSheet
          isOpen={isOpen}
          setIsOpen={closeModal}
          defaultValue={selectedWorkspace}
          workspaceId={selectedWorkspace.workspaceId}
        />
      )}
    </>
  );
};

export default EditWorkspace;
