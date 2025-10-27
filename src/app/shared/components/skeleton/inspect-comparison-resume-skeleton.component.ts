import { Component } from '@angular/core';

@Component({
  selector: 'app-inspect-comparison-resume-skeleton',
  template: `
    <div class="rounded-xl shadow-lg w-full max-w-xs">
      <div class="flex flex-col h-full px-4 pt-4 pb-2 gap-2 animate-pulse">
        <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded-md w-3/5"></div>
        <div class="mt-4 flex w-full h-full justify-center self-start">
          <div class="w-[80px] h-[80px] bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
          <div class="h-[120px] flex flex-col justify-center gap-9 ml-4 flex-grow">
            <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded-md w-full"></div>
            <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded-md w-full"></div>
            <div class="h-12 bg-gray-300 dark:bg-gray-700 rounded-full w-2/3"></div>
          </div>
        </div>
        <div class="w-full mb-2 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg mt-auto"></div>
      </div>
    </div>
  `,
})
export class InspectComparisonResumeSkeletonComponent {}
