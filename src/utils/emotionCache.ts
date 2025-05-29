import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import stylisRTLPlugin from "stylis-plugin-rtl";

type Direction = "ltr" | "rtl";

export default function createEmotionCache(direction: Direction = "ltr") {
  return createCache({
    key: direction === "rtl" ? "mui-rtl" : "mui",
    stylisPlugins: direction === "rtl" ? [prefixer, stylisRTLPlugin] : [],
    prepend: true,
  });
}
