import BottomSheet from "@/components/ui/BottomSheet";
import Image from "next/image";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import BottomSheetHeader from "@/components/layout/BottomSheetHeader";
import { useWorkspaceForm } from "./hooks/useWorkspaceForm";
import { workspaceLogos, workspaceTypes } from "./constants/workspace";
import { ChangeEvent } from "react";
import { useParams } from "next/navigation";
import { WORKSPACE_PLATFORM_NAME } from "../../constants/platform";

const WorkspaceBottomSheet = ({
  isOpen,
  setIsOpen,
  workspaceId,
  defaultValue,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  workspaceId: string;
  defaultValue?: { type: string; name: string; url: string } | null;
}) => {
  const params = useParams();
  const scheduleId = params.id as string;

  const {
    name,
    setName,
    url,
    setUrl,
    platform,
    setPlatform,
    handleCreateOrUpdate,
    handleDelete,
    isError,
    setIsError,
  } = useWorkspaceForm({
    scheduleId,
    workspaceId,
    defaultValue,
    onClose: () => setIsOpen(false),
  });

  return (
    <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen} snapPoints={[0.75]}>
      {() => (
        <div className="px-5 w-full flex flex-col gap-4 h-[calc(100vh-32vh)] relative">
          <BottomSheetHeader
            setIsOpen={setIsOpen}
            title={defaultValue ? "워크스페이스 편집" : "워크스페이스 등록"}
          />
          <div className="w-full max-w-[740px] flex flex-col mx-auto gap-4">
            <div className="w-full space-y-4">
              <h3 className="text-xs font-medium ml-2">워크 스페이스 종류</h3>
              <div className="flex gap-6 justify-center items-center">
                {workspaceTypes.map((workspaceType) => (
                  <button
                    key={workspaceType}
                    onClick={() => {
                      setPlatform(workspaceType);
                      setIsError(false);
                    }}
                    className={`w-8 h-8 flex justify-center items-center cursor-pointer rounded-lg transition-all duration-200
                      ${
                        platform === workspaceType
                          ? "bg-[color:var(--color-muted)]"
                          : "hover:bg-[color:var(--color-muted)]"
                      }`}
                  >
                    <div className="w-5 h-5 relative flex-shrink-0">
                      <Image
                        src={workspaceLogos[workspaceType]}
                        alt={workspaceType}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Input
              maxLength={10}
              label="워크스페이스 이름"
              placeholder="워크스페이스 이름을 입력해주세요"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
            <Input
              label="URL"
              placeholder="워크스페이스 링크 주소를 입력해주세요"
              value={url}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUrl(e.target.value)
              }
            />
            {isError && platform && (
              <p className="text-[color:var(--color-red)] text-sm ml-2">
                유효한 {WORKSPACE_PLATFORM_NAME[platform]} 워크스페이스 링크를
                입력해주세요.
              </p>
            )}
          </div>

          <div className="w-full flex justify-center items-center flex-col gap-4 mt-8 absolute left-1/2 -translate-x-1/2 px-5 bottom-9">
            {defaultValue && (
              <button
                className="text-[color:var(--color-red)] text-xs cursor-pointer"
                onClick={handleDelete}
              >
                삭제하기
              </button>
            )}
            <Button
              onClick={handleCreateOrUpdate}
              state={!name || !url || !platform ? "disabled" : "default"}
            >
              저장하기
            </Button>
          </div>
        </div>
      )}
    </BottomSheet>
  );
};

export default WorkspaceBottomSheet;
