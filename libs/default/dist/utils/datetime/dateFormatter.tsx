import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import React from 'react';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(duration);

type DayJSFormatterProps = {
  timestamp: number | string | null;
  timezone: string;
  output: 'today' | 'OnlyUnix' | 'UnixRegular' | 'unixRelative' | 'regular' | 'relativeTime' | 'month&date' | 'hour&sec';
  className?: string;
};

export const DayJSFormatter: React.FC<DayJSFormatterProps> = ({ timestamp, timezone, output, className = '' }) => {
  let formattedTime: React.ReactNode = '';
  const timeObject = dayjs.duration(typeof timestamp === 'number' ? timestamp : 0, 'seconds');

  if (output === 'today') {
    formattedTime = <span className={className}>{dayjs.tz(new Date(), timezone).format("DD MMMM")}</span>;
  } else if (output === "OnlyUnix") {
    const utcTime = dayjs.unix(Number(timestamp)).utc().format('YYYY-MM-DD HH:mm:ss');
    const timeFormat = dayjs.utc(utcTime).tz(timezone);
    formattedTime = <span className={className}>{timeFormat.fromNow()}</span>;
  } else if (output === "UnixRegular") {
    const utcTime = dayjs.unix(Number(timestamp)).utc().format('YYYY-MM-DD HH:mm:ss');
    const timeFormat = dayjs.utc(utcTime).tz(timezone);
    formattedTime = <span className={className}>{timeFormat.format('MMM DD, YYYY HH:mm:ss')}</span>;
  } else if (output === 'unixRelative') {
    if (timeObject.asDays() >= 1) {
      formattedTime = `${Math.floor(timeObject.asDays())} day${Math.floor(timeObject.asDays()) > 1 ? 's' : ''}`;
    } else if (timeObject.asHours() >= 1) {
      formattedTime = `${Math.floor(timeObject.asHours())} hr${Math.floor(timeObject.asHours()) > 1 ? 's' : ''}`;
    } else if (timeObject.asMinutes() >= 1) {
      formattedTime = `${Math.floor(timeObject.asMinutes())} min`;
    } else {
      formattedTime = `${Math.floor(timeObject.asSeconds())} sec`;
    }
  } else if (timestamp && typeof timestamp === 'string' && timestamp.length > 0) {
    const timeObj = dayjs.utc(timestamp).tz(timezone);
    if (output === "regular") {
      formattedTime = <span className={className}>{timeObj.format('MMM DD, YYYY HH:mm:ss')}</span>;
    } else if (output === "relativeTime") {
      formattedTime = <span className={className}>{timeObj.fromNow()}</span>;
    } else if (output === 'month&date') {
      formattedTime = <span className={className}>{timeObj.format('MMM DD YYYY')}</span>;
    } else if (output === 'hour&sec') {
      formattedTime = <span className={className}>{timeObj.format('HH:mm:ss')}</span>;
    }
  } else {
    formattedTime = <span className={className}>NA</span>;
  }

  return <>{formattedTime}</>;
};

// export default DayJSFormatter;