import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';

@Injectable()
export class CustomCalendarDateFormatter extends CalendarDateFormatter {
  override dayViewHour({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'HH:mm', locale || 'pt-BR');
  }

  override weekViewHour({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'HH:mm', locale || 'pt-BR');
  }
}
