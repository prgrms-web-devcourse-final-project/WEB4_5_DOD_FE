import zoomIcon from "@/assets/icon/zoom_icon.svg";
import googleMeetIcon from "@/assets/icon/googlemeet_icon.svg";
import discordIcon from "@/assets/icon/discord_icon.svg";
import zepIcon from "@/assets/icon/zep_icon.svg";
import githubIcon from "@/assets/icon/github_icon.svg";
import notionIcon from "@/assets/icon/notion_icon.svg";
import figmaIcon from "@/assets/icon/figma_icon.svg";
import googleDocsIcon from "@/assets/icon/googledocs_icon.svg";
import miroIcon from "@/assets/icon/miro_icon.svg";
import canvaIcon from "@/assets/icon/canva_icon.svg";

export const ONLINE_MEETING_PLATFORM_NAME: Record<
  OnlineMeetingPlatformType,
  string
> = {
  ZOOM: "Zoom",
  GOOGLE_MEET: "Google Meet",
  DISCORD: "Discord",
  ZEP: "ZEP",
};

export const ONLINE_MEETING_PLATFORM = {
  ZOOM: zoomIcon,
  GOOGLE_MEET: googleMeetIcon,
  DISCORD: discordIcon,
  ZEP: zepIcon,
};

export const WORKSPACE_PLATFORM_NAME: Record<WorkspacePlatformType, string> = {
  GITHUB: "Github",
  NOTION: "Notion",
  FIGMA: "Figma",
  GOOGLE_DOCS: "Google Docs",
  MIRO: "Miro",
  CANVA: "Canva",
};

export const WORKSPACE_PLATFORM = {
  GITHUB: githubIcon,
  NOTION: notionIcon,
  FIGMA: figmaIcon,
  GOOGLE_DOCS: googleDocsIcon,
  MIRO: miroIcon,
  CANVA: canvaIcon,
};
