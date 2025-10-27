/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { LoadingService } from '../../../shared/services/loading-store.service';
import type { iUser } from '../models/user.model';
// Nota: 'injectSupabase' é injetado diretamente no construtor.
// Para fins de teste, iremos mockar a propriedade 'supabase' na instância do serviço.

// --- 1. Mocks e Dados de Teste ---

// Mock do iUser
const mockUsers: iUser[] = [
  {
    id: 'u1',
    full_name: 'Zoe A. Zola',
    email: 'zoe@test.com',
    avatar_url: 'https://example.com/zoe.jpg',
    isAdmin: false,
  },
  {
    id: 'u2',
    full_name: 'Alice B. Smith',
    email: 'alice@test.com',
    avatar_url: 'https://example.com/alice.jpg',
    isAdmin: false,
  },
  {
    id: 'u3',
    full_name: 'Charlie C. Charlie',
    email: 'charlie@test.com',
    avatar_url: 'https://example.com/charlie.jpg',
    isAdmin: false,
  },
  {
    id: 'u4',
    full_name: 'Diana D. Diana',
    email: 'diana@test.com',
    avatar_url: 'https://example.com/diana.jpg',
    isAdmin: false,
  },
  {
    id: 'u5',
    full_name: 'Eve E. Eve',
    email: 'eve@test.com',
    avatar_url: 'https://example.com/eve.jpg',
    isAdmin: false,
  },
  {
    id: 'u6',
    full_name: 'Frank F. Frank',
    email: 'frank@test.com',
    avatar_url: 'https://example.com/frank.jpg',
    isAdmin: false,
  },
  {
    id: 'u7',
    full_name: 'George G. George',
    email: 'george@test.com',
    avatar_url: 'https://example.com/george.jpg',
    isAdmin: false,
  },
  {
    id: 'u8',
    full_name: 'Hannah H. Hannah',
    email: 'hannah@test.com',
    avatar_url: 'https://example.com/hannah.jpg',
    isAdmin: false,
  },
  {
    id: 'u9',
    full_name: 'Ivy I. Ivy',
    email: 'ivy@test.com',
    avatar_url: 'https://example.com/ivy.jpg',
    isAdmin: false,
  },
  {
    id: 'u10',
    full_name: 'Jack J. Jack',
    email: 'jack@test.com',
    avatar_url: 'https://example.com/jack.jpg',
    isAdmin: false,
  },
];

// Mock do LoadingService (dependência injetada)
// Usamos jasmine.createSpyObj para monitorar se os métodos são chamados.
const mockLoadingService = jasmine.createSpyObj('LoadingService', ['startLoading', 'stopLoading']);

// Mock do Cliente Supabase (dependência interna)
// Este mock simula o encadeamento de chamadas do Supabase.
let supabaseMock: any;

function createSupabaseMock(data: any, error: any): void {
  // Simula o retorno de Promise para a chamada final
  const queryResult = Promise.resolve({ data, error });

  // Simula o encadeamento .from().select().order()
  supabaseMock = {
    from: jasmine.createSpy('from').and.returnValue({
      select: jasmine.createSpy('select').and.returnValue({
        order: jasmine.createSpy('order').and.returnValue(queryResult),
      }),
    }),
  };
}

describe('UsersService', () => {
  let service: UsersService;
  let loadingStore: jasmine.SpyObj<LoadingService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // O service é providedIn: 'root', então o TestBed apenas o injeta.
      providers: [
        UsersService,
        // Sobrescrevemos o provider do LoadingService para usar nosso mock
        { provide: LoadingService, useValue: mockLoadingService },
      ],
    });

    service = TestBed.inject(UsersService);
    loadingStore = mockLoadingService;

    // Reseta o estado do LoadingService antes de cada teste
    loadingStore.startLoading.calls.reset();
    loadingStore.stopLoading.calls.reset();
  });

  // --- 2. Testes de Inicialização e Computed Signal ---

  it('should be created and initialize with empty users array', () => {
    expect(service).toBeTruthy();
    expect(service.users()).toEqual([]);
  });

  it('should correctly transform users signal into usersOptions computed signal', () => {
    // 1. Arrange: Define dados iniciais no signal
    service.users.set(mockUsers);

    // 2. Act: Acessa o computed signal
    const options = service.usersOptions();

    // 3. Assert: Verifica se a transformação está correta
    expect(options.length).toBe(10);
    expect(options[0].label).toBe('Zoe A. Zola');
    expect(options[0].value).toBe('u1');
    expect(options[1].label).toBe('Alice B. Smith');
    expect(options[1].value).toBe('u2');
  });

  // --- 3. Testes do Método getAllUsers (Async) ---

  describe('getAllUsers', () => {
    it('should fetch users successfully and update the users signal', async () => {
      // 1. Arrange: Configura o mock do Supabase para retornar SUCESSO com dados.
      createSupabaseMock(mockUsers, null);
      // Simula a injeção do cliente mockado no service
      (service as any).supabase = supabaseMock;

      // 2. Act: Chama o método
      await service.getAllUsers();

      // 3. Assert (Loading State):
      expect(loadingStore.startLoading).toHaveBeenCalledBefore(loadingStore.stopLoading);
      expect(loadingStore.stopLoading).toHaveBeenCalledTimes(1);

      // 4. Assert (Data Update):
      expect(service.users()).toEqual(mockUsers);

      // 5. Assert (Supabase Call): Verifica se o encadeamento correto foi chamado
      expect(supabaseMock.from).toHaveBeenCalledWith('users');
      expect(supabaseMock.from('users').select).toHaveBeenCalledWith('*');
      expect(supabaseMock.from('users').select('*').order).toHaveBeenCalledWith('full_name', {
        ascending: true,
      });
    });

    it('should reset users signal to empty array on fetch error', async () => {
      // 1. Arrange: Configura o mock do Supabase para retornar ERRO.
      const mockError = new Error('Supabase failed to fetch data');
      createSupabaseMock(null, mockError);
      (service as any).supabase = supabaseMock;

      // Define um estado inicial de dados para garantir que ele seja resetado
      service.users.set(mockUsers);

      // 2. Act: Chama o método
      await service.getAllUsers();

      // 3. Assert (Loading State):
      expect(loadingStore.startLoading).toHaveBeenCalledBefore(loadingStore.stopLoading);
      expect(loadingStore.stopLoading).toHaveBeenCalledTimes(1);

      // 4. Assert (Data Update on Error):
      // Verifica se o signal foi resetado para um array vazio
      expect(service.users()).toEqual([]);
    });
  });
});
