import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CheckboxComponent } from '../../../../shared/components/form/input/checkbox.component';
import { AvatarTextComponent } from '../../../../shared/components/ui/avatar/avatar-text.component';
import { FarmRegionService } from '../../../../shared/services/farm-region.service';
import { InspectRoutinePlantsService } from '../../services/inspect-routine-plants.service';
import { ModalComponent } from '../../../../shared/components/ui/modal/modal.component';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { Router } from '@angular/router';
import { TableSkeletonComponent } from '../../../../shared/components/skeleton/table-skeleton.component';
import { InspectRoutineService } from '../../services/inspect-routine.service';
import { Routine } from '../../models/routine.model';
import { SelectComponent } from '../../../../shared/components/form/select/select.component';
import { LabelComponent } from '../../../../shared/components/form/label/label.component';
import { UsersService } from '../../../../core/auth/services/users.service';
import { DateRangeComponent } from '../../../../shared/components/form/date-range/date-range.component';
import { getInitialDate } from '../../../../utils/date';

@Component({
  selector: 'app-inspect-routines-table',
  imports: [
    CommonModule,
    AvatarTextComponent,
    TableSkeletonComponent,
    CheckboxComponent,
    ButtonComponent,
    ModalComponent,
    SelectComponent,
    LabelComponent,
    DateRangeComponent,
  ],
  templateUrl: './inspect-routines-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectRoutinesTableComponent implements OnInit {
  public inspectRoutineService = inject(InspectRoutineService);

  public farmRegionService = inject(FarmRegionService);

  public inspectRoutinePlantsStore = inject(InspectRoutinePlantsService);

  public router = inject(Router);

  public usersService = inject(UsersService);

  public isDeleteModalOpen = false;

  public selectedRows: string[] = [];

  public selectAll: boolean = false;

  public selectedRoutineId: string | null = null;

  public isFiltersOpen = false;

  public initialDate = getInitialDate();

  public async ngOnInit(): Promise<void> {
    await this.inspectRoutineService.getInspectRoutinesDataHandler();
    await this.farmRegionService.getAllFarmRegionsHandler();
    await this.usersService.getAllUsers();
  }

  public closeDeleteRoutineConfirmationModal(): void {
    this.isDeleteModalOpen = false;
  }

  public handleConfirmDeleteRoutine(): void {
    if (this.selectedRoutineId) {
      this.inspectRoutineService.deleteInspectRoutine(this.selectedRoutineId);
    }

    this.closeDeleteRoutineConfirmationModal();
  }

  public handleDetailRoutine(routine: Routine): void {
    this.selectedRoutineId = routine.id;

    this.inspectRoutineService.setSelectedInspectRoutine(routine);

    this.router.navigate(['rotinas-de-inspecao', routine.id], {
      queryParams: {
        userName: routine.users.full_name,
        region: routine.region,
        date: routine.created_at,
      },
    });
  }

  public handleSelectAll(): void {
    this.selectAll = !this.selectAll;
    if (this.selectAll) {
      this.selectedRows = this.inspectRoutineService.inspectRoutines().map(row => row.id);
    } else {
      this.selectedRows = [];
    }
  }

  public handleRowSelect(id: string): void {
    if (this.selectedRows.includes(id)) {
      this.selectedRows = this.selectedRows.filter(rowId => rowId !== id);
    } else {
      this.selectedRows = [...this.selectedRows, id];
    }
  }

  public handleDeleteRoutine(routineId: string): void {
    this.selectedRoutineId = routineId;
    this.isDeleteModalOpen = true;
  }

  public toggleFiltersDropdown(): void {
    this.isFiltersOpen = !this.isFiltersOpen;
  }

  public closeFiltersDropdown(): void {
    this.isFiltersOpen = false;
  }

  public changeFarmRegionFilter(regionId: string): void {
    this.inspectRoutineService.selectedRegion.set(regionId);
  }

  public changeUserFilter(userId: string): void {
    this.inspectRoutineService.selectedUserId.set(userId);
  }

  public changeRangeDateFilter(rangeDate: string): void {
    this.inspectRoutineService.selectedRangeDate.set(rangeDate);
  }

  public searchInspectRoutinesWithFilter(): void {
    this.inspectRoutineService.getInspectRoutinesDataHandler();

    this.closeFiltersDropdown();
  }

  public seeAllInspectRoutines(): void {
    this.inspectRoutineService.clearFilters();
    this.inspectRoutineService.getInspectRoutinesDataHandler();
  }
}
