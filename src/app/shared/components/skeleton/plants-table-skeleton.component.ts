import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plants-table-skeleton',
  imports: [CommonModule],
  template: `
    <table class="w-full mb-4">
      <thead
        class="overflow-hidden border-t border-gray-100 border-y bg-gray-50 dark:border-white/[0.05] dark:bg-gray-900">
        <tr>
          <!-- Header: Checkbox + ID -->
          <th
            class="px-6 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start">
            <div class="flex items-center gap-3">
              <!-- Skeleton do Checkbox -->
              <div class="size-5 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <!-- Skeleton do 'ID' -->
              <div class="h-4 w-10 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            </div>
          </th>
          <!-- Header: Zona -->
          <th
            class="px-6 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start">
            <div class="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          </th>
          <!-- Header: Atualizado em -->
          <th
            class="px-6 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start">
            <div class="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          </th>
          <!-- Header: Ações -->
          <th
            class="px-6 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start">
            <div class="h-4 w-12 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <!--
          Repete várias linhas de skeleton para simular
          o carregamento de dados. O número de linhas
          pode ser controlado pela entrada 'rows'.
        -->
        @for (row of linesRange; track $index) {
          <tr class="border-b border-gray-100 dark:border-white/[0.05]">
            <!-- Coluna: Checkbox + ID -->
            <td class="px-6 py-3.5">
              <div class="flex items-center gap-3">
                <!-- Skeleton do Checkbox -->
                <div class="size-5 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <!-- Skeleton do ID -->
                <div class="h-5 w-24 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              </div>
            </td>
            <!-- Coluna: Zona -->
            <td class="px-6 py-3.5">
              <div class="h-5 w-20 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            </td>
            <!-- Coluna: Atualizado em -->
            <td class="px-6 py-3.5">
              <div class="h-5 w-32 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            </td>
            <!-- Coluna: Ações -->
            <td class="px-6 py-3.5">
              <div class="flex items-center gap-2">
                <!-- Skeleton do botão Editar -->
                <div class="size-5 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <!-- Skeleton do botão Excluir -->
                <div class="size-5 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              </div>
            </td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlantsTableSkeletonComponent {
  @Input() lines: number = 5;

  public linesRange = Array.from({ length: this.lines + 1 }, (_, index) => index);
}
