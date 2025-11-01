/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomPaginatorComponent } from './custom-paginator.component';
import { CommonModule } from '@angular/common';
import { SimpleChange } from '@angular/core';

interface MockData {
  id: number;
  value: string;
}

describe('CustomPaginatorComponent', () => {
  let component: CustomPaginatorComponent<MockData>;
  let fixture: ComponentFixture<CustomPaginatorComponent<MockData>>;
  let mockData: MockData[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, CustomPaginatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomPaginatorComponent as any);
    component = fixture.componentInstance;

    mockData = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      value: `Item ${i + 1}`,
    }));

    component.data = mockData;
    component.itemsPerPage = 10;

    component.ngOnChanges({
      data: new SimpleChange(null, mockData, true),
      itemsPerPage: new SimpleChange(null, 10, true),
    });

    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  // --- Testes de Inicialização e Cálculos ---

  it('deve calcular o total de páginas corretamente na inicialização', () => {
    // 50 itens / 10 por página = 5 páginas
    expect(component.totalPages).toBe(5);
  });

  it('deve inicializar na primeira página', () => {
    expect(component.currentPage).toBe(1);
  });

  it('deve emitir os dados da primeira página na inicialização', () => {
    // Espiona o EventEmitter
    spyOn(component.pageChanged, 'emit');

    // Inicializa novamente para disparar o emit
    component.ngOnChanges({
      data: new SimpleChange(null, mockData, true),
    });

    // Deve emitir os primeiros 10 itens
    const expectedData = mockData.slice(0, 10);
    expect(component.pageChanged.emit).toHaveBeenCalledWith(expectedData);
  });

  it('deve recalcular a paginação quando itemsPerPage muda (ngOnChanges)', () => {
    // Simula a mudança de itens por página para 5
    component.itemsPerPage = 5;
    component.ngOnChanges({
      itemsPerPage: new SimpleChange(10, 5, false),
    });

    // 50 itens / 5 por página = 10 páginas
    expect(component.totalPages).toBe(10);
  });

  it('deve recalcular e voltar para a primeira página quando os dados mudam', () => {
    component.goToPage(3); // Vai para a página 3
    expect(component.currentPage).toBe(3);

    const newMockData = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      value: `New Item ${i + 1}`,
    }));

    // Simula a mudança de dados
    component.data = newMockData;
    component.ngOnChanges({
      data: new SimpleChange(mockData, newMockData, false),
    });

    // Deve voltar para a página 1 e recalcular o total (15/10 = 2 páginas)
    expect(component.currentPage).toBe(1);
    expect(component.totalPages).toBe(2);
  });

  // --- Testes de Navegação goToPage ---

  it('deve mudar para a página 3 e emitir os dados corretos', () => {
    spyOn(component.pageChanged, 'emit');

    component.goToPage(3);

    expect(component.currentPage).toBe(3);

    // Página 3 (índices 20 a 29)
    const expectedData = mockData.slice(20, 30);
    expect(component.pageChanged.emit).toHaveBeenCalledWith(expectedData);
  });

  it('não deve mudar de página se o número for inválido (maior que o total)', () => {
    const initialPage = component.currentPage;
    spyOn(component.pageChanged, 'emit');

    component.goToPage(6); // TotalPages é 5

    expect(component.currentPage).toBe(initialPage);
    expect(component.pageChanged.emit).not.toHaveBeenCalled();
  });

  it('não deve mudar de página se o número for inválido (menor que 1)', () => {
    const initialPage = component.currentPage;
    spyOn(component.pageChanged, 'emit');

    component.goToPage(0);

    expect(component.currentPage).toBe(initialPage);
    expect(component.pageChanged.emit).not.toHaveBeenCalled();
  });

  // --- Testes de Navegação next/prevPage ---

  it('deve avançar para a próxima página com nextPage()', () => {
    component.nextPage(); // Vai para a página 2
    expect(component.currentPage).toBe(2);

    // Tenta avançar novamente
    component.nextPage(); // Vai para a página 3
    expect(component.currentPage).toBe(3);
  });

  it('deve retroceder para a página anterior com prevPage()', () => {
    component.goToPage(3); // Começa na página 3

    component.prevPage(); // Volta para a página 2
    expect(component.currentPage).toBe(2);
  });

  it('não deve avançar a partir da última página', () => {
    component.goToPage(5); // Última página
    spyOn(component.pageChanged, 'emit');

    component.nextPage();

    expect(component.currentPage).toBe(5);
    expect(component.pageChanged.emit).not.toHaveBeenCalled();
  });

  it('não deve retroceder a partir da primeira página', () => {
    // Já está na página 1
    spyOn(component.pageChanged, 'emit');

    component.prevPage();

    expect(component.currentPage).toBe(1);
    expect(component.pageChanged.emit).not.toHaveBeenCalled();
  });

  // --- Testes de Páginas Visíveis ---

  it('deve mostrar as páginas corretas quando na página 1', () => {
    // Deve mostrar as 4 páginas à frente (1 a 4)
    expect(component.visiblePages).toEqual([1, 2, 3, 4]);
  });

  it('deve mostrar as páginas corretas quando na página 5 (última)', () => {
    component.goToPage(5);
    // Deve mostrar as 4 páginas anteriores (2 a 5)
    expect(component.visiblePages).toEqual([2, 3, 4, 5]);
  });

  it('deve mostrar as páginas corretas quando no meio (página 3)', () => {
    component.goToPage(3);
    // Deve mostrar 3 antes e 3 depois, mas como é um total pequeno, será [1, 2, 3, 4, 5]
    expect(component.visiblePages).toEqual([1, 2, 3, 4, 5]);
  });

  it('deve mostrar páginas corretamente em um cenário grande (100 itens, 10 por página, total 10)', () => {
    // Reconfigura o componente para ter 10 páginas no total
    const largeData = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      value: `Large Item ${i + 1}`,
    }));
    component.data = largeData;
    component.ngOnChanges({
      data: new SimpleChange(mockData, largeData, false),
    });

    expect(component.totalPages).toBe(10);

    // Vai para a página 5 (meio)
    component.goToPage(5);

    // Esperado: 3 antes (2, 3, 4), 5, 3 depois (6, 7, 8) => [2, 3, 4, 5, 6, 7, 8]
    expect(component.visiblePages).toEqual([2, 3, 4, 5, 6, 7, 8]);
  });
});
