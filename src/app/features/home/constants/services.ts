export type Service = {
  title: string;
  subtitle: string;
  icon: string;
  routerLink: string;
  image: string;
};

export const servicesItems: Service[] = [
  {
    title: 'Coletar',
    subtitle: 'Registrar dado de planta',
    icon: 'pi pi-box',
    routerLink: '/app/coleta/cadastrar',
    image: '/assets/images/open-box.png',
  },
  {
    title: 'Sincronizar',
    subtitle: 'Sincronize as coletas',
    icon: 'pi pi-sync',
    routerLink: '/app/coleta/sincronizar',
    image: '/assets/images/sync.png',
  },
  {
    title: 'Consultar',
    subtitle: 'Plantas cadastradas',
    icon: 'pi pi-search',
    routerLink: '/app/coleta/consultar',
    image: '/assets/images/search.png',
  },
  {
    title: 'Painel',
    subtitle: 'Painel administrador',
    icon: 'pi pi-shield',
    routerLink: '/app/inicio',
    image: '/assets/images/admin.png',
  },
];
