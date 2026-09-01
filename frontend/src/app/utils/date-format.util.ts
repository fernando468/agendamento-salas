export class DateFormatUtil {
  static formatDate(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    const datePart = value.slice(0, 10);
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(datePart);

    if (!match) {
      return value;
    }

    return `${match[3]}/${match[2]}/${match[1]}`;
  }

  static formatTime(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    const match = /^(\d{2}:\d{2})/.exec(value);
    return match?.[1] ?? value;
  }
}
