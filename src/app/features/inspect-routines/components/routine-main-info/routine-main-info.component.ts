import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { RoutineMainInfo } from '../../models/routine-main-info';
import { DatePipe } from '@angular/common';
import { FirstAndLastnamePipe } from '../../../../shared/pipe/first-and-lastname.pipe';

@Component({
  selector: 'app-routine-main-info',
  imports: [DatePipe, FirstAndLastnamePipe],
  templateUrl: './routine-main-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      @layer utilities {
        .text-gradient {
          @apply bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] bg-clip-text text-transparent;
        }
      }
    `,
  ],
})
export class RoutineMainInfoComponent {
  @Input() public routineDetail!: RoutineMainInfo;

  @Input() public currentInspectRoutineId!: string | null;
}
