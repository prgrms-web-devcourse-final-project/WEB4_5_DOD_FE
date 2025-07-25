import githubIcon from "@/assets/icon/github_icon.svg";
import notionIcon from "@/assets/icon/notion_icon.svg";
import miroIcon from "@/assets/icon/miro_icon.svg";
import canvaIcon from "@/assets/icon/canva_icon.svg";
import googledocsIcon from "@/assets/icon/googledocs_icon.svg";
import figmaIcon from "@/assets/icon/figma_icon.svg";
import Image from "next/image";
import { Edit } from "lucide-react";

interface WorkspaceItemProps {
  type: "GITHUB" | "NOTION" | "MIRO" | "FIGMA" | "CANVA" | "GOOGLE_DOCS";
  name: string;
  url: string;
  onClick?: (data: { type: string; name: string; url: string }) => void;
}

const workspaceLogos = {
  GITHUB: githubIcon,
  NOTION: notionIcon,
  MIRO: miroIcon,
  FIGMA: figmaIcon,
  CANVA: canvaIcon,
  GOOGLE_DOCS: googledocsIcon,
};

const WorkspaceItem = ({ type, name, url, onClick }: WorkspaceItemProps) => {
  const logo = workspaceLogos[type];
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
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate whitespace-nowrap overflow-hidden block max-w-full"
          >
            {url}
          </a>
        </div>
      </div>
    </>
  );
};
export default WorkspaceItem;
