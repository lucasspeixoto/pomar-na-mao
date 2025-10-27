/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { LoadingService } from '../../../shared/services/loading-store.service';
import { ToastService } from '../../../shared/services/toast.service';
import { Session, User } from '@supabase/supabase-js';
import { iUser } from '../models/user.model';

// --- 1. Mocks e Dados de Teste ---

// Mock do LoadingService (dependência injetada)
const mockLoadingService = jasmine.createSpyObj('LoadingService', ['startLoading', 'stopLoading']);

// Mock do ToastService (dependência injetada)
const mockToastService = jasmine.createSpyObj('ToastService', ['show']);

// Mock do Router (dependência injetada)
const mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

// Dados de sessão e usuário
const mockUser: User = {
  id: 'user-id-123',
  email: 'test@example.com',
  aud: 'authenticated',
  app_metadata: {},
  user_metadata: {},
  identities: [],
  created_at: new Date().toISOString(),
};

const mockSession: Session = {
  access_token: 'fake-token',
  token_type: 'bearer',
  user: mockUser,
  expires_in: 3600,
  expires_at: 123456789,
  refresh_token: 'fake-refresh-token',
};

const mockIUser: iUser = {
  id: 'user-id-123',
  full_name: 'Test User',
  email: 'test@example.com',
  avatar_url: 'https://example.com/avatar.jpg',
  isAdmin: false,
};

const mockAdminIUser: iUser = {
  ...mockIUser,
  isAdmin: true,
};

// Variáveis para os mocks do Supabase (serão configuradas em cada teste)
let supabaseMock: any;
let authSpy: any;
let dbFromSpy: any;

/**
 * Função para configurar o mock do cliente Supabase.
 * Deve ser chamada no beforeEach ou dentro de cada it() que interage com o Supabase.
 */
