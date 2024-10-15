import dayjs from 'dayjs';

export interface Institution {
  name: string;
  description: string;
  schedule: {
    day: string,
    open: boolean,
    start: dayjs.Dayjs;
    finish: dayjs.Dayjs;
  }[];
  address: string;
  coordinates: [number, number];
}

export interface InstitutionTypes {
  _id: string;
  userId: string;
  name: string;
  description: string;
  schedule: {
    day: string,
    open: boolean,
    start: dayjs.Dayjs;
    finish: dayjs.Dayjs;
  }[];
  rating: number;
  approved: boolean;
  address: string;
  coordinates: [number, number];
}
