import { ButtonModule } from 'primeng/button';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { InspectRoutineStore } from 'src/app/features/approvals/services/inspect-routine/inspect-routine-store';
import { DividerModule } from 'primeng/divider';
import { InspectRoutinePlantsStore } from 'src/app/features/approvals/services/inspect-routine/inspect-routine-plants-store';
import { PrimengDatePipe } from '@sharedPp/primeng-date-pipe';

@Component({
  selector: 'app-routine-detail-card',
  imports: [DividerModule, ButtonModule, PrimengDatePipe],
  template: `
    @let plants = inspectRoutinePlantsStore.inspectRoutinePlants();

    <div
      class=" h-full w-full items-start flex flex-col justify-start py-4 px-2 rounded-2xl shadow-sm">
      <!-- Header -->
      <div class="flex w-full justify-between mb-4">
        <span class="text-lg text-surface-900 dark:text-surface-0 font-semibold"
          >Inspeção #{{ selectedInspectRoutine?.id }}</span
        >
        <span class="text-lg text-surface-900 dark:text-surface-0 font-semibold"
          >Zona {{ selectedInspectRoutine?.region }}</span
        >
      </div>

      <!-- Funcionário -->
      <div class="flex flex-col gap-2">
        <span class="text-md text-surface-900 dark:text-surface-0 font-semibold"
          >Funcionário que realizou a inspeção</span
        >
        <span class="ml-4 text-sm text-surface-700 dark:text-surface-100">{{
          selectedInspectRoutine?.users?.full_name
        }}</span>
      </div>

      <p-divider class="h-[1px]" />

      <!-- Data -->
      <div class="flex flex-col gap-2">
        <span class="text-md text-surface-900 dark:text-surface-0 font-semibold"
          >Data da submissão</span
        >
        <span class="ml-4 text-sm text-surface-700 dark:text-surface-100">{{
          selectedInspectRoutine?.date! | primengDate
        }}</span>
      </div>

      <p-divider class="h-[1px]" />

      <!-- Bottom -->
      <div class="flex justify-between w-full">
        <p-button
          [label]="plants.length.toString() + ' plantas'"
          icon="pi pi-hashtag"
          [rounded]="true"
          severity="primary" />

        @if (selectedInspectRoutine?.approved) {
          <p-button
            label="Pendente"
            [rounded]="true"
            severity="success"
            icon="pi pi-check-circle" />
        } @else {
          <p-button label="Pendente" [rounded]="true" severity="warn" icon="pi pi-check-circle" />
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutineDetailCardComponent {
  public inspectRoutineStore = inject(InspectRoutineStore);

  public inspectRoutinePlantsStore = inject(InspectRoutinePlantsStore);

  public selectedInspectRoutine = this.inspectRoutineStore.selectedInspectRoutine();
}
