type MenuItemRoute = {
  routerLink: string;
  title: string;
};

type MenuItem = {
  title: string;
  icon: string;
  routes: MenuItemRoute[];
};

export const menuItems: MenuItem[] = [
  {
    title: 'Coleta',
    icon: 'audit',
    routes: [
      { routerLink: '/collect/register', title: 'Cadastrar' },
      { routerLink: '/collect/consultar', title: 'Consultar Coletas' },
      { routerLink: '/collect/sincronizar', title: 'Sincronizar' },
    ],
  },
  {
    title: 'Relatórios',
    icon: 'pie-chart',
    routes: [{ routerLink: '/charts', title: 'Gráficos' }],
  },
  {
    title: 'Detecção',
    icon: 'dashboard',
    routes: [{ routerLink: '/detection', title: 'Localizar' }],
  },
];
