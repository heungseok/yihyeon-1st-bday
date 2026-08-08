import type { Invitation } from "@/config/invitation";
import { assetPath } from "@/lib/paths";

export const getCurrentUrl = () => window.location.href.split("#")[0];

export const copyText = async (text: string) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
};

export const getAbsoluteAssetUrl = (path: string) =>
  new URL(assetPath(path), window.location.origin).toString();

export const shareWithWebApi = async (data: Invitation) => {
  const url = getCurrentUrl();
  if (navigator.share) {
    await navigator.share({
      title: data.share.title,
      text: data.share.description,
      url,
    });
    return "shared" as const;
  }
  await copyText(url);
  return "copied" as const;
};
