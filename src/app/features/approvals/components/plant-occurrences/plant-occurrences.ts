import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
import { StepperModule } from 'primeng/stepper';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import type { RoutinePlants } from '../../models/routine.model';
import { NgClass } from '@angular/common';

const PRIMENG = [ButtonModule, StepperModule, SplitterModule, ToggleSwitchModule];

const COMMON = [FormsModule, NgClass];

@Component({
  selector: 'app-plant-occurrences',
  templateUrl: './plant-occurrences.html',
  imports: [...PRIMENG, ...COMMON],
})
export class PlantOccurrencesComponent {
  @Input()
  public plant!: RoutinePlants;
}
