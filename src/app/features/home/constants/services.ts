export type Service = {
  title: string;
  subtitle: string;
  icon: string;
  routerLink: string;
};

export const servicesItems: Service[] = [
  {
    title: 'Rotinas de trabalho',
    subtitle: 'Acesse e valide as rotinas de trabalho',
    icon: 'pi pi-check-square',
    routerLink: '/app/aprovacoes/rotinas-de-trabalho',
  },
  {
    title: 'Rotinas de inspeção',
    subtitle: 'Acesse e valide as rotinas de inspeção',
    icon: 'pi pi-eye',
    routerLink: '/app/aprovacoes/rotinas-de-inspecao',
  },
];
