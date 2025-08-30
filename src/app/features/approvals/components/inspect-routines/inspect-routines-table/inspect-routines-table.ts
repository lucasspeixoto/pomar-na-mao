import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
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

import { FarmRegionApi } from '@sharedS/farm-region-api';
import type { Routine } from '../../../models/routine.model';
import { approvedOptions } from '../../../utils/filter-options';
import { InspectRoutineLoadedPlantsConfirmationComponent } from '../inspect-routine-loaded-plants-confirmation/inspect-routine-loaded-plants-confirmation';
import { InspectRoutineStore } from '../../../services/inspect-routine/inspect-routine-store';
import { InspectRoutinePlantsStore } from '../../../services/inspect-routine/inspect-routine-plants-store';

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

const PIPES = [FirstAndLastnamePipe, PrimengDatePipe];

@Component({
  selector: 'app-inspect-routines-table',
  templateUrl: './inspect-routines-table.html',
  imports: [...PRIMENG, ...COMMON, ...PIPES, InspectRoutineLoadedPlantsConfirmationComponent],
  styles: [
    `
      .selected-inspect-routine {
        background-color: rgba(5, 150, 105, 0.1) !important;
        border-left: 4px solid var(--primary) !important;
        font-weight: 600;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectRoutinesTableComponent implements OnInit {
  public inspectRoutineStore = inject(InspectRoutineStore);

  public farmRegionApi = inject(FarmRegionApi);

  public inspectRoutinePlantsStore = inject(InspectRoutinePlantsStore);

  protected inspectRoutines = this.inspectRoutineStore.inspectRoutines;

  protected totalOfInspectRoutines = this.inspectRoutineStore.numberOfInspectRoutines;

  public showInspectRoutinePlants = false;

  public columns!: Column[];

  public filters = COLUMNS_FILTER_FIELDS;

  public expandedRows = {};

  public selectedInspectRoutine: Routine | null = null;

  public approvedOptions = approvedOptions;

  public ngOnInit(): void {
    this.inspectRoutineStore.selectedRegion.set('Z');
    this.inspectRoutineStore.getInspectRoutinesDataHandler();
  }

  public onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  public onApprovedStatusChange(event: SelectChangeEvent): void {
    this.inspectRoutineStore.selectedApprovedStatus.set(event.value);
    this.inspectRoutineStore.getInspectRoutinesDataHandler();
  }

  public onRegionChange(event: SelectChangeEvent): void {
    this.inspectRoutineStore.selectedRegion.set(event.value);
    this.inspectRoutineStore.getInspectRoutinesDataHandler();
  }

  public showInspectRoutinePlantsDetails(routine: Routine): void {
    this.inspectRoutineStore.setSelectedInspectRoutine(routine);
    this.inspectRoutinePlantsStore.getInspectRoutinePlantsDataHandler(routine.id);
    this.showInspectRoutinePlants = true;
  }
}
