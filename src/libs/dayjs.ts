import i18n from "@/utils/translation/i18n";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

// first time
dayjs.locale(i18n.language);

// if language change letter
i18n.on("languageChanged", (lng) => {
  dayjs.locale(lng);
});

export default dayjs;
