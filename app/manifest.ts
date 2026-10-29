import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "jaynee.ng",
    short_name: "jaynee",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fffdfd",
    theme_color: "#b40032",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
