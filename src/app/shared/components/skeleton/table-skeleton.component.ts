import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-skeleton',
  standalone: true,
  imports: [],
  template: `
    <!-- Início do Componente Skeleton -->
    <!-- Para testar, adicione a classe 'dark' ao elemento <html> -->
    <div
      class="overflow-hidden rounded-2xl border border-gray-200 bg-white pt-4 dark:border-white/[0.05] dark:bg-white/[0.03]">
      <!-- Cabeçalho do Skeleton -->
      <div
        class="flex animate-pulse flex-col gap-4 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <!-- Título do Skeleton -->
        <div>
          <div class="h-6 w-64 rounded-md bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <!-- Botões do Skeleton -->
        <div class="flex items-center gap-3">
          <div class="h-11 w-24 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
          <div class="h-11 w-24 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>

      <!-- Tabela do Skeleton -->
      <div class="max-w-full overflow-x-auto">
        <table class="min-w-full">
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
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSkeletonComponent {
  @Input() lines: number = 5;

  public linesRange = Array.from({ length: this.lines + 1 }, (_, index) => index);
}
