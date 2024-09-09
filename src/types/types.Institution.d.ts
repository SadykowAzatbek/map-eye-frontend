import dayjs from 'dayjs';

export interface Institution {
  name: string;
  description: string;
  image: string;
  schedule: {
    day: string,
    open: boolean,
  }[],
  workingHours: {
    start: dayjs.Dayjs;
    finish: dayjs.Dayjs;
  };
  address: string;
  coordinates: [number, number];
}