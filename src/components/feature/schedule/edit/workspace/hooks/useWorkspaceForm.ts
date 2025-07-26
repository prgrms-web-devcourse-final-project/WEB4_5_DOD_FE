import { useState } from "react";
import {
  useCreateWorkspace,
  useDeleteWorkspace,
  useUpdateScheduleInfo,
} from "@/lib/api/scheduleApi";
import { isValidUrl } from "@/app/utils/validateUrl";

interface UseWorkspaceFormProps {
  scheduleId: string;
  workspaceId: string;
  defaultValue?: {
    type: string;
    name: string;
    url: string;
  } | null;
  onClose: () => void;
}

export const useWorkspaceForm = ({
  scheduleId,
  workspaceId,
  defaultValue,
  onClose,
}: UseWorkspaceFormProps) => {
  const [name, setName] = useState(defaultValue?.name ?? "");
  const [url, setUrl] = useState(defaultValue?.url ?? "");
  const [platform, setPlatform] = useState<WorkspacePlatformType>(
    (defaultValue?.type as WorkspacePlatformType) ?? ""
  );
  const [isError, setIsError] = useState(false);
  const { mutate: createWorkspace } = useCreateWorkspace();
  const { mutate: deleteWorkspace } = useDeleteWorkspace({
    workspaceId,
    scheduleId,
  });
  const updateWorkspace = useUpdateScheduleInfo();

  const handleCreateOrUpdate = () => {
    if (platform && url && name) {
      if (!isValidUrl(platform, url)) {
        setIsError(true);
        return;
      }
    }

    if (defaultValue) {
      setIsError(false);
      updateWorkspace.mutate({
        scheduleId,
        data: {
          workspaceId: Number(workspaceId),
          workspace: [
            {
              type: platform,
              name,
              url,
            },
          ],
        },
      });
    } else {
      setIsError(false);
      createWorkspace({
        id: scheduleId,
        data: {
          workspaceType: platform,
          workspaceName: name,
          url,
        },
      });
    }

    onClose();
  };

  const handleDelete = () => {
    if (!platform) return;
    deleteWorkspace();
    onClose();
  };

  return {
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
  };
};
