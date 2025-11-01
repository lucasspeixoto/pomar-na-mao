import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CheckboxComponent } from '../../../../shared/components/form/input/checkbox.component';
import { AvatarTextComponent } from '../../../../shared/components/ui/avatar/avatar-text.component';
import { FarmRegionService } from '../../../../shared/services/farm-region.service';
import { InspectRoutinePlantsService } from '../../services/inspect-routine-plants.service';
import { ModalComponent } from '../../../../shared/components/ui/modal/modal.component';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { Router } from '@angular/router';
import { InspectRoutinesTableSkeletonComponent } from '../../../../shared/components/skeleton/inspect-routines-table-skeleton.component';
import {
  InspectRoutineService,
  type InspectRoutinesSearchInfo,
} from '../../services/inspect-routine.service';
import { Routine } from '../../models/routine.model';
import { SelectComponent } from '../../../../shared/components/form/select/select.component';
import { LabelComponent } from '../../../../shared/components/form/label/label.component';
import { UsersService } from '../../../../core/auth/services/users.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../shared/components/form/input/input-field.component';
import { getTransformedDateFromInput } from '../../../../utils/date';
import { CustomPaginatorComponent } from '../../../../shared/components/table/custom-paginator/custom-paginator.component';

export type InspectRoutinesSearchFilters = {
  region: string | null;
  userId: string | null;
  startCreatedAt: string | null;
  endCreatedAt: string | null;
};

@Component({
  selector: 'app-inspect-routines-table',
  imports: [
    CommonModule,
    AvatarTextComponent,
    InspectRoutinesTableSkeletonComponent,
    CheckboxComponent,
    ButtonComponent,
    ModalComponent,
    SelectComponent,
    LabelComponent,
    ReactiveFormsModule,
    InputFieldComponent,
    CustomPaginatorComponent,
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

  private fb = inject(FormBuilder);

  public pagedInspectRoutineList: Routine[] = [];

  public isDeleteModalOpen = false;

  public selectedRows: string[] = [];

  public selectAll: boolean = false;

  public selectedRoutineId: string | null = null;

  public isFiltersOpen = false;

  public searchFiltersForm = this.fb.group({
    region: [null as string | null],
    userId: [null as string | null],
    startCreatedAt: [null as string | null],
    endCreatedAt: [null as string | null],
  });

  public async ngOnInit(): Promise<void> {
    await this.farmRegionService.getAllFarmRegionsHandler();
    await this.usersService.getAllUsers();
    await this.checkStorageFiltersForm();
  }

  public onPageDataChanged(pagedData: Routine[]): void {
    this.pagedInspectRoutineList = pagedData;

    this.selectAll = false;
    this.selectedRows = [];
  }

  public async checkStorageFiltersForm(): Promise<void> {
    const searchFilters = localStorage.getItem('POMAR-NA-MAO:SEARCH-INSPECT-ROUTINES-FILTERS');
    if (searchFilters) {
      const searchFiltersForm = JSON.parse(searchFilters) as InspectRoutinesSearchFilters;
      this.searchFiltersForm.setValue(searchFiltersForm);
      const plantsSearchInfo = this.getInspectRoutinesSearchInfo(searchFiltersForm);
      await this.inspectRoutineService.getFilteredInspectRoutinesDataHandler(plantsSearchInfo);
    } else {
      await this.inspectRoutineService.getAllInspectRoutinesDataHandler();
    }
  }

  public getInspectRoutinesSearchInfo(
    inspectRoutinesSearchFilters: InspectRoutinesSearchFilters
  ): InspectRoutinesSearchInfo {
    const { region, userId, startCreatedAt, endCreatedAt } = inspectRoutinesSearchFilters;

    const createdAtRangeDate =
      startCreatedAt || endCreatedAt
        ? `${getTransformedDateFromInput(startCreatedAt!)} - ${getTransformedDateFromInput(endCreatedAt!)}`
        : null;

    return {
      region,
      userId,
      createdAtRangeDate,
    } as InspectRoutinesSearchInfo;
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

  public searchInspectRoutinesWithFilter(): void {
    const plantsSearchInfo = this.getInspectRoutinesSearchInfo(
      this.searchFiltersForm.value as InspectRoutinesSearchFilters
    );

    this.inspectRoutineService.getFilteredInspectRoutinesDataHandler(plantsSearchInfo);

    this.closeFiltersDropdown();

    localStorage.setItem(
      'POMAR-NA-MAO:SEARCH-INSPECT-ROUTINES-FILTERS',
      JSON.stringify(this.searchFiltersForm.value)
    );
  }

  public seeAllInspectRoutines(): void {
    this.inspectRoutineService.getAllInspectRoutinesDataHandler();
  }

  public async cleanSearchFilters(): Promise<void> {
    await this.inspectRoutineService.getAllInspectRoutinesDataHandler();
    this.searchFiltersForm.reset();
    localStorage.removeItem('POMAR-NA-MAO:SEARCH-INSPECT-ROUTINES-FILTERS');
    this.closeFiltersDropdown();
  }
}
