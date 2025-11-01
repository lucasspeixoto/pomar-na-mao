import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-inspect-routines-table-skeleton',
  standalone: true,
  imports: [],
  template: `
    <table class="w-full mb-4">
      <!-- Cabeçalho da Tabela do Skeleton -->
      <thead
        class="border-t border-y border-gray-100 bg-gray-50 dark:border-white/[0.05] dark:bg-gray-900">
        <tr>
          <th class="px-6 py-3 text-start">
            <div class="flex items-center gap-3 animate-pulse">
              <div class="h-5 w-5 rounded bg-gray-200 dark:bg-gray-700"></div>
              <div class="h-4 w-20 rounded-md bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </th>
          <th class="px-6 py-3 text-start">
            <div class="h-4 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700"></div>
          </th>
          <th class="px-6 py-3 text-start">
            <div class="h-4 w-16 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700"></div>
          </th>
          <th class="px-6 py-3 text-start">
            <div class="h-4 w-20 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700"></div>
          </th>
          <th class="px-6 py-3 text-start">
            <div class="h-4 w-12 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700"></div>
          </th>
        </tr>
      </thead>
      <!-- Corpo da Tabela do Skeleton -->
      <tbody class="animate-pulse">
        <!-- Repita esta linha (tr) para quantas linhas de placeholder desejar -->
        @for (line of linesRange; track line) {
          <tr>
            <td class="px-4 sm:px-6 py-3.5">
              <div class="flex items-center gap-3">
                <div class="h-5 w-5 rounded bg-gray-300 dark:bg-gray-700"></div>
                <div class="h-4 w-12 rounded-md bg-gray-300 dark:bg-gray-700"></div>
              </div>
            </td>
            <td class="px-4 sm:px-6 py-3.5">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                <div class="flex-1 space-y-2">
                  <div class="h-4 w-28 rounded-md bg-gray-300 dark:bg-gray-700"></div>
                  <div class="h-3 w-36 rounded-md bg-gray-300 dark:bg-gray-700"></div>
                </div>
              </div>
            </td>
            <td class="px-4 sm:px-6 py-3.5">
              <div class="h-4 w-24 rounded-md bg-gray-300 dark:bg-gray-700"></div>
            </td>
            <td class="px-4 sm:px-6 py-3.5">
              <div class="h-4 w-32 rounded-md bg-gray-300 dark:bg-gray-700"></div>
            </td>
            <td class="px-4 sm:px-6 py-3.5">
              <div class="flex items-center gap-4">
                <div class="h-5 w-5 rounded-md bg-gray-300 dark:bg-gray-700"></div>
                <div class="h-5 w-5 rounded-md bg-gray-300 dark:bg-gray-700"></div>
              </div>
            </td>
          </tr>
        }
      </tbody>
    </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectRoutinesTableSkeletonComponent {
  @Input() lines: number = 5;

  public linesRange = Array.from({ length: this.lines + 1 }, (_, index) => index);
}
