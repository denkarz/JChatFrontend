import i18n from '@/main';


export function toNormTime(time: string | number): string {
  const sec_num = parseInt(time as string, 10);

  const hours = Math.floor(sec_num / 3600);
  const minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  const seconds = sec_num - (hours * 3600) - (minutes * 60);

  let result = '';
  result += hours > 0 ? hours + 'ч ' : '';
  result += minutes > 0 ? minutes + 'м ' : '';
  result += seconds > 0 && hours === 0 ? seconds + 'c' : '';

  return result === '' ? 'н/д' : result;
}


export const month_list: string[] = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

export const short_weekdays_list = [
  'Вс',
  'Пн',
  'Вт',
  'Ср',
  'Чт',
  'Пт',
  'Сб',
];

export class Time {
  public days: number;
  public hours: number;
  public minutes: number;

  constructor(milliseconds: number) {
    if (milliseconds > 0) {
      this.days = Math.floor(milliseconds / 86400000);
      const day_ms = milliseconds % 86400000;

      this.hours = Math.floor(day_ms / 3600000);
      this.minutes = Math.floor((day_ms % 3600000) / 60000);
    } else {
      this.days = this.hours = this.minutes = 0;
    }
  }
}


export function pretty_date(date: Date): string {
  date = new Date(date);
  const hh = date.getHours();
  const mm = date.getMinutes();
  return date.getDate() + ' ' + month_list[date.getMonth()] + ' в ' +
    ((hh < 10) ? '0' : '') + hh + ((mm < 10) ? ':0' : ':') + mm;
}

export function pretty_short_date(date: Date | string): string {
  date = new Date(date);
  const yy = date.getFullYear();
  const currentDate = new Date();
  if (currentDate.getFullYear() === yy) {
    return date.getDate() + ' ' + i18n.tc('date.month.' + month_list[date.getMonth()]);
  } else {
    return date.getDate() + ' ' + i18n.tc('date.month.' + month_list[date.getMonth()]) + ' ' + (yy) + ' ' + i18n.tc('date.year');// + month_list[date.getMonth()];
  }

}

export function duration(f_date: Date, l_date?: Date): string {
  let result = '';
  const yy = f_date.getFullYear();
  const currentDate = new Date();
  if (!!l_date && f_date.getDate() !== (l_date.getDate())) {
    if (f_date.getFullYear() === l_date.getFullYear()) {
      if (f_date.getMonth() === l_date.getMonth()) {
        result = f_date.getDate() + ' - ' + l_date.getDate() + ' ' + month_list[l_date.getMonth()];
      } else {
        result = f_date.getDate() + ' ' + month_list[f_date.getMonth()] + ' - ' + l_date.getDate() + ' ' + month_list[l_date.getMonth()];
      }
      if (currentDate.getFullYear() !== yy) {
        result = result + ' ' + (yy) + ' года';
      }
    } else {
      result = f_date.getDate() + ' ' + month_list[f_date.getMonth()] + ' ' + (yy) + ' года' +
        ' - ' + l_date.getDate() + ' ' + month_list[l_date.getMonth()] + ' ' + l_date.getFullYear() + ' года';
    }
  } else {
    result = pretty_short_date(f_date);
  }
  return result;
}

export function time_difference(then: Date, now: Date): Time {
  const diff = then.getTime() - now.getTime();
  // if (diff < 0) {
  //   return null;
  // }

  return new Time(diff);
}

