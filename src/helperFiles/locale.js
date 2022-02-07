import locale from "antd/lib/date-picker/locale/cs_CZ";
import moment from "moment";
import "moment/locale/cs";

moment.locale("cs");

const data = {
  weekDays: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"],
  months: [
    "led",
    "úno",
    "bře",
    "dub",
    "kvě",
    "čvn",
    "čvc",
    "srp",
    "zář",
    "říj",
    "lis",
    "pro",
  ],
};

const czLocale = locale;

czLocale.lang.shortWeekDays = data.weekDays;
czLocale.lang.shortMonths = data.months;

export default czLocale;
