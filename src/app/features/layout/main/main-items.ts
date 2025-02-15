

type MenuItemRoute = {
  routerLink: string;
  title: string;
}

type MenuItem = {
  title: string;
  icon: string;
  routes: MenuItemRoute[]
}

export const menuItems: MenuItem[] = [
  { title: 'Coleta', icon: 'audit', routes: [{ routerLink: '/collect', title: 'Cadastrar' }] },
  {
    title: 'Relatórios',
    icon: 'pie-chart',
    routes: [
      { routerLink: '/collects', title: 'Coletas' },
      { routerLink: '/charts', title: 'Gráficos' },
    ],
  },
  {
    title: 'Detecção',
    icon: 'dashboard',
    routes: [{ routerLink: '/detection', title: 'Localizar' }],
  },
];
