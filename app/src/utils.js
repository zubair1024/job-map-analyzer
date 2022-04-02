import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export const isNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

export const dayjsUtil = dayjs;
