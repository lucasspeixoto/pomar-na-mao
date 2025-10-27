import { Component, effect, inject, Input } from '@angular/core';
import { InspectRoutineService } from '../../services/inspect-routine.service';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { PlantsService } from '../../../../shared/services/plants.service';
import { InspectRoutinePlantsService } from '../../services/inspect-routine-plants.service';
import { InspectComparisonResumeSkeletonComponent } from '../../../../shared/components/skeleton/inspect-comparison-resume-skeleton.component';
import { countPlantOccurrenceDifferences } from '../../../../utils/plant-computation';
import { DatePipe } from '@angular/common';
import { injectSupabase } from '../../../../utils/inject-supabase';
import { occurenceKeys } from '../../../../utils/occurrences';
import { RoutinePlants } from '../../models/routine.model';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-inspect-comparison-resume',
  imports: [ButtonComponent, InspectComparisonResumeSkeletonComponent, DatePipe],
  templateUrl: './inspect-comparison-resume.component.html',
})
export class InspectComparisonResumeComponent {
  @Input() routineId: string | null = null;

  public inspectRoutineService = inject(InspectRoutineService);

  public inspectRoutinePlantsService = inject(InspectRoutinePlantsService);

  public plantsService = inject(PlantsService);

  public toastService = inject(ToastService);

  private supabase = injectSupabase();

  public isLoadingRoutinePlants = this.inspectRoutinePlantsService.isLoading;

  public isLoadingCurrentPlamt = this.plantsService.isLoading;

  public numberOfDifferences: number = 0;

  constructor() {
    effect(() => {
      if (this.inspectRoutineService.isComparisonActive()) {
        //* Recalcular número de diferenças sempre que as plantas forem atualizadas

        this.numberOfDifferences = countPlantOccurrenceDifferences(
          this.plantsService.selectedPlantInComparison(),
          this.inspectRoutinePlantsService.selectedPlantInComparison()
        );
      }
    });
  }

  public async startRoutineComparison(): Promise<void> {
    if (this.routineId) {
      //* Carregar plantas da inspeção (inspect_routine_plants)
      await this.inspectRoutinePlantsService.getInspectRoutinePlantsDataHandler(this.routineId);

      //* Carregar para a primeira planta da inspeção a planta correspondente atual
      const inspectRoutinePlants = this.inspectRoutinePlantsService.inspectRoutinePlants();

      if (inspectRoutinePlants && inspectRoutinePlants.length > 0) {
        const firstPlant = inspectRoutinePlants[0];

        await this.plantsService.getPlantByIdHandler(firstPlant?.plant_id!);

        if (this.plantsService.selectedPlantInComparison()) {
          //* Ativar estado de comparação
          this.inspectRoutineService.setIsComparisonActive(true);

          //* Navigate window to top of app-routine-plant-comparison component with id 'routine-plant-comparison'
          const routinePlantComparisonElement = document.getElementById('routine-plant-comparison');
          if (routinePlantComparisonElement) {
            routinePlantComparisonElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    }
  }

  public async approvePlantInspectUpdates(): Promise<void> {
    const newPlantState =
      this.inspectRoutinePlantsService.selectedPlantInComparison() as RoutinePlants;

    const newPlantDataWithOccurrences = Object.fromEntries(
      occurenceKeys.map(key => [key, newPlantState[key]])
    );

    const plantId = newPlantState.plant_id!;

    const { error } = await this.supabase.rpc('update_plant_and_approve', {
      plant_id: plantId,
      occurrences: newPlantDataWithOccurrences,
      inspect_routine_plant_id: newPlantState.id,
    });

    if (error) {
      this.toastService.show(
        'Erro',
        'Erro ao marcar inspeção como "Aprovada", tente novamente mais tarde!',
        'info'
      );
      throw new Error(
        `Erro ao marcar inspeção como "Aprovada", tente novamente mais tarde!: ${error?.message}`
      );
    } else {
      await this.inspectRoutinePlantsService.getInspectRoutinePlantsDataHandler(this.routineId!);

      await this.plantsService.getPlantByIdHandler(plantId);

      this.toastService.show('Sucesso', 'Planta atualizada com sucesso!', 'success');
    }
  }
}