function setupSupabaseMock(authMethodMocks: any, dbMethodMocks: any): void {
  authSpy = {
    signInWithPassword: jasmine
      .createSpy('signInWithPassword')
      .and.returnValue(Promise.resolve(authMethodMocks.signIn)),
    resetPasswordForEmail: jasmine
      .createSpy('resetPasswordForEmail')
      .and.returnValue(Promise.resolve(authMethodMocks.resetPassword)),
    updateUser: jasmine
      .createSpy('updateUser')
      .and.returnValue(Promise.resolve(authMethodMocks.updateUser)),
    getSession: jasmine
      .createSpy('getSession')
      .and.returnValue(Promise.resolve(authMethodMocks.getSession)),
    signOut: jasmine.createSpy('signOut').and.returnValue(Promise.resolve(authMethodMocks.signOut)),
  };

  dbFromSpy = (tableName: string): any => ({
    select: jasmine.createSpy('select').and.returnValue({
      eq: jasmine.createSpy('eq').and.returnValue({
        single: jasmine
          .createSpy('single')
          .and.returnValue(Promise.resolve(dbMethodMocks[tableName])),
      }),
    }),
  });

  // Objeto principal do mock do Supabase
  supabaseMock = {
    auth: authSpy,
    from: jasmine.createSpy('from').and.callFake(dbFromSpy),
  };
}

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let loadingStore: jasmine.SpyObj<LoadingService>;
  let toastService: jasmine.SpyObj<ToastService>;
  let router: jasmine.SpyObj<Router>;

  // Variável para controlar o setTimeout
  let setTimeoutSpy: jasmine.Spy;

  beforeEach(() => {
    // 1. Espia localStorage
    spyOn(localStorage, 'getItem').and.callFake((_key: string) => {
      // Valor padrão: null (sessão não existe no storage)
      return null;
    });

    // 2. Configura o TestBed
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        { provide: LoadingService, useValue: mockLoadingService },
        { provide: ToastService, useValue: mockToastService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    service = TestBed.inject(AuthenticationService);
    loadingStore = mockLoadingService;
    toastService = mockToastService;
    router = mockRouter;

    // 3. Configura um mock padrão do Supabase para evitar 'undefined' no setup
    setupSupabaseMock(
      {
        signIn: { error: null },
        resetPassword: { error: null },
        updateUser: { error: null },
        getSession: { data: { session: null }, error: null },
        signOut: { error: null },
      },
      { users: { data: null, error: null }, user_roles: { data: null, error: null } }
    );
    // *** CORREÇÃO APLICADA AQUI: GARANTINDO O MOCK ANTES DE CADA TESTE ***
    (service as any).supabase = supabaseMock;

    // 4. Mock do `setTimeout` para executar callbacks imediatamente
    setTimeoutSpy = spyOn(window, 'setTimeout');
    setTimeoutSpy.and.callFake(((callback: () => void) => {
      callback(); // Executa o callback imediatamente
      return 0;
    }) as any);

    // 5. Reseta o estado do service e dos mocks
    loadingStore.startLoading.calls.reset();
    loadingStore.stopLoading.calls.reset();
    toastService.show.calls.reset();
    router.navigateByUrl.calls.reset();
    service.currentUser.set(null);
    service.session = null;
  });

  // --- Testes de Inicialização e Handlers de Sinal/Estado ---

  it('should be created and initialize signals correctly', () => {
    expect(service).toBeTruthy();
    expect(service.currentUser()).toBeNull();
    expect(service.session).toBeNull();
  });

  it('isAdminCheckHandler should return true if currentUser is admin', () => {
    service.currentUser.set(mockAdminIUser);
    expect(service.isAdminCheckHandler()).toBeTrue();
  });

  // --- Testes de Autenticação: Login ---

  describe('loginUserHandler', () => {
    const testEmail = 'user@test.com';
    const testPassword = 'password';

    it('should handle successful login, show success toast and navigate', async () => {
      // Arrange: Mock de SUCESSO no signInWithPassword
      setupSupabaseMock({ signIn: { error: null } }, {});
      (service as any).supabase = supabaseMock; // Reatribui o mock específico

      // Act
      await service.loginUserHandler(testEmail, testPassword);

      // Assert (Loading, Navigation & Toast)
      expect(loadingStore.startLoading).toHaveBeenCalledTimes(1);
      expect(authSpy.signInWithPassword).toHaveBeenCalledWith({
        email: testEmail,
        password: testPassword,
      });

      // O stopLoading, navigate e toast ocorrem dentro do setTimeout mockado
      expect(loadingStore.stopLoading).toHaveBeenCalledTimes(1);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/inicio');
      expect(toastService.show).toHaveBeenCalledWith(
        'Bem-vindo!',
        'Login realizado com sucesso!',
        'success'
      );
      expect(setTimeoutSpy).toHaveBeenCalledWith(jasmine.any(Function), 3000);
    });

    it('should handle failed login, show error toast, and stop loading', async () => {
      const authError = { status: 400, message: 'Invalid credentials' };
      // Arrange: Mock de ERRO no signInWithPassword
      setupSupabaseMock({ signIn: { error: authError } }, {});
      (service as any).supabase = supabaseMock;

      // Act
      await service.loginUserHandler(testEmail, testPassword);

      // Assert (Loading & Toast)
      expect(loadingStore.startLoading).toHaveBeenCalledTimes(1);
      expect(loadingStore.stopLoading).toHaveBeenCalledTimes(1);
      expect(toastService.show).toHaveBeenCalledWith(
        'Erro',
        'E-mail ou senha incorretos!',
        'error'
      );
      expect(router.navigateByUrl).not.toHaveBeenCalled();
    });
  });

  // --- Testes de Autenticação: Forgot Password ---

  describe('forgotPasswordHandler', () => {
    const testEmail = 'user@test.com';

    it('should handle successful password reset request and navigate', async () => {
      // Arrange: Mock de SUCESSO no resetPasswordForEmail
      setupSupabaseMock({ resetPassword: { error: null } }, {});
      (service as any).supabase = supabaseMock;
      spyOn(service, 'loadUserData');

      // Act
      await service.forgotPasswordHandler(testEmail);

      // Assert (Loading & Toast)
      expect(loadingStore.startLoading).toHaveBeenCalledTimes(1);
      expect(loadingStore.stopLoading).toHaveBeenCalledTimes(1);
      expect(toastService.show).toHaveBeenCalledWith(
        'Enviado',
        'Link de recuperação enviado por e-mail!',
        'success'
      );

      // Assert (Supabase & Navigation)
      expect(authSpy.resetPasswordForEmail).toHaveBeenCalledWith(testEmail);
      expect(service.loadUserData).toHaveBeenCalledTimes(1);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
    });

    it('should handle failed password reset request and show error toast', async () => {
      const authError = { status: 500, message: 'Rate limit exceeded' };
      // Arrange: Mock de ERRO
      setupSupabaseMock({ resetPassword: { error: authError } }, {});
      (service as any).supabase = supabaseMock;
      spyOn(service, 'loadUserData');

      // Act
      await service.forgotPasswordHandler(testEmail);

      // Assert (Loading & Toast)
      expect(loadingStore.startLoading).toHaveBeenCalledTimes(1);
      expect(loadingStore.stopLoading).toHaveBeenCalledTimes(1);
      expect(toastService.show).toHaveBeenCalledWith(
        'Erro',
        jasmine.stringMatching(/Erro ao lembrar senha|Rate limit exceeded/),
        'error'
      );
      expect(router.navigateByUrl).not.toHaveBeenCalled();
      expect(service.loadUserData).not.toHaveBeenCalled();
    });
  });

  // --- Testes de Autenticação: Reset Password (updateUser) ---

  describe('resetPasswordHandler', () => {
    const newPassword = 'new-secure-password';

    it('should handle successful password update, show success toast and navigate', async () => {
      // Arrange: Mock de SUCESSO no updateUser
      setupSupabaseMock({ updateUser: { error: null } }, {});
      (service as any).supabase = supabaseMock;
      spyOn(service, 'loadUserData');

      // Act
      await service.resetPasswordHandler(newPassword);

      // Assert (Loading & Toast)
      expect(loadingStore.startLoading).toHaveBeenCalledTimes(1);
      expect(loadingStore.stopLoading).toHaveBeenCalledTimes(1);
      expect(toastService.show).toHaveBeenCalledWith(
        'Sucesso',
        'Senha alterada com sucesso!',
        'success'
      );

      // Assert (Supabase & Navigation)
      expect(authSpy.updateUser).toHaveBeenCalledWith({ password: newPassword });
      expect(service.loadUserData).toHaveBeenCalledTimes(1);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
    });

    it('should handle failed password update and show error toast', async () => {
      const authError = { status: 422, message: 'Password is too weak' };
      // Arrange: Mock de ERRO
      setupSupabaseMock({ updateUser: { error: authError } }, {});
      (service as any).supabase = supabaseMock;
      spyOn(service, 'loadUserData');

      // Act
      await service.resetPasswordHandler(newPassword);

      // Assert (Loading & Toast)
      expect(loadingStore.startLoading).toHaveBeenCalledTimes(1);
      expect(loadingStore.stopLoading).toHaveBeenCalledTimes(1);
      expect(toastService.show).toHaveBeenCalledWith(
        'Erro',
        jasmine.stringMatching(/Erro ao resetar senha|Password is too weak/),
        'error'
      );
      expect(router.navigateByUrl).not.toHaveBeenCalled();
      expect(service.loadUserData).not.toHaveBeenCalled();
    });
  });

  // --- Testes de Carregamento de Dados do Usuário (loadUserData) ---

  describe('loadUserData', () => {
    it('should call restoreSessionFromStorage if getSession fails', async () => {
      // Arrange: getSession falha
      setupSupabaseMock(
        { getSession: { data: { session: null }, error: { message: 'Failed' } } },
        {}
      );
      (service as any).supabase = supabaseMock;
      spyOn(service, 'restoreSessionFromStorage');

      // Act
      await service.loadUserData();

      // Assert
      expect(service.restoreSessionFromStorage).toHaveBeenCalledTimes(1);
      expect(service.currentUser()).toBeNull();
    });

    it('should fetch user data and role, set session, and set currentUser (Not Admin)', async () => {
      // Arrange: getSession sucesso, Role NÂO é admin
      setupSupabaseMock(
        { getSession: { data: { session: mockSession }, error: null } },
        {
          users: { data: mockIUser, error: null },
          user_roles: { data: { role: 'standard' }, error: null },
        }
      );
      (service as any).supabase = supabaseMock;
      spyOn(service, 'restoreSessionFromStorage');

      // Act
      await service.loadUserData();

      // Assert
      expect(service.session).toEqual(mockSession);
      expect(service.currentUser()).toEqual(mockIUser);
      expect(service.currentUser()?.isAdmin).toBeFalse();
      expect(supabaseMock.from).toHaveBeenCalledWith('users');
      expect(supabaseMock.from).toHaveBeenCalledWith('user_roles');
      expect(service.restoreSessionFromStorage).not.toHaveBeenCalled();
    });

    it('should fetch user data and role, set session, and set currentUser (Admin)', async () => {
      // Arrange: getSession sucesso, Role É admin
      setupSupabaseMock(
        { getSession: { data: { session: mockSession }, error: null } },
        {
          users: { data: mockIUser, error: null },
          user_roles: { data: { role: 'admin' }, error: null },
        }
      );
      (service as any).supabase = supabaseMock;

      // Act
      await service.loadUserData();

      // Assert
      expect(service.currentUser()?.isAdmin).toBeTrue();
    });
  });

  // --- Testes de Sessão e Storage (Sem mudanças significativas, apenas atribuição garantida do mock) ---
  describe('restoreSessionFromStorage', () => {
    const storageKey = 'sb-xqsikzksebdtexargilq-auth-token';

    it('should restore session from localStorage if present (currentSession key)', () => {
      const mockStorageData = { currentSession: mockSession };
      (localStorage.getItem as jasmine.Spy).and.returnValue(JSON.stringify(mockStorageData));

      service.restoreSessionFromStorage();

      expect(service.session).toEqual(mockSession);
      expect(localStorage.getItem).toHaveBeenCalledWith(storageKey);
    });
  });

  describe('isLoggedCheckHandler', () => {
    it('should return true if service.session is already set', () => {
      service.session = mockSession;
      expect(service.isLoggedCheckHandler()).toBeTrue();
    });
  });

  // --- Testes de Logout ---

  describe('logoutAndRedirect', () => {
    it('should call supabase.auth.signOut and navigate to login', async () => {
      // Arrange
      setupSupabaseMock({ signOut: { error: null } }, {});
      (service as any).supabase = supabaseMock;

      // Act
      await service.logoutAndRedirect();

      // Assert
      expect(authSpy.signOut).toHaveBeenCalledTimes(1);
      expect(router.navigateByUrl).toHaveBeenCalledWith('login');
    });
  });
});
