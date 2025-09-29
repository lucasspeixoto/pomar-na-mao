import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestamp',
})
export class TimestampPipe implements PipeTransform {
  public transform(timestamp: number): string {
    const date = new Date(timestamp);

    const formattedDate = date.toLocaleString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    return formattedDate;
  }
}
