import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CheckboxComponent } from '../../../../shared/components/form/input/checkbox.component';
import { ModalComponent } from '../../../../shared/components/ui/modal/modal.component';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { Router } from '@angular/router';
import { SelectComponent } from '../../../../shared/components/form/select/select.component';
import { LabelComponent } from '../../../../shared/components/form/label/label.component';
import { PlantsService } from '../../services/plants.service';
import { CustomPaginatorComponent } from '../../../../shared/components/table/custom-paginator/custom-paginator.component';
import { PlantData } from '../../models/plant-data';
import { FarmRegionService } from '../../../../shared/services/farm-region.service';
import { occurencesOptions } from '../../../../utils/occurrences';
import { PlantsTableSkeletonComponent } from '../../../../shared/components/skeleton/plants-table-skeleton.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../shared/components/form/input/input-field.component';
import { getTransformedDateFromInput } from '../../../../utils/date';
import type { PlantsSearchFilters } from '../../models/plants-search-filters';
import type { PlantsSearchInfo } from '../../models/plants-search-info';

@Component({
  selector: 'app-plants-table',
  imports: [
    CommonModule,
    CheckboxComponent,
    CustomPaginatorComponent,
    ButtonComponent,
    ModalComponent,
    SelectComponent,
    LabelComponent,
    PlantsTableSkeletonComponent,
    ReactiveFormsModule,
    InputFieldComponent,
  ],
  templateUrl: './plants-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlantsTableComponent implements OnInit {
  public router = inject(Router);

  public plantsService = inject(PlantsService);

  public farmRegionService = inject(FarmRegionService);

  private fb = inject(FormBuilder);

  public pagedPlantsList: PlantData[] = [];

  public isFiltersOpen = false;

  public isDeleteModalOpen = false;

  public isPlantDetailsOpen = false;

  public selectedRows: string[] = [];

  public selectAll: boolean = false;

  public selectedPlantId: string | null = null;

  public occurencesOptions = occurencesOptions;

  public searchFiltersForm = this.fb.group({
    region: [null as string | null],
    occurrence: [null as string | null],
    startLastWork: [null as string | null],
    endLastWork: [null as string | null],
  });

  public async ngOnInit(): Promise<void> {
    await this.farmRegionService.getAllFarmRegionsHandler();
    await this.checkStorageFiltersForm();
  }

  public async checkStorageFiltersForm(): Promise<void> {
    const searchFilters = localStorage.getItem('POMAR-NA-MAO:SEARCH-PLANTS-FILTERS');
    if (searchFilters) {
      const searchFiltersForm = JSON.parse(searchFilters) as PlantsSearchFilters;
      this.searchFiltersForm.setValue(searchFiltersForm);
      const plantsSearchInfo = this.getPlantsSearchInfo(searchFiltersForm);
      await this.plantsService.getFilteredPlantsHandler(plantsSearchInfo);
    } else {
      await this.plantsService.getAllPlantsHandler();
    }
  }

  public onPageDataChanged(pagedData: PlantData[]): void {
    this.pagedPlantsList = pagedData;

    this.selectAll = false;
    this.selectedRows = [];
  }

  public closeDeletePlantConfirmationModal(): void {
    this.isDeleteModalOpen = false;
  }

  public handleConfirmDeletePlant(): void {
    if (this.selectedPlantId) {
      //this.inspectRoutineService.deleteInspectRoutine(this.selectedPlantId);
    }
    this.closeDeletePlantConfirmationModal();
  }

  public handleSelectAll(): void {
    this.selectAll = !this.selectAll;
    if (this.selectAll) {
      this.selectedRows = this.pagedPlantsList.map(row => row.id);
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

  public handleDeletePlant(id: string): void {
    this.selectedPlantId = id;
    this.isDeleteModalOpen = true;
  }

  public toggleFiltersModal(): void {
    this.isFiltersOpen = !this.isFiltersOpen;
  }

  public closeFiltersModal(): void {
    this.isFiltersOpen = false;
  }

  public closePlantDetailsModal(): void {
    this.isPlantDetailsOpen = false;
  }

  public searchPlantsWithFilter(): void {
    const plantsSearchInfo = this.getPlantsSearchInfo(
      this.searchFiltersForm.value as PlantsSearchFilters
    );

    this.plantsService.getFilteredPlantsHandler(plantsSearchInfo);

    this.closeFiltersModal();

    localStorage.setItem(
      'POMAR-NA-MAO:SEARCH-PLANTS-FILTERS',
      JSON.stringify(this.searchFiltersForm.value)
    );
  }

  public seeAllPlants(): void {
    this.plantsService.getAllPlantsHandler();
  }

  public handleDetailPlant(plant: PlantData): void {
    this.plantsService.setSelectedPlant(plant);
    this.isPlantDetailsOpen = true;
  }

  public updateSelectedPlantData(): void {}

  public getPlantsSearchInfo(searchFiltersFormValue: PlantsSearchFilters): PlantsSearchInfo {
    const { region, occurrence, startLastWork, endLastWork } = searchFiltersFormValue;

    const lastWorkRangeDate =
      startLastWork || endLastWork
        ? `${getTransformedDateFromInput(startLastWork!)} - ${getTransformedDateFromInput(endLastWork!)}`
        : null;

    return {
      region,
      occurrence,
      lastWorkRangeDate,
    } as PlantsSearchInfo;
  }

  public async cleanSearchFilters(): Promise<void> {
    await this.plantsService.getAllPlantsHandler();
    this.searchFiltersForm.reset();
    localStorage.removeItem('POMAR-NA-MAO:SEARCH-PLANTS-FILTERS');
    this.closeFiltersModal();
  }
}
