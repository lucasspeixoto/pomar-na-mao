export type Service = {
  title: string;
  subtitle: string;
  icon: string;
  routerLink: string;
  color: string;
};

export const servicesItems: Service[] = [
  {
    title: 'Coletar',
    subtitle: 'Registrar dado de planta',
    icon: 'pi pi-box',
    routerLink: '/app/coleta/cadastrar',
    color: 'yellow',
  },
  {
    title: 'Sincronizar',
    subtitle: 'Sincronize as coletas offline',
    icon: 'pi pi-sync',
    routerLink: '/app/coleta/sincronizar',
    color: 'blue',
  },
  {
    title: 'Consultar',
    subtitle: 'Visualize plantas cadastradas',
    icon: 'pi pi-search',
    routerLink: '/app/coleta/consultar',
    color: 'red',
  },
  {
    title: 'Painel',
    subtitle: 'Painel administrador',
    icon: 'pi pi-shield',
    routerLink: '/app/inicio',
    color: 'green',
  },
];
