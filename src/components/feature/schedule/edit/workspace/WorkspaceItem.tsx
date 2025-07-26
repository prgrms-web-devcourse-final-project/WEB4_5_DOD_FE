import Image from "next/image";
import { Edit } from "lucide-react";
import { WORKSPACE_PLATFORM } from "../../constants/platform";
import Link from "next/link";

interface WorkspaceItemProps {
  type: WorkspacePlatformType;
  name: string;
  url: string;
  onClick?: (data: { type: string; name: string; url: string }) => void;
}

const WorkspaceItem = ({ type, name, url, onClick }: WorkspaceItemProps) => {
  const logo = WORKSPACE_PLATFORM[type];
  return (
    <>
      <div className="min-w-[335px] max-w-185 w-full h-auto p-4 rounded-lg bg-[color:var(--color-white)] shadow-[var(--shadow-common)] gap-3 flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            {logo && (
              <div className="w-5 h-5 relative flex-shrink-0">
                <Image
                  src={logo}
                  alt={`${type} 로고`}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <span className="text-sm">{name}</span>
          </div>
          <Edit
            size={14}
            className="cursor-pointer text-[color:var(--color-gray)]"
            onClick={() => onClick?.({ type, name, url })}
          />
        </div>
        <div className="bg-[color:var(--color-gray-background)] rounded-sm text-[color:var(--color-gray)] px-2 py-1 text-xs underline">
          <Link
            href={url.startsWith("http") ? url : `https://${url}`}
            target="blank"
            className="truncate whitespace-nowrap overflow-hidden block max-w-full"
          >
            {url}
          </Link>
        </div>
      </div>
    </>
  );
};
export default WorkspaceItem;
