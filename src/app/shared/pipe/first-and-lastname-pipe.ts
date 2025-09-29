import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstAndLastname',
})
export class FirstAndLastnamePipe implements PipeTransform {
  public transform(fullName: string): string {
    if (!fullName) return '';

    const parts = fullName.trim().split(/\s+/);

    if (parts.length === 1) {
      return parts[0];
    }

    const first = parts[0];
    const last = parts[parts.length - 1];

    return `${first} ${last}`;
  }
}
