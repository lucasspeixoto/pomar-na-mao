import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortTimestamp',
})
export class ShortTimestampPipe implements PipeTransform {
  public transform(timestamp: number): string {
    const date = new Date(timestamp);

    const formattedDate = date.toLocaleString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    return formattedDate;
  }
}
