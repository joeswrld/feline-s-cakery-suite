import { useEffect } from "react";
import { useSiteLogo } from "@/hooks/useSiteLogo";

const DynamicFavicon = () => {
  const { data: logoUrl } = useSiteLogo();

  useEffect(() => {
    if (!logoUrl) return;

    let link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = logoUrl;
  }, [logoUrl]);

  return null;
};

export default DynamicFavicon;
