import { backdropLooks, heroLook } from "@/lib/data/clothes";

export const gallery = {
  hero: backdropLooks[0]?.src ?? heroLook.src,
  atelier: backdropLooks[1]?.src ?? heroLook.src,
  fabricPrint: backdropLooks[2]?.src ?? heroLook.src,
};
