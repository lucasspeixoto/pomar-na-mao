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
  { title: 'Coleta', icon: 'audit', routes: [{ routerLink: '/home/collect', title: 'Cadastrar' }] },
  {
    title: 'Relatórios',
    icon: 'pie-chart',
    routes: [
      { routerLink: '/home/collects', title: 'Coletas' },
      { routerLink: '/home/charts', title: 'Gráficos' },
    ],
  },
  {
    title: 'Detecção',
    icon: 'dashboard',
    routes: [{ routerLink: '/home/detection', title: 'Localizar' }],
  },
];
