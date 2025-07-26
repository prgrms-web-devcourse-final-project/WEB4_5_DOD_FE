type AllPlatformType = OnlineMeetingPlatformType | WorkspacePlatformType;

export const isValidUrl = (
  platform: AllPlatformType | undefined,
  url: string
): boolean => {
  if (!platform || !url) return false;

  const checkedUrl = url.toLowerCase();

  try {
    new URL(url);
  } catch {
    return false;
  }

  switch (platform) {
    case "ZOOM":
      return checkedUrl.includes("zoom.us");
    case "GOOGLE_MEET":
      return checkedUrl.includes("meet.google.com");
    case "DISCORD":
      return checkedUrl.includes("discord.gg");
    case "ZEP":
      return checkedUrl.includes("zep.us");

    case "GITHUB":
      return checkedUrl.includes("github.com");
    case "NOTION":
      return checkedUrl.includes("notion.so");
    case "FIGMA":
      return checkedUrl.includes("figma.com");
    case "GOOGLE_DOCS":
      return checkedUrl.includes("docs.google.com");
    case "MIRO":
      return checkedUrl.includes("miro.com");
    case "CANVA":
      return checkedUrl.includes("canva.com");

    default:
      return false;
  }
};
