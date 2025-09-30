import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { CheckboxComponent } from '../../../../shared/components/form/input/checkbox.component';
import { AvatarTextComponent } from '../../../../shared/components/ui/avatar/avatar-text.component';
import { FarmRegionApi } from '../../../../shared/services/farm-region-api.service';
import { InspectRoutinePlantsStore } from '../../services/inspect-routine-plants-store';
import { InspectRoutineStore } from '../../services/inspect-routine-store';
import { ModalComponent } from '../../../../shared/components/ui/modal/modal.component';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-inspect-routines-table',
  imports: [CommonModule, AvatarTextComponent, CheckboxComponent, ButtonComponent, ModalComponent],
  templateUrl: './inspect-routines-table.component.html',
  styles: ``,
})
export class InspectRoutinesTableComponent implements OnInit {
  public inspectRoutineStore = inject(InspectRoutineStore);

  public farmRegionApi = inject(FarmRegionApi);

  public inspectRoutinePlantsStore = inject(InspectRoutinePlantsStore);

  isOpen = false;

  selectedRows: string[] = [];
  selectAll: boolean = false;

  selectedRoutineId: string | null = null;

  public async ngOnInit(): Promise<void> {
    await this.inspectRoutineStore.getInspectRoutinesDataHandler();
    await this.farmRegionApi.getAllFarmRegionsHandler();
  }

  public closeDeleteRoutineConfirmationModal(): void {
    this.isOpen = false;
  }

  public handleConfirmDeleteRoutine(): void {
    console.log('Deletando rotina com ID:', this.selectedRoutineId);
    //this.inspectRoutineStore.deleteInspectRoutine(routineId);
    this.closeDeleteRoutineConfirmationModal();
  }

  public handleSelectAll(): void {
    this.selectAll = !this.selectAll;
    if (this.selectAll) {
      this.selectedRows = this.inspectRoutineStore.inspectRoutines().map(row => row.id);
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
    this.isOpen = true;
  }
}
