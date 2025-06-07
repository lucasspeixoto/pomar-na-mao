import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'epochToTime',
})
export class EpochToTimePipe implements PipeTransform {
  public transform(timestamp: number): string {
    if (!timestamp) {
      return 'Tempo inválido!';
    }

    const date = new Date(timestamp);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const pad = (num: number): string => num.toString().padStart(2, '0');

    return `${pad(hours)}h:${pad(minutes)}m:${pad(seconds)}s`;
  }
}
