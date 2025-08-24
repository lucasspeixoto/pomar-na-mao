import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule, type SelectChangeEvent } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputMaskModule } from 'primeng/inputmask';
import { DatePickerModule } from 'primeng/datepicker';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DrawerModule } from 'primeng/drawer';
import type { Column } from 'src/app/shared/models/columns.model';

import { PrimengDatePipe } from '@sharedPp/primeng-date-pipe';
import { FirstAndLastnamePipe } from '@sharedPp/first-and-lastname-pipe';
import { OccurencePipe } from '@sharedPp/occurence-pipe';

import { FarmRegionApi } from '@sharedS/farm-region-api';
import type { WorkRoutine } from '../../../models/work-routine.model';
import { WorkRoutineStore } from '../../../services/work-routine-store';
import { approvedOptions } from '../../../utils/filter-options';
import { WorkRoutinePlantsStore } from '../../../services/work-routine-plants-store';
import { WorkRoutineLoadedPlantsConfirmationComponent } from '../work-routine-loaded-plants-confirmation/work-routine-loaded-plants-confirmation';

const COLUMNS_FILTER_FIELDS = ['users.full_name', 'routine_name', 'occurrence', 'region'];

const PRIMENG = [
  TooltipModule,
  InputMaskModule,
  DatePickerModule,
  TableModule,
  ButtonModule,
  ToastModule,
  ToolbarModule,
  RatingModule,
  InputTextModule,
  TextareaModule,
  SelectModule,
  InputNumberModule,
  DialogModule,
  TagModule,
  InputIconModule,
  IconFieldModule,
  ConfirmDialogModule,
  DrawerModule,
];

const COMMON = [FormsModule, ReactiveFormsModule, PrimengDatePipe];

const PIPES = [FirstAndLastnamePipe, PrimengDatePipe, OccurencePipe];

@Component({
  selector: 'app-work-routines-table',
  templateUrl: './work-routines-table.html',
  imports: [...PRIMENG, ...COMMON, ...PIPES, WorkRoutineLoadedPlantsConfirmationComponent],
  styles: [
    `
      .selected-work-routine {
        background-color: rgba(5, 150, 105, 0.1) !important;
        border-left: 4px solid var(--primary) !important;
        font-weight: 600;
      }

      .step-overrides {
        .p-step {
          padding-bottom: 30px;
        }

        .p-drawer-header {
          padding: 2px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkRoutinesTableComponent {
  public workRoutineStore = inject(WorkRoutineStore);

  public farmRegionApi = inject(FarmRegionApi);

  public workRoutinePlantsStore = inject(WorkRoutinePlantsStore);

  protected workRoutines = this.workRoutineStore.workRoutines;

  protected totalOfWorkRoutines = this.workRoutineStore.numberOfWorkRoutines;

  public showWorkRoutinePlants = false;

  public columns!: Column[];

  public filters = COLUMNS_FILTER_FIELDS;

  public expandedRows = {};

  public selectedWorkRoutine: WorkRoutine | null = null;

  public approvedOptions = approvedOptions;

  public onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  public onApprovedStatusChange(event: SelectChangeEvent): void {
    this.workRoutineStore.selectedApprovedStatus.set(event.value);
    this.workRoutineStore.getWorkRoutinesDataHandler();
  }

  public onRegionChange(event: SelectChangeEvent): void {
    this.workRoutineStore.selectedRegion.set(event.value);
    this.workRoutineStore.getWorkRoutinesDataHandler();
  }

  public showWorkRoutinePlantsDetails(routine: WorkRoutine): void {
    this.workRoutineStore.setSelectedWorkRoutine(routine);
    this.workRoutinePlantsStore.getWorkRoutinePlantsDataHandler(routine.id);
    this.showWorkRoutinePlants = true;
  }
}
