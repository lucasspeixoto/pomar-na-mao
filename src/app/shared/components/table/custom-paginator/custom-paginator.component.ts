import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-paginator',
  imports: [CommonModule],
  templateUrl: './custom-paginator.component.html',
})
export class CustomPaginatorComponent<T> implements OnChanges {
  @Input({ required: true }) data: T[] = [];

  @Input() itemsPerPage: number = 10;

  @Output() pageChanged = new EventEmitter<T[]>();

  public currentPage: number = 1;

  public totalPages: number = 0;

  public visiblePages: number[] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['itemsPerPage']) {
      this.currentPage = 1;
      this.updatePaginator();
    }
  }

  private updatePaginator(): void {
    // 1. Calcular o total de páginas
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);

    // 2. Atualizar os números de página visíveis (ex: [1, 2, 3] ou [4, 5, 6])
    this.updateVisiblePages();

    // 3. Fatiar o array e emitir os dados da página atual
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const pagedData = this.data.slice(startIndex, endIndex);

    this.pageChanged.emit(pagedData);
  }

  private updateVisiblePages(): void {
    const pages: number[] = [];

    for (let i = 1; i <= this.totalPages; i++) {
      if (i >= this.currentPage - 3 && i <= this.currentPage + 3) {
        pages.push(i);
      }
    }

    this.visiblePages = pages;
  }

  public goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.updatePaginator();
    }
  }

  public nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  public prevPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }
}
