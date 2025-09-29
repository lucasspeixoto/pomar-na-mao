import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  imports: [CommonModule],
  template: `
    <label
      [attr.for]="for"
      [ngClass]="'mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 ' + className">
      <ng-content></ng-content>
    </label>
  `,
  styles: ``,
})
export class LabelComponent {
  @Input() for?: string;
  @Input() className = '';
}
