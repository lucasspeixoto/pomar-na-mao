export type Service = {
  title: string;
  subtitle: string;
  icon: string;
  routerLink: string;
};

export const servicesItems: Service[] = [
  {
    title: 'Coletar',
    subtitle: 'Registrar dado de planta',
    icon: 'pi pi-box',
    routerLink: '/app/coleta/cadastrar',
  },
  {
    title: 'Sincronizar',
    subtitle: 'Sincronize as coletas offline',
    icon: 'pi pi-sync',
    routerLink: '/app/coleta/sincronizar',
  },
  {
    title: 'Consultar',
    subtitle: 'Visualize plantas cadastradas',
    icon: 'pi pi-search',
    routerLink: '/app/coleta/consultar',
  },
  {
    title: 'Painel',
    subtitle: 'Painel administrador',
    icon: 'pi pi-shield',
    routerLink: '/app/inicio',
  },
];
